import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import BarChart from "@/components/charts/BarChart";
import { monthlyData } from "@/data/mockData";

const StatisticsSection: React.FC = () => {
  // @ts-ignore
  const [timeFrame, setTimeFrame] = useState("Yearly");
  // @ts-ignore
  const [chartView, setChartView] = useState("Customer Satisfaction");
  // @ts-ignore
  const [activeMonth, setActiveMonth] = useState("Jun");

  return (
    <div className="mt-8">
      {/* Statistics Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-xl font-medium mb-2 md:mb-0">Statistics</h3>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                {chartView}
                <ChevronDown size={16} className="ml-2" />
              </button>
            </div>

            <div className="relative">
              <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                Summary
                <ChevronDown size={16} className="ml-2" />
              </button>
            </div>

            <div className="relative">
              <button className="bg-teal-800 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                {timeFrame}
                <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Value indicator for active month */}
        {activeMonth === "Jun" && (
          <div className="flex justify-center">
            <div className="bg-green-600 text-white rounded px-3 py-1 text-sm mb-2">
              $720.00
            </div>
          </div>
        )}

        {/* Chart */}
        <BarChart
          data={monthlyData}
          height={280}
          activeMonth={activeMonth}
          showValues={true}
        />
      </div>
    </div>
  );
};

export default StatisticsSection;
