import React from "react";
import { CircleEqual as CircleSquare } from "lucide-react";
import { Link } from "./ui/Link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 md:px-16 bg-black/50 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <CircleSquare className="h-8 w-8 text-[#9AE66E]" />
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="#">About Us</Link>
            <Link href="#">Services</Link>
            <Link href="#">How We Work</Link>
            <Link href="#">Testimonials</Link>
            <Link href="#">FAQ</Link>
            <Link href="#">Contact Us</Link>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
          <p>© Forge 2025. All Rights Reserved</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#9AE66E]">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-[#9AE66E]">
              Twitter
            </Link>
            <Link href="#" className="hover:text-[#9AE66E]">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
