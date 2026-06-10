export const defaultProfile = {
  name: "Juan Wens Sanctung Rahawarin",
  role: "Full Stack Web Developer",
  phone: "+6281290320714",
  email: "juanrahawarin12@gmail.com",
  location: "Kab. Bogor, Indonesia",
  linkedin: "https://www.linkedin.com/in/juan-wens-b43382374",
  github: "https://github.com/Hyusuka",
  summary:
    "Full Stack Developer and Python Developer with over three years of experience gained through formal education at Gunadarma University and self-directed learning via online resources, including technical videos and developer forums. Possesses a strong foundation in web development and a continuous drive to expand technical expertise.",
  interests: [
    { label: "Programer", icon: "🌐" },
    { label: "Python Development", icon: "🐍" },
    { label: "Artificial Intelligence", icon: "🤖" },
  ],
  photo: "/images/profile.png",
};

export const defaultExperience = [
  {
    title: "Ikaru Library — Payment Gateway",
    type: "Freelance",
    period: "Freelance",
    techStack: "PHP (Laravel 12), Tailwind CSS, MySQL, Midtrans API",
    team: "Team of 3",
    location: "",
    points: [
      "Collaborated in a team of three to design and develop a comprehensive web-based light novel reading and e-commerce platform.",
      "Led the integration of Midtrans Payment Gateway, enabling secure and automated transactions for novel purchases and premium content.",
      "Developed core backend logic and database schemas to manage complex hierarchical data, including novels, chapters, volumes, and user-specific libraries.",
      "Built a dynamic Admin Dashboard to streamline content management, user administration, and real-time transaction tracking.",
      "Resolved critical system bugs related to data persistence and form handling, ensuring a seamless user experience and data integrity.",
    ],
  },
  {
    title: "Network Technician",
    type: "Internship",
    period: "20 January - March 13, 2020",
    techStack: "",
    team: "",
    location:
      "Jl. Raya Ciangsana No.1, Ciangsana, Kec. Gn. Putri, Kabupaten Bogor, Jawa Barat 16869",
    points: [
      "Installed and configured network infrastructure, including crimping straight-through and crossover Ethernet cables.",
      "Performed network maintenance and troubleshooting on server systems.",
      "Assembled, upgraded, and performed routine cleaning of desktop PCs.",
      "Configured and managed network systems across the entire SSR Polytechnic environment.",
    ],
  },
];

export const defaultEducation = [
  {
    school: "Universitas Gunadarma",
    period: "2023 – Present",
    focus:
      "Cybersecurity, Python Development, Website Development, Artificial Intelligence",
    details: [
      "Basic Programming and Algorithms: Study basic programming concepts, Algorithms and Data Structures, as well as various programming languages (Java, C++, Python, etc.).",
      "Software Engineering: Focus on the software development life cycle (SDLC), analysis, design, and application implementation.",
      "Databases: Database Systems, Database Management, and Data Mining courses.",
      "Artificial Intelligence: Study machine learning, deep learning, and image processing.",
      "Networks and Computer Systems: Operating Systems, Information Systems Architecture, and Computer Network Administration.",
    ],
  },
  {
    school: "SMK Yadika 11",
    period: "2018 – 2021",
    focus: "",
    details: [
      "Computer and Hardware Basics: PC/laptop assembly, hardware repair, and operating system installation.",
      "Computer Network: Design, configuration, and maintenance of wired (LAN) and wireless networks.",
      "Network & Server Administration: Server administration, router configuration, switch, DHCP, DNS, and web server (Linux & Windows).",
      "Network Security: Identifying security needs, installing security systems, and network monitoring.",
      "Telecommunications Technology: Fiber optics, VoIP, and mobile communications.",
      "Creative Program: Introduction to the Internet of Things (IoT) and basic programming.",
    ],
  },
];

export const defaultSkills = [
  {
    category: "Frontend Development",
    items: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "Backend Development",
    items: ["PHP", "Node.js","Restful API"],
  },
  {
    category: "Frameworks",
    items: ["Laravel", "Flask","React.js"],
  },
  {
    category: "Database",
    items: ["MySQL", "PostgreSQL", "NoSQL"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "Postman", "Docker"],
  },
  {
    category: "Soft Skills",
    items: [
      "Team Collaboration",
      "Problem Solving",
      "Adaptability",
      "Communication",
      "Time Management",
      "Critical Thinking",
      "Self-Motivation",
    ],
  },
];

