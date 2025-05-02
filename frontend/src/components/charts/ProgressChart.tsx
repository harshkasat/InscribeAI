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

  return (
    <div className="w-full">
      {title && <div className="text-sm text-gray-500 mb-2">{title}</div>}

      <div className="h-8 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
        />
      </div>

      <div className="flex mt-2 text-xs">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center"
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-600 to-green-500 mr-1"></span>
          <span>Profit</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center ml-4"
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-green-400 mr-1"></span>
          <span>Total Earning</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center ml-4"
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-300 to-green-200 mr-1"></span>
          <span>Total Target</span>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressChart;
