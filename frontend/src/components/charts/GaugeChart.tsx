import React from "react";
import { SatisfactionData } from "../../types";

interface GaugeChartProps {
  data: SatisfactionData;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ data }) => {
  const percentage = (data.score / data.maxScore) * 100;
  const segments = 12;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-[180px] h-[100px] overflow-hidden">
        <div className="absolute w-[180px] h-[180px] rounded-full border-[20px] border-gray-200" />

        {/* Colored segments */}
        <div className="absolute w-[180px] h-[180px]">
          {Array.from({ length: segments }).map((_, i) => {
            const segmentPercentage = ((i + 1) / segments) * 100;
            const isActive = segmentPercentage <= percentage;
            const rotation = (i / segments) * 180;

            return (
              <div
                key={i}
                className={`absolute top-0 left-[80px] w-[20px] h-[90px] origin-bottom ${
                  isActive ? "bg-teal-600" : "bg-gray-200"
                }`}
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            );
          })}
        </div>
      </div>

      {/* Value */}
      <div className="text-center mt-2">
        <div className="text-4xl font-bold">{data.score}</div>
        <div className="text-sm text-gray-500">Responses this month</div>
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between w-full mt-4">
        <div className="text-sm font-medium flex items-center">
          <span className="block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
          <span>High</span>
        </div>
        <div className="text-sm font-medium flex items-center">
          <span className="block w-3 h-3 bg-gray-300 rounded-full mr-1"></span>
          <span>Low</span>
        </div>
      </div>

      {/* Change indicator */}
      <div className="mt-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
        {data.change.direction === "up" ? "↑" : "↓"} {data.change.value}{" "}
        Customer Satisfaction (CSAT) 4.7/5
      </div>

      {/* Feedback */}
      <div className="mt-4 text-gray-600 italic">"{data.feedback}"</div>
    </div>
  );
};

export default GaugeChart;
