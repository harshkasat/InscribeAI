import React from 'react';
import { Rocket, Stars, Cog } from 'lucide-react';
import ServiceCard from './ServiceCard';

const InnovativeSolutions: React.FC = () => {
  const services = [
    {
      icon: <Rocket className="h-10 w-10 text-black/80" />,
      title: "STRATEGIC INSIGHT CONSULTING",
      description: "Our seasoned experts analyze market trends, assess competition, and delve into business dynamics to provide actionable insights."
    },
    {
      icon: <Stars className="h-10 w-10 text-black/80" />,
      title: "DYNAMIC MARKETING SOLUTIONS",
      description: "We elevate your brand with engaging digital campaigns, tailored content, and innovative strategies to boost engagement and maximize reach."
    },
    {
      icon: <Cog className="h-10 w-10 text-black/80" />,
      title: "AGILE TECHNOLOGY INTEGRATION",
      description: "Stay ahead with cutting-edge tech, from cloud solutions to AI-driven automation, empowering your business in the digital landscape."
    }
  ];

  return (
    <section className="w-full py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          <span className="text-white">INNOVATIVE</span> <br/>
          <span className="text-[#9AE66E]">SOLUTIONS</span> <span className="text-white">HUB</span>
        </h2>
        
        <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base mb-16">
          From strategic consulting to seamless execution, we're 
          your partner in unlocking unparalleled success. Elevate 
          your business experience with our dynamic services.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovativeSolutions;