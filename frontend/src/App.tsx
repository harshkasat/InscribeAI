import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StrategicGrowth from "./components/StrategicGrowth";
import InnovativeSolutions from "./components/InnvoativeSolution";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { EmailProvider } from "./EmailContext";

function App() {
  return (
    
    <EmailProvider>
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <StrategicGrowth />
          <InnovativeSolutions />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </EmailProvider>
  );
}

export default App;
