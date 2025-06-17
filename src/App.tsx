
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Index from './pages/Index';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';
import MortgageCalculator from './pages/calculators/MortgageCalculator';
import GPACalculator from './pages/calculators/GPACalculator';
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
            <Route path="/calculator/mortgage" element={<MortgageCalculator />} />
            <Route path="/calculator/gpa" element={<GPACalculator />} />
            <Route path="/calculator/loan" element={<ComingSoon title="Loan Calculator" />} />
            <Route path="/calculator/investment" element={<ComingSoon title="Investment Calculator" />} />
            <Route path="/calculator/bmi" element={<ComingSoon title="BMI Calculator" />} />
            <Route path="/calculator/calorie" element={<ComingSoon title="Calorie Calculator" />} />
            <Route path="/calculator/scientific" element={<ComingSoon title="Scientific Calculator" />} />
            <Route path="/calculator/timezone" element={<ComingSoon title="Timezone Calculator" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

// Simple Coming Soon component for calculators not yet implemented
const ComingSoon = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Coming Soon...</p>
      <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Back to Home
      </a>
    </div>
  </div>
);

export default App;
