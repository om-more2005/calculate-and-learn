
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Home, Lightbulb, User, TrendingUp, Activity, Clock, Globe } from 'lucide-react';
import CalculatorCard from '../components/CalculatorCard';
import BlogCard from '../components/BlogCard';
import AdSpace from '../components/AdSpace';

const Index = () => {
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
      title: "Loan Calculator",
      description: "Calculate payments for personal loans, auto loans, and other installment loans.",
      icon: Calculator,
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
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index and understand your health status with detailed insights.",
      icon: User,
      link: "/calculator/bmi",
      category: "Health"
    }
  ];

  const allCalculators = [
    ...calculators,
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

  const featuredPosts = [
    {
      title: "Healthy Weight Management: Your Complete Guide to BMI and Wellness",
      excerpt: "Learn evidence-based strategies for maintaining a healthy weight, understanding BMI, and making sustainable lifestyle changes for long-term wellness.",
      date: "Dec 9, 2024",
      category: "Health",
      readTime: "8 min",
      slug: "healthy-weight-management"
    },
    {
      title: "10 Essential Tips for First-Time Home Buyers",
      excerpt: "Navigate the complex world of home buying with confidence. Learn about down payments, mortgage types, and hidden costs that could impact your budget.",
      date: "Dec 6, 2024",
      category: "Real Estate",
      readTime: "5 min",
      slug: "first-time-home-buyer-tips"
    },
    {
      title: "Understanding Compound Interest: The 8th Wonder of the World",
      excerpt: "Discover how compound interest can work for or against you. Learn strategies to maximize your investment returns and minimize debt costs.",
      date: "Dec 5, 2024",
      category: "Investment",
      readTime: "7 min",
      slug: "understanding-compound-interest"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Free Financial Calculators & Education
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Make smarter financial decisions with our comprehensive suite of calculators and expert educational content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/calculator/mortgage"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Try Our Calculators
            </Link>
            <Link 
              to="/blog"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <AdSpace size="leaderboard" />
      </div>

      {/* Calculators Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Calculators
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our most-used financial calculators to help you make informed decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc, index) => (
              <React.Fragment key={index}>
                <CalculatorCard {...calc} />
                {/* Ad space after every 3 calculators */}
                {index === 2 && (
                  <div className="md:col-span-2 lg:col-span-3">
                    <AdSpace size="banner" className="my-4" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Need more calculators? We have tools for every financial situation.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Financial Insights
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay informed with our expert analysis and practical financial advice
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>

          {/* Ad Space */}
          <AdSpace size="banner" className="mb-8" />
          
          <div className="text-center">
            <Link 
              to="/blog"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Start Making Better Financial Decisions Today
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who trust our calculators and educational content for their financial planning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/calculator/mortgage"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Calculate Your Mortgage
            </Link>
            <Link 
              to="/calculator/investment"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Plan Your Investments
            </Link>
          </div>
        </div>
      </section>

      {/* All Calculators Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              All Available Calculators
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Access our complete suite of calculators for all your calculation needs
            </p>
          </div>

          {/* Ad Space */}
          <AdSpace size="leaderboard" className="mb-12" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {allCalculators.map((calc, index) => (
              <Link
                key={index}
                to={calc.link}
                className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg p-4 text-center transition-colors group"
              >
                <calc.icon className="h-8 w-8 mx-auto mb-2 text-blue-600 group-hover:text-blue-700" />
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  {calc.title}
                </h3>
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  {calc.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
