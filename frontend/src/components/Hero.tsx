import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Play } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/clerk-react";


export const Hero = () => {
  const { openSignIn } = useClerk();
  const clickSignInHandler = () => {
    openSignIn({ 
      appearance: { 
        elements: { 
          socialButtonsBlockButton: "bg-[#9AE66E] text-white" 
        } 
      } 
    });
  }
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 overflow-hidden">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:70px_70px]",
          "[background-image:linear-gradient(to_right,#c0c0c2_1px,transparent_1px),linear-gradient(to_bottom,#a4a4a6_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-blue-500 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,white)] "></div>

      
      {/* Hero Section */}
      
      <div className="relative container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-16"
          >
            <div className="text-white font-bold text-xl">Inscribe AI</div>
            <div className="flex items-center space-x-6">
              <a href="/coming-soon" className="text-white/90 hover:text-white transition-colors">Features</a>
              <a href="/coming-soon" className="text-white/90 hover:text-white transition-colors">Pricing</a>
              <a href="/coming-soon" className="text-white/90 hover:text-white transition-colors">About</a>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={clickSignInHandler}>
                Sign In
              </Button>
            </div>
          </motion.nav>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Use AI Blog Writer to create long-form content in{" "}
              <span className="text-blue-200">60 Seconds</span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Transform your ideas into engaging, SEO-optimized blog posts with our advanced AI writing assistant. 
              Save hours of writing time while maintaining quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold">
                Start Writing for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-6 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-blue-200 text-sm">
              <span>✓ No credit card required</span>
              <span>✓ 2,000 words free</span>
              <span>✓ Cancel anytime</span>
            </div>
          </motion.div>

          {/* Hero Image/Demo */}
          <ContainerScroll>
            <img
              src="public/dashboard-img.png"
              alt="hero"
              height={2000}
              width={4000}
              className="mx-auto rounded-2xl object-cover h-[100rem] md:h-[48rem] w-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
};