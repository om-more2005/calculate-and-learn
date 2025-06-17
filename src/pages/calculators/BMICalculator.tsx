
import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import BMIMeter from '../../components/BMIMeter';
import AdSpace from '../../components/AdSpace';

const BMICalculator = () => {
  const [units, setUnits] = useState('metric');
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(170);
  const [weightLbs, setWeightLbs] = useState(154);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(7);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    calculateBMI();
  }, [units, weightKg, heightCm, weightLbs, heightFt, heightIn]);

  const calculateBMI = () => {
    let weight, height, calculatedBMI;

    if (units === 'metric') {
      weight = weightKg;
      height = heightCm / 100; // convert to meters
      calculatedBMI = weight / (height * height);
    } else {
      weight = weightLbs;
      const totalInches = (heightFt * 12) + heightIn;
      calculatedBMI = (weight / (totalInches * totalInches)) * 703;
    }

    if (isNaN(calculatedBMI) || calculatedBMI <= 0) {
      setBmi(0);
      return;
    }

    setBmi(calculatedBMI);

    let cat, desc;
    if (calculatedBMI < 18.5) {
      cat = 'Underweight';
      desc = 'You may need to gain weight. Consult with a healthcare provider.';
    } else if (calculatedBMI < 25) {
      cat = 'Normal weight';
      desc = 'You have a healthy weight. Keep up the good work!';
    } else if (calculatedBMI < 30) {
      cat = 'Overweight';
      desc = 'You may benefit from weight loss. Consider diet and exercise changes.';
    } else {
      cat = 'Obese';
      desc = 'Consider consulting with a healthcare provider for a weight management plan.';
    }

    setCategory(cat);
    setDescription(desc);
  };

  const getCategoryColor = () => {
    if (bmi < 18.5) return 'text-blue-600';
    if (bmi < 25) return 'text-green-600';
    if (bmi < 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">BMI Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate your Body Mass Index and understand your health status with detailed insights
          </p>
        </div>

        {/* Ad Space */}
        <AdSpace size="leaderboard" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Enter Your Details</h2>
            
            {/* Units Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Units
              </label>
              <select
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="metric">Metric (kg, cm)</option>
                <option value="imperial">Imperial (lbs, ft/in)</option>
              </select>
            </div>

            {units === 'metric' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Height (ft)
                    </label>
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Height (in)
                    </label>
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Ad Space */}
            <div className="mt-6">
              <AdSpace size="rectangle" />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* BMI Result */}
            {bmi > 0 && (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your BMI</h2>
                  <div className={`text-5xl font-bold mb-2 ${getCategoryColor()}`}>
                    {bmi.toFixed(1)}
                  </div>
                  <p className={`text-lg font-medium mb-2 ${getCategoryColor()}`}>
                    {category}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {description}
                  </p>
                </div>

                {/* BMI Meter */}
                <BMIMeter bmi={bmi} />
              </>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Understanding BMI</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What is BMI?</h4>
              <p>Body Mass Index (BMI) is a measure of body fat based on height and weight. It provides a general indication of whether you have a healthy body weight for your height.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">BMI Limitations</h4>
              <p>BMI doesn't distinguish between muscle and fat mass. Athletes with high muscle mass may have high BMI but low body fat. Always consult healthcare professionals for personalized advice.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Healthy Weight Management</h4>
              <p>Maintaining a healthy weight involves balanced nutrition, regular physical activity, adequate sleep, and stress management. Focus on overall health rather than just the number.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">When to Seek Help</h4>
              <p>If your BMI indicates you're underweight or overweight, consider consulting with a healthcare provider or registered dietitian for personalized guidance.</p>
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

export default BMICalculator;
