/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiMessageSquare } from 'react-icons/fi';

const reviews = [
  {
    id: 1,
    name: "Alexander Wright",
    role: "CEO, NexaTech",
    text: "PixelForge didn't just build a website; they built a digital ecosystem. Our conversion rate jumped 40% in the first month.",
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Marketing Director, Lumina",
    text: "The attention to detail in the motion design is breathtaking. They are truly at the intersection of art and code.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Founder, Obsidian Collective",
    text: "Clean, bold, and premium. Exactly what we needed to position ourselves as leaders in the luxury market.",
    avatar: "https://i.pravatar.cc/150?u=marcus",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // 🟢 Logic to change testimonials with fade effect
  const changeTestimonial = (newIndex) => {
    setFade(false); // Start fade out
    setTimeout(() => {
      setIndex(newIndex);
      setFade(true); // Fade in new content
    }, 400); // Duration of fade-out animation
  };

  const nextStep = () => {
    const next = index + 1 === reviews.length ? 0 : index + 1;
    changeTestimonial(next);
  };

  const prevStep = () => {
    const prev = index === 0 ? reviews.length - 1 : index - 1;
    changeTestimonial(prev);
  };

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(nextStep, 5000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section className="py-24 bg-[#050505] overflow-hidden px-6 border-b border-white/5">
      <div className="max-w-5xl mx-auto text-center">
        
        <FiMessageSquare className="text-cyan-500 text-4xl mx-auto mb-8 opacity-50" />
        
        <div className="relative h-[400px] md:h-[300px] flex items-center justify-center">
          {/* 🟢 Tailwind CSS for fading animation */}
          <div
            className={`absolute w-full px-4 transition-opacity duration-400 ease-in-out ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-2xl md:text-4xl font-medium text-white italic leading-relaxed mb-8">
              "{reviews[index].text}"
            </p>
            
            <div className="flex flex-col items-center">
              <img 
                src={reviews[index].avatar} 
                alt={reviews[index].name} 
                className="w-16 h-16 rounded-full border-2 border-cyan-500 mb-4"
              />
              <h4 className="text-white font-bold text-lg">{reviews[index].name}</h4>
              <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest">
                {reviews[index].role}
              </p>
            </div>
          </div>
        </div>

        {/* Custom Navigation Dots */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button onClick={prevStep} className="p-3 border border-white/10 rounded-full text-white hover:bg-cyan-500 hover:text-black transition-all">
            <FiChevronLeft size={24} />
          </button>
          
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <div 
                key={i}
                className={`h-1 transition-all duration-500 rounded-full ${i === index ? "w-12 bg-cyan-500" : "w-4 bg-white/10"}`}
              />
            ))}
          </div>

          <button onClick={nextStep} className="p-3 border border-white/10 rounded-full text-white hover:bg-cyan-500 hover:text-black transition-all">
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;