import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MetricCard from "../metrics/MetricCard";
import ProgressChart from "../charts/ProgressChart";
import { CreateBlog, YouTubeBlog, Credits } from "@/data/mockData";
import { BlogGeneratorForm } from "../BlogGeneratorForm";
import { toast } from "sonner";
import { getEmailFromLocalStorage } from "@/utils/getUserEmailFromLocalStorage";

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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(0);
  const [formConfig, setFormConfig] = useState<{
    type: "website" | "youtube";
    title: string;
    subtitle: string;
    percentage: string;
  } | null>(null);

  const handleBlogForm = (type: "website" | "youtube", title: string, subtitle: string, percentage: string) => {
    setFormConfig({ type, title, subtitle, percentage });
    setOpen(true);
  }

  useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const res = await fetch(
            `http://127.0.0.1:8000/api/v1/db_operation/check_credits/?user_email=${getEmailFromLocalStorage() || "example.com"}`
          );
          if (!res.ok) throw new Error("Failed to fetch blogs");
          const data = await res.json();
          setCredits(data['user_details']['credits']); // assumes API returns an array of blogs
  
          // setBlogs(data); // assumes API returns an array of blogs
          setLoading(false);
        } catch (err) {
          toast("Error loading blogs", {
            description: (err as Error).message,
          });
        }
      };
  
      fetchBlogs();
    }, []);
  
    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg font-semibold">Loading blogs...</p>
        </div>
      );
    }

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div
          variants={item}
          className="bg-gradient-to-br from-green-400 via-green-500 to-teal-500 rounded-lg text-white shadow-sm cursor-pointer"

        >
          <MetricCard
            title={CreateBlog.title}
            value={CreateBlog.value}
            change={CreateBlog.change}
            onClick={() => handleBlogForm("website", "Create Blog", "Using Website Link", "170%")}
          />
        </motion.div>

        <motion.div
          variants={item}
          className="bg-gradient-to-br from-green-400 via-green-500 to-teal-500 rounded-lg text-white shadow-sm cursor-pointer"
        >
          <MetricCard
            title={YouTubeBlog.title}
            value={YouTubeBlog.value}
            change={YouTubeBlog.change}
            onClick={() => handleBlogForm("youtube", "Create YouTube Blog", "Using YouTube Video", "200%")}
          />
        </motion.div>

        <motion.div
          variants={item}
          className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm"
        >
          <div className="p-6">
            <h3 className="text-xl font-medium mb-2">{Credits.title}</h3>
            <div className="text-4xl font-bold mb-4">{credits} / {Credits.target}</div>
            <ProgressChart
              current={Credits.current}
              target={Credits.target}
            />
          </div>
        </motion.div>
      </motion.div>

      {open && formConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl">
            <BlogGeneratorForm
              type={formConfig.type}
              title={formConfig.title}
              subtitle={formConfig.subtitle}
              percentage={formConfig.percentage}
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MetricsSection;
