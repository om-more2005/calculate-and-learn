
import React, { useState, useEffect } from 'react';
import { Lightbulb, Plus, X } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const GPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Course 1', credits: 3, grade: 'A' }
  ]);
  const [gpaScale, setGpaScale] = useState('4.0');
  const [results, setResults] = useState({
    gpa: 0,
    totalCredits: 0,
    qualityPoints: 0
  });

  const gradePoints: { [key: string]: { [scale: string]: number } } = {
    'A+': { '4.0': 4.0, '4.3': 4.3 },
    'A': { '4.0': 4.0, '4.3': 4.0 },
    'A-': { '4.0': 3.7, '4.3': 3.7 },
    'B+': { '4.0': 3.3, '4.3': 3.3 },
    'B': { '4.0': 3.0, '4.3': 3.0 },
    'B-': { '4.0': 2.7, '4.3': 2.7 },
    'C+': { '4.0': 2.3, '4.3': 2.3 },
    'C': { '4.0': 2.0, '4.3': 2.0 },
    'C-': { '4.0': 1.7, '4.3': 1.7 },
    'D+': { '4.0': 1.3, '4.3': 1.3 },
    'D': { '4.0': 1.0, '4.3': 1.0 },
    'D-': { '4.0': 0.7, '4.3': 0.7 },
    'F': { '4.0': 0.0, '4.3': 0.0 }
  };

  useEffect(() => {
    calculateGPA();
  }, [courses, gpaScale]);

  const calculateGPA = () => {
    let totalQualityPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.grade && course.credits > 0) {
        const points = gradePoints[course.grade]?.[gpaScale] || 0;
        totalQualityPoints += points * course.credits;
        totalCredits += course.credits;
      }
    });

    const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

    setResults({
      gpa,
      totalCredits,
      qualityPoints: totalQualityPoints
    });
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: `Course ${courses.length + 1}`,
      credits: 3,
      grade: 'A'
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const getGradeColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-green-600';
    if (gpa >= 3.0) return 'text-blue-600';
    if (gpa >= 2.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeDescription = (gpa: number) => {
    if (gpa >= 3.8) return 'Excellent (A)';
    if (gpa >= 3.3) return 'Good (B+)';
    if (gpa >= 3.0) return 'Good (B)';
    if (gpa >= 2.7) return 'Fair (B-)';
    if (gpa >= 2.0) return 'Below Average (C)';
    return 'Poor (D/F)';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">GPA Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate your Grade Point Average with support for different grading scales and credit hours
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* GPA Scale Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">GPA Scale</h2>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="4.0"
                    checked={gpaScale === '4.0'}
                    onChange={(e) => setGpaScale(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">4.0 Scale</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="4.3"
                    checked={gpaScale === '4.3'}
                    onChange={(e) => setGpaScale(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">4.3 Scale (A+ = 4.3)</span>
                </label>
              </div>
            </div>

            {/* Courses */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Courses</h2>
                <button
                  onClick={addCourse}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </button>
              </div>

              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={course.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Course Name
                      </label>
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Credits
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Grade
                      </label>
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {Object.keys(gradePoints).map(grade => (
                          <option key={grade} value={grade}>
                            {grade} ({gradePoints[grade][gpaScale]})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-end">
                      {courses.length > 1 && (
                        <button
                          onClick={() => removeCourse(course.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                          title="Remove course"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* GPA Result */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your GPA</h2>
              <div className={`text-5xl font-bold mb-2 ${getGradeColor(results.gpa)}`}>
                {results.gpa.toFixed(2)}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {getGradeDescription(results.gpa)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Based on {gpaScale} scale
              </p>
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Credits:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {results.totalCredits}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Quality Points:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {results.qualityPoints.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Courses:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {courses.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Grade Scale Reference */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Grade Scale Reference</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(gradePoints).map(([grade, points]) => (
                  <div key={grade} className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{grade}:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {points[gpaScale]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Understanding GPA</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How GPA is Calculated</h4>
              <p>GPA is calculated by dividing total quality points by total credit hours. Quality points are earned by multiplying grade points by credit hours for each course.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">GPA Scales</h4>
              <p>Most schools use a 4.0 scale where A=4.0. Some schools use a 4.3 scale where A+=4.3. Check with your institution for their specific scale.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Credit Hours</h4>
              <p>Credit hours represent the number of hours per week a course meets. Most courses are worth 3-4 credit hours, with labs and seminars often worth 1-2 credits.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">GPA Ranges</h4>
              <p>Generally: 3.7+ is excellent, 3.0-3.7 is good, 2.0-3.0 is satisfactory, and below 2.0 may result in academic probation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;
