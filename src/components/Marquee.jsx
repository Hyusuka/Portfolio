export default function Marquee() {
  const items = [
    'Full Stack Developer',
    '★',
    'Python Developer',
    '★',
    'React & Laravel',
    '★',
    'Cybersecurity Enthusiast',
    '★',
    'AI Explorer',
    '★',
    'Problem Solver',
    '★',
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
