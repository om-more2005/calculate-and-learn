
import React from 'react';

interface BMIMeterProps {
  bmi: number;
}

const BMIMeter = ({ bmi }: BMIMeterProps) => {
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#3b82f6' };
    if (bmi < 25) return { category: 'Normal', color: '#059669' };
    if (bmi < 30) return { category: 'Overweight', color: '#d97706' };
    return { category: 'Obese', color: '#dc2626' };
  };

  const { category, color } = getBMICategory(bmi);
  
  // Calculate position on meter (0-100%)
  const getPosition = () => {
    if (bmi <= 15) return 0;
    if (bmi >= 40) return 100;
    return ((bmi - 15) / 25) * 100;
  };

  const position = getPosition();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">BMI Scale</h4>
      
      {/* BMI Scale */}
      <div className="relative h-8 rounded-full overflow-hidden mb-4">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-green-500 via-yellow-500 to-red-500"></div>
        
        {/* BMI Indicator */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-black transform -translate-x-1/2"
          style={{ left: `${position}%` }}
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs font-bold">
            {bmi.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300 mb-4">
        <span>15</span>
        <span>18.5</span>
        <span>25</span>
        <span>30</span>
        <span>40</span>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div className="text-center p-2 rounded" style={{ backgroundColor: bmi < 18.5 ? '#3b82f6' : '#f3f4f6', color: bmi < 18.5 ? 'white' : '#374151' }}>
          <div className="font-semibold">Underweight</div>
          <div>&lt; 18.5</div>
        </div>
        <div className="text-center p-2 rounded" style={{ backgroundColor: bmi >= 18.5 && bmi < 25 ? '#059669' : '#f3f4f6', color: bmi >= 18.5 && bmi < 25 ? 'white' : '#374151' }}>
          <div className="font-semibold">Normal</div>
          <div>18.5 - 24.9</div>
        </div>
        <div className="text-center p-2 rounded" style={{ backgroundColor: bmi >= 25 && bmi < 30 ? '#d97706' : '#f3f4f6', color: bmi >= 25 && bmi < 30 ? 'white' : '#374151' }}>
          <div className="font-semibold">Overweight</div>
          <div>25 - 29.9</div>
        </div>
        <div className="text-center p-2 rounded" style={{ backgroundColor: bmi >= 30 ? '#dc2626' : '#f3f4f6', color: bmi >= 30 ? 'white' : '#374151' }}>
          <div className="font-semibold">Obese</div>
          <div>≥ 30</div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: color + '20', border: `1px solid ${color}` }}>
        <p className="text-sm font-medium" style={{ color }}>
          Your BMI category: {category}
        </p>
      </div>
    </div>
  );
};

export default BMIMeter;
