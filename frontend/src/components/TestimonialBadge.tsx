import React from 'react';
import { Users } from 'lucide-react';

const TestimonialBadge: React.FC = () => {
  return (
    <div className="flex items-center bg-black/40 border border-white/10 rounded-full py-1 pl-1 pr-4 gap-2 pt-24">
      <div className="w-8 h-8 rounded-full bg-[#9AE66E]/20 flex items-center justify-center">
        <Users size={16} className="text-[#9AE66E]" />
      </div>
      <span className="text-white/80 text-xs">What Others Say About Us</span>
      <span className="text-white/70">→</span>
    </div>
  );
};

export default TestimonialBadge;