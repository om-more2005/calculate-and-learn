
import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AdSpace from '../../components/AdSpace';

const InvestmentCalculator = () => {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [timeHorizon, setTimeHorizon] = useState(30);
  const [compoundFrequency, setCompoundFrequency] = useState(12);
  const [results, setResults] = useState({
    finalAmount: 0,
    totalContributions: 0,
    totalEarnings: 0
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    calculateInvestment();
  }, [initialAmount, monthlyContribution, expectedReturn, timeHorizon, compoundFrequency]);

  const calculateInvestment = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = timeHorizon * 12;
    
    let balance = initialAmount;
    const data = [];
    
    for (let month = 0; month <= totalMonths; month++) {
      if (month > 0) {
        // Add monthly contribution
        balance += monthlyContribution;
        // Apply compound interest
        balance *= (1 + monthlyRate);
      }
      
      // Add data point for chart (every 12 months)
      if (month % 12 === 0) {
        const year = month / 12;
        const totalContributions = initialAmount + (monthlyContribution * month);
        data.push({
          year,
          balance: Math.round(balance),
          contributions: totalContributions,
          earnings: Math.round(balance - totalContributions)
        });
      }
    }

    const totalContributions = initialAmount + (monthlyContribution * totalMonths);
    const totalEarnings = balance - totalContributions;

    setResults({
      finalAmount: balance,
      totalContributions,
      totalEarnings
    });
    
    setChartData(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Investment Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate compound interest and investment returns over time with various contribution scenarios
          </p>
        </div>

        {/* Ad Space */}
        <AdSpace size="leaderboard" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Investment Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Initial Investment
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Contribution
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Annual Return (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Horizon (years)
                </label>
                <input
                  type="number"
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Ad Space */}
            <div className="mt-6">
              <AdSpace size="rectangle" />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="bg-green-600 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Final Amount</h2>
              <div className="text-4xl font-bold mb-2">
                ${results.finalAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <p className="text-green-100">Your investment value after {timeHorizon} years</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Investment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Contributions:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${results.totalContributions.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Earnings:</span>
                  <span className="font-semibold text-green-600">
                    ${results.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Return on Investment:</span>
                  <span className="font-semibold text-green-600">
                    {results.totalContributions > 0 ? ((results.totalEarnings / results.totalContributions) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Growth Chart */}
        {chartData.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Investment Growth Over Time</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, '']}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Total Balance"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="contributions" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Total Contributions"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Total Earnings"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Educational Content */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Understanding Compound Interest</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">The Power of Time</h4>
              <p>Compound interest is often called the "eighth wonder of the world." Starting early allows your money more time to grow exponentially through compounding returns.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Regular Contributions</h4>
              <p>Making consistent monthly contributions can significantly boost your investment growth through dollar-cost averaging and increased compound interest.</p>
            </div>
          </div>
        </div>

        {/* Ad Space */}
        <div className="mt-8">
          <AdSpace size="leaderboard" />
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
