import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { MetricCardProps } from "../../types";

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  chart,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={twMerge(
        "rounded-lg overflow-hidden transition-all duration-200 h-full",
        onClick && "cursor-pointer hover:shadow-md"
      )}
      onClick={onClick}
    >
      <div className="relative p-6 h-full flex flex-col bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm">
        <motion.button
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <MoreHorizontal size={18} />
        </motion.button>

        <h3 className="text-xl font-medium mb-2">{title}</h3>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-4xl font-bold mb-4"
        >
          {value}
        </motion.div>

        <div className="flex items-center mt-auto">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={twMerge(
              "flex items-center rounded-full px-2 py-1 text-xs font-medium",
              change.direction === "up"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {change.direction === "up" ? (
              <ArrowUpRight size={14} className="mr-1" />
            ) : (
              <ArrowDownRight size={14} className="mr-1" />
            )}
            {change.value}
          </motion.div>
          <span className="text-gray-500 text-sm ml-2">Than last month</span>
        </div>
      </div>

      {chart && <div className="px-4 pb-4">{chart}</div>}
    </motion.div>
  );
};

export default MetricCard;
