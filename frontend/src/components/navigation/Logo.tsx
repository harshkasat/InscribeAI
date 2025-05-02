import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const Logo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 20 }}
        className="p-1 bg-gradient-to-br from-green-400 via-green-500 to-teal-500 rounded mr-2"
      >
        <Zap size={24} className="text-white" />
      </motion.div>
      <span className="text-xl font-bold text-gray-900">
        Inscribe
        <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
          AI
        </span>
      </span>
    </motion.div>
  );
};

export default Logo;
