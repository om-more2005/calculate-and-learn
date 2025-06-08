
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl mb-4">
              <Calculator className="h-8 w-8 text-blue-400" />
              <span>CalcHub</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your go-to destination for financial calculators and educational content. 
              Make informed decisions with our free tools and expert insights.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Calculators</h3>
            <ul className="space-y-2">
              <li><Link to="/calculator/mortgage" className="text-gray-400 hover:text-white transition-colors">Mortgage Calculator</Link></li>
              <li><Link to="/calculator/gpa" className="text-gray-400 hover:text-white transition-colors">GPA Calculator</Link></li>
              <li><Link to="/calculator/loan" className="text-gray-400 hover:text-white transition-colors">Loan Calculator</Link></li>
              <li><Link to="/calculator/investment" className="text-gray-400 hover:text-white transition-colors">Investment Calculator</Link></li>
              <li><Link to="/calculator/bmi" className="text-gray-400 hover:text-white transition-colors">BMI Calculator</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Financial Blog</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Investment Tips</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Mortgage Guide</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Loan Advice</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 CalcHub. All rights reserved. Free financial calculators and educational content.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
