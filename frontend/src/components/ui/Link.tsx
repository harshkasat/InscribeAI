import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ href, children, className = '' }) => {
  return (
    <a 
      href={href} 
      className={`relative cursor-pointer hover:text-[#9AE66E] transition-colors duration-300 ${className}`}
    >
      {children}
    </a>
  );
};