
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, change, isPositive }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
          <Icon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
        </div>
      </div>
      <div className="flex items-center mt-4 text-sm">
        {isPositive ? (
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        )}
        <span className={`ml-1 ${isPositive ? 'text-green-500' : 'text-red-500'} font-medium`}>
          {change}
        </span>
        <span className="ml-1 text-gray-500 dark:text-gray-400">vs bulan lalu</span>
      </div>
    </div>
  );
};

export default StatCard;
