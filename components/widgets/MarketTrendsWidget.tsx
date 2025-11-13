
import React from 'react';
import { ChartBarIcon } from '../icons/ChartBarIcon';

export const MarketTrendsWidget: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <ChartBarIcon className="w-6 h-6 text-indigo-500" />
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">Market Trends</h2>
                </div>
                <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 rounded-lg p-0.5">
                    <button className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">1D</button>
                    <button className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">5D</button>
                    <button className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">1M</button>
                    <button className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">1Y</button>
                </div>
            </div>
            <div className="h-64 flex items-center justify-center">
                {/* Placeholder for a chart library */}
                <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <path d="M 0 150 Q 50 80, 100 120 T 200 100 T 300 150 T 400 80" stroke="#4f46e5" fill="transparent" strokeWidth="2"/>
                  <path d="M 0 180 Q 50 120, 100 160 T 200 130 T 300 180 T 400 140" stroke="#a5b4fc" fill="transparent" strokeWidth="2" strokeDasharray="4"/>
                </svg>
            </div>
        </div>
    );
};
