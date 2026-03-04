import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Eye } from 'lucide-react';
import { fetchBlogs } from '../utils/api';

const cats = ['All', 'Design', 'Development', 'Branding', 'Strategy'];
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08 } }) };

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [cat, setCat] = useState('All');

  useEffect(() => {
    const params = cat !== 'All' ? { category: cat } : {};
    fetchBlogs(params).then(r => setBlogs(r.data)).catch(() => {});
    document.title = 'Blog — Anzil Agency';
  }, [cat]);

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '6rem 2rem 4rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeUp} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem' }}>Insights & Ideas</motion.div>
            <motion.h1 variants={fadeUp} custom={1} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, color: '#f0ece4', marginBottom: '2.5rem', lineHeight: 1.1 }}>
              The<br /><em style={{ color: '#c9a96e', fontStyle: 'italic' }}>Journal</em>
            </motion.h1>
          </motion.div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{ padding: '0.45rem 1.2rem', border: '1px solid', borderColor: cat === c ? '#c9a96e' : 'rgba(255,255,255,0.1)', background: cat === c ? 'rgba(201,169,110,0.1)' : 'transparent', color: cat === c ? '#c9a96e' : 'rgba(240,236,228,0.5)', fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2, transition: 'all 0.2s' }}
              >{c}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {blogs.map((blog, i) => (
              <motion.article key={blog._id}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.08}
              >
                <Link to={`/blog/${blog._id}`} style={{ display: 'block', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden', transition: 'transform 0.3s, border-color 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
                >
                  {blog.image && (
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#1a1a1a' }}>
                      <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '1.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#c9a96e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{blog.category}</span>
                      <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: 'rgba(240,236,228,0.3)', fontFamily: 'DM Mono, monospace' }}>
                          <Eye size={11} />{blog.views}
                        </span>
                      </div>
                    </div>
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 400, color: '#f0ece4', marginBottom: '0.8rem', lineHeight: 1.3 }}>{blog.title}</h2>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(240,236,228,0.45)', lineHeight: 1.7, marginBottom: '1.2rem' }}>{blog.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(240,236,228,0.35)', fontFamily: 'DM Mono, monospace' }}>{blog.author}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: 'rgba(240,236,228,0.3)', fontFamily: 'DM Mono, monospace' }}>
                        <Clock size={11} />{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}