/* eslint-disable no-unused-vars */
import React from 'react'; 
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden px-6">
      {/* 1. Background Blur "Blob" */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
      
      {/* 🟢 Tailwind Animation Container (Fade in + Slide up) */}
      <div 
        className="max-w-6xl mx-auto text-center z-10 animate-fade-in-up"
        style={{ animationDelay: '0.3s' }}
      >
        {/* 2. Eyebrow Text */}
        <span 
          className="inline-block py-1 px-4 rounded-full border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6 uppercase tracking-widest animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          Future-Proof Digital Solutions
        </span>

        {/* 3. Main Headline */}
        <h1 
          className="text-5xl md:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tight animate-fade-in-up"
          style={{ animationDelay: '0.7s' }}
        >
          We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Digital Experiences</span> That Matter.
        </h1>

        {/* 4. Subtext */}
        <p 
          className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '0.9s' }}
        >
          PixelForge is a creative studio at the intersection of design and technology. 
          We craft high-end websites for brands that refuse to blend in.
        </p>

        {/* 5. CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
          <button 
            className="group relative px-8 py-4 bg-cyan-500 text-black font-bold rounded-full overflow-hidden flex items-center gap-2 transition-transform hover:scale-105"
          >
            <span>View Our Work</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            className="px-8 py-4 text-white font-medium border border-white/10 rounded-full transition-colors hover:bg-white/5"
          >
            Our Process
          </button>
        </div>
      </div>

      {/* 6. Simple Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 text-xs flex flex-col items-center gap-2 uppercase tracking-[0.2em] animate-pulse"
      >
        <span>Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;