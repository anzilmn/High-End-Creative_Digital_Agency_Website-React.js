import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Eye } from 'lucide-react';
import { fetchBlog } from '../utils/api';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog(id)
      .then(r => { setBlog(r.data); document.title = `${r.data.title} — Anzil`; })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ paddingTop: 120, textAlign: 'center', color: 'rgba(240,236,228,0.4)', fontFamily: 'DM Mono, monospace', fontSize: '0.8rem' }}>Loading...</div>;
  if (!blog) return <div style={{ paddingTop: 120, textAlign: 'center', color: 'rgba(240,236,228,0.4)' }}>Blog not found</div>;

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '4rem 2rem 6rem' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(240,236,228,0.4)', fontSize: '0.78rem', fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em', marginBottom: '2.5rem', transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = '#c9a96e'}
              onMouseLeave={e => e.target.style.color = 'rgba(240,236,228,0.4)'}
            ><ArrowLeft size={14} /> Back to Journal</Link>

            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#c9a96e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>{blog.category}</div>
            
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.15, marginBottom: '1.5rem' }}>{blog.title}</h1>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'rgba(240,236,228,0.4)', fontFamily: 'DM Mono, monospace' }}>
                <Eye size={12} />{blog.views} views
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'rgba(240,236,228,0.4)', fontFamily: 'DM Mono, monospace' }}>
                <Clock size={12} />{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'rgba(240,236,228,0.4)', fontFamily: 'DM Mono, monospace' }}>By {blog.author}</span>
            </div>

            {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', borderRadius: 4, marginBottom: '2.5rem', aspectRatio: '16/9', objectFit: 'cover' }} />}

            <div style={{ fontSize: '1rem', color: 'rgba(240,236,228,0.7)', lineHeight: 2, whiteSpace: 'pre-wrap' }}>{blog.content}</div>

            {blog.tags?.length > 0 && (
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {blog.tags.map(t => <span key={t} style={{ padding: '0.3rem 0.8rem', background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 2, fontSize: '0.7rem', color: '#c9a96e', fontFamily: 'DM Mono, monospace' }}>{t}</span>)}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}