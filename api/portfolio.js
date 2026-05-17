import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Database Pool using Cloud credentials (or fallback to local)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper to parse JSON safely
const safeParse = (str, fallback = []) => {
  if (!str) return fallback;
  try { return typeof str === 'string' ? JSON.parse(str) : str; } 
  catch (e) { return fallback; }
};

// Handle both GET and POST requests for /api/portfolio
app.all('/api/portfolio', async (req, res) => {
  if (req.method === 'GET') {
    try {
      const [
        [profileRows], [experienceRows], [educationRows], 
        [skillsRows], [languagesRows], [certificatesRows], [projectsRows]
      ] = await Promise.all([
        pool.query('SELECT * FROM profile WHERE id = 1'),
        pool.query('SELECT * FROM experience'),
        pool.query('SELECT * FROM education'),
        pool.query('SELECT * FROM skills'),
        pool.query('SELECT * FROM languages'),
        pool.query('SELECT * FROM certificates'),
        pool.query('SELECT * FROM projects')
      ]);

      const profile = profileRows[0] || {};
      profile.interests = safeParse(profile.interests, []);

      const experience = experienceRows.map(row => ({
        ...row,
        points: safeParse(row.points, [])
      }));

      const education = educationRows.map(row => ({
        ...row,
        details: safeParse(row.details, [])
      }));

      const skills = skillsRows.map(row => ({
        ...row,
        items: safeParse(row.items, [])
      }));

      const projects = projectsRows.map(row => ({
        ...row,
        techStack: safeParse(row.techStack, []),
        details: safeParse(row.details, [])
      }));

      res.json({
        profile,
        experience,
        education,
        skills,
        languages: languagesRows,
        certificates: certificatesRows,
        projects
      });
    } catch (error) {
      console.error('Error fetching data from MySQL:', error);
      res.status(500).json({ error: 'Failed to fetch data from MySQL Database' });
    }
  } 
  
  else if (req.method === 'POST') {
    const { profile, experience, education, skills, languages, certificates, projects } = req.body;
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      if (profile) {
        await connection.query(`
          INSERT INTO profile (id, name, role, phone, email, location, linkedin, github, summary, photo, interests)
          VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE 
            name=VALUES(name), role=VALUES(role), phone=VALUES(phone), email=VALUES(email),
            location=VALUES(location), linkedin=VALUES(linkedin), github=VALUES(github),
            summary=VALUES(summary), photo=VALUES(photo), interests=VALUES(interests)
        `, [
          profile.name, profile.role, profile.phone, profile.email, profile.location,
          profile.linkedin, profile.github, profile.summary, profile.photo,
          JSON.stringify(profile.interests || [])
        ]);
      }

      const truncateAndInsert = async (table, data, insertQuery, mapRow) => {
        await connection.query(`TRUNCATE TABLE ${table}`);
        if (data && data.length > 0) {
          const values = data.map(mapRow);
          await connection.query(insertQuery, [values]);
        }
      };

      await truncateAndInsert('experience', experience, 
        'INSERT INTO experience (title, type, period, techStack, team, location, points) VALUES ?',
        row => [row.title, row.type, row.period, row.techStack, row.team, row.location, JSON.stringify(row.points || [])]
      );

      await truncateAndInsert('education', education,
        'INSERT INTO education (school, period, focus, details) VALUES ?',
        row => [row.school, row.period, row.focus, JSON.stringify(row.details || [])]
      );

      await truncateAndInsert('skills', skills,
        'INSERT INTO skills (category, items) VALUES ?',
        row => [row.category, JSON.stringify(row.items || [])]
      );

      await truncateAndInsert('languages', languages,
        'INSERT INTO languages (name, level, color) VALUES ?',
        row => [row.name, row.level, row.color]
      );

      await truncateAndInsert('certificates', certificates,
        'INSERT INTO certificates (title, issuer, date, description, image) VALUES ?',
        row => [row.title, row.issuer, row.date, row.description, row.image]
      );

      await truncateAndInsert('projects', projects,
        'INSERT INTO projects (title, shortDesc, image, github, techStack, details) VALUES ?',
        row => [row.title, row.shortDesc, row.image, row.github, JSON.stringify(row.techStack || []), JSON.stringify(row.details || [])]
      );

      await connection.commit();
      res.json({ message: 'Portfolio synchronized successfully with MySQL!' });
    } catch (error) {
      await connection.rollback();
      console.error('Error saving data to MySQL:', error);
      res.status(500).json({ error: 'Failed to save data to MySQL Database' });
    } finally {
      connection.release();
    }
  } 
  
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});

export default app;
