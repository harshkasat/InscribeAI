import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqItems: FAQItem[] = [
    {
      question: "How are your strategies be customized for my needs?",
      answer: "Our team conducts a thorough analysis of your business, market position, and goals to create tailored strategies that align perfectly with your unique requirements and objectives."
    },
    {
      question: "How are your strategies be customized for my needs?",
      answer: "We utilize advanced analytics and market research to develop strategies that are specifically designed to address your business challenges and capitalize on opportunities."
    },
    {
      question: "How do you guarantee the maximum return on all channels?",
      answer: "Through continuous monitoring, data analysis, and agile optimization processes, we ensure maximum ROI across all marketing and sales channels."
    },
    {
      question: "Can you explain the role of data intelligence in your process?",
      answer: "Data intelligence forms the backbone of our strategy, enabling us to make informed decisions, predict trends, and optimize campaigns for better performance."
    },
    {
      question: "How do I get started with your services?",
      answer: "Getting started is simple! Schedule a free consultation call where we'll discuss your needs and outline a customized strategy for your business growth."
    }
  ];

  return (
    <section className="w-full py-24 px-6 md:px-16 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-white">FREQUENTLY ASKED</span> <br/>
          <span className="text-[#9AE66E]">QUESTIONS</span>
        </h2>
        
        <p className="text-white/70 max-w-xl mx-auto text-center text-sm md:text-base mb-16">
          We address common questions, thoroughly explain our services, and 
          provide insights to guide your strategic decisions.
        </p>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-[#E1F7CD]/10 rounded-xl overflow-hidden border border-[#9AE66E]/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-white/90 text-sm md:text-base">{item.question}</span>
                <Plus 
                  className={`h-5 w-5 text-[#9AE66E] transition-transform ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 text-white/70 text-sm">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;