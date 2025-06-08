
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import MortgageCalculator from "./pages/calculators/MortgageCalculator";
import GPACalculator from "./pages/calculators/GPACalculator";
import GpaImportance from "./pages/blog/GpaImportance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/gpa-importance-and-improvement-strategies" element={<GpaImportance />} />
                <Route path="/calculator/mortgage" element={<MortgageCalculator />} />
                <Route path="/calculator/gpa" element={<GPACalculator />} />
                <Route path="/calculator/loan" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Loan Calculator</h1><p className="text-gray-600">Coming Soon...</p></div></div>} />
                <Route path="/calculator/investment" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Investment Calculator</h1><p className="text-gray-600">Coming Soon...</p></div></div>} />
                <Route path="/calculator/bmi" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">BMI Calculator</h1><p className="text-gray-600">Coming Soon...</p></div></div>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
