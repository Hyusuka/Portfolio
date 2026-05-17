import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('MONGODB_URI environment variable is missing.');
}

// Global caching for Serverless Mongoose connection
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log('✅ Connected to MongoDB Atlas');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// ----------------------------------------------------------------------
// MongoDB Schema Model
// Since MongoDB is NoSQL, we can store the entire portfolio as a single 
// flexible JSON document. This is highly efficient for this use case.
// ----------------------------------------------------------------------
const portfolioSchema = new mongoose.Schema({
  profile: { type: Object, default: {} },
  experience: { type: Array, default: [] },
  education: { type: Array, default: [] },
  skills: { type: Array, default: [] },
  languages: { type: Array, default: [] },
  certificates: { type: Array, default: [] },
  projects: { type: Array, default: [] },
}, { strict: false });

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

// ----------------------------------------------------------------------
// API Routes
// ----------------------------------------------------------------------
app.all('/api/portfolio', async (req, res) => {
  try {
    // Ensure DB is connected before processing request
    await connectToDatabase();

    if (req.method === 'GET') {
      // Find the first document (we only need one document for the whole portfolio)
      let data = await Portfolio.findOne();
      
      if (!data) {
        return res.json({
          profile: {}, experience: [], education: [], 
          skills: [], languages: [], certificates: [], projects: []
        });
      }

      res.json(data);
    } 
    
    else if (req.method === 'POST') {
      const payload = req.body;
      
      // Upsert: Update the first document if it exists, or create it if it doesn't
      let data = await Portfolio.findOne();
      if (!data) {
        data = new Portfolio(payload);
        await data.save();
      } else {
        data.set(payload);
        await data.save();
      }
      
      res.json({ message: 'Portfolio synchronized successfully with MongoDB Atlas!' });
    } 
    
    else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('MongoDB API Error:', error);
    res.status(500).json({ error: 'Failed to communicate with MongoDB Atlas Database' });
  }
});

export default app;
