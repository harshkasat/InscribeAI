import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    step: 1,
    title: "Choose Your Topic",
    description: "Enter your blog topic or keyword. Our AI will analyze trending topics and suggest the best approach.",
    color: "bg-blue-500"
  },
  {
    step: 2,
    title: "Customize Settings",
    description: "Select tone, style, length, and target audience. Add any specific requirements or guidelines.",
    color: "bg-purple-500"
  },
  {
    step: 3,
    title: "Generate Content",
    description: "Our AI creates your blog post with proper structure, SEO optimization, and engaging content.",
    color: "bg-green-500"
  },
  {
    step: 4,
    title: "Edit & Publish",
    description: "Review, edit if needed, and publish. Export to your favorite platform or copy to clipboard.",
    color: "bg-orange-500"
  }
];

export const HowToUse = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">How It Works</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How to Use AI Blog Writer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in just four simple steps and create professional blog content in minutes
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className={`flex items-center gap-8 mb-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}>
                          {step.step}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex-1 hidden lg:block">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className={`h-8 ${step.color} bg-opacity-20 rounded flex items-center justify-center`}>
                        <span className={`text-sm font-medium ${step.color.replace('bg-', 'text-')}`}>
                          Step {step.step} Preview
                        </span>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex justify-center mb-8">
                  <div className="w-1 h-8 bg-gray-300 rounded"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of content creators who trust our AI Blog Writer
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors">
                Start Writing Now - Free Trial
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};