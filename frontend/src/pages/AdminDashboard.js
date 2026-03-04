import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { LayoutDashboard, FileText, Image, MessageSquare, Settings, LogOut, Plus, Trash2, Edit2, Check, X, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  adminFetchBlogs, createBlog, updateBlog, deleteBlog,
  fetchPortfolio, createPortfolio, updatePortfolio, deletePortfolio,
  fetchMessages, markRead, deleteMessage,
  fetchServices, createService, updateService, deleteService,
  fetchCaseStudies, createCaseStudy, updateCaseStudy, deleteCaseStudy
} from '../utils/api';

const sideLinks = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={16} />, exact: true },
  { to: '/admin/blogs', label: 'Blogs', icon: <FileText size={16} /> },
  { to: '/admin/portfolio', label: 'Portfolio', icon: <Image size={16} /> },
  { to: '/admin/casestudies', label: 'Case Studies', icon: <Briefcase size={16} /> },
  { to: '/admin/services', label: 'Services', icon: <Settings size={16} /> },
  { to: '/admin/messages', label: 'Messages', icon: <MessageSquare size={16} /> },
];

const sStyle = {
  sidebar: { width: 220, background: '#0a0a0a', borderRight: '1px solid rgba(255,255,255,0.05)', height: '100vh', position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', padding: '1.5rem 0', flexShrink: 0 },
  logo: { fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 600, padding: '0 1.5rem', marginBottom: '0.5rem', color: '#f0ece4' },
  badge: { fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a96e', padding: '0 1.5rem', marginBottom: '2rem' },
  navLink: { display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.65rem 1.5rem', fontSize: '0.82rem', color: 'rgba(240,236,228,0.5)', transition: 'all 0.2s', cursor: 'pointer', textDecoration: 'none', margin: '0.1rem 0.5rem', borderRadius: 3 },
  navLinkActive: { color: '#f0ece4', background: 'rgba(201,169,110,0.1)', borderLeft: '2px solid #c9a96e' },
};

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/admin/login'); toast.success('Logged out'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080808' }}>
      <div style={sStyle.sidebar}>
        <div style={sStyle.logo}>AN<span style={{ color: '#c9a96e' }}>Z</span>IL</div>
        <div style={sStyle.badge}>Admin Panel</div>
        <nav style={{ flex: 1 }}>
          {sideLinks.map(l => {
            const isActive = l.exact ? location.pathname === l.to : location.pathname.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to} style={{ ...sStyle.navLink, ...(isActive ? sStyle.navLinkActive : {}) }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >{l.icon} {l.label}</Link>
            );
          })}
        </nav>
        <button onClick={handleLogout} style={{ ...sStyle.navLink, border: 'none', background: 'none', fontFamily: 'DM Sans, sans-serif', color: 'rgba(240,236,228,0.35)', margin: '0.5rem' }}>
          <LogOut size={16} /> Log Out
        </button>
      </div>
      <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto', maxHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/blogs" element={<AdminBlogs />} />
          <Route path="/portfolio" element={<AdminPortfolio />} />
          <Route path="/casestudies" element={<AdminCaseStudies />} />
          <Route path="/services" element={<AdminServices />} />
          <Route path="/messages" element={<AdminMessages />} />
        </Routes>
      </main>
    </div>
  );
}

