import React from 'react';
import TestimonialBadge from './TestimonialBadge';

const HeroSection: React.FC = () => {
  return (
    <section className="w-full pt-12 pb-24 px-6 md:px-16 flex flex-col items-center text-center">
      <TestimonialBadge />
      
      <h1 className="mt-16 text-4xl md:text-6xl lg:text-7xl font-bold max-w-5xl leading-tight">
        <span className="text-[#9AE66E]">GROW SALES</span> WITH 
        <br /> OUR STRATEGY FIRST 
        <br /> APPROACH
      </h1>
      
      <p className="mt-8 text-white/70 max-w-xl text-sm md:text-base">
        Forge's sales and marketing solutions are strategically assigned 
        each month to adapt quickly and hit your goals.
      </p>
      
      <button className="mt-8 bg-[#9AE66E] hover:bg-[#8BD562] text-black font-medium px-6 py-3 rounded-md transition-colors">
        Book a Free Consultation
      </button>
    </section>
  );
};

export default HeroSection;