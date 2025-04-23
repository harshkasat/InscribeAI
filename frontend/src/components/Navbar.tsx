import React, { useEffect, useState } from 'react';
import useDetectScroll from "@smakss/react-scroll-direction";

import { CircleEqual as CircleSquare } from 'lucide-react';
import { Link } from './ui/Link';
import { link } from 'fs';

const Navbar: React.FC = () => {
  const { scrollDir, scrollPosition } = useDetectScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navsLinks = [
    {href: "#home", label: "About Us"},
    {href: "#about", label: "Services"},
    {href: "#server", label: "How We Work"},
    {href: "#test", label: "Testimonial"},
    {href: "#FAQ", label: "FAQ"}
]
  
  return (
    <header className="fixed top-0 w-full z-20 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto py-5 px-6 md:px-16 flex justify-between items-center relative">
        <nav className="hidden md:flex space-x-8 text-white/90 text-sm">
          {navsLinks.map((link, index)=> (
            <Link href={link.href} key={index}>{link.label}</Link>
          ))}
        </nav>
        <div>
          <button className="px-4 py-2 border border-[#9AE66E] text-[#9AE66E] rounded-md text-sm hover:bg-[#9AE66E]/10 transition-colors">
            Get in Touch
          </button>
        </div>

      </div>
        {scrollPosition.top > 0 && (
          <span className="absolute bottom-0 left-0 w-full bg-blue-200/60 h-[0.5px]" />
        )}
    </header>
  );
};

export default Navbar;