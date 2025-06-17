
import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import AdSpace from '../../components/AdSpace';

const CalorieCalculator = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [activityLevel, setActivityLevel] = useState('moderately');
  const [goal, setGoal] = useState('maintain');
  const [results, setResults] = useState({
    bmr: 0,
    tdee: 0,
    goalCalories: 0
  });

  useEffect(() => {
    calculateCalories();
  }, [gender, age, weight, height, activityLevel, goal]);

  const calculateCalories = () => {
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      lightly: 1.375,
      moderately: 1.55,
      very: 1.725,
      extremely: 1.9
    };

    const tdee = bmr * activityMultipliers[activityLevel];

    // Goal adjustments
    let goalCalories = tdee;
    if (goal === 'lose') {
      goalCalories = tdee - 500; // 500 calorie deficit for 1 lb/week loss
    } else if (goal === 'gain') {
      goalCalories = tdee + 500; // 500 calorie surplus for 1 lb/week gain
    }

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Activity className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Calorie Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate your daily caloric needs based on activity level and goals
          </p>
        </div>

        {/* Ad Space */}
        <AdSpace size="leaderboard" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Your Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Activity Level
                </label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="sedentary">Sedentary (little/no exercise)</option>
                  <option value="lightly">Lightly active (light exercise 1-3 days/week)</option>
                  <option value="moderately">Moderately active (moderate exercise 3-5 days/week)</option>
                  <option value="very">Very active (hard exercise 6-7 days/week)</option>
                  <option value="extremely">Extremely active (very hard exercise, physical job)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Goal
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="lose">Lose weight (1 lb/week)</option>
                  <option value="maintain">Maintain weight</option>
                  <option value="gain">Gain weight (1 lb/week)</option>
                </select>
              </div>
            </div>

            {/* Ad Space */}
            <div className="mt-6">
              <AdSpace size="rectangle" />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="bg-blue-600 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Daily Calorie Goal</h2>
              <div className="text-4xl font-bold mb-2">
                {results.goalCalories} calories
              </div>
              <p className="text-blue-100">
                To {goal === 'lose' ? 'lose' : goal === 'gain' ? 'gain' : 'maintain'} weight
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Calorie Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">BMR (Base Metabolic Rate):</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {results.bmr} calories
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">TDEE (Total Daily Energy):</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {results.tdee} calories
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Daily Goal:</span>
                  <span className="font-semibold text-blue-600">
                    {results.goalCalories} calories
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Macronutrient Suggestions</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Protein (25-30%):</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {Math.round(results.goalCalories * 0.275 / 4)}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Carbohydrates (45-50%):</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {Math.round(results.goalCalories * 0.475 / 4)}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Fats (20-25%):</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {Math.round(results.goalCalories * 0.225 / 9)}g
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Understanding Calorie Needs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">BMR vs TDEE</h4>
              <p>BMR is the calories your body needs at rest. TDEE includes your activity level. This calculator uses the Mifflin-St Jeor equation for accuracy.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Safe Weight Changes</h4>
              <p>A 500-calorie daily deficit/surplus typically results in 1 pound of weight loss/gain per week. Consult healthcare providers for personalized advice.</p>
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

export default CalorieCalculator;
