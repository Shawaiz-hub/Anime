
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for a short period
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    // Reset loading state on route change
    setIsLoading(true);

    // Clear the timer when the component unmounts or location changes
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Add padding-top to account for the fixed navbar */}
      <main className={`flex-grow pt-16 ${isLoading ? 'opacity-0' : 'opacity-100 animate-fade-in'} transition-opacity duration-500`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
