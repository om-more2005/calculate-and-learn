
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Home, Lightbulb, User, TrendingUp, Activity, Clock, Globe, DollarSign } from 'lucide-react';
import CalculatorCard from '../components/CalculatorCard';
import AdSpace from '../components/AdSpace';

const Calculators = () => {
  const calculators = [
    {
      title: "Mortgage Calculator",
      description: "Calculate monthly payments, total interest, and amortization schedules for your home loan.",
      icon: Home,
      link: "/calculator/mortgage",
      category: "Real Estate"
    },
    {
      title: "GPA Calculator",
      description: "Calculate your Grade Point Average with support for different grading scales and credit hours.",
      icon: Lightbulb,
      link: "/calculator/gpa",
      category: "Education"
    },
    {
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index and understand your health status with detailed insights.",
      icon: User,
      link: "/calculator/bmi",
      category: "Health"
    },
    {
      title: "Loan Calculator",
      description: "Calculate payments for personal loans, auto loans, and other installment loans.",
      icon: DollarSign,
      link: "/calculator/loan",
      category: "Finance"
    },
    {
      title: "Investment Calculator",
      description: "Calculate compound interest and investment returns over time with various contribution scenarios.",
      icon: TrendingUp,
      link: "/calculator/investment",
      category: "Finance"
    },
    {
      title: "Calorie Calculator",
      description: "Calculate your daily caloric needs based on activity level and goals.",
      icon: Activity,
      link: "/calculator/calorie",
      category: "Health"
    },
    {
      title: "Scientific Calculator",
      description: "Advanced calculator with scientific functions for complex calculations.",
      icon: Calculator,
      link: "/calculator/scientific",
      category: "Math"
    },
    {
      title: "Timezone Calculator",
      description: "Convert time between different timezones for global scheduling.",
      icon: Clock,
      link: "/calculator/timezone",
      category: "Utility"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Financial Calculators
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Choose from our comprehensive suite of calculators to help you make informed financial decisions
          </p>
        </div>
      </section>

      {/* Ad Space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <AdSpace size="leaderboard" />
      </div>

      {/* Calculators Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {calculators.map((calc, index) => (
              <React.Fragment key={index}>
                <CalculatorCard {...calc} />
                {/* Ad space after every 4 calculators */}
                {(index + 1) % 4 === 0 && index < calculators.length - 1 && (
                  <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
                    <AdSpace size="banner" className="my-4" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <AdSpace size="leaderboard" />
      </div>
    </div>
  );
};

export default Calculators;
