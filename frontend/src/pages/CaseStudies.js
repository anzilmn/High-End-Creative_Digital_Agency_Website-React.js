import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { fetchCaseStudies } from '../utils/api';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1 } }) };

export default function CaseStudies() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCaseStudies().then(r => setItems(r.data)).catch(() => {});
    document.title = 'Case Studies — Anzil Agency';
  }, []);

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '6rem 2rem 4rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeUp} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem' }}>Results That Speak</motion.div>
            <motion.h1 variants={fadeUp} custom={1} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, color: '#f0ece4', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Case<br /><em style={{ color: '#c9a96e', fontStyle: 'italic' }}>Studies</em>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} style={{ fontSize: '1rem', color: 'rgba(240,236,228,0.5)', maxWidth: 520, lineHeight: 1.8 }}>
              Deep dives into how we've helped clients solve complex challenges and achieve extraordinary outcomes.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '3rem 2rem 8rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gap: '2rem' }}>
          {items.map((cs, i) => (
            <motion.article key={cs._id}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 0, background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden', transition: 'border-color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.15)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
            >
              <div style={{ position: 'relative', minHeight: 350, background: '#1a1a1a', overflow: 'hidden' }}>
                {cs.image && <img src={cs.image} alt={cs.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#c9a96e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{cs.industry}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#f0ece4', fontWeight: 400 }}>{cs.client}</div>
                </div>
              </div>
              <div style={{ padding: '2.5rem' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: '#f0ece4', marginBottom: '1.5rem', lineHeight: 1.2 }}>{cs.title}</h2>
                
                <div style={{ marginBottom: '1.2rem' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#c9a96e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>The Challenge</div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(240,236,228,0.55)', lineHeight: 1.7 }}>{cs.challenge}</p>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#c9a96e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Our Solution</div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(240,236,228,0.55)', lineHeight: 1.7 }}>{cs.solution}</p>
                </div>

                {cs.results?.length > 0 && (
                  <div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#c9a96e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <TrendingUp size={12} /> Results
                    </div>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                      {cs.results.map(r => (
                        <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem', color: 'rgba(240,236,228,0.7)' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a96e', flexShrink: 0 }} />
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}