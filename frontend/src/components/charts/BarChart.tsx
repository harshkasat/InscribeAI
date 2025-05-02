import React from "react";
import { motion } from "framer-motion";
import { ChartData } from "../../types";

interface BarChartProps {
  data: ChartData[];
  height?: number;
  activeMonth?: string;
  showValues?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 200,
  activeMonth,
  showValues = false,
}) => {
  const maxValue = Math.max(...data.map((item) => item.value)) * 1.1;

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div className="flex h-full items-end">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          const isActive = activeMonth === item.month;

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center group"
            >
              {showValues && item.month === activeMonth && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded px-2 py-1 text-xs mb-1"
                >
                  ${item.value.toFixed(2)}
                </motion.div>
              )}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${barHeight}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`w-[60%] rounded-t-md relative ${
                  isActive
                    ? "bg-gradient-to-t from-green-600 to-green-400"
                    : "bg-gradient-to-t from-green-400 to-green-300 group-hover:from-green-500 group-hover:to-green-400"
                } transition-all duration-300`}
              />
              <div className="text-xs text-gray-500 mt-1">{item.month}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
