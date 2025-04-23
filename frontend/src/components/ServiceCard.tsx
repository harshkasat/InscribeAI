import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-[#E1F7CD] rounded-xl p-8 flex flex-col items-center text-center hover:transform hover:scale-105 transition-transform duration-300">
      <div className="w-20 h-20 bg-[#9AE66E] rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      
      <h3 className="text-black text-lg font-bold uppercase mb-4 leading-tight">
        {title}
      </h3>
      
      <p className="text-black/70 text-sm">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;