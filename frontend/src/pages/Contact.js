import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { submitContact } from '../utils/api';

const inputStyle = {
  width: '100%', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2,
  color: '#f0ece4', padding: '0.9rem 1rem', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif',
  outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => { document.title = 'Contact — Anzil Agency'; }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSending(true);
    try {
      await submitContact(form);
      toast.success('Message sent! We\'ll be in touch within 24 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    }
    setSending(false);
  };

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '6rem 2rem 8rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '6rem', alignItems: 'start' }}>
          
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem' }}>Get In Touch</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Let's Build<br />Something<br /><em style={{ color: '#c9a96e', fontStyle: 'italic' }}>Great</em>
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'rgba(240,236,228,0.5)', lineHeight: 1.8, marginBottom: '3rem', maxWidth: 380 }}>
              We're selective about the projects we take on, which means every client gets our full attention and expertise.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {[
                { icon: <Mail size={16} />, label: 'Email', val: 'hello@anzil.agency' },
                { icon: <Phone size={16} />, label: 'Phone', val: '+1 (555) 000-0000' },
                { icon: <MapPin size={16} />, label: 'Location', val: 'New York, NY 10001' },
              ].map(({ icon, label, val }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 40, height: 40, border: '1px solid rgba(201,169,110,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a96e', flexShrink: 0, borderRadius: 2 }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#c9a96e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
                    <div style={{ fontSize: '0.88rem', color: 'rgba(240,236,228,0.6)', marginTop: '0.1rem' }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '3rem' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'rgba(240,236,228,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Name *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,169,110,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'rgba(240,236,228,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,169,110,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'rgba(240,236,228,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Subject</label>
              <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Project inquiry"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(201,169,110,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'rgba(240,236,228,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Message *</label>
              <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us about your project..."
                rows={6}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 150 }}
                onFocus={e => e.target.style.borderColor = 'rgba(201,169,110,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>
            <button onClick={handleSubmit} disabled={sending}
              style={{ width: '100%', background: sending ? 'rgba(201,169,110,0.5)' : '#c9a96e', color: '#080808', border: 'none', padding: '1rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, cursor: sending ? 'not-allowed' : 'pointer', borderRadius: 2, transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#e8c88a'; }}
              onMouseLeave={e => { if (!sending) e.currentTarget.style.background = '#c9a96e'; }}
            >
              <Send size={15} /> {sending ? 'Sending...' : 'Send Message'}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}