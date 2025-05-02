import React from "react";
// import { Search, Bell, ChevronDown } from 'lucide-react';
import Logo from "./Logo";

const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="User"
                className="w-8 h-8 rounded-full border border-gray-200"
              />
              {/* <ChevronDown size={16} className="ml-1 text-gray-500" /> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
