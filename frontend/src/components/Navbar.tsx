import React, { useState } from 'react';
import useDetectScroll from "@smakss/react-scroll-direction";
import { Menu, X } from 'lucide-react';
import { Link } from './ui/Link';

const Navbar: React.FC = () => {
  const { scrollPosition } = useDetectScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  
  const navsLinks = [
    {href: "#home", label: "About Us"},
    {href: "#about", label: "Services"},
    {href: "#server", label: "How We Work"}, // Fixed typo in 'label'
    {href: "#test", label: "Testimonial"}, // Removed stray 'b'
    {href: "#FAQ", label: "FAQ"}
  ];
  
  return (
    <div className="fixed top-0 w-full z-20 bg-black/95 md:backdrop-blur-md ">
      <div className="container mx-auto py-5 px-6 md:px-16 flex justify-between items-center relative">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-white/90 text-sm">
          {navsLinks.map((link, index) => (
            <Link href={link.href} key={index}>{link.label}</Link>
          ))}
        </nav>
        
        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <button className="px-4 py-2 border border-[#9AE66E] text-[#9AE66E] rounded-md text-sm hover:bg-[#9AE66E]/10 transition-colors cursor-pointer">
            Get in Touch
          </button>
        </div>
        
        {/* Mobile Menu Button - positioned on the right side */}
        <div className="md:hidden ml-auto">
          <button 
            className="px-4 py-2 cursor-pointer text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
        
        {/* Mobile Menu - Full Screen Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 text-white z-30">
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navsLinks.map((link, index) => (
                <a 
                  className={`block text-sm font-medium py-2 ${activeLink === link.href ? "text-[#9AE66E]" : "text-white/90"}`}
                  onClick={() => {
                    setActiveLink(link.href);
                    setIsMenuOpen(false);
                  }}
                  href={link.href} 
                  key={index}
                >
                  {link.label}
                </a>
              ))}
              <button className="w-full bg-[#9AE66E] text-black px-6 py-2.5 rounded-lg
                hover:bg-[#9AE66E]/90 text-sm font-medium transition-all hover:shadow-lg hover:shadow-[#9AE66E]/50 mt-4">
                <a href="#newsletter">Get in touch</a>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {scrollPosition.top > 0 && (
        <span className="absolute hidden md:block bottom-0 left-0 w-full bg-blue-200/60 h-[0.5px]" />
      )}
    </div>
  );
};

export default Navbar;