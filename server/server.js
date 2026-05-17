require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images

// Database Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper to parse JSON from DB safely
const safeParse = (str, fallback = []) => {
  if (!str) return fallback;
  try { return typeof str === 'string' ? JSON.parse(str) : str; } 
  catch (e) { return fallback; }
};

// ==========================================
// GET /api/portfolio
// Fetches all portfolio data from MySQL
// ==========================================
app.get('/api/portfolio', async (req, res) => {
  try {
    // Fetch all tables concurrently
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

    // Format Profile
    const profile = profileRows[0] || {};
    profile.interests = safeParse(profile.interests, []);

    // Format Experience
    const experience = experienceRows.map(row => ({
      ...row,
      points: safeParse(row.points, [])
    }));

    // Format Education
    const education = educationRows.map(row => ({
      ...row,
      details: safeParse(row.details, [])
    }));

    // Format Skills
    const skills = skillsRows.map(row => ({
      ...row,
      items: safeParse(row.items, [])
    }));

    // Format Languages & Certificates (No JSON parsing needed)
    const languages = languagesRows;
    const certificates = certificatesRows;

    // Format Projects
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
      languages,
      certificates,
      projects
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// ==========================================
// POST /api/portfolio
// Saves all portfolio data to MySQL (Full Sync)
// ==========================================
app.post('/api/portfolio', async (req, res) => {
  const { profile, experience, education, skills, languages, certificates, projects } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Update Profile (Upsert id=1)
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

    // Helper function to truncate and insert
    const truncateAndInsert = async (table, data, insertQuery, mapRow) => {
      await connection.query(`TRUNCATE TABLE ${table}`);
      if (data && data.length > 0) {
        const values = data.map(mapRow);
        // Using batch insert for better performance
        await connection.query(insertQuery, [values]);
      }
    };

    // 2. Sync Experience
    await truncateAndInsert('experience', experience, 
      'INSERT INTO experience (title, type, period, techStack, team, location, points) VALUES ?',
      row => [row.title, row.type, row.period, row.techStack, row.team, row.location, JSON.stringify(row.points || [])]
    );

    // 3. Sync Education
    await truncateAndInsert('education', education,
      'INSERT INTO education (school, period, focus, details) VALUES ?',
      row => [row.school, row.period, row.focus, JSON.stringify(row.details || [])]
    );

    // 4. Sync Skills
    await truncateAndInsert('skills', skills,
      'INSERT INTO skills (category, items) VALUES ?',
      row => [row.category, JSON.stringify(row.items || [])]
    );

    // 5. Sync Languages
    await truncateAndInsert('languages', languages,
      'INSERT INTO languages (name, level, color) VALUES ?',
      row => [row.name, row.level, row.color]
    );

    // 6. Sync Certificates
    await truncateAndInsert('certificates', certificates,
      'INSERT INTO certificates (title, issuer, date, description, image) VALUES ?',
      row => [row.title, row.issuer, row.date, row.description, row.image]
    );

    // 7. Sync Projects
    await truncateAndInsert('projects', projects,
      'INSERT INTO projects (title, shortDesc, image, github, techStack, details) VALUES ?',
      row => [row.title, row.shortDesc, row.image, row.github, JSON.stringify(row.techStack || []), JSON.stringify(row.details || [])]
    );

    await connection.commit();
    res.json({ message: 'Portfolio synchronized successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error saving portfolio data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  } finally {
    connection.release();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio API running on http://localhost:${PORT}`);
});
