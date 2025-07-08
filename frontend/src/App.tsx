import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Benefits } from "./components/Benefits";
import { HowToUse } from "./components/HowToUse";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Hero />
      <Features />
      <Benefits />
      <HowToUse />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
