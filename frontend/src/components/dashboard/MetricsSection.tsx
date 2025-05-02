import React from "react";
import { motion } from "framer-motion";
import MetricCard from "../metrics/MetricCard";
import ProgressChart from "../charts/ProgressChart";
import { revenueData, purchaseData, salesTargetData } from "@/data/mockData";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const MetricsSection: React.FC = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <motion.div
        variants={item}
        className="bg-gradient-to-br from-green-400 via-green-500 to-teal-500 rounded-lg text-white shadow-sm"
      >
        <MetricCard
          title={revenueData.title}
          value={revenueData.value}
          change={revenueData.change}
        />
      </motion.div>

      <motion.div
        variants={item}
        className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm"
      >
        <MetricCard
          title={purchaseData.title}
          value={purchaseData.value}
          change={purchaseData.change}
        />
      </motion.div>

      <motion.div
        variants={item}
        className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm"
      >
        <div className="p-6">
          <h3 className="text-xl font-medium mb-2">{salesTargetData.title}</h3>
          <div className="text-4xl font-bold mb-4">{salesTargetData.value}</div>
          <ProgressChart
            current={salesTargetData.current}
            target={salesTargetData.target}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MetricsSection;
