import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { fetchServices } from '../utils/api';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08 } }) };

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices().then(r => setServices(r.data)).catch(() => {});
    document.title = 'Services — Anzil Agency';
  }, []);

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: '6rem 2rem 4rem', background: 'linear-gradient(180deg, #0d0d0d 0%, #080808 100%)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeUp} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem' }}>What We Offer</motion.div>
            <motion.h1 variants={fadeUp} custom={1} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, lineHeight: 1.1, color: '#f0ece4', maxWidth: 700, marginBottom: '1.5rem' }}>
              Services Designed<br /><em style={{ color: '#c9a96e', fontStyle: 'italic' }}>for Impact</em>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} style={{ fontSize: '1rem', color: 'rgba(240,236,228,0.5)', maxWidth: 500, lineHeight: 1.8 }}>
              Every service we offer is built around one principle: delivering measurable value that compounds over time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', background: '#080808' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
          {services.map((svc, i) => (
            <motion.div key={svc._id}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
              style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', padding: '3rem', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, alignItems: 'start', transition: 'border-color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
            >
              <div>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{svc.icon}</div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: '#f0ece4', lineHeight: 1.2 }}>{svc.title}</h2>
              </div>
              <div>
                <p style={{ color: 'rgba(240,236,228,0.55)', lineHeight: 1.8, marginBottom: '1.5rem' }}>{svc.description}</p>
                {svc.features?.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.6rem' }}>
                    {svc.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'rgba(240,236,228,0.55)' }}>
                        <CheckCircle size={13} color="#c9a96e" />
                        {f}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}