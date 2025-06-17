
import React, { useState, useEffect } from 'react';
import { Clock, Globe } from 'lucide-react';
import AdSpace from '../../components/AdSpace';

const TimezoneCalculator = () => {
  const [fromTimezone, setFromTimezone] = useState('UTC');
  const [toTimezone, setToTimezone] = useState('America/New_York');
  const [inputTime, setInputTime] = useState('12:00');
  const [inputDate, setInputDate] = useState(new Date().toISOString().split('T')[0]);
  const [convertedDateTime, setConvertedDateTime] = useState('');
  const [currentTimes, setCurrentTimes] = useState({});

  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)', offset: '+00:00' },
    { value: 'America/New_York', label: 'Eastern Time (US & Canada)', offset: '-05:00/-04:00' },
    { value: 'America/Chicago', label: 'Central Time (US & Canada)', offset: '-06:00/-05:00' },
    { value: 'America/Denver', label: 'Mountain Time (US & Canada)', offset: '-07:00/-06:00' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)', offset: '-08:00/-07:00' },
    { value: 'Europe/London', label: 'London (GMT/BST)', offset: '+00:00/+01:00' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)', offset: '+01:00/+02:00' },
    { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)', offset: '+01:00/+02:00' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: '+09:00' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)', offset: '+08:00' },
    { value: 'Asia/Kolkata', label: 'Mumbai (IST)', offset: '+05:30' },
    { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)', offset: '+10:00/+11:00' },
    { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)', offset: '+12:00/+13:00' }
  ];

  useEffect(() => {
    convertTime();
    updateCurrentTimes();
    // Update current times every minute
    const interval = setInterval(updateCurrentTimes, 60000);
    return () => clearInterval(interval);
  }, [fromTimezone, toTimezone, inputTime, inputDate]);

  const convertTime = () => {
    try {
      // Create a date object with the input date and time
      const dateTimeString = `${inputDate}T${inputTime}:00`;
      const inputDateTime = new Date(dateTimeString);
      
      // Check if the date is valid
      if (isNaN(inputDateTime.getTime())) {
        setConvertedDateTime('Invalid date/time');
        return;
      }

      // For timezone conversion, we need to handle the source timezone properly
      // This is simplified - in production, you'd use a library like moment-timezone or date-fns-tz
      const converted = convertTimezone(inputDateTime, fromTimezone, toTimezone);
      
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short'
      };
      
      setConvertedDateTime(converted.toLocaleString('en-US', {
        ...options,
        timeZone: toTimezone
      }));
    } catch (error) {
      console.error('Timezone conversion error:', error);
      setConvertedDateTime('Error converting timezone');
    }
  };

  const convertTimezone = (dateTime, fromTz, toTz) => {
    // This is a simplified conversion - in production use proper timezone libraries
    // For now, we'll assume the input time is in the "from" timezone and convert to "to" timezone
    
    // Get the timezone offset for both zones
    const fromOffset = getTimezoneOffset(fromTz);
    const toOffset = getTimezoneOffset(toTz);
    
    // Calculate the difference in minutes
    const offsetDiff = (toOffset - fromOffset) * 60;
    
    // Apply the offset
    return new Date(dateTime.getTime() + offsetDiff * 60000);
  };

  const getTimezoneOffset = (timezone) => {
    // Simplified timezone offset mapping (in hours)
    const offsets = {
      'UTC': 0,
      'America/New_York': -5, // EST (simplified, doesn't account for DST)
      'America/Chicago': -6,
      'America/Denver': -7,
      'America/Los_Angeles': -8,
      'Europe/London': 0,
      'Europe/Paris': 1,
      'Europe/Berlin': 1,
      'Asia/Tokyo': 9,
      'Asia/Shanghai': 8,
      'Asia/Kolkata': 5.5,
      'Australia/Sydney': 10,
      'Pacific/Auckland': 12
    };
    return offsets[timezone] || 0;
  };

  const updateCurrentTimes = () => {
    const now = new Date();
    const times = {};
    
    timezones.forEach(tz => {
      try {
        times[tz.value] = now.toLocaleString('en-US', {
          timeZone: tz.value,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      } catch (error) {
        times[tz.value] = 'N/A';
      }
    });
    
    setCurrentTimes(times);
  };

  const setCurrentTime = () => {
    const now = new Date();
    setInputDate(now.toISOString().split('T')[0]);
    setInputTime(now.toTimeString().slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Timezone Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert time between different timezones for global scheduling and coordination
          </p>
        </div>

        {/* Ad Space */}
        <AdSpace size="leaderboard" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Time Conversion</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From Timezone
                </label>
                <select
                  value={fromTimezone}
                  onChange={(e) => setFromTimezone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {timezones.map(tz => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Current time: {currentTimes[fromTimezone] || 'Loading...'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To Timezone
                </label>
                <select
                  value={toTimezone}
                  onChange={(e) => setToTimezone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {timezones.map(tz => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Current time: {currentTimes[toTimezone] || 'Loading...'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={inputDate}
                    onChange={(e) => setInputDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={inputTime}
                    onChange={(e) => setInputTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                onClick={setCurrentTime}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Use Current Time
              </button>
            </div>

            {/* Ad Space */}
            <div className="mt-6">
              <AdSpace size="rectangle" />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="bg-blue-600 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Converted Time</h2>
              <div className="text-lg font-mono mb-2 break-words">
                {convertedDateTime || 'Select date and time'}
              </div>
              <p className="text-blue-100 text-sm">
                {timezones.find(tz => tz.value === toTimezone)?.label}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Conversion Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Input:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {inputDate} {inputTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">From:</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">
                    {timezones.find(tz => tz.value === fromTimezone)?.label.split(' (')[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">To:</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">
                    {timezones.find(tz => tz.value === toTimezone)?.label.split(' (')[0]}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">World Clock</h3>
              <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
                {timezones.map(tz => (
                  <div key={tz.value} className="flex justify-between items-center py-1">
                    <span className="text-gray-600 dark:text-gray-300 text-xs">
                      {tz.label.split(' (')[0]}:
                    </span>
                    <span className="font-mono font-semibold text-gray-900 dark:text-white">
                      {currentTimes[tz.value] || 'Loading...'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Globe className="h-6 w-6 mr-2" />
            Understanding Timezones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Daylight Saving Time</h4>
              <p>Many regions observe daylight saving time, which can affect timezone calculations. This calculator provides a simplified conversion - for precise calculations, consider using specialized timezone libraries.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Global Business</h4>
              <p>When scheduling international meetings or calls, always confirm the timezone with participants and consider using UTC as a reference point to avoid confusion.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">UTC Reference</h4>
              <p>Coordinated Universal Time (UTC) is the primary time standard worldwide. It's useful as a neutral reference when coordinating across multiple timezones.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Travel Planning</h4>
              <p>When traveling, remember that timezone changes can affect your schedule. Plan accordingly for jet lag and time adjustments, especially for business meetings.</p>
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

export default TimezoneCalculator;
