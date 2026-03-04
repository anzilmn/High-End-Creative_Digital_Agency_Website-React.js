import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { fetchPortfolio } from '../utils/api';

const cats = ['All', 'UI', 'Branding', 'Development', 'Motion'];

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchPortfolio(cat).then(r => setItems(r.data)).catch(() => {});
    document.title = 'Portfolio — Anzil Agency';
  }, [cat]);

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '6rem 2rem 4rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem' }}>Our Work</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, color: '#f0ece4', marginBottom: '2.5rem', lineHeight: 1.1 }}>
              Selected<br /><em style={{ color: '#c9a96e', fontStyle: 'italic' }}>Projects</em>
            </h1>
          </motion.div>

          {/* Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{ padding: '0.45rem 1.2rem', border: '1px solid', borderColor: cat === c ? '#c9a96e' : 'rgba(255,255,255,0.1)', background: cat === c ? 'rgba(201,169,110,0.1)' : 'transparent', color: cat === c ? '#c9a96e' : 'rgba(240,236,228,0.5)', fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2, transition: 'all 0.2s' }}
              >{c}</button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <AnimatePresence>
              {items.map(item => (
                <motion.div key={item._id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelected(item)}
                  style={{ cursor: 'pointer', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden', transition: 'transform 0.3s, border-color 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
                >
                  <div style={{ aspectRatio: '16/10', overflow: 'hidden', background: '#1a1a1a' }}>
                    {item.image ? <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.1)', fontSize: '3rem' }}>◆</div>}
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#c9a96e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{item.category}</div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 400, color: '#f0ece4', marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(240,236,228,0.45)', lineHeight: 1.6 }}>{item.description?.slice(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                      {item.tags?.map(t => <span key={t} style={{ padding: '0.2rem 0.6rem', background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 2, fontSize: '0.65rem', color: '#c9a96e', fontFamily: 'DM Mono, monospace' }}>{t}</span>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(10px)' }}
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, overflow: 'hidden', maxWidth: 700, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
            >
              {selected.image && <img src={selected.image} alt={selected.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />}
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#c9a96e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{selected.category}</div>
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, color: '#f0ece4' }}>{selected.title}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#f0ece4', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: 2, flexShrink: 0 }}><X size={16} /></button>
                </div>
                <p style={{ color: 'rgba(240,236,228,0.6)', lineHeight: 1.8, marginBottom: '1.5rem' }}>{selected.description}</p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {selected.tags?.map(t => <span key={t} style={{ padding: '0.2rem 0.6rem', background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 2, fontSize: '0.65rem', color: '#c9a96e', fontFamily: 'DM Mono, monospace' }}>{t}</span>)}
                </div>
                {selected.link && <a href={selected.link} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: '#c9a96e', fontSize: '0.82rem', textDecoration: 'underline' }}><ExternalLink size={14} /> View Live</a>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}