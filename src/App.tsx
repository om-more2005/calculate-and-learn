
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Index from './pages/Index';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';
import Calculators from './pages/Calculators';
import MortgageCalculator from './pages/calculators/MortgageCalculator';
import GPACalculator from './pages/calculators/GPACalculator';
import BMICalculator from './pages/calculators/BMICalculator';
import LoanCalculator from './pages/calculators/LoanCalculator';
import InvestmentCalculator from './pages/calculators/InvestmentCalculator';
import CalorieCalculator from './pages/calculators/CalorieCalculator';
import ScientificCalculator from './pages/calculators/ScientificCalculator';
import TimezoneCalculator from './pages/calculators/TimezoneCalculator';
import HealthyWeightManagement from './pages/blog/HealthyWeightManagement';
import GpaImportance from './pages/blog/GpaImportance';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/healthy-weight-management" element={<HealthyWeightManagement />} />
            <Route path="/blog/gpa-importance-and-improvement-strategies" element={<GpaImportance />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/calculator/mortgage" element={<MortgageCalculator />} />
            <Route path="/calculator/gpa" element={<GPACalculator />} />
            <Route path="/calculator/bmi" element={<BMICalculator />} />
            <Route path="/calculator/loan" element={<LoanCalculator />} />
            <Route path="/calculator/investment" element={<InvestmentCalculator />} />
            <Route path="/calculator/calorie" element={<CalorieCalculator />} />
            <Route path="/calculator/scientific" element={<ScientificCalculator />} />
            <Route path="/calculator/timezone" element={<TimezoneCalculator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
