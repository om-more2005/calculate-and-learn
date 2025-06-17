
import React from 'react';

interface AdSpaceProps {
  size: 'banner' | 'rectangle' | 'leaderboard' | 'sidebar';
  className?: string;
}

const AdSpace = ({ size, className = '' }: AdSpaceProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'banner':
        return 'w-full h-24 md:h-32';
      case 'rectangle':
        return 'w-full h-64 md:w-80 md:h-64';
      case 'leaderboard':
        return 'w-full h-20 md:h-24';
      case 'sidebar':
        return 'w-full h-96';
      default:
        return 'w-full h-32';
    }
  };

  return (
    <div className={`${getSizeClasses()} ${className} bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center`}>
      <div className="text-center text-gray-500 dark:text-gray-400">
        <div className="text-sm font-medium">Google Ad Space</div>
        <div className="text-xs mt-1">{size} format</div>
      </div>
    </div>
  );
};

export default AdSpace;
