import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StrategicGrowth from './components/StrategicGrowth';
import InnovativeSolutions from './components/InnvoativeSolution';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
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
  );
}

export default App;