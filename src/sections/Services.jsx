/* eslint-disable no-unused-vars */
import React from 'react';
import { FiLayout, FiLayers, FiGlobe, FiTarget, FiSmartphone, FiCpu } from 'react-icons/fi';
// 🟢 Import the observer hook
import { useInView } from 'react-intersection-observer';

const services = [
  {
    title: "UI/UX Design",
    description: "Crafting intuitive digital journeys that feel as good as they look.",
    icon: <FiLayout size={32} />,
  },
  {
    title: "Web Development",
    description: "High-performance, scalable websites built with the latest tech stack.",
    icon: <FiGlobe size={32} />,
  },
  {
    title: "Branding",
    description: "Defining visual identities that resonate and command attention.",
    icon: <FiLayers size={32} />,
  },
  {
    title: "Digital Strategy",
    description: "Data-driven roadmaps to scale your presence in the digital wild.",
    icon: <FiTarget size={32} />,
  },
  {
    title: "Mobile Solutions",
    description: "Seamless mobile experiences optimized for every screen size.",
    icon: <FiSmartphone size={32} />,
  },
  {
    title: "Motion Graphics",
    description: "Bringing your brand to life with high-end cinematic animations.",
    icon: <FiCpu size={32} />,
  },
];

// 🟢 Component for each service card to handle scroll detection
const ServiceCard = ({ service, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`group relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-700 ease-out overflow-hidden ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      // 🟢 Apply transition delay based on index
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* The "Glow" Effect */}
      <div className="absolute -inset-px bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      
      <div className="relative z-10">
        <div className="text-cyan-400 mb-6 group-hover:scale-110 group-hover:text-white transition-all duration-500">
          {service.icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
        <p className="text-gray-400 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Decorative Corner Accent */}
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

const Services = () => {
  return (
    <section className="py-24 bg-[#050505] px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 animate-fade-in">
          <p className="text-cyan-400 font-mono text-sm uppercase tracking-[0.3em] mb-4">
            Capabilities
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white max-w-2xl">
            We help brands <span className="text-gray-500 italic">evolve</span> in the digital age.
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;