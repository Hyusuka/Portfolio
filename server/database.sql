CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- 1. Profile Table
CREATE TABLE IF NOT EXISTS profile (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    role VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    location VARCHAR(255),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    summary TEXT,
    photo LONGTEXT,
    interests JSON
);

-- 2. Experience Table
CREATE TABLE IF NOT EXISTS experience (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    type VARCHAR(100),
    period VARCHAR(100),
    techStack VARCHAR(255),
    team VARCHAR(100),
    location VARCHAR(255),
    points JSON
);

-- 3. Education Table
CREATE TABLE IF NOT EXISTS education (
    id INT PRIMARY KEY AUTO_INCREMENT,
    school VARCHAR(255),
    period VARCHAR(100),
    focus VARCHAR(255),
    details JSON
);

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(255),
    items JSON
);

-- 5. Languages Table
CREATE TABLE IF NOT EXISTS languages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    level VARCHAR(100),
    color VARCHAR(50)
);

-- 6. Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    issuer VARCHAR(255),
    date VARCHAR(100),
    description TEXT,
    image LONGTEXT
);

-- 7. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    shortDesc TEXT,
    image LONGTEXT,
    github VARCHAR(255),
    techStack JSON,
    details JSON
);

-- Insert Default Profile Row (id=1)
INSERT INTO profile (id, name, role, phone, email, location, linkedin, github, summary, photo, interests)
VALUES (
    1, 
    'Juan Wens Sanctung Rahawarin', 
    'Full Stack Web Developer', 
    '+6281290320714', 
    'juanrahawarin12@gmail.com', 
    'Kab. Bogor, Indonesia', 
    'https://www.linkedin.com/in/juan-wens-b43382374', 
    'https://github.com/Hyusuka', 
    'Full Stack Developer and Python Developer with over three years of experience...', 
    '', 
    '[{"label":"Cybersecurity","icon":"🛡️"},{"label":"Python Development","icon":"🐍"},{"label":"Website Development","icon":"🌐"},{"label":"Artificial Intelligence","icon":"🤖"}]'
) ON DUPLICATE KEY UPDATE id=1;
