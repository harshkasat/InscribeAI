import { motion } from "framer-motion";
import { Loader2, ChefHat } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8"
      >
        {/* Main Loading Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl"
        >
          <ChefHat className="w-12 h-12 text-white" />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Loading...
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Kindly wait for some time while we prepare everything for you
          </p>
        </motion.div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [-8, 8, -8] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            />
          ))}
        </div>

        {/* Secondary Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center space-x-2 text-gray-500"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Processing your request...</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loading;