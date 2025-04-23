import React from 'react';
import { Target } from 'lucide-react';

const StrategicGrowth: React.FC = () => {
  return (
    <section className="w-full py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          <span className="text-white">STRATEGIC</span> <span className="text-[#9AE66E]">SALES <br/>GROWTH</span> <span className="text-white">CATALYST</span>
        </h2>
        
        <p className="text-white/70 max-w-xl text-sm md:text-base">
          By seamlessly integrating data-driven insights, market 
          intelligence, and a deep understanding of your business, 
          we propel your sales to new heights.
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#E1F7CD] rounded-xl p-8 overflow-hidden relative">
            <div className="absolute -right-16 -bottom-16 w-64 h-64">
              <img 
                src="https://images.pexels.com/photos/3846105/pexels-photo-3846105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Abstract green waves" 
                className="w-full h-full object-cover opacity-50" 
              />
            </div>
            
            <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center mb-6">
              <Target className="h-5 w-5 text-black/70" />
            </div>
            
            <h3 className="text-black text-xl font-bold uppercase mb-2">
              FUELING PROGRESS WITH <br/>
              A STRATEGIC FOUNDATION <br/>
              FOR GROWTH
            </h3>
            
            <p className="text-black/70 max-w-md mt-4 text-sm md:text-base relative z-10">
              As a progressive growth and performance company, 
              we specialize in meticulously crafting innovative 
              strategies that transcend conventional norms. Our 
              commitment lies not only in meeting immediate 
              sales objectives but in strategically positioning 
              them for sustained success within the 
              evolving market landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-[#FFCFBA] rounded-xl p-8 relative overflow-hidden">
              <h3 className="text-black text-xl font-bold uppercase mb-2">
                ILLUMINATING PATHWAYS <br/>
                FOR BUSINESS TRIUMPHS
              </h3>
              
              <p className="text-black/70 mt-4 text-sm md:text-base relative z-10">
                We craft success through strategies integrating data-
                driven insights and deep understanding of each client's 
                unique business landscape.
              </p>
              
              <div className="absolute -right-10 -bottom-10 w-40 h-40">
                <img 
                  src="https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Abstract orange waves" 
                  className="w-full h-full object-cover opacity-60" 
                />
              </div>
            </div>
            
            <div className="bg-[#F5E9AF] rounded-xl p-8 relative overflow-hidden">
              <h3 className="text-black text-xl font-bold uppercase mb-2">
                ELEVATING ACHIEVEMENTS <br/>
                THROUGH COLLABORATION
              </h3>
              
              <p className="text-black/70 mt-4 text-sm md:text-base relative z-10">
                We don't just work for our clients, we work with them. We 
                thrive on collaboration, building strong partnerships to 
                understand each business's nuances.
              </p>
              
              <div className="absolute -right-10 -bottom-10 w-40 h-40">
                <img 
                  src="https://images.pexels.com/photos/4344878/pexels-photo-4344878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Abstract yellow waves" 
                  className="w-full h-full object-cover opacity-60" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicGrowth;