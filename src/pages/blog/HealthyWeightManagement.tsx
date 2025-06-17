
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Heart, Utensils, Activity } from 'lucide-react';
import AdSpace from '../../components/AdSpace';

const HealthyWeightManagement = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Health</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">8 min read</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Healthy Weight Management: Your Complete Guide to BMI and Wellness
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Learn evidence-based strategies for maintaining a healthy weight, understanding BMI, and making sustainable lifestyle changes for long-term wellness.
          </p>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Published on Dec 9, 2024</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ad Space */}
          <AdSpace size="leaderboard" className="mb-8" />

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
              <h2 className="flex items-center text-xl font-semibold mb-3">
                <Scale className="h-6 w-6 mr-2 text-blue-600" />
                Understanding BMI and Healthy Weight Ranges
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Body Mass Index (BMI) is a screening tool that helps assess whether your weight falls within a healthy range for your height. While it's not a perfect measure of health, it provides a useful starting point for understanding weight-related health risks.
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-4">What is BMI?</h3>
            <p className="mb-6">
              BMI is calculated by dividing your weight in kilograms by your height in meters squared (kg/m²). The resulting number places you in one of four categories:
            </p>

            <ul className="mb-8 space-y-2">
              <li><strong>Underweight:</strong> BMI less than 18.5</li>
              <li><strong>Normal weight:</strong> BMI 18.5-24.9</li>
              <li><strong>Overweight:</strong> BMI 25-29.9</li>
              <li><strong>Obese:</strong> BMI 30 or higher</li>
            </ul>

            {/* Ad Space */}
            <AdSpace size="rectangle" className="float-right ml-6 mb-6" />

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-8">
              <h3 className="flex items-center text-xl font-semibold mb-3">
                <Heart className="h-6 w-6 mr-2 text-green-600" />
                Healthy Weight Management Principles
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Sustainable weight management isn't about quick fixes or extreme measures. It's about creating healthy habits that you can maintain for life.
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-4">Strategies to Increase BMI (For Underweight Individuals)</h3>
            
            <h4 className="text-xl font-semibold mb-3">Nutrition Focus:</h4>
            <ul className="mb-6 space-y-2">
              <li>Eat more frequently: 5-6 smaller meals throughout the day</li>
              <li>Choose nutrient-dense, calorie-rich foods like nuts, avocados, and olive oil</li>
              <li>Add healthy fats to meals (nut butters, seeds, fatty fish)</li>
              <li>Include protein at every meal to support muscle growth</li>
              <li>Drink calories through smoothies, milk, or protein shakes</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">Exercise Approach:</h4>
            <ul className="mb-8 space-y-2">
              <li>Focus on strength training to build muscle mass</li>
              <li>Limit excessive cardio that might burn too many calories</li>
              <li>Allow adequate recovery time between workouts</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4">Strategies to Decrease BMI (For Overweight/Obese Individuals)</h3>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
              <h4 className="flex items-center text-xl font-semibold mb-3">
                <Utensils className="h-6 w-6 mr-2 text-orange-600" />
                Nutrition Guidelines
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Create a moderate calorie deficit (500-750 calories below maintenance)</li>
                <li>Focus on whole, unprocessed foods</li>
                <li>Increase fiber intake through vegetables, fruits, and whole grains</li>
                <li>Stay hydrated - drink water before meals</li>
                <li>Practice portion control using smaller plates</li>
                <li>Limit added sugars and refined carbohydrates</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-8">
              <h4 className="flex items-center text-xl font-semibold mb-3">
                <Activity className="h-6 w-6 mr-2 text-purple-600" />
                Exercise Strategy
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Combine cardiovascular exercise with strength training</li>
                <li>Aim for 150 minutes of moderate aerobic activity per week</li>
                <li>Include 2-3 strength training sessions weekly</li>
                <li>Start slowly and gradually increase intensity</li>
                <li>Find activities you enjoy to ensure consistency</li>
              </ul>
            </div>

            {/* Ad Space */}
            <AdSpace size="banner" className="my-8" />

            <h3 className="text-2xl font-bold mb-4">Maintaining a Healthy Weight</h3>
            <p className="mb-6">
              Once you've reached a healthy BMI, maintaining it requires ongoing commitment to healthy habits:
            </p>

            <ul className="mb-8 space-y-2">
              <li><strong>Monitor regularly:</strong> Weigh yourself weekly at the same time</li>
              <li><strong>Stay active:</strong> Maintain regular physical activity</li>
              <li><strong>Eat mindfully:</strong> Pay attention to hunger and fullness cues</li>
              <li><strong>Plan ahead:</strong> Meal prep and have healthy snacks available</li>
              <li><strong>Get adequate sleep:</strong> 7-9 hours per night for optimal metabolism</li>
              <li><strong>Manage stress:</strong> Chronic stress can affect weight regulation</li>
            </ul>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-3">Important Considerations</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>BMI doesn't account for muscle mass, bone density, or body composition</li>
                <li>Athletes and very muscular individuals may have high BMIs but low body fat</li>
                <li>Age, sex, and ethnicity can affect BMI interpretation</li>
                <li>Always consult healthcare professionals for personalized advice</li>
                <li>Focus on overall health, not just the number on the scale</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mb-4">When to Seek Professional Help</h3>
            <p className="mb-6">
              Consider consulting with healthcare professionals if you:
            </p>

            <ul className="mb-8 space-y-2">
              <li>Have a BMI below 18.5 or above 30</li>
              <li>Experience rapid weight loss or gain</li>
              <li>Have underlying health conditions</li>
              <li>Struggle with eating disorders or body image issues</li>
              <li>Need help creating a sustainable plan</li>
            </ul>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Key Takeaways</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>BMI is a useful screening tool but not the complete picture of health</li>
                <li>Sustainable weight management requires gradual, long-term changes</li>
                <li>Both diet and exercise play important roles in weight management</li>
                <li>Individual needs vary - what works for one person may not work for another</li>
                <li>Professional guidance can be invaluable for safe, effective results</li>
              </ul>
            </div>
          </div>

          {/* Ad Space */}
          <AdSpace size="banner" className="mt-8" />
        </div>
      </article>
    </div>
  );
};

export default HealthyWeightManagement;
