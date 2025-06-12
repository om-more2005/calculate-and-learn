
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
            <Calculator className="h-8 w-8 text-blue-600" />
            <span className="text-gray-900 dark:text-white">CalcHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors flex items-center">
                Calculators
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/calculator/mortgage" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Mortgage Calculator
                </Link>
                <Link to="/calculator/loan" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Loan Calculator
                </Link>
                <Link to="/calculator/gpa" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  GPA Calculator
                </Link>
                <Link to="/calculator/bmi" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  BMI Calculator
                </Link>
                <Link to="/calculator/calorie" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Calorie Calculator
                </Link>
                <Link to="/calculator/scientific" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Scientific Calculator
                </Link>
                <Link to="/calculator/timezone" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Timezone Calculator
                </Link>
              </div>
            </div>
            <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
              Blog
            </Link>
          </nav>

          {/* Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <Link to="/" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Home
            </Link>
            <div className="py-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Calculators</span>
              <div className="ml-4 mt-2 space-y-2">
                <Link to="/calculator/mortgage" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  Mortgage Calculator
                </Link>
                <Link to="/calculator/loan" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  Loan Calculator
                </Link>
                <Link to="/calculator/gpa" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  GPA Calculator
                </Link>
                <Link to="/calculator/bmi" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  BMI Calculator
                </Link>
                <Link to="/calculator/calorie" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  Calorie Calculator
                </Link>
                <Link to="/calculator/scientific" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  Scientific Calculator
                </Link>
                <Link to="/calculator/timezone" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  Timezone Calculator
                </Link>
              </div>
            </div>
            <Link to="/blog" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Blog
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
