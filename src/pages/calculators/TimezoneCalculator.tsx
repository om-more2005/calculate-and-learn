
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import AdSpace from '../../components/AdSpace';

const TimezoneCalculator = () => {
  const [fromTimezone, setFromTimezone] = useState('UTC');
  const [toTimezone, setToTimezone] = useState('America/New_York');
  const [inputTime, setInputTime] = useState('12:00');
  const [inputDate, setInputDate] = useState(new Date().toISOString().split('T')[0]);
  const [convertedDateTime, setConvertedDateTime] = useState('');

  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
    { value: 'America/Chicago', label: 'Central Time (US & Canada)' },
    { value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
    { value: 'Europe/London', label: 'London (GMT/BST)' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
    { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
    { value: 'Asia/Kolkata', label: 'Mumbai (IST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
    { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)' }
  ];

  useEffect(() => {
    convertTime();
  }, [fromTimezone, toTimezone, inputTime, inputDate]);

  const convertTime = () => {
    try {
      // Create a date object with the input date and time
      const dateTimeString = `${inputDate}T${inputTime}:00`;
      
      // Create date object assuming the input is in the "from" timezone
      const inputDateTime = new Date(dateTimeString);
      
      // Format for display in the target timezone
      const options = {
        timeZone: toTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      
      // For proper timezone conversion, we need to adjust for the source timezone
      const fromOptions = { timeZone: fromTimezone };
      const toOptions = { timeZone: toTimezone };
      
      // Get the offset difference
      const fromOffset = getTimezoneOffset(inputDateTime, fromTimezone);
      const toOffset = getTimezoneOffset(inputDateTime, toTimezone);
      
      // Adjust the time
      const adjustedTime = new Date(inputDateTime.getTime() + (fromOffset - toOffset) * 60000);
      
      const converted = adjustedTime.toLocaleString('en-US', {
        timeZone: toTimezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      setConvertedDateTime(converted);
    } catch (error) {
      setConvertedDateTime('Invalid date/time');
    }
  };

  const getTimezoneOffset = (date, timezone) => {
    const utc1 = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const utc2 = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    return (utc2.getTime() - utc1.getTime()) / 60000;
  };

  const getCurrentTimeInTimezone = (timezone) => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
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
                  Current time: {getCurrentTimeInTimezone(fromTimezone)}
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
                  Current time: {getCurrentTimeInTimezone(toTimezone)}
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
              <div className="text-lg font-mono mb-2">
                {convertedDateTime || 'Select date and time'}
              </div>
              <p className="text-blue-100 text-sm">
                {timezones.find(tz => tz.value === toTimezone)?.label}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Reference</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">From:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {inputDate} {inputTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Source Zone:</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">
                    {timezones.find(tz => tz.value === fromTimezone)?.label.split(' ')[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Target Zone:</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">
                    {timezones.find(tz => tz.value === toTimezone)?.label.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Current Times</h3>
              <div className="space-y-2 text-sm">
                {[fromTimezone, toTimezone].filter((tz, index, arr) => arr.indexOf(tz) === index).map(tz => (
                  <div key={tz} className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      {timezones.find(timezone => timezone.value === tz)?.label.split(' ')[0]}:
                    </span>
                    <span className="font-mono font-semibold text-gray-900 dark:text-white">
                      {getCurrentTimeInTimezone(tz)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Understanding Timezones</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Daylight Saving Time</h4>
              <p>Many regions observe daylight saving time, which can affect timezone calculations. This calculator automatically accounts for DST when applicable.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Global Business</h4>
              <p>When scheduling international meetings or calls, always confirm the timezone with participants and consider using UTC as a reference point.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">UTC Reference</h4>
              <p>Coordinated Universal Time (UTC) is the primary time standard worldwide. It's useful as a neutral reference when coordinating across multiple timezones.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Travel Planning</h4>
              <p>When traveling, remember that timezone changes can affect your schedule. Plan accordingly for jet lag and time adjustments.</p>
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
