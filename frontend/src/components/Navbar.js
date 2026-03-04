import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const s = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    transition: 'all 0.4s ease',
  },
  navScrolled: {
    background: 'rgba(8,8,8,0.95)',
    borderBottom: '1px solid rgba(201,169,110,0.15)',
    backdropFilter: 'blur(20px)',
  },
  inner: {
    maxWidth: 1400, margin: '0 auto', padding: '0 2rem',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 72,
  },
  logo: {
    fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem',
    fontWeight: 600, color: '#f0ece4', letterSpacing: '0.05em',
  },
  logoAccent: { color: '#c9a96e' },
  links: { display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none' },
  link: {
    fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem',
    letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,236,228,0.6)',
    transition: 'color 0.3s ease', cursor: 'pointer',
  },
  linkActive: { color: '#c9a96e' },
  cta: {
    background: 'transparent', border: '1px solid rgba(201,169,110,0.4)',
    color: '#c9a96e', padding: '0.5rem 1.4rem', fontSize: '0.75rem',
    letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 2,
    transition: 'all 0.3s ease', cursor: 'pointer', textDecoration: 'none',
    fontFamily: 'DM Sans, sans-serif',
  },
  burger: { background: 'none', border: 'none', color: '#f0ece4', cursor: 'pointer', display: 'none' },
  mobileMenu: {
    position: 'fixed', top: 72, left: 0, right: 0, bottom: 0,
    background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', gap: '2rem', zIndex: 999,
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <nav style={{ ...s.nav, ...(scrolled ? s.navScrolled : {}) }}>
      <div style={s.inner}>
        <Link to="/" style={s.logo}>
          AN<span style={s.logoAccent}>Z</span>IL
        </Link>

        <ul style={{ ...s.links, '@media(max-width:768px)': { display: 'none' } }} className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <Link
                to={l.href}
                style={{ ...s.link, ...(location.pathname === l.href ? s.linkActive : {}) }}
              >{l.label}</Link>
            </li>
          ))}
        </ul>

        <Link to="/contact" style={s.cta} className="nav-cta"
          onMouseEnter={e => { e.target.style.background = '#c9a96e'; e.target.style.color = '#080808'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#c9a96e'; }}
        >
          Hire Us
        </Link>

        <button style={s.burger} onClick={() => setOpen(!open)} className="burger">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={s.mobileMenu}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link to={l.href} style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem',
                  color: location.pathname === l.href ? '#c9a96e' : '#f0ece4',
                  fontWeight: 300, letterSpacing: '0.05em',
                }}>{l.label}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .burger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}