/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
// 🟢 Import the observer hook
import { useInView } from 'react-intersection-observer';

const Counter = ({ value, title, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      // 🟢 Calculate duration based on the value to make higher numbers slower
      const duration = 2000; 
      const increment = value / (duration / 16); // ~60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.round(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center p-8 border-r border-white/5 last:border-r-0">
      <div className="text-5xl md:text-7xl font-bold text-white mb-2 flex justify-center">
        <span>{count.toLocaleString()}</span>
        <span className="text-cyan-500">{suffix}</span>
      </div>
      <p className="text-gray-500 font-mono uppercase tracking-[0.2em] text-sm">
        {title}
      </p>
    </div>
  );
};

const Stats = () => {
  const statsData = [
    { value: 120, title: "Projects Done", suffix: "+" },
    { value: 85, title: "Global Clients", suffix: "" },
    { value: 12, title: "Industry Awards", suffix: "" },
    { value: 99, title: "Success Rate", suffix: "%" },
  ];

  return (
    <section className="py-20 bg-[#080808] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <Counter 
              key={index} 
              value={stat.value} 
              title={stat.title} 
              suffix={stat.suffix} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;