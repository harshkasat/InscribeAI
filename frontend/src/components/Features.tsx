import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, Globe, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate high-quality content in under 60 seconds with our advanced AI algorithms."
  },
  {
    icon: Target,
    title: "SEO Optimized",
    description: "Built-in SEO optimization ensures your content ranks higher in search results."
  },
  {
    icon: Globe,
    title: "Multiple Languages",
    description: "Support for 25+ languages to reach a global audience with your content."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together with your team members on content creation and editing."
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose AI Blog Writer Tool Over Traditional Methods?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of content creation with features designed to boost your productivity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">AI Blog Writer</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  60 seconds to create
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  SEO optimized
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Multiple formats
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-2">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Traditional Writing</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Hours of research
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Manual SEO work
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Limited templates
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-2">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Other AI Tools</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Generic content
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Limited customization
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Poor formatting
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};