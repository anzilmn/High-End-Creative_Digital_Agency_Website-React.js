import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success('Welcome back, Admin');
      navigate('/admin');
    } catch {
      toast.error('Invalid credentials');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2,
    color: '#f0ece4', padding: '0.9rem 1rem', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            AN<span style={{ color: '#c9a96e' }}>Z</span>IL
          </div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(240,236,228,0.4)', textTransform: 'uppercase' }}>Admin Portal</div>
        </div>

        <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, padding: '2.5rem' }}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'rgba(240,236,228,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Username</label>
            <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="admin"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(201,169,110,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div style={{ marginBottom: '1.8rem' }}>
            <label style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'rgba(240,236,228,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Password</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(201,169,110,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <button onClick={handleLogin} disabled={loading}
            style={{ width: '100%', background: '#c9a96e', color: '#080808', border: 'none', padding: '0.95rem', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', borderRadius: 2, fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.3s', opacity: loading ? 0.6 : 1 }}
          >
            <LogIn size={15} />{loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'rgba(240,236,228,0.2)' }}>
          Default: admin / admin
        </div>
      </motion.div>
    </div>
  );
}