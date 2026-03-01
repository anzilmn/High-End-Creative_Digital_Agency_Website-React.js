/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 🟢 Detect scroll direction and threshold
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] px-6 py-6 transition-transform duration-300 ease-in-out ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/[0.03] backdrop-blur-md border border-white/10 px-8 py-4 rounded-full">
        {/* Logo */}
        <div 
          className="text-white font-bold text-xl tracking-tighter cursor-pointer transition-transform hover:translate-x-1 hover:-translate-y-0.5"
        >
          PIXEL<span className="text-cyan-500">FORGE</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Work', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-400 text-sm font-medium hover:text-cyan-400 transition-all hover:scale-110"
            >
              {item}
            </a>
          ))}
          <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-cyan-500 transition-all hover:scale-105">
            Let's Talk
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;