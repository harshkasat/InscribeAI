import React, { useState } from "react";
import Navbar from "../components/navigation/Navbar";
import FilterBar from "../components/filters/FilterBar";
import MetricsSection from "../components/dashboard/MetricsSection";
import StatisticsSection from "../components/dashboard/StatisticsSection";
import { navItems, timeOptions } from "@/data/mockData";

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState("Monthly");

  const handleExport = () => {
    console.log("Exporting data...");
    // Implementation would go here
  };

  const handleFilter = () => {
    console.log("Opening filter panel...");
    // Implementation would go here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar navItems={navItems} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <FilterBar
          onExport={handleExport}
          onFilter={handleFilter}
          timeOptions={timeOptions}
          currentTime={currentTime}
          onTimeChange={setCurrentTime}
        />

        <div className="mt-8">
          <MetricsSection />
        </div>

        <StatisticsSection />
      </main>
    </div>
  );
};

export default Dashboard;