function AdminHome() {
  const [stats, setStats] = useState({ blogs: 0, portfolio: 0, messages: 0, services: 0 });
  useEffect(() => {
    Promise.all([
      adminFetchBlogs(), fetchPortfolio(), fetchMessages(), fetchServices()
    ]).then(([b, p, m, s]) => setStats({ blogs: b.data.length, portfolio: p.data.length, messages: m.data.length, services: s.data.length })).catch(() => {});
  }, []);
  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#f0ece4', marginBottom: '0.5rem' }}>Dashboard</h1>
      <p style={{ color: 'rgba(240,236,228,0.4)', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Welcome back. Here's an overview.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
        {[['Blogs', stats.blogs, '#c9a96e'], ['Portfolio Items', stats.portfolio, '#7eb8c9'], ['Messages', stats.messages, '#e55454'], ['Services', stats.services, '#4caf7d']].map(([label, val, color]) => (
          <div key={label} style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, padding: '1.8rem' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 600, color, lineHeight: 1 }}>{val}</div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'rgba(240,236,228,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.4rem' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Generic CRUD Table ---
function CrudTable({ title, items, fields, onAdd, onEdit, onDelete, loading, editItem, setEditItem, addItem, setAddItem, saving }) {
  const btnStyle = (color = '#c9a96e') => ({ background: 'transparent', border: `1px solid ${color}30`, color, padding: '0.3rem 0.7rem', fontSize: '0.7rem', cursor: 'pointer', borderRadius: 2, fontFamily: 'DM Sans, sans-serif', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', transition: 'all 0.2s' });
  const inputS = { background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#f0ece4', padding: '0.5rem 0.7rem', borderRadius: 2, fontSize: '0.82rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', width: '100%', boxSizing: 'border-box' };
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#f0ece4' }}>{title}</h1>
        <button onClick={() => setAddItem({})} style={{ ...btnStyle(), background: 'rgba(201,169,110,0.1)' }}><Plus size={13} /> Add New</button>
      </div>

      {(addItem || editItem) && (
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 4, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#f0ece4', marginBottom: '1rem' }}>{editItem ? 'Edit' : 'Add'} {title.slice(0, -1)}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.8rem', marginBottom: '1rem' }}>
            {fields.map(f => (
              <div key={f.key}>
                <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: 'rgba(240,236,228,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.3rem' }}>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea rows={3} style={{ ...inputS, resize: 'vertical' }}
                    value={(editItem || addItem)[f.key] || ''}
                    onChange={e => editItem ? setEditItem({ ...editItem, [f.key]: e.target.value }) : setAddItem({ ...addItem, [f.key]: e.target.value })}
                  />
                ) : f.type === 'select' ? (
                  <select style={inputS} value={(editItem || addItem)[f.key] || ''} onChange={e => editItem ? setEditItem({ ...editItem, [f.key]: e.target.value }) : setAddItem({ ...addItem, [f.key]: e.target.value })}>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input style={inputS} value={(editItem || addItem)[f.key] || ''}
                    onChange={e => editItem ? setEditItem({ ...editItem, [f.key]: e.target.value }) : setAddItem({ ...addItem, [f.key]: e.target.value })}
                    placeholder={f.placeholder || f.label}
                  />
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button onClick={editItem ? onEdit : onAdd} disabled={saving} style={{ ...btnStyle('#4caf7d'), background: 'rgba(76,175,125,0.1)' }}><Check size={13} />{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={() => { setEditItem(null); setAddItem(null); }} style={btnStyle('#e55454')}><X size={13} />Cancel</button>
          </div>
        </div>
      )}

      <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
        {loading ? <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(240,236,228,0.3)', fontFamily: 'DM Mono, monospace', fontSize: '0.75rem' }}>Loading...</div> :
          items.length === 0 ? <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(240,236,228,0.3)', fontFamily: 'DM Mono, monospace', fontSize: '0.75rem' }}>No items found</div> :
          items.map((item, i) => (
            <div key={item._id} style={{ padding: '1rem 1.5rem', borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.88rem', color: '#f0ece4', fontWeight: 400 }}>{item.title || item.name}</div>
                {item.category && <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', color: '#c9a96e', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>{item.category}</div>}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button onClick={() => setEditItem({ ...item })} style={btnStyle('#c9a96e')}><Edit2 size={12} /></button>
                <button onClick={() => onDelete(item._id)} style={btnStyle('#e55454')}><Trash2 size={12} /></button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

function AdminBlogs() {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null); const [addItem, setAddItem] = useState(null); const [saving, setSaving] = useState(false);
  const load = () => { setLoading(true); adminFetchBlogs().then(r => setItems(r.data)).finally(() => setLoading(false)); };
  useEffect(load, []);
  const fields = [
    { key: 'title', label: 'Title' }, { key: 'category', label: 'Category', type: 'select', options: ['Design', 'Development', 'Branding', 'Strategy', 'General'] },
    { key: 'excerpt', label: 'Excerpt', type: 'textarea' }, { key: 'content', label: 'Content', type: 'textarea' },
    { key: 'image', label: 'Image URL' }, { key: 'author', label: 'Author' }, { key: 'tags', label: 'Tags (comma separated)' }
  ];
  const formatData = d => ({ ...d, tags: typeof d.tags === 'string' ? d.tags.split(',').map(t => t.trim()) : d.tags });
  const onAdd = async () => { setSaving(true); try { await createBlog(formatData(addItem)); toast.success('Blog created'); load(); setAddItem(null); } catch (e) { toast.error(e.response?.data?.message || 'Error'); } setSaving(false); };
  const onEdit = async () => { setSaving(true); try { await updateBlog(editItem._id, formatData(editItem)); toast.success('Blog updated'); load(); setEditItem(null); } catch (e) { toast.error(e.response?.data?.message || 'Error'); } setSaving(false); };
  const onDelete = async id => { if (!window.confirm('Delete?')) return; try { await deleteBlog(id); toast.success('Deleted'); load(); } catch { toast.error('Error'); } };
  return <CrudTable title="Blogs" items={items} fields={fields} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} loading={loading} editItem={editItem} setEditItem={setEditItem} addItem={addItem} setAddItem={setAddItem} saving={saving} />;
}

function AdminPortfolio() {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null); const [addItem, setAddItem] = useState(null); const [saving, setSaving] = useState(false);
  const load = () => { setLoading(true); fetchPortfolio().then(r => setItems(r.data)).finally(() => setLoading(false)); };
  useEffect(load, []);
  const fields = [
    { key: 'title', label: 'Title' }, { key: 'category', label: 'Category', type: 'select', options: ['UI', 'Branding', 'Development', 'Motion'] },
    { key: 'description', label: 'Description', type: 'textarea' }, { key: 'image', label: 'Image URL' },
    { key: 'tags', label: 'Tags (comma separated)' }, { key: 'link', label: 'Live URL' }
  ];
  const formatData = d => ({ ...d, tags: typeof d.tags === 'string' ? d.tags.split(',').map(t => t.trim()) : d.tags });
  const onAdd = async () => { setSaving(true); try { await createPortfolio(formatData(addItem)); toast.success('Created'); load(); setAddItem(null); } catch (e) { toast.error(e.response?.data?.message || 'Error'); } setSaving(false); };
  const onEdit = async () => { setSaving(true); try { await updatePortfolio(editItem._id, formatData(editItem)); toast.success('Updated'); load(); setEditItem(null); } catch (e) { toast.error(e.response?.data?.message || 'Error'); } setSaving(false); };
  const onDelete = async id => { if (!window.confirm('Delete?')) return; try { await deletePortfolio(id); toast.success('Deleted'); load(); } catch { toast.error('Error'); } };
  return <CrudTable title="Portfolio" items={items} fields={fields} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} loading={loading} editItem={editItem} setEditItem={setEditItem} addItem={addItem} setAddItem={setAddItem} saving={saving} />;
}

function AdminCaseStudies() {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null); const [addItem, setAddItem] = useState(null); const [saving, setSaving] = useState(false);
  const load = () => { setLoading(true); fetchCaseStudies().then(r => setItems(r.data)).finally(() => setLoading(false)); };
  useEffect(load, []);
  const fields = [
    { key: 'title', label: 'Title' }, { key: 'client', label: 'Client' }, { key: 'industry', label: 'Industry' },
    { key: 'challenge', label: 'Challenge', type: 'textarea' }, { key: 'solution', label: 'Solution', type: 'textarea' },
    { key: 'results', label: 'Results (comma separated)' }, { key: 'image', label: 'Image URL' }, { key: 'tags', label: 'Tags' }
  ];
  const formatData = d => ({ ...d, results: typeof d.results === 'string' ? d.results.split(',').map(t => t.trim()) : d.results, tags: typeof d.tags === 'string' ? d.tags.split(',').map(t => t.trim()) : d.tags });
  const onAdd = async () => { setSaving(true); try { await createCaseStudy(formatData(addItem)); toast.success('Created'); load(); setAddItem(null); } catch (e) { toast.error(e.response?.data?.message || 'Error'); } setSaving(false); };
  const onEdit = async () => { setSaving(true); try { await updateCaseStudy(editItem._id, formatData(editItem)); toast.success('Updated'); load(); setEditItem(null); } catch (e) { toast.error(e.response?.data?.message || 'Error'); } setSaving(false); };
  const onDelete = async id => { if (!window.confirm('Delete?')) return; try { await deleteCaseStudy(id); toast.success('Deleted'); load(); } catch { toast.error('Error'); } };
  return <CrudTable title="Case Studies" items={items} fields={fields} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} loading={loading} editItem={editItem} setEditItem={setEditItem} addItem={addItem} setAddItem={setAddItem} saving={saving} />;
}

function AdminServices() {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null); const [addItem, setAddItem] = useState(null); const [saving, setSaving] = useState(false);
  const load = () => { setLoading(true); fetchServices().then(r => setItems(r.data)).finally(() => setLoading(false)); };
  useEffect(load, []);
  const fields = [
    { key: 'title', label: 'Title' }, { key: 'icon', label: 'Icon (emoji)' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'features', label: 'Features (comma separated)' }, { key: 'order', label: 'Order (number)' }
  ];
  const formatData = d => ({ ...d, features: typeof d.features === 'string' ? d.features.split(',').map(t => t.trim()) : d.features, order: Number(d.order) || 0 });
  const onAdd = async () => { setSaving(true); try { await createService(formatData(addItem)); toast.success('Created'); load(); setAddItem(null); } catch (e) { toast.error(e.response?.data?.message || 'Error'); } setSaving(false); };
  const onEdit = async () => { setSaving(true); try { await updateService(editItem._id, formatData(editItem)); toast.success('Updated'); load(); setEditItem(null); } catch (e) { toast.error(e.response?.data?.message || 'Error'); } setSaving(false); };
  const onDelete = async id => { if (!window.confirm('Delete?')) return; try { await deleteService(id); toast.success('Deleted'); load(); } catch { toast.error('Error'); } };
  return <CrudTable title="Services" items={items} fields={fields} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} loading={loading} editItem={editItem} setEditItem={setEditItem} addItem={addItem} setAddItem={setAddItem} saving={saving} />;
}

function AdminMessages() {
  const [messages, setMessages] = useState([]); const [loading, setLoading] = useState(true);
  const load = () => { setLoading(true); fetchMessages().then(r => setMessages(r.data)).finally(() => setLoading(false)); };
  useEffect(load, []);
  const onRead = async id => { try { await markRead(id); load(); } catch { toast.error('Error'); } };
  const onDelete = async id => { if (!window.confirm('Delete?')) return; try { await deleteMessage(id); toast.success('Deleted'); load(); } catch { toast.error('Error'); } };
  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#f0ece4', marginBottom: '1.5rem' }}>Messages ({messages.length})</h1>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {loading ? <div style={{ textAlign: 'center', color: 'rgba(240,236,228,0.3)', fontFamily: 'DM Mono, monospace', fontSize: '0.75rem' }}>Loading...</div> :
          messages.length === 0 ? <div style={{ textAlign: 'center', color: 'rgba(240,236,228,0.3)', fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', padding: '2rem' }}>No messages yet</div> :
          messages.map(m => (
            <div key={m._id} style={{ background: '#0f0f0f', border: `1px solid ${m.read ? 'rgba(255,255,255,0.05)' : 'rgba(201,169,110,0.2)'}`, borderRadius: 4, padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.8rem' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#f0ece4', fontWeight: 500 }}>{m.name}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#c9a96e', marginTop: '0.2rem' }}>{m.email}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {!m.read && <span style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', color: '#c9a96e', padding: '0.2rem 0.5rem', fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', borderRadius: 2, textTransform: 'uppercase' }}>New</span>}
                  {!m.read && <button onClick={() => onRead(m._id)} style={{ background: 'transparent', border: '1px solid rgba(76,175,125,0.3)', color: '#4caf7d', padding: '0.25rem 0.6rem', fontSize: '0.65rem', cursor: 'pointer', borderRadius: 2, fontFamily: 'DM Sans, sans-serif' }}><Check size={11} /></button>}
                  <button onClick={() => onDelete(m._id)} style={{ background: 'transparent', border: '1px solid rgba(229,84,84,0.3)', color: '#e55454', padding: '0.25rem 0.6rem', fontSize: '0.65rem', cursor: 'pointer', borderRadius: 2, fontFamily: 'DM Sans, sans-serif' }}><Trash2 size={11} /></button>
                </div>
              </div>
              {m.subject && <div style={{ fontSize: '0.8rem', color: 'rgba(240,236,228,0.5)', marginBottom: '0.5rem', fontWeight: 500 }}>{m.subject}</div>}
              <p style={{ fontSize: '0.85rem', color: 'rgba(240,236,228,0.55)', lineHeight: 1.7 }}>{m.message}</p>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: 'rgba(240,236,228,0.25)', marginTop: '0.8rem' }}>
                {new Date(m.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}