export const defaultLanguages = [
  { name: "Indonesia", level: "Native", color: "var(--green)" },
  { name: "English", level: "Beginner", color: "var(--blue)" },
  { name: "Japanese", level: "Newbie", color: "var(--pink)" },
];

export const defaultCertificates = [
  {
    id: 1,
    title: "Introduction to Wireless LAN Installation",
    issuer: "Universitas Gunadarma",
    date: "May 17, 2024",
    description: "Certificate of Training for completing the Introduction to Wireless LAN Installation program.",
    image: "/images/sertifikat/serti1.jpg"
  },
  {
    id: 2,
    title: "Go-Lang for Intermediate",
    issuer: "Universitas Gunadarma",
    date: "February 20, 2025",
    description: "Certificate of Training for completing the Go-Lang for Intermediate program.",
    image: "/images/sertifikat/serti2.jpg"
  },
  {
    id: 3,
    title: "Oracle for Beginner",
    issuer: "Universitas Gunadarma",
    date: "August 19, 2024",
    description: "Certificate of Training for completing the Oracle for Beginner program.",
    image: "/images/sertifikat/serti4.jpg"
  },
  {
    id: 4,
    title: "Application Development Design",
    issuer: "Universitas Gunadarma",
    date: "September 27, 2025",
    description: "Certificate of Training for completing the Application Development Design program.",
    image: "/images/sertifikat/serti5.jpg"
  },
  {
    id: 5,
    title: "Fundamental DBMS",
    issuer: "Universitas Gunadarma",
    date: "August 21, 2023",
    description: "Certificate of Training for completing the Fundamental DBMS program.",
    image: "/images/sertifikat/serti7.jpg"
  },
  {
    id: 6,
    title: "Fundamental Web Programming",
    issuer: "Universitas Gunadarma",
    date: "February 20, 2023",
    description: "Certificate of Training for completing the Fundamental Web Programming program.",
    image: "/images/sertifikat/serti9.jpg"
  },
  {
    id: 7,
    title: "Industrial Work Practice (Internship)",
    issuer: "Politeknik SSR",
    date: "March 13, 2020",
    description: "Certificate of Participation for completing the Industrial Work Practice program in Computer and Network Engineering.",
    image: "/images/sertifikat/serti10.jpeg"
  },
  {
    id: 8,
    title: "ESET Campus Security Day",
    issuer: "Universitas Gunadarma & PT Prosperita Mitra Indonesia",
    date: "July 4, 2025",
    description: "Certificate of Attendance for participating in the ESET Campus Security Day to improve personal data security literacy.",
    image: "/images/sertifikat/serti11.png"
  }
];

