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
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Customer Satisfaction */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">Customer Satisfaction</h3>
          <button className="text-gray-400">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <circle cx="19" cy="12" r="2" fill="currentColor" />
              <circle cx="5" cy="12" r="2" fill="currentColor" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">Top Positive Feedback</p>

        {/* This would be a custom component in a real implementation */}
        <div className="flex justify-center">
          <img
            src="https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=600"
            alt="Customer Satisfaction"
            className="max-w-full h-auto"
            style={{ maxHeight: "160px", opacity: 0.1 }}
          />
        </div>

        <div className="text-center mt-4">
          <div className="text-4xl font-bold">250</div>
          <div className="text-sm text-gray-500">Responses this month</div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-sm font-medium flex items-center">
            <span className="block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
            <span>High</span>
          </div>
          <div className="text-sm font-medium flex items-center">
            <span className="block w-3 h-3 bg-gray-300 rounded-full mr-1"></span>
            <span>Low</span>
          </div>
        </div>

        <div className="mt-4 flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          12% Customer Satisfaction (CSAT) 4.7/5
        </div>

        <p className="mt-4 text-gray-600 italic text-sm">
          "Exceptional support and quick responses"
        </p>
      </div>

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
