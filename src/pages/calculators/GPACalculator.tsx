
import React, { useState, useEffect } from 'react';
import { Lightbulb, Plus, X, Settings } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
  isHonors: boolean;
  isAP: boolean;
}

interface GradeScale {
  [key: string]: { [scale: string]: number };
}

const GPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Course 1', credits: 3, grade: 'A', isHonors: false, isAP: false }
  ]);
  const [gpaScale, setGpaScale] = useState('4.0');
  const [gpaType, setGpaType] = useState('unweighted'); // unweighted or weighted
  const [customGradeScale, setCustomGradeScale] = useState<GradeScale>({});
  const [showCustomScale, setShowCustomScale] = useState(false);
  const [results, setResults] = useState({
    unweightedGPA: 0,
    weightedGPA: 0,
    totalCredits: 0,
    qualityPoints: 0,
    weightedQualityPoints: 0
  });

  const defaultGradePoints: GradeScale = {
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

  const gradePoints = Object.keys(customGradeScale).length > 0 ? customGradeScale : defaultGradePoints;

  useEffect(() => {
    calculateGPA();
  }, [courses, gpaScale, gpaType, gradePoints]);

  const calculateGPA = () => {
    let totalQualityPoints = 0;
    let weightedQualityPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.grade && course.credits > 0) {
        const basePoints = gradePoints[course.grade]?.[gpaScale] || 0;
        let weightedPoints = basePoints;
        
        // Add weight for honors/AP courses
        if (course.isAP) {
          weightedPoints += 1.0;
        } else if (course.isHonors) {
          weightedPoints += 0.5;
        }

        totalQualityPoints += basePoints * course.credits;
        weightedQualityPoints += weightedPoints * course.credits;
        totalCredits += course.credits;
      }
    });

    const unweightedGPA = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;
    const weightedGPA = totalCredits > 0 ? weightedQualityPoints / totalCredits : 0;

    setResults({
      unweightedGPA,
      weightedGPA,
      totalCredits,
      qualityPoints: totalQualityPoints,
      weightedQualityPoints
    });
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: `Course ${courses.length + 1}`,
      credits: 3,
      grade: 'A',
      isHonors: false,
      isAP: false
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number | boolean) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const updateCustomGrade = (grade: string, scale: string, value: number) => {
    setCustomGradeScale(prev => ({
      ...prev,
      [grade]: {
        ...prev[grade],
        [scale]: value
      }
    }));
  };

  const resetToDefault = () => {
    setCustomGradeScale({});
    setShowCustomScale(false);
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

  const currentGPA = gpaType === 'weighted' ? results.weightedGPA : results.unweightedGPA;

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
            Calculate your Grade Point Average with support for different grading scales, weighted courses, and custom grade scales
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Settings</h2>
              
              {/* GPA Scale Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">GPA Scale</h3>
                <RadioGroup value={gpaScale} onValueChange={setGpaScale} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4.0" id="scale-4.0" />
                    <label htmlFor="scale-4.0" className="text-gray-700 dark:text-gray-300">4.0 Scale</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4.3" id="scale-4.3" />
                    <label htmlFor="scale-4.3" className="text-gray-700 dark:text-gray-300">4.3 Scale (A+ = 4.3)</label>
                  </div>
                </RadioGroup>
              </div>

              {/* GPA Type Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">GPA Type</h3>
                <RadioGroup value={gpaType} onValueChange={setGpaType} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unweighted" id="type-unweighted" />
                    <label htmlFor="type-unweighted" className="text-gray-700 dark:text-gray-300">Unweighted</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weighted" id="type-weighted" />
                    <label htmlFor="type-weighted" className="text-gray-700 dark:text-gray-300">Weighted (Honors +0.5, AP +1.0)</label>
                  </div>
                </RadioGroup>
              </div>

              {/* Custom Grade Scale */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Grade Scale</h3>
                  <button
                    onClick={() => setShowCustomScale(!showCustomScale)}
                    className="flex items-center px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    {showCustomScale ? 'Hide' : 'Customize'}
                  </button>
                </div>
                
                {showCustomScale && (
                  <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Customize grade values to match your school's grading system
                      </p>
                      <button
                        onClick={resetToDefault}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Reset to Default
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.keys(defaultGradePoints).map(grade => (
                        <div key={grade} className="flex items-center space-x-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8">
                            {grade}:
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={gradePoints[grade]?.[gpaScale] || defaultGradePoints[grade][gpaScale]}
                            onChange={(e) => updateCustomGrade(grade, gpaScale, Number(e.target.value))}
                            className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                {courses.map((course) => (
                  <div key={course.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="md:col-span-2">
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
                      <Select value={course.grade} onValueChange={(value) => updateCourse(course.id, 'grade', value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(gradePoints).map(grade => (
                            <SelectItem key={grade} value={grade}>
                              {grade} ({gradePoints[grade][gpaScale]})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Course Type
                      </label>
                      <Select 
                        value={course.isAP ? 'ap' : course.isHonors ? 'honors' : 'regular'} 
                        onValueChange={(value) => {
                          updateCourse(course.id, 'isAP', value === 'ap');
                          updateCourse(course.id, 'isHonors', value === 'honors');
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">Regular</SelectItem>
                          <SelectItem value="honors">Honors (+0.5)</SelectItem>
                          <SelectItem value="ap">AP (+1.0)</SelectItem>
                        </SelectContent>
                      </Select>
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Your {gpaType === 'weighted' ? 'Weighted' : 'Unweighted'} GPA
              </h2>
              <div className={`text-5xl font-bold mb-2 ${getGradeColor(currentGPA)}`}>
                {currentGPA.toFixed(2)}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {getGradeDescription(currentGPA)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Based on {gpaScale} scale
              </p>
            </div>

            {/* Both GPAs Comparison */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">GPA Comparison</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Unweighted GPA:</span>
                  <span className={`font-semibold ${getGradeColor(results.unweightedGPA)}`}>
                    {results.unweightedGPA.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Weighted GPA:</span>
                  <span className={`font-semibold ${getGradeColor(results.weightedGPA)}`}>
                    {results.weightedGPA.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Difference:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    +{(results.weightedGPA - results.unweightedGPA).toFixed(2)}
                  </span>
                </div>
              </div>
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
                  <span className="text-gray-600 dark:text-gray-300">Weighted Points:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {results.weightedQualityPoints.toFixed(2)}
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Current Grade Scale ({gpaScale})
              </h3>
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
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Unweighted vs Weighted GPA</h4>
              <p>Unweighted GPA treats all courses equally. Weighted GPA gives extra points for challenging courses like Honors (+0.5) and AP (+1.0) to reflect increased difficulty.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Grade Scales</h4>
              <p>Different schools use different grading scales. Use the customize feature to match your school's specific grade point values for accurate calculations.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">College Applications</h4>
              <p>Colleges often recalculate GPAs using their own scales. Both weighted and unweighted GPAs are important for admissions and scholarship considerations.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Course Types</h4>
              <p>Regular courses count at face value. Honors courses typically add 0.5 points, while AP courses add 1.0 point to your weighted GPA calculation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;
