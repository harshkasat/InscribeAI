import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
} from "@clerk/clerk-react";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Benefits } from "./components/Benefits";
import { HowToUse } from "./components/HowToUse";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Hero />
      <Features />
      <Benefits />
      <HowToUse />
      <FAQ />
      <Footer />
      {/* <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex gap-4 mt-8">
          <SignInButton mode="modal" appearance={{ elements: { socialButtonsBlockButton: "bg-[#9AE66E] text-white" } }} />
          <SignUpButton mode="modal" appearance={{ elements: { socialButtonsBlockButton: "bg-[#9AE66E] text-white" } }} />
        </div>
      </main> */}
    </div>
  );
}

export default App;
