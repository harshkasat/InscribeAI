import React from "react";
import { MessageSquare, Phone } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <section className="w-full py-24 px-6 md:px-16 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-[#9AE66E]">LET'S CONNECT</span> AND
          <br />
          <span className="text-white">IGNITE SUCCESS</span>
        </h2>

        <p className="text-white/70 max-w-xl mx-auto text-center text-sm md:text-base mb-16">
          Ready to take the next step? Contact us today to explore how our
          innovative strategies can propel your business forward. Our team is
          here to turn your vision into a reality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#E1F7CD] rounded-xl p-8 text-center hover:transform hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-black/70" />
            </div>
            <h3 className="text-black font-bold mb-2">DROP US A LINE</h3>
            <p className="text-black/70 text-sm">
              Reach out and we'll begin the dialogue
            </p>
          </div>

          <div className="bg-[#E1F7CD] rounded-xl p-8 text-center hover:transform hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-black/70" />
            </div>
            <h3 className="text-black font-bold mb-2">BOOK A CALL</h3>
            <p className="text-black/70 text-sm">
              Schedule consultation at your convenience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-[#E1F7CD]/10 rounded-xl p-8 border border-[#9AE66E]/20">
            <h3 className="text-white font-bold mb-6">CONNECT WITH EASE</h3>
            <p className="text-white/70 text-sm mb-8">
              Your inquiries, ideas, and collaborations matter to us. Drop us a
              message, let's start the conversation.
            </p>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white/70 text-sm mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-black/50 border border-[#9AE66E]/20 rounded-md px-4 py-2 text-white placeholder-white/30"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white/70 text-sm mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-black/50 border border-[#9AE66E]/20 rounded-md px-4 py-2 text-white placeholder-white/30"
                  placeholder="john.smith@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white/70 text-sm mb-2"
                >
                  Question
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full bg-black/50 border border-[#9AE66E]/20 rounded-md px-4 py-2 text-white placeholder-white/30"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="bg-[#9AE66E] text-black font-medium px-6 py-2 rounded-md hover:bg-[#8BD562] transition-colors"
              >
                Send a Question
              </button>
            </form>
          </div>

          <div className="rounded-xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/7439123/pexels-photo-7439123.jpeg"
              alt="3D character working on laptop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
