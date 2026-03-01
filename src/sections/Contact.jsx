import React from 'react';
import { FiMail, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  return (
    <section className="py-24 bg-[#050505] px-6 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left Side: Info */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Get in touch
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-sm">
            Have a project in mind? Let's talk about it.
          </p>

          <div className="space-y-4 text-gray-300">
            <div className="flex items-center gap-3">
              <FiMail className="text-cyan-500" />
              <span>hello@pixelforge.studio</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMapPin className="text-cyan-500" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Right Side: Simple Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            placeholder="Name" 
            className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500"
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500"
          />
          <textarea 
            rows="4"
            placeholder="Message" 
            className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500"
          ></textarea>
          <button 
            type="submit"
            className="w-full bg-cyan-500 text-black font-semibold py-4 rounded-lg hover:bg-cyan-400 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;