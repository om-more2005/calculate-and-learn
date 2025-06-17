
import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react'; // Choose appropriate icon
import AdSpace from '../components/AdSpace';

const CalculatorTemplate = () => {
  // State variables for inputs
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [result, setResult] = useState(0);

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateResult();
  }, [input1, input2]);

  // Main calculation function
  const calculateResult = () => {
    try {
      // Validation
      if (input1 < 0 || input2 < 0) {
        console.log('Invalid inputs');
        return;
      }

      // Calculation logic
      const calculatedResult = input1 + input2; // Replace with actual formula
      
      setResult(calculatedResult);
    } catch (error) {
      console.error('Calculation error:', error);
      setResult(0);
    }
  };

  // Helper functions (if needed)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatNumber = (value, decimals = 2) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Calculator Name
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Brief description of what the calculator does
          </p>
        </div>

        {/* Top Ad Space */}
        <AdSpace size="leaderboard" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Calculator Inputs
            </h2>
            
            <div className="space-y-6">
              {/* Input Field 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Input Label 1
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={input1}
                    onChange={(e) => setInput1(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter value"
                  />
                </div>
              </div>

              {/* Input Field 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Input Label 2
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={input2}
                  onChange={(e) => setInput2(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter value"
                />
              </div>

              {/* Dropdown Example */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Option
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>

              {/* Manual Calculate Button (optional) */}
              <button
                onClick={calculateResult}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
              >
                Calculate
              </button>
            </div>

            {/* Side Ad Space */}
            <div className="mt-6">
              <AdSpace size="rectangle" />
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Main Result */}
            <div className="bg-blue-600 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Result</h2>
              <div className="text-4xl font-bold mb-2">
                {formatNumber(result)}
              </div>
              <p className="text-blue-100">Result description</p>
            </div>

            {/* Detailed Results */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Detailed Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Input 1:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatNumber(input1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Input 2:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatNumber(input2)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600 dark:text-gray-300">Total Result:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatNumber(result)}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Additional Information
              </h3>
              <div className="text-gray-600 dark:text-gray-300">
                <p>Add any additional calculations, tips, or relevant information here.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Understanding [Calculator Topic]
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Topic 1</h4>
              <p>Educational content about the first topic related to your calculator.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Topic 2</h4>
              <p>Educational content about the second topic related to your calculator.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Topic 3</h4>
              <p>Educational content about the third topic related to your calculator.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Topic 4</h4>
              <p>Educational content about the fourth topic related to your calculator.</p>
            </div>
          </div>
        </div>

        {/* Bottom Ad Space */}
        <div className="mt-8">
          <AdSpace size="leaderboard" />
        </div>
      </div>
    </div>
  );
};

export default CalculatorTemplate;

/*
CALCULATOR PROGRAMMING FORMAT & BEST PRACTICES:

1. FILE STRUCTURE:
   - Create file in: src/pages/calculators/YourCalculator.tsx
   - Import necessary icons from lucide-react
   - Import AdSpace component for monetization

2. STATE MANAGEMENT:
   - Use useState for all input values
   - Use useEffect to auto-calculate when inputs change
   - Keep results in separate state variables

3. CALCULATION LOGIC:
   - Create a separate calculateResult() function
   - Add input validation
   - Handle edge cases and errors
   - Use try-catch for complex calculations

4. LAYOUT STRUCTURE:
   - Header with icon and title
   - Top leaderboard ad
   - Two-column layout: inputs on left, results on right
   - Side rectangle ad in input section
   - Educational content section
   - Bottom leaderboard ad

5. STYLING:
   - Use Tailwind CSS classes consistently
   - Dark mode support with dark: prefix
   - Responsive design with grid-cols-1 lg:grid-cols-2
   - Blue color scheme for primary elements

6. ACCESSIBILITY:
   - Proper labels for all inputs
   - Clear placeholder text
   - Logical tab order
   - Semantic HTML structure

7. USER EXPERIENCE:
   - Auto-calculate on input change
   - Format numbers appropriately
   - Provide detailed breakdowns
   - Include educational content

8. ROUTING:
   - Add route to App.tsx
   - Add calculator to Calculators.tsx page
   - Use consistent URL pattern: /calculator/name

9. TESTING:
   - Test with various input values
   - Verify calculations are accurate
   - Test responsive design
   - Check dark mode functionality

10. COMMON HELPER FUNCTIONS:
    - formatCurrency() for money values
    - formatNumber() for numerical display
    - validateInput() for input checking
    - parseNumericInput() for safe parsing
*/
