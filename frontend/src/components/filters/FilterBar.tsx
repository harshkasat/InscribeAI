import React, { useState } from "react";
import { Download, Filter, ChevronDown } from "lucide-react";
import Button from "../ui/Button";

interface FilterBarProps {
  onExport: () => void;
  onFilter: () => void;
  timeOptions: string[];
  currentTime: string;
  onTimeChange: (time: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onExport,
  onFilter,
  timeOptions,
  currentTime,
  onTimeChange,
}) => {
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sales Overview</h1>
        <p className="text-gray-500">
          Analyze sales trends to make data-driven decisions
        </p>
      </div>

      <div className="flex items-center space-x-2">
        {/* Time period dropdown */}
        <div className="relative">
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center"
            onClick={() => setIsTimeOpen(!isTimeOpen)}
          >
            {currentTime}
            <ChevronDown size={16} className="ml-2" />
          </button>

          {isTimeOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10 py-1">
              {timeOptions.map((option, index) => (
                <button
                  key={index}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    onTimeChange(option);
                    setIsTimeOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export button */}
        <Button
          variant="outline"
          leftIcon={<Download size={16} />}
          onClick={onExport}
        >
          Export
        </Button>

        {/* Filter button */}
        <Button
          variant="primary"
          leftIcon={<Filter size={16} />}
          className="bg-green-500 hover:bg-green-600"
          onClick={onFilter}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
