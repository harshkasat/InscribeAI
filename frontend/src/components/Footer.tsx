import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  product: ["Features", "Pricing", "API", "Documentation"],
  company: ["About", "Blog", "Careers", "Press"],
  support: ["Help Center", "Contact", "Status", "Updates"],
  legal: ["Privacy", "Terms", "Security", "Cookies"]
};

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-5 gap-8 mb-12"
        >
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">GrammarWrite</h3>
            <p className="text-gray-400 leading-relaxed">
              The most powerful AI blog writer to create engaging, SEO-optimized content in seconds.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 capitalize">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="/coming-soon" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <Separator className="bg-gray-700 mb-8" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-gray-400"
        >
          <div className="mb-4 md:mb-0">
            © 2024 GrammarWrite. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="/coming-soon" className="hover:text-white transition-colors">Twitter</a>
            <a href="/coming-soon" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="/coming-soon" className="hover:text-white transition-colors">Facebook</a>
            <a href="/coming-soon" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-sm">★★★★★ 4.9/5 on Trustpilot</div>
            <div className="text-sm">SOC 2 Compliant</div>
            <div className="text-sm">GDPR Ready</div>
            <div className="text-sm">99.9% Uptime</div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};