export const defaultProjects = [
  {
    id: 1,
    title: "Secure Steganography Web App",
    shortDesc:
      "A data security web application combining AES-256 encryption and LSB Steganography to hide secret messages in images.",
    techStack: ["Python", "Flask", "OpenCV", "MySQL"],
    image: "/images/Penyisipan-data.png",
    github: "https://github.com/Hyusuka/Penyisipan_Data",
    details: [
      "Developed a data security web application that combines AES-256 algorithm encryption and LSB Steganography techniques to hide secret messages in image files (PNG).",
      "Built a backend system using Flask to automatically process image uploads, data extraction, and sending encrypted files via email.",
      "Designed an admin panel that integrates with MySQL to record usage history and monitor encryption performance metrics in real-time.",
    ],
  },
  {
    id: 2,
    title: "YouTube Comment Scraper",
    shortDesc:
      "A modern desktop application to automate the extraction of YouTube comments and metadata for data analysis.",
    techStack: ["Python", "CustomTkinter", "YouTube API", "OpenPyXL"],
    image: "/images/yt-Comment-Scraper.png",
    github: "https://github.com/Hyusuka/Youtube_Scraping",
    details: [
      "Developed a modern desktop application to automate the extraction of YouTube comments and metadata for data analysis and research purposes.",
      "Integrated YouTube Data API v3 to handle bulk data retrieval, including comments, replies, and video statistics.",
      "Implemented a professional data export system to Excel (.xlsx) with multi-sheet categorization (Metadata, Comments, Replies, and Statistics).",
      "Designed a responsive, user-friendly interface featuring Dark Mode, real-time progress tracking, and secure API key management.",
      "Packaged the application into a standalone executable (.exe) for easy distribution and deployment.",
    ],
  },
  {
    id: 3,
    title: "SMPP — Sistem Monitoring Petugas PPSU",
    shortDesc:
      "A hybrid platform (Web & Mobile) designed to monitor, validate, and manage the operations of public facility maintenance workers in real-time.",
    techStack: ["Tailwind CSSv4", "Alpine.js", "Vite", "Laravel 11", "PHP 8.4","MySQL", "Gemini AI API", "Laravel Reverb", "Leaflet.js", "Redis"],
    image: "/images/PPSU.png",
    github: "https://github.com/Hyusuka/SMPP",
    details: [
      "Developed a multi-role field worker monitoring system. Key technical achievements include implementing Live GPS Tracking using WebSockets (Laravel Reverb) and Leaflet.js, an evidence-based reporting system, dynamic KPI score calculation, and complex data filtering using optimized Eloquent queries.",
    ],
  },
  {
    id: 4,
    title: "SMPP Mobile — Manajemen Petugas PPSU",
    shortDesc:
      "Android-based operational management app for attendance automation, work reporting and real-time monitoring.",
    techStack: ["Kotlin", "Jetpack Compose", "Laravel", "Firebase", "OSM"],
    image: "/images/project-smpp-web.png",
    github: "https://github.com/Hyusuka/PPSU-Mobile",
    details: [
      "Implementation of Geofencing & GPS Tracking for precise clock-in/out of officer attendance.",
      "Development of a work reporting system with photo validation and location metadata (EXIF) for field data accuracy.",
      "Building a Live Tracking feature using OpenStreetMap for real-time monitoring of team locations by supervisors.",
      "Firebase Cloud Messaging (FCM) integration for assignment notifications and work schedule reminders.",
      "Automation of KPI (Key Performance Indicator) calculations based on attendance and task completion levels.",
    ],
  },
  {
    id: 5,
    title: "Virtual Mouse — AI Hand Gesture Control",
    shortDesc:
      "An HCI system that allows full control of a computer without a physical device using camera input.",
    techStack: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "NumPy"],
    image: "/images/project-virtual-mouse.png",
    github: "https://github.com/Hyusuka/Virtual_Mouse",
    details: [
      "Building a Human-Computer Interaction (HCI) system that allows full control of a computer without a physical device, using camera/webcam input.",
      "Successfully optimized hand detection using MediaPipe with low-latency performance (high FPS).",
      "Implement the Visual Active Zone and Cooldown System features to prevent accidental clicks and improve user experience.",
      "Provides a portable solution by packaging applications into standalone .exe format using PyInstaller.",
    ],
  },
  {
    id: 6,
    title: "Ikaru Library — Light Novel Platform",
    shortDesc:
      "A comprehensive web-based light novel reading and e-commerce platform with payment gateway integration.",
    techStack: ["Laravel 12", "Tailwind CSS", "MySQL", "Midtrans API"],
    image: "/images/project-ikaru-library.png",
    github: "//",
    details: [
      "Collaborated in a team of three to design and develop a comprehensive web-based light novel reading and e-commerce platform.",
      "Led the integration of Midtrans Payment Gateway, enabling secure and automated transactions for novel purchases and premium content.",
      "Developed core backend logic and database schemas to manage complex hierarchical data, including novels, chapters, volumes, and user-specific libraries.",
      "Built a dynamic Admin Dashboard to streamline content management, user administration, and real-time transaction tracking.",
    ],
  },
  {
    id: 7,
    title: "Pothole Detection Early Warning System",
    shortDesc:
      "Real-time pothole detection system based on YOLOv9, Flask, and Supabase. This application is designed to be accessed using a smartphone (as a Progressive Web App / PWA) installed on a motorbike dashboard to detect potholes, record GPS coordinates, speed, and upload the evidence to a Cloud database.",
    techStack: ["Python", "Flask", "HTML", "CSS", "Supabase", "JSON"],
    image: "/images/pothole.png",
    github: "https://github.com/Hyusuka/deteksi-lubang",
    details: [
      "Developed a full-stack web application for pothole detection using Python and Flask framework.",
      "Engineered a robust RESTful API using the Flask framework to handle CRUD operations with a Supabase database.",
      "Implemented SPA (Single Page Application) architecture for seamless user experience and optimized static file serving.",
      "Key Features: Pothole detection, GPS coordinates, speed, and upload the evidence to a Cloud database.",
    ],
  }
];