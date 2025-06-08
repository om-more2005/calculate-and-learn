
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, TrendingUp, Award, Target } from 'lucide-react';

const GpaImportance = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center mb-4">
            <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              Education
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Your GPA Matters: From High School to College Success
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Understanding the critical role of GPA in your academic journey and proven strategies to improve your grades
          </p>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <span>Dec 8, 2024</span>
            <span className="mx-2">•</span>
            <span>8 min read</span>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Your Grade Point Average (GPA) is more than just a number on your transcript—it's a key that can unlock 
              doors to educational opportunities, scholarships, and future career prospects. Whether you're in high school 
              planning for college or already in college preparing for your career, understanding the importance of GPA 
              and how to improve it can significantly impact your future success.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target className="h-6 w-6 mr-2 text-blue-600" />
              Why GPA Matters in High School
            </h2>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">College Admissions</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your high school GPA is one of the most important factors in college admissions. Most colleges have 
                minimum GPA requirements, and competitive schools often require GPAs of 3.5 or higher.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Ivy League Schools:</strong> Typically require GPAs of 3.9+ (unweighted)</li>
                <li><strong>State Universities:</strong> Often require GPAs of 3.0-3.5+ depending on the school</li>
                <li><strong>Community Colleges:</strong> Generally have open admission but higher GPAs mean better placement</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Scholarship Opportunities</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Many scholarships have GPA requirements that can save you thousands of dollars in college costs:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Merit-based scholarships:</strong> Often require 3.5+ GPA</li>
                <li><strong>State-funded programs:</strong> Many require 3.0+ GPA to maintain funding</li>
                <li><strong>Private scholarships:</strong> Competitive awards typically favor students with 3.7+ GPAs</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award className="h-6 w-6 mr-2 text-blue-600" />
              GPA's Role in College Success
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Your college GPA becomes even more critical as it directly impacts your post-graduation opportunities:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Graduate School</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Most graduate programs require 3.0+ GPA</li>
                  <li>Competitive programs often require 3.5+ GPA</li>
                  <li>Medical/Law school typically require 3.7+ GPA</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Career Opportunities</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Many employers ask for GPA on applications</li>
                  <li>Competitive internships often require 3.5+ GPA</li>
                  <li>Some companies have strict GPA cutoffs for entry-level positions</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
              Proven Strategies to Improve Your GPA
            </h2>

            <div className="space-y-6 mb-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">1. Master Time Management</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Effective time management is the foundation of academic success:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Use a planner or digital calendar to track assignments and deadlines</li>
                  <li>Break large projects into smaller, manageable tasks</li>
                  <li>Set specific study times for each subject</li>
                  <li>Avoid procrastination by starting assignments early</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">2. Develop Effective Study Habits</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Find a quiet, dedicated study space free from distractions</li>
                  <li>Use active learning techniques like summarizing and teaching others</li>
                  <li>Take regular breaks using the Pomodoro Technique (25 min study, 5 min break)</li>
                  <li>Review material regularly rather than cramming before exams</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">3. Seek Help When Needed</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Attend office hours and ask teachers/professors questions</li>
                  <li>Form study groups with classmates</li>
                  <li>Use tutoring services offered by your school</li>
                  <li>Don't wait until you're failing to seek help</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">4. Stay Organized and Track Progress</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Keep track of all assignments and their due dates</li>
                  <li>Maintain organized notes and files for each subject</li>
                  <li>Regularly calculate your GPA to monitor progress</li>
                  <li>Set specific GPA goals for each semester</li>
                </ul>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">5. Strategic Course Selection</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Balance challenging courses with manageable ones</li>
                  <li>Take advantage of weighted GPA opportunities (Honors/AP courses)</li>
                  <li>Consider retaking courses if your school allows grade replacement</li>
                  <li>Don't overload yourself with too many difficult courses at once</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Understanding Weighted vs. Unweighted GPA</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Unweighted GPA (4.0 Scale)</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Treats all courses equally. An 'A' in any course = 4.0 points, regardless of difficulty.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Weighted GPA</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Gives extra points for challenging courses. Honors courses typically add 0.5 points, 
                    AP courses add 1.0 point.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick GPA Recovery Tips</h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If your GPA needs improvement, don't panic. Here are targeted strategies for quick improvement:
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">For Immediate Improvement:</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Focus on upcoming assignments and exams rather than dwelling on past grades</li>
                <li>Communicate with teachers about extra credit opportunities</li>
                <li>Prioritize classes where you can make the biggest impact</li>
                <li>Consider dropping a class if it's significantly hurting your GPA (check policies first)</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Long-term Success Mindset</h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Remember that GPA improvement is a marathon, not a sprint. Consistent effort and good habits 
              will yield better results than sporadic intense study sessions. Focus on understanding concepts 
              rather than just memorizing for tests, as this will serve you better in advanced courses and 
              standardized tests.
            </p>

            <div className="bg-blue-100 dark:bg-blue-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Ready to Calculate and Improve Your GPA?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Use our comprehensive GPA calculator to track your current standing and plan for improvement. 
                It supports both weighted and unweighted calculations, custom grade scales, and course planning.
              </p>
              <Link 
                to="/calculator/gpa" 
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                Try Our GPA Calculator
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default GpaImportance;
