
import React from 'react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
}

const BlogCard = ({ title, excerpt, date, category, readTime, slug }: BlogCardProps) => {
  return (
    <Link to={`/blog/${slug}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{category}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{readTime}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
          <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Read more →</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
