import React from "react";
import { motion } from "framer-motion";

interface ProgressChartProps {
  current: number;
  target: number;
  title?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  current,
  target,
  title,
}) => {
  const percentage = Math.min((current / target) * 100, 100);
  const getColor = (left: number) => {
    if (left === 1) return "green-500";
    if (left === 2) return "[#6eb74c]";
    if (left === 3) return "[#6eb74c]";
    if (left === 4) return "[#cb8240]";
    if (left === 5) return "red-500";
  };

  return (
    <div className="w-full">
      {title && <div className="text-sm text-gray-500 mb-2">{title}</div>}

      <div className="h-8 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r from-green-400 to-${getColor(current)} rounded-full`}
        />
      </div>

      <div className="flex mt-2 text-xs">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center"
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-[#6eb74c] mr-1"></span>
          <span>5-4Credit</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center ml-4"
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#6eb74c] to-[#cb8240] mr-1"></span>
          <span>Half Credit Left</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center ml-4"
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#cb8240] to-red-500 mr-1"></span>
          <span>0 Credit Left</span>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressChart;
