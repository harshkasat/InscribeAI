import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, Users, Shield } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Get More Done in Less Time",
    description: "Our AI Blog Writer is 10x faster than traditional writing methods. Create comprehensive blog posts in minutes, not hours.",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: TrendingUp,
    title: "Rank Higher with SEO-Optimized Content",
    description: "Every piece includes built-in SEO optimization with keyword integration and meta descriptions.",
    color: "from-blue-400 to-cyan-500"
  },
  {
    icon: Users,
    title: "Scale Your Content Marketing",
    description: "Produce consistent, high-quality content at scale. Perfect for businesses and content creators.",
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: Shield,
    title: "Original Content Guaranteed",
    description: "All content is plagiarism-free and original. Built-in fact-checking ensures accuracy.",
    color: "from-orange-400 to-red-500"
  }
];

export const Benefits = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Content Strategy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our AI-powered platform can revolutionize your content creation process
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">10x</div>
            <div className="text-gray-600">Faster Writing</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Time Saved</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600">Happy Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
