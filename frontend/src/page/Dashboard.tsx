import React from "react";
import Navbar from "../components/navigation/Navbar";
import FilterBar from "../components/filters/FilterBar";
import MetricsSection from "../components/dashboard/MetricsSection";
import StatisticsSection from "../components/dashboard/StatisticsSection";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <FilterBar />

        <div className="mt-8">
          <MetricsSection />
        </div>

        <StatisticsSection />
      </main>
    </div>
  );
};

export default Dashboard;
