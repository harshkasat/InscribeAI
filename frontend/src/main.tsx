import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { SimpleEditor } from "./TipTap/simple-editor.tsx";
import { Toaster } from "@/components/ui/sonner"
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Dashboard from "./components/pages/Dashboard.tsx";
import ComingSoon from "./components/pages/ComingSoon.tsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/editor/:blogId" element={<SimpleEditor />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
