import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchServices, fetchTestimonials } from '../utils/api';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }) };

export default function Home() {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [tIdx, setTIdx] = useState(0);

  useEffect(() => {
    fetchServices().then(r => setServices(r.data)).catch(() => {});
    fetchTestimonials().then(r => setTestimonials(r.data)).catch(() => {});
    document.title = 'Anzil — Premium Digital Agency';
  }, []);

  const nextT = () => setTIdx(i => (i + 1) % testimonials.length);
  const prevT = () => setTIdx(i => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div style={{ paddingTop: 72 }}>
      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '0 2rem' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,169,110,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="visible" style={{ maxWidth: 900 }}>
            <motion.div variants={fadeUp} custom={0}
              style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}
            >
              <span style={{ width: 40, height: 1, background: '#c9a96e', display: 'inline-block' }} />
              Premium Digital Agency
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1}
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '2rem', color: '#f0ece4' }}
            >
              We Build Digital<br />
              <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>Experiences</em> That<br />
              Matter.
            </motion.h1>

            <motion.p variants={fadeUp} custom={2}
              style={{ fontSize: '1.05rem', color: 'rgba(240,236,228,0.55)', maxWidth: 520, lineHeight: 1.8, marginBottom: '3rem', fontWeight: 300 }}
            >
              From brand identity to full-stack platforms, we partner with ambitious companies to create work that moves people and drives results.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#c9a96e', color: '#080808', padding: '0.9rem 2rem', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, transition: 'all 0.3s ease', borderRadius: 2 }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e8c88a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                View Our Work <ArrowRight size={14} />
              </Link>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', border: '1px solid rgba(240,236,228,0.2)', color: '#f0ece4', padding: '0.9rem 2rem', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.3s ease', borderRadius: 2 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'; e.currentTarget.style.color = '#c9a96e'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(240,236,228,0.2)'; e.currentTarget.style.color = '#f0ece4'; }}
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
            style={{ display: 'flex', gap: '3rem', marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' }}
          >
            {[['120+', 'Projects Delivered'], ['8+', 'Years of Excellence'], ['40+', 'Happy Clients'], ['12', 'Awards Won']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 600, color: '#c9a96e', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: 'rgba(240,236,228,0.4)', marginTop: '0.3rem', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{ padding: '8rem 2rem', background: '#080808' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginBottom: '4rem' }}>
            <motion.div variants={fadeUp} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem' }}>What We Do</motion.div>
            <motion.h2 variants={fadeUp} custom={1} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#f0ece4', maxWidth: 500, lineHeight: 1.15 }}>
              Services That Drive Growth
            </motion.h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
            {services.map((svc, i) => (
              <motion.div key={svc._id}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                style={{ background: '#080808', padding: '2.5rem', cursor: 'pointer', transition: 'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0f0f0f'}
                onMouseLeave={e => e.currentTarget.style.background = '#080808'}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>{svc.icon}</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 400, marginBottom: '0.8rem', color: '#f0ece4' }}>{svc.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(240,236,228,0.45)', lineHeight: 1.7 }}>{svc.description}</p>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(201,169,110,0.3)', color: '#c9a96e', padding: '0.8rem 2rem', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.3s', borderRadius: 2 }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              All Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section style={{ padding: '8rem 2rem', background: '#060606' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '3rem', textAlign: 'center' }}>What Clients Say</div>
            
            <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
              <AnimatedTestimonial t={testimonials[tIdx]} />
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', alignItems: 'center' }}>
                <button onClick={prevT} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#f0ece4', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: 2, transition: 'all 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#c9a96e'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                ><ChevronLeft size={16} /></button>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'rgba(240,236,228,0.3)' }}>{tIdx + 1} / {testimonials.length}</span>
                <button onClick={nextT} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#f0ece4', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: 2, transition: 'all 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#c9a96e'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                ><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '8rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1.5rem' }}>Ready to Begin?</motion.div>
            <motion.h2 variants={fadeUp} custom={1} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '1.5rem', color: '#f0ece4' }}>
              Let's Create Something<br /><em style={{ color: '#c9a96e', fontStyle: 'italic' }}>Extraordinary</em>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} style={{ color: 'rgba(240,236,228,0.45)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Tell us about your project and we'll get back to you within 24 hours.
            </motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem', background: '#c9a96e', color: '#080808', padding: '1rem 2.5rem', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, borderRadius: 2, transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e8c88a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Start Your Project <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function AnimatedTestimonial({ t }) {
  return (
    <motion.div key={t._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ textAlign: 'center', padding: '3rem', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4 }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginBottom: '1.5rem' }}>
        {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} fill="#c9a96e" color="#c9a96e" />)}
      </div>
      <blockquote style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, color: '#f0ece4', marginBottom: '2rem' }}>
        "{t.content}"
      </blockquote>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        {t.avatar && <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(201,169,110,0.3)' }} />}
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#f0ece4' }}>{t.name}</div>
          <div style={{ fontSize: '0.78rem', color: '#c9a96e', fontFamily: 'DM Mono, monospace' }}>{t.role}, {t.company}</div>
        </div>
      </div>
    </motion.div>
  );
}