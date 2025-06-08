
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  category: string;
}

const CalculatorCard = ({ title, description, icon: Icon, link, category }: CalculatorCardProps) => {
  return (
    <Link 
      to={link}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
    >
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 px-2 py-1 rounded">
            {category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
        <div className="mt-4">
          <span className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
            Calculate Now →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CalculatorCard;
