import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 2rem 2rem' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 600, marginBottom: '1rem' }}>
              AN<span style={{ color: '#c9a96e' }}>Z</span>IL
            </div>
            <p style={{ color: 'rgba(240,236,228,0.45)', fontSize: '0.85rem', lineHeight: 1.8, maxWidth: 280 }}>
              We craft extraordinary digital experiences that transform brands and drive measurable growth.
            </p>
          </div>
          {[
            { title: 'Pages', links: [['/', 'Home'], ['/services', 'Services'], ['/portfolio', 'Portfolio'], ['/case-studies', 'Case Studies']] },
            { title: 'Content', links: [['/blog', 'Blog'], ['/contact', 'Contact'], ['/admin/login', 'Admin']] },
            { title: 'Contact', text: ['hello@anzil.agency', '+1 (555) 000-0000', 'New York, NY 10001'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1.2rem' }}>{col.title}</h4>
              {col.links ? col.links.map(([href, label]) => (
                <div key={href} style={{ marginBottom: '0.6rem' }}>
                  <Link to={href} style={{ color: 'rgba(240,236,228,0.5)', fontSize: '0.85rem', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.target.style.color = '#f0ece4'}
                    onMouseLeave={e => e.target.style.color = 'rgba(240,236,228,0.5)'}
                  >{label}</Link>
                </div>
              )) : col.text.map(t => (
                <div key={t} style={{ color: 'rgba(240,236,228,0.5)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{t}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ color: 'rgba(240,236,228,0.3)', fontSize: '0.78rem', fontFamily: 'DM Mono, monospace' }}>
            © {year} Anzil Agency. All rights reserved.
          </span>
          <span style={{ color: 'rgba(240,236,228,0.3)', fontSize: '0.78rem', fontFamily: 'DM Mono, monospace' }}>
            Crafted with precision
          </span>
        </div>
      </div>
    </footer>
  );
}