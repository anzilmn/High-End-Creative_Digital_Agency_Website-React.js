/* eslint-disable no-unused-vars */
import React from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import Services from './sections/Services';
import CaseStudies from './sections/CaseStudies';
import Stats from './sections/Stats';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

// The "Secret Sauce" Hook for Lenis Smooth Scroll
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  // Activate the butter-smooth scrolling engine
  useSmoothScroll();

  return (
    // 🟢 Added overflow-x-hidden to prevent horizontal scrolling bugs
    <main className="bg-[#050505] min-h-screen selection:bg-cyan-500 selection:text-black font-sans relative overflow-x-hidden cursor-none text-white">
      
      {/* 🟢 Premium Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('/noise.png')]"></div>

      {/* 🟢 The Interactive Custom Cursor */}
      <CustomCursor />

      {/* 🟢 Enhanced Navbar with Glassmorphism */}
      <Navbar />
      
      {/* 1. Hero: More content, better typography */}
      <Hero />
      
      {/* 2. Services: Detailed services section */}
      <div id="services" className="relative z-10">
        <Services />
      </div>
      
      {/* 3. Case Studies: Cinematic display of work */}
      <div id="work" className="relative z-10">
        <CaseStudies />
      </div>
      
      {/* 4. Stats: Added more metrics */}
      <Stats />
      
      {/* 5. Testimonials: Client trust signals */}
      <Testimonials />
      
      {/* 6. Contact: Sophisticated form */}
      <div id="contact" className="relative z-10">
        <Contact />
      </div>

      {/* 🏁 Footer: Brand closure and navigation */}
      <footer className="py-24 border-t border-white/5 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="text-white font-bold text-3xl tracking-tighter mb-4">
              PIXEL<span className="text-cyan-400">FORGE</span>
            </div>
            <p className="text-gray-500 text-sm">Building elite digital experiences for forward-thinking brands.</p>
          </div>
          
          <div className="space-y-4">
            <h5 className="font-semibold text-white">Navigation</h5>
            {['Home', 'Services', 'Work', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="block text-gray-400 hover:text-cyan-400 transition">{link}</a>
            ))}
          </div>

          <div className="space-y-4">
            <h5 className="font-semibold text-white">Socials</h5>
            {['Twitter', 'LinkedIn', 'Instagram'].map(link => (
              <a key={link} href="#" className="block text-gray-400 hover:text-cyan-400 transition">{link}</a>
            ))}
          </div>

          <div className="space-y-4">
            <h5 className="font-semibold text-white">Legal</h5>
            {['Privacy', 'Terms'].map(link => (
              <a key={link} href="#" className="block text-gray-400 hover:text-cyan-400 transition">{link}</a>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-600 text-sm font-mono tracking-widest uppercase">
            © 2026 PIXELFORGE STUDIO — ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
      
    </main>
  );
}

export default App;