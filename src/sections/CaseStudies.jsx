/* eslint-disable no-unused-vars */
import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
// 🟢 Import the observer hook
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    id: 1,
    title: "The Ethereal Collective",
    category: "Web Design / 3D Animation",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    title: "Sonic Wave Systems",
    category: "Branding / UI Experience",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    title: "Apex Architecture",
    category: "Full Stack / Minimalist UX",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
  },
  // 🟢 Added Many Many Mock Projects
  {
    id: 4,
    title: "Quantum Leap AI",
    category: "AI Dashboard / SaaS",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 5,
    title: "EcoSphere Ventures",
    category: "Sustainable Design / Motion",
    image: "https://images.unsplash.com/photo-1497436072909-60f360e4d4b0?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 6,
    title: "Neo Tokyo VR",
    category: "Metaverse Experience",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 7,
    title: "Titanium Dynamics",
    category: "Industrial Branding",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 8,
    title: "Velocity Racing Team",
    category: "Performance Branding",
    image: "https://images.unsplash.com/photo-1517649763962-0c6230660132?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 9,
    title: "Aetherial Soundscapes",
    category: "Music Streaming UI",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1200",
  }
];

// 🟢 Component for each project item to handle its own scroll detection
const ProjectItem = ({ project }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation only plays once
    threshold: 0.1,    // 10% of element visible
  });

  return (
    <div
      ref={ref}
      // 🟢 Dramatic Tailwind animation: duration-1000 = 1 second
      className={`group relative cursor-pointer transition-all duration-1000 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-3xl">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
        
        {/* Overlay with Content */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="w-24 h-24 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold -rotate-45 group-hover:rotate-0 transition-transform duration-500">
              View
            </div>
        </div>
      </div>

      {/* Text Detail */}
      <div className="mt-6 flex items-start justify-between">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-500 font-medium uppercase tracking-wider text-sm">{project.category}</p>
        </div>
        <div className="p-4 border border-white/10 rounded-full group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300">
          <FiArrowUpRight size={24} />
        </div>
      </div>
    </div>
  );
};

const CaseStudies = () => {
  return (
    <section className="py-24 bg-[#050505] px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Simple Fade In */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 animate-fade-in">
          <div>
            <p className="text-cyan-400 font-mono text-sm uppercase tracking-[0.3em] mb-4">
              Selected Work
            </p>
            <h2 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter">
              Case Studies
            </h2>
          </div>
          <button className="text-white border-b border-cyan-500 pb-2 font-medium hover:text-cyan-400 transition-colors hover:scale-105">
            View All Projects
          </button>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-12">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;