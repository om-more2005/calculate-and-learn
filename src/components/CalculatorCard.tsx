
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
    <Link to={link} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full">
        <div className="flex items-center mb-4">
          <Icon className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <span className="text-sm text-blue-600 dark:text-blue-400">{category}</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    </Link>
  );
};

export default CalculatorCard;
