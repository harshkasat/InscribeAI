import React from "react";
import TestimonialBadge from "./TestimonialBadge";
import { useEmail } from "@/EmailContext";

const HeroSection: React.FC = () => {
  const { email, setEmail } = useEmail();
  return (
    <section className="w-full pt-12 pb-24 px-6 md:px-16 flex flex-col items-center text-center">
      <TestimonialBadge />

      <h1 className="mt-16 text-4xl md:text-6xl lg:text-7xl font-bold max-w-5xl leading-tight">
        <span className="text-[#9AE66E]">GROW SALES</span>
        <span className="text-white">
          {" "}
          WITH
          <br /> OUR STRATEGY FIRST
          <br /> APPROACH
        </span>
      </h1>

      <p className="mt-8 text-white/70 max-w-xl text-sm md:text-base">
        Forge's sales and marketing solutions are strategically assigned each
        month to adapt quickly and hit your goals.
      </p>

      <input
        type="text"
        placeholder="Your Email"
        className="mt-8 transition-colors border-gray-400 border text-white px-6 py-3 rounded-md focus:outline-none md:w-fit"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={() => (window.location.href = "/dashboard")}
        className={`mt-8 ${email ? 'bg-[#9AE66E] hover:bg-[#8BD562]' : 'bg-gray-500 cursor-not-allowed'} text-black font-medium px-6 py-3 rounded-md transition-colors md:w-fit cursor-pointer`}
        disabled={!email}
      >
        Create Blog Now
      </button>
    </section>
  );
};

export default HeroSection;
