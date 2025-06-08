
import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';
import { Search } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Real Estate', 'Investment', 'Education', 'Personal Finance', 'Health'];
  
  const blogPosts = [
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
    },
    {
      title: "Student Loan Repayment Strategies That Actually Work",
      excerpt: "Explore different repayment options, forgiveness programs, and strategies to pay off student loans faster while maintaining financial health.",
      date: "Dec 4, 2024",
      category: "Education",
      readTime: "6 min",
      slug: "student-loan-repayment-strategies"
    },
    {
      title: "Building an Emergency Fund: How Much is Enough?",
      excerpt: "Learn the importance of emergency funds, how to calculate the right amount for your situation, and the best places to keep your emergency money.",
      date: "Dec 3, 2024",
      category: "Personal Finance",
      readTime: "4 min",
      slug: "building-emergency-fund"
    },
    {
      title: "Refinancing Your Mortgage: When Does It Make Sense?",
      excerpt: "Understand when refinancing can save you money, the costs involved, and how to determine if it's the right move for your financial situation.",
      date: "Dec 2, 2024",
      category: "Real Estate",
      readTime: "6 min",
      slug: "mortgage-refinancing-guide"
    },
    {
      title: "The Complete Guide to 401(k) Retirement Planning",
      excerpt: "Maximize your retirement savings with our comprehensive guide to 401(k) plans, including contribution limits, employer matching, and investment strategies.",
      date: "Dec 1, 2024",
      category: "Investment",
      readTime: "8 min",
      slug: "401k-retirement-planning"
    },
    {
      title: "Credit Score Improvement: From Poor to Excellent",
      excerpt: "Learn proven strategies to improve your credit score, understand what factors affect it most, and how to maintain excellent credit long-term.",
      date: "Nov 30, 2024",
      category: "Personal Finance",
      readTime: "5 min",
      slug: "credit-score-improvement"
    },
    {
      title: "Health Savings Account (HSA): The Triple Tax Advantage",
      excerpt: "Discover why HSAs are one of the best tax-advantaged accounts available and how to use them for both healthcare costs and retirement planning.",
      date: "Nov 29, 2024",
      category: "Health",
      readTime: "6 min",
      slug: "hsa-benefits-guide"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Financial Education Blog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Expert insights, practical tips, and comprehensive guides to help you make better financial decisions
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No articles found matching your criteria. Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600 dark:text-gray-300">
                  Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={index} {...post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Financial Tips
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Get our latest articles and financial insights delivered to your inbox weekly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
