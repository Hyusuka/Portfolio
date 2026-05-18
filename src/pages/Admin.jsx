import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiPlus, FiTrash2, FiEdit3, FiX, FiUpload, FiRefreshCw, FiArrowUp, FiArrowDown } from 'react-icons/fi';

/* ============================================================
   Helper: convert file to base64 dataURL
   ============================================================ */
function fileToBase64(file) {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.readAsDataURL(file);
  });
}

/* ============================================================
   Admin Page
   ============================================================ */
export default function Admin() {
  const nav = useNavigate();
  const data = usePortfolio();
  const [tab, setTab] = useState('profile');
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const tabs = [
    { id: 'profile', label: '👤 Profile', icon: '👤' },
    { id: 'experience', label: '💼 Experience', icon: '💼' },
    { id: 'education', label: '🎓 Education', icon: '🎓' },
    { id: 'skills', label: '⚡ Skills', icon: '⚡' },
    { id: 'projects', label: '🚀 Projects', icon: '🚀' },
    { id: 'certificates', label: '📜 Certificates', icon: '📜' },
  ];

  return (
    <div className="admin">
      {/* Toast */}
      {toast && <div className="admin-toast">{toast}</div>}

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">JW</div>
          <span className="admin-sidebar-title">Admin Panel</span>
        </div>
        <nav className="admin-sidebar-nav">
          {tabs.map((t) => (
            <button key={t.id} className={`admin-nav-item${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Button variant="yellow" size="sm" onClick={() => nav('/')} style={{ width: '100%', justifyContent: 'center' }}>
            <FiArrowLeft /> Back to Site
          </Button>
          <Button variant="red" size="sm" onClick={() => { if (confirm('Reset all data to defaults?')) { data.resetAll(); showToast('✅ Data reset!'); } }} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            <FiRefreshCw /> Reset All
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <div className="admin-header">
          <h1 className="admin-page-title">{tabs.find(t => t.id === tab)?.label}</h1>
        </div>
        <div className="admin-content">
          {tab === 'profile' && <ProfileEditor data={data} showToast={showToast} />}
          {tab === 'experience' && <ExperienceEditor data={data} showToast={showToast} />}
          {tab === 'education' && <EducationEditor data={data} showToast={showToast} />}
          {tab === 'skills' && <SkillsEditor data={data} showToast={showToast} />}
          {tab === 'projects' && <ProjectsEditor data={data} showToast={showToast} />}
          {tab === 'certificates' && <CertificatesEditor data={data} showToast={showToast} />}
        </div>
      </main>
    </div>
  );
}

/* ============================================================
   PROFILE EDITOR
   ============================================================ */
function ProfileEditor({ data, showToast }) {
  const { profile, setProfile } = data;
  const [form, setForm] = useState({ ...profile });

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setForm(p => ({ ...p, photo: b64 }));
  };

  const save = () => { setProfile({ ...form }); showToast('✅ Profile saved!'); };

  const updateInterest = (idx, key, val) => {
    const arr = [...form.interests];
    arr[idx] = { ...arr[idx], [key]: val };
    setForm(p => ({ ...p, interests: arr }));
  };

  const addInterest = () => setForm(p => ({ ...p, interests: [...p.interests, { label: '', icon: '⭐' }] }));
  const removeInterest = (i) => setForm(p => ({ ...p, interests: p.interests.filter((_, j) => j !== i) }));

  return (
    <div className="admin-form">
      <div className="admin-form-group">
        <label className="admin-label">Profile Photo</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src={form.photo} alt="Profile" className="admin-img-preview" />
          <label className="admin-upload-btn"><FiUpload /> Upload Photo<input type="file" accept="image/*" onChange={handlePhoto} hidden /></label>
        </div>
      </div>
      {[['name', 'Full Name'], ['role', 'Role / Title'], ['email', 'Email'], ['phone', 'Phone'], ['location', 'Location'], ['linkedin', 'LinkedIn URL'], ['github', 'GitHub URL']].map(([key, label]) => (
        <div className="admin-form-group" key={key}>
          <label className="admin-label">{label}</label>
          <input className="admin-input" value={form[key]} onChange={(e) => setForm(p => ({ ...p, [key]: e.target.value }))} />
        </div>
      ))}
      <div className="admin-form-group">
        <label className="admin-label">Summary</label>
        <textarea className="admin-textarea" rows={4} value={form.summary} onChange={(e) => setForm(p => ({ ...p, summary: e.target.value }))} />
      </div>
      <div className="admin-form-group">
        <label className="admin-label">Fields of Interest</label>
        {form.interests.map((item, i) => (
          <div key={i} className="admin-row" style={{ marginBottom: 8 }}>
            <input className="admin-input" style={{ width: 60 }} value={item.icon} onChange={(e) => updateInterest(i, 'icon', e.target.value)} placeholder="Icon" />
            <input className="admin-input" style={{ flex: 1 }} value={item.label} onChange={(e) => updateInterest(i, 'label', e.target.value)} placeholder="Label" />
            <button className="admin-icon-btn danger" onClick={() => removeInterest(i)}><FiTrash2 /></button>
          </div>
        ))}
        <Button variant="cyan" size="sm" onClick={addInterest}><FiPlus /> Add Interest</Button>
      </div>
      <Button variant="green" onClick={save}><FiSave /> Save Profile</Button>
    </div>
  );
}

/* ============================================================
   EXPERIENCE EDITOR
   ============================================================ */
function ExperienceEditor({ data, showToast }) {
  const { experience, setExperience } = data;
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState(null);

  const blank = { title: '', type: '', period: '', techStack: '', team: '', location: '', points: [''] };

  const openEdit = (i) => { setEditIdx(i); setForm({ ...experience[i], points: [...experience[i].points] }); };
  const openAdd = () => { setEditIdx(-1); setForm({ ...blank }); };
  const close = () => { setEditIdx(null); setForm(null); };

  const save = () => {
    const arr = [...experience];
    if (editIdx === -1) arr.push(form);
    else arr[editIdx] = form;
    setExperience(arr);
    close();
    showToast('✅ Experience saved!');
  };

  const remove = (i) => { if (confirm('Delete this entry?')) { setExperience(experience.filter((_, j) => j !== i)); showToast('🗑️ Deleted!'); } };

  const moveUp = (i) => {
    if (i === 0) return;
    const arr = [...experience];
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    setExperience(arr);
  };

  const moveDown = (i) => {
    if (i === experience.length - 1) return;
    const arr = [...experience];
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    setExperience(arr);
  };

  const updatePoint = (i, val) => { const pts = [...form.points]; pts[i] = val; setForm(p => ({ ...p, points: pts })); };
  const addPoint = () => setForm(p => ({ ...p, points: [...p.points, ''] }));
  const removePoint = (i) => setForm(p => ({ ...p, points: p.points.filter((_, j) => j !== i) }));

  if (form !== null) {
    return (
      <div className="admin-form">
        <h3 className="admin-subtitle">{editIdx === -1 ? 'Add Experience' : 'Edit Experience'}</h3>
        {[['title', 'Job Title'], ['type', 'Type (Freelance/Internship)'], ['period', 'Period'], ['techStack', 'Tech Stack (comma separated)'], ['team', 'Team'], ['location', 'Location']].map(([k, l]) => (
          <div className="admin-form-group" key={k}>
            <label className="admin-label">{l}</label>
            <input className="admin-input" value={form[k]} onChange={(e) => setForm(p => ({ ...p, [k]: e.target.value }))} />
          </div>
        ))}
        <div className="admin-form-group">
          <label className="admin-label">Points / Achievements</label>
          {form.points.map((pt, i) => (
            <div key={i} className="admin-row" style={{ marginBottom: 6 }}>
              <textarea className="admin-textarea" rows={2} style={{ flex: 1 }} value={pt} onChange={(e) => updatePoint(i, e.target.value)} />
              <button className="admin-icon-btn danger" onClick={() => removePoint(i)}><FiTrash2 /></button>
            </div>
          ))}
          <Button variant="cyan" size="sm" onClick={addPoint}><FiPlus /> Add Point</Button>
        </div>
        <div className="admin-row" style={{ gap: 12 }}>
          <Button variant="green" onClick={save}><FiSave /> Save</Button>
          <Button variant="outline" onClick={close}><FiX /> Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button variant="green" onClick={openAdd} style={{ marginBottom: 20 }}><FiPlus /> Add Experience</Button>
      {experience.map((exp, i) => (
        <div key={i} className="admin-list-item">
          <div style={{ flex: 1 }}>
            <strong>{exp.title}</strong>
            <div style={{ fontSize: 13, color: '#666' }}>{exp.period} • {exp.type}</div>
          </div>
          <button className="admin-icon-btn" onClick={() => moveUp(i)} disabled={i === 0} style={{ opacity: i === 0 ? 0.3 : 1 }}><FiArrowUp /></button>
          <button className="admin-icon-btn" onClick={() => moveDown(i)} disabled={i === experience.length - 1} style={{ opacity: i === experience.length - 1 ? 0.3 : 1 }}><FiArrowDown /></button>
          <button className="admin-icon-btn" onClick={() => openEdit(i)}><FiEdit3 /></button>
          <button className="admin-icon-btn danger" onClick={() => remove(i)}><FiTrash2 /></button>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   EDUCATION EDITOR
   ============================================================ */
function EducationEditor({ data, showToast }) {
  const { education, setEducation } = data;
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState(null);

  const blank = { school: '', period: '', focus: '', details: [''] };

  const openEdit = (i) => { setEditIdx(i); setForm({ ...education[i], details: [...education[i].details] }); };
  const openAdd = () => { setEditIdx(-1); setForm({ ...blank }); };
  const close = () => { setEditIdx(null); setForm(null); };

  const save = () => {
    const arr = [...education];
    if (editIdx === -1) arr.push(form);
    else arr[editIdx] = form;
    setEducation(arr);
    close();
    showToast('✅ Education saved!');
  };

  const remove = (i) => { if (confirm('Delete?')) { setEducation(education.filter((_, j) => j !== i)); showToast('🗑️ Deleted!'); } };

  const moveUp = (i) => {
    if (i === 0) return;
    const arr = [...education];
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    setEducation(arr);
  };

  const moveDown = (i) => {
    if (i === education.length - 1) return;
    const arr = [...education];
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    setEducation(arr);
  };

  const updateDetail = (i, val) => { const d = [...form.details]; d[i] = val; setForm(p => ({ ...p, details: d })); };
  const addDetail = () => setForm(p => ({ ...p, details: [...p.details, ''] }));
  const removeDetail = (i) => setForm(p => ({ ...p, details: p.details.filter((_, j) => j !== i) }));

  if (form !== null) {
    return (
      <div className="admin-form">
        <h3 className="admin-subtitle">{editIdx === -1 ? 'Add Education' : 'Edit Education'}</h3>
        {[['school', 'School / University'], ['period', 'Period'], ['focus', 'Focus Areas']].map(([k, l]) => (
          <div className="admin-form-group" key={k}>
            <label className="admin-label">{l}</label>
            <input className="admin-input" value={form[k]} onChange={(e) => setForm(p => ({ ...p, [k]: e.target.value }))} />
          </div>
        ))}
        <div className="admin-form-group">
          <label className="admin-label">Details / Courses</label>
          {form.details.map((d, i) => (
            <div key={i} className="admin-row" style={{ marginBottom: 6 }}>
              <textarea className="admin-textarea" rows={2} style={{ flex: 1 }} value={d} onChange={(e) => updateDetail(i, e.target.value)} />
              <button className="admin-icon-btn danger" onClick={() => removeDetail(i)}><FiTrash2 /></button>
            </div>
          ))}
          <Button variant="cyan" size="sm" onClick={addDetail}><FiPlus /> Add Detail</Button>
        </div>
        <div className="admin-row" style={{ gap: 12 }}>
          <Button variant="green" onClick={save}><FiSave /> Save</Button>
          <Button variant="outline" onClick={close}><FiX /> Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button variant="green" onClick={openAdd} style={{ marginBottom: 20 }}><FiPlus /> Add Education</Button>
      {education.map((edu, i) => (
        <div key={i} className="admin-list-item">
          <div style={{ flex: 1 }}>
            <strong>{edu.school}</strong>
            <div style={{ fontSize: 13, color: '#666' }}>{edu.period}</div>
          </div>
          <button className="admin-icon-btn" onClick={() => moveUp(i)} disabled={i === 0} style={{ opacity: i === 0 ? 0.3 : 1 }}><FiArrowUp /></button>
          <button className="admin-icon-btn" onClick={() => moveDown(i)} disabled={i === education.length - 1} style={{ opacity: i === education.length - 1 ? 0.3 : 1 }}><FiArrowDown /></button>
          <button className="admin-icon-btn" onClick={() => openEdit(i)}><FiEdit3 /></button>
          <button className="admin-icon-btn danger" onClick={() => remove(i)}><FiTrash2 /></button>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   SKILLS EDITOR
   ============================================================ */
function SkillsEditor({ data, showToast }) {
  const { skills, setSkills } = data;
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState(null);

  const openEdit = (i) => { setEditIdx(i); setForm({ ...skills[i], items: [...skills[i].items] }); };
  const openAdd = () => { setEditIdx(-1); setForm({ category: '', items: [''] }); };
  const close = () => { setEditIdx(null); setForm(null); };

  const save = () => {
    const arr = [...skills];
    if (editIdx === -1) arr.push(form);
    else arr[editIdx] = form;
    setSkills(arr);
    close();
    showToast('✅ Skills saved!');
  };

  const remove = (i) => { if (confirm('Delete?')) { setSkills(skills.filter((_, j) => j !== i)); showToast('🗑️ Deleted!'); } };

  const moveUp = (i) => {
    if (i === 0) return;
    const arr = [...skills];
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    setSkills(arr);
  };

  const moveDown = (i) => {
    if (i === skills.length - 1) return;
    const arr = [...skills];
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    setSkills(arr);
  };

  const updateItem = (i, val) => { const items = [...form.items]; items[i] = val; setForm(p => ({ ...p, items })); };
  const addItem = () => setForm(p => ({ ...p, items: [...p.items, ''] }));
  const removeItem = (i) => setForm(p => ({ ...p, items: p.items.filter((_, j) => j !== i) }));

  if (form !== null) {
    return (
      <div className="admin-form">
        <h3 className="admin-subtitle">{editIdx === -1 ? 'Add Skill Category' : 'Edit Skill Category'}</h3>
        <div className="admin-form-group">
          <label className="admin-label">Category Name</label>
          <input className="admin-input" value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))} />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Skills</label>
          {form.items.map((item, i) => (
            <div key={i} className="admin-row" style={{ marginBottom: 6 }}>
              <input className="admin-input" style={{ flex: 1 }} value={item} onChange={(e) => updateItem(i, e.target.value)} />
              <button className="admin-icon-btn danger" onClick={() => removeItem(i)}><FiTrash2 /></button>
            </div>
          ))}
          <Button variant="cyan" size="sm" onClick={addItem}><FiPlus /> Add Skill</Button>
        </div>
        <div className="admin-row" style={{ gap: 12 }}>
          <Button variant="green" onClick={save}><FiSave /> Save</Button>
          <Button variant="outline" onClick={close}><FiX /> Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button variant="green" onClick={openAdd} style={{ marginBottom: 20 }}><FiPlus /> Add Category</Button>
      {skills.map((cat, i) => (
        <div key={i} className="admin-list-item">
          <div style={{ flex: 1 }}>
            <strong>{cat.category}</strong>
            <div style={{ fontSize: 13, color: '#666' }}>{cat.items.join(', ')}</div>
          </div>
          <button className="admin-icon-btn" onClick={() => moveUp(i)} disabled={i === 0} style={{ opacity: i === 0 ? 0.3 : 1 }}><FiArrowUp /></button>
          <button className="admin-icon-btn" onClick={() => moveDown(i)} disabled={i === skills.length - 1} style={{ opacity: i === skills.length - 1 ? 0.3 : 1 }}><FiArrowDown /></button>
          <button className="admin-icon-btn" onClick={() => openEdit(i)}><FiEdit3 /></button>
          <button className="admin-icon-btn danger" onClick={() => remove(i)}><FiTrash2 /></button>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   PROJECTS EDITOR
   ============================================================ */
function ProjectsEditor({ data, showToast }) {
  const { projects, setProjects } = data;
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState(null);

  const blank = { title: '', shortDesc: '', techStack: [''], image: '', github: '', details: [''] };

  const openEdit = (i) => { setEditIdx(i); setForm({ ...projects[i], techStack: [...projects[i].techStack], details: [...projects[i].details] }); };
  const openAdd = () => { setEditIdx(-1); setForm({ ...blank, id: Date.now() }); };
  const close = () => { setEditIdx(null); setForm(null); };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setForm(p => ({ ...p, image: b64 }));
  };

  const save = () => {
    const arr = [...projects];
    if (editIdx === -1) arr.push(form);
    else arr[editIdx] = form;
    setProjects(arr);
    close();
    showToast('✅ Project saved!');
  };

  const remove = (i) => { if (confirm('Delete?')) { setProjects(projects.filter((_, j) => j !== i)); showToast('🗑️ Deleted!'); } };

  const moveUp = (i) => {
    if (i === 0) return;
    const arr = [...projects];
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    setProjects(arr);
  };

  const moveDown = (i) => {
    if (i === projects.length - 1) return;
    const arr = [...projects];
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    setProjects(arr);
  };

  const updateTech = (i, val) => { const t = [...form.techStack]; t[i] = val; setForm(p => ({ ...p, techStack: t })); };
  const addTech = () => setForm(p => ({ ...p, techStack: [...p.techStack, ''] }));
  const removeTech = (i) => setForm(p => ({ ...p, techStack: p.techStack.filter((_, j) => j !== i) }));

  const updateDetail = (i, val) => { const d = [...form.details]; d[i] = val; setForm(p => ({ ...p, details: d })); };
  const addDetail = () => setForm(p => ({ ...p, details: [...p.details, ''] }));
  const removeDetail = (i) => setForm(p => ({ ...p, details: p.details.filter((_, j) => j !== i) }));

  if (form !== null) {
    return (
      <div className="admin-form">
        <h3 className="admin-subtitle">{editIdx === -1 ? 'Add Project' : 'Edit Project'}</h3>
        <div className="admin-form-group">
          <label className="admin-label">Project Image</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {form.image && <img src={form.image} alt="Preview" className="admin-img-preview" style={{ width: 200, height: 120, objectFit: 'cover' }} />}
            <label className="admin-upload-btn"><FiUpload /> Upload Image<input type="file" accept="image/*" onChange={handleImage} hidden /></label>
          </div>
        </div>
        {[['title', 'Project Title'], ['shortDesc', 'Short Description'], ['github', 'GitHub URL']].map(([k, l]) => (
          <div className="admin-form-group" key={k}>
            <label className="admin-label">{l}</label>
            <input className="admin-input" value={form[k]} onChange={(e) => setForm(p => ({ ...p, [k]: e.target.value }))} />
          </div>
        ))}
        <div className="admin-form-group">
          <label className="admin-label">Tech Stack</label>
          {form.techStack.map((t, i) => (
            <div key={i} className="admin-row" style={{ marginBottom: 6 }}>
              <input className="admin-input" style={{ flex: 1 }} value={t} onChange={(e) => updateTech(i, e.target.value)} />
              <button className="admin-icon-btn danger" onClick={() => removeTech(i)}><FiTrash2 /></button>
            </div>
          ))}
          <Button variant="cyan" size="sm" onClick={addTech}><FiPlus /> Add Tech</Button>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Details / Features</label>
          {form.details.map((d, i) => (
            <div key={i} className="admin-row" style={{ marginBottom: 6 }}>
              <textarea className="admin-textarea" rows={2} style={{ flex: 1 }} value={d} onChange={(e) => updateDetail(i, e.target.value)} />
              <button className="admin-icon-btn danger" onClick={() => removeDetail(i)}><FiTrash2 /></button>
            </div>
          ))}
          <Button variant="cyan" size="sm" onClick={addDetail}><FiPlus /> Add Detail</Button>
        </div>
        <div className="admin-row" style={{ gap: 12 }}>
          <Button variant="green" onClick={save}><FiSave /> Save</Button>
          <Button variant="outline" onClick={close}><FiX /> Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button variant="green" onClick={openAdd} style={{ marginBottom: 20 }}><FiPlus /> Add Project</Button>
      <div className="admin-project-grid">
        {projects.map((p, i) => (
          <div key={p.id} className="admin-project-card">
            <img src={p.image} alt={p.title} className="admin-project-img" />
            <div className="admin-project-card-body">
              <strong>{p.title}</strong>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{p.techStack.join(', ')}</div>
            </div>
            <div className="admin-project-card-actions">
              <button className="admin-icon-btn" onClick={() => moveUp(i)} disabled={i === 0} style={{ opacity: i === 0 ? 0.3 : 1 }}><FiArrowUp /></button>
              <button className="admin-icon-btn" onClick={() => moveDown(i)} disabled={i === projects.length - 1} style={{ opacity: i === projects.length - 1 ? 0.3 : 1 }}><FiArrowDown /></button>
              <button className="admin-icon-btn" onClick={() => openEdit(i)}><FiEdit3 /></button>
              <button className="admin-icon-btn danger" onClick={() => remove(i)}><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   CERTIFICATES EDITOR
   ============================================================ */
function CertificatesEditor({ data, showToast }) {
  const { certificates, setCertificates } = data;
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState(null);

  const blank = { title: '', issuer: '', date: '', description: '', image: '' };

  const openEdit = (i) => { setEditIdx(i); setForm({ ...certificates[i] }); };
  const openAdd = () => { setEditIdx(-1); setForm({ ...blank }); };
  const close = () => { setEditIdx(null); setForm(null); };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setForm(p => ({ ...p, image: b64 }));
  };

  const save = () => {
    const arr = [...certificates];
    if (editIdx === -1) arr.push(form);
    else arr[editIdx] = form;
    setCertificates(arr);
    close();
    showToast('✅ Certificate saved!');
  };

  const remove = (i) => { if (confirm('Delete?')) { setCertificates(certificates.filter((_, j) => j !== i)); showToast('🗑️ Deleted!'); } };

  const moveUp = (i) => {
    if (i === 0) return;
    const arr = [...certificates];
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    setCertificates(arr);
  };

  const moveDown = (i) => {
    if (i === certificates.length - 1) return;
    const arr = [...certificates];
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    setCertificates(arr);
  };

  if (form !== null) {
    return (
      <div className="admin-form">
        <h3 className="admin-subtitle">{editIdx === -1 ? 'Add Certificate' : 'Edit Certificate'}</h3>
        <div className="admin-form-group">
          <label className="admin-label">Certificate Image</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {form.image && <img src={form.image} alt="Preview" className="admin-img-preview" style={{ width: 200, height: 140, objectFit: 'cover' }} />}
            <label className="admin-upload-btn"><FiUpload /> Upload Image<input type="file" accept="image/*" onChange={handleImage} hidden /></label>
          </div>
        </div>
        {[['title', 'Certificate Title'], ['issuer', 'Issuer / Organization'], ['date', 'Date'], ['description', 'Description']].map(([k, l]) => (
          <div className="admin-form-group" key={k}>
            <label className="admin-label">{l}</label>
            {k === 'description' ? (
              <textarea className="admin-textarea" rows={3} value={form[k]} onChange={(e) => setForm(p => ({ ...p, [k]: e.target.value }))} />
            ) : (
              <input className="admin-input" value={form[k]} onChange={(e) => setForm(p => ({ ...p, [k]: e.target.value }))} />
            )}
          </div>
        ))}
        <div className="admin-row" style={{ gap: 12 }}>
          <Button variant="green" onClick={save}><FiSave /> Save</Button>
          <Button variant="outline" onClick={close}><FiX /> Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button variant="green" onClick={openAdd} style={{ marginBottom: 20 }}><FiPlus /> Add Certificate</Button>
      {certificates.length === 0 && <div className="admin-empty">No certificates yet. Add your first certificate!</div>}
      {certificates.map((cert, i) => (
        <div key={i} className="admin-list-item">
          {cert.image && <img src={cert.image} alt={cert.title} style={{ width: 60, height: 42, objectFit: 'cover', border: '2px solid #000', marginRight: 12 }} />}
          <div style={{ flex: 1 }}>
            <strong>{cert.title}</strong>
            <div style={{ fontSize: 13, color: '#666' }}>{cert.issuer} • {cert.date}</div>
          </div>
          <button className="admin-icon-btn" onClick={() => moveUp(i)} disabled={i === 0} style={{ opacity: i === 0 ? 0.3 : 1 }}><FiArrowUp /></button>
          <button className="admin-icon-btn" onClick={() => moveDown(i)} disabled={i === certificates.length - 1} style={{ opacity: i === certificates.length - 1 ? 0.3 : 1 }}><FiArrowDown /></button>
          <button className="admin-icon-btn" onClick={() => openEdit(i)}><FiEdit3 /></button>
          <button className="admin-icon-btn danger" onClick={() => remove(i)}><FiTrash2 /></button>
        </div>
      ))}
    </div>
  );
}
