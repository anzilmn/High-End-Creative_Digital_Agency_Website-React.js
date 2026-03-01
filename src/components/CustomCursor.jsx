/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  // 🟢 Use ref to update position without re-rendering the component
  const cursorRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        // 🟢 Direct DOM manipulation for performance
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    const handleHover = () => setIsHovered(true);
    const handleUnhover = () => setIsHovered(false);

    window.addEventListener('mousemove', handleMouseMove);

    const addListeners = () => {
      const targets = document.querySelectorAll('button, a, .group, .interactive');
      targets.forEach(target => {
        target.removeEventListener('mouseenter', handleHover);
        target.removeEventListener('mouseleave', handleUnhover);
        target.addEventListener('mouseenter', handleHover);
        target.addEventListener('mouseleave', handleUnhover);
      });
    };

    addListeners();
    const timer = setTimeout(addListeners, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
      const targets = document.querySelectorAll('button, a, .group, .interactive');
      targets.forEach(target => {
        target.removeEventListener('mouseenter', handleHover);
        target.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed rounded-full z-[9999] flex items-center justify-center pointer-events-none transition-all duration-100 ease-out"
      style={{
        // 🟢 Centering and dynamic sizing via style tag
        transform: "translate(-50%, -50%)",
        width: isHovered ? '80px' : '12px',
        height: isHovered ? '80px' : '12px',
        backgroundColor: isHovered ? "rgba(0, 240, 255, 0.15)" : "#00F0FF",
        border: isHovered ? "1px solid #00F0FF" : "none",
      }}
    >
      {isHovered && (
        <span 
          className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter animate-fade-in"
        >
          View
        </span>
      )}
    </div>
  );
};

export default CustomCursor;