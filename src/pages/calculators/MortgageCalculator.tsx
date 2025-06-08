
import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [insurance, setInsurance] = useState(1200);
  const [pmi, setPmi] = useState(250);

  const [results, setResults] = useState({
    monthlyPayment: 0,
    principalAndInterest: 0,
    totalPayment: 0,
    totalInterest: 0,
    loanAmount: 0
  });

  const [yearlyBreakdown, setYearlyBreakdown] = useState([]);

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, loanTerm, interestRate, propertyTax, insurance, pmi]);

  const calculateMortgage = () => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    let monthlyPrincipalInterest = 0;
    if (monthlyRate > 0) {
      monthlyPrincipalInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                                (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyPrincipalInterest = loanAmount / numPayments;
    }

    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyPMI = loanAmount < homePrice * 0.8 ? pmi : 0;
    
    const totalMonthlyPayment = monthlyPrincipalInterest + monthlyTax + monthlyInsurance + monthlyPMI;
    const totalPayment = monthlyPrincipalInterest * numPayments;
    const totalInterest = totalPayment - loanAmount;

    setResults({
      monthlyPayment: totalMonthlyPayment,
      principalAndInterest: monthlyPrincipalInterest,
      totalPayment,
      totalInterest,
      loanAmount
    });

    // Calculate yearly breakdown
    const yearlyData = [];
    let remainingBalance = loanAmount;
    
    for (let year = 1; year <= loanTerm; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      
      for (let month = 1; month <= 12; month++) {
        if (remainingBalance > 0) {
          const monthlyInterestPayment = remainingBalance * monthlyRate;
          const monthlyPrincipalPayment = monthlyPrincipalInterest - monthlyInterestPayment;
          
          yearlyInterest += monthlyInterestPayment;
          yearlyPrincipal += monthlyPrincipalPayment;
          remainingBalance -= monthlyPrincipalPayment;
        }
      }
      
      yearlyData.push({
        year,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.round(Math.max(0, remainingBalance)),
        totalPayment: Math.round(yearlyPrincipal + yearlyInterest),
      });
      
      if (remainingBalance <= 0) break;
    }
    
    setYearlyBreakdown(yearlyData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Home className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Mortgage Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate your monthly mortgage payment including principal, interest, taxes, and insurance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Loan Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Home Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Down Payment
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {((downPayment / homePrice) * 100).toFixed(1)}% of home price
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Loan Term (years)
                  </label>
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Additional Costs</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Property Tax (annual)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Home Insurance (annual)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={insurance}
                        onChange={(e) => setInsurance(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      PMI (monthly)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={pmi}
                        onChange={(e) => setPmi(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    {downPayment >= homePrice * 0.2 && (
                      <p className="text-sm text-green-600 mt-1">PMI not required (20%+ down payment)</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Monthly Payment */}
            <div className="bg-blue-600 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Monthly Payment</h2>
              <div className="text-4xl font-bold mb-2">
                ${results.monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <p className="text-blue-100">Total monthly payment including PITI</p>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Payment Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Principal & Interest:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${results.principalAndInterest.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Property Tax:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${(propertyTax / 12).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Home Insurance:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${(insurance / 12).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                {results.loanAmount < homePrice * 0.8 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">PMI:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${pmi.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Loan Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Loan Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Loan Amount:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${results.loanAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total of Payments:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${results.totalPayment.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Interest:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${results.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yearly Breakdown Chart */}
        {yearlyBreakdown.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Payment Breakdown Over Time</h3>
            <div className="h-96 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
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
                    dataKey="principal" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Principal Payment"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="interest" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Interest Payment"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Remaining Balance"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Yearly Breakdown Table */}
        {yearlyBreakdown.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Yearly Payment Schedule</h3>
            <div className="overflow-auto max-h-96">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Total Payment</TableHead>
                    <TableHead>Remaining Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yearlyBreakdown.map((year) => (
                    <TableRow key={year.year}>
                      <TableCell className="font-medium">{year.year}</TableCell>
                      <TableCell>${year.principal.toLocaleString()}</TableCell>
                      <TableCell>${year.interest.toLocaleString()}</TableCell>
                      <TableCell>${year.totalPayment.toLocaleString()}</TableCell>
                      <TableCell>${year.balance.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Educational Content */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Understanding Your Mortgage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Principal & Interest</h4>
              <p>This is your base monthly payment that goes toward paying down your loan balance and covering the interest charges.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Property Tax</h4>
              <p>Local government taxes based on your property value. Often collected with your mortgage payment and held in escrow.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Home Insurance</h4>
              <p>Required coverage to protect your home and belongings. Lenders require this to protect their investment.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">PMI</h4>
              <p>Private Mortgage Insurance is required when you put down less than 20%. It protects the lender if you default.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
