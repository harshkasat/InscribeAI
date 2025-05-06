import React, { useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Header from "../components/filters/FilterBar";
import MetricsSection from "../components/dashboard/MetricsSection";
import BlogListSection from "@/components/dashboard/BlogListSection";
import { getEmailFromLocalStorage } from "@/utils/getUserEmailFromLocalStorage";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const email = getEmailFromLocalStorage();
    console.log("Dashboard component rendered: " + email);

    if (!email || email.trim() === "") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        <div className="mt-8">
          <MetricsSection />
        </div>
        <div className="mt-8">
          <BlogListSection/>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
