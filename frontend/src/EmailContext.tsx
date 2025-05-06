import React, { createContext, useContext, useEffect, useState } from "react";

type EmailContextType = {
  email: string;
  setEmail: (email: string) => void;
};

const EmailContext = createContext<EmailContextType>({
  email: "",
  setEmail: () => {},
});

const EMAIL_KEY = "user_email";
const EMAIL_EXPIRY_KEY = "user_email_expiry";

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmailState] = useState(() => {
    // Try to initialize from localStorage during the initial render
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem(EMAIL_KEY);
      const expiry = localStorage.getItem(EMAIL_EXPIRY_KEY);
      
      if (savedEmail && expiry && new Date().getTime() < parseInt(expiry)) {
        return savedEmail;
      }
    }
    return "";
  });

  // This will still run after mount to handle any cleanup or updates
  useEffect(() => {
    // Skip if we're not in a browser environment
    if (typeof window === "undefined") return;
    
    const savedEmail = localStorage.getItem(EMAIL_KEY);
    const expiry = localStorage.getItem(EMAIL_EXPIRY_KEY);

    if (savedEmail && expiry) {
      if (new Date().getTime() < parseInt(expiry)) {
        setEmailState(savedEmail);
      } else {
        // Clear expired data
        localStorage.removeItem(EMAIL_KEY);
        localStorage.removeItem(EMAIL_EXPIRY_KEY);
      }
    }
  }, []);

  const setEmail = (newEmail: string) => {
    setEmailState(newEmail);
    
    if (typeof window !== "undefined") {
      if (newEmail) {
        // Set expiry to 1 day from now
        const expiry = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day in ms
        localStorage.setItem(EMAIL_KEY, newEmail);
        localStorage.setItem(EMAIL_EXPIRY_KEY, expiry.toString());
      } else {
        // If email is empty or null, remove from localStorage
        localStorage.removeItem(EMAIL_KEY);
        localStorage.removeItem(EMAIL_EXPIRY_KEY);
      }
    }
  };

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => useContext(EmailContext);