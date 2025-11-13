
import React from 'react';

export const PortfolioSnapshotWidget: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Portfolio Snapshot</h2>
            <div className="flex items-center justify-center my-6">
                {/* Placeholder for a pie chart */}
                 <svg width="120" height="120" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#e5e7eb" strokeWidth="3" className="dark:stroke-gray-700"></circle>
                    <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#4f46e5" strokeWidth="3" strokeDasharray="60 40" strokeDashoffset="25"></circle>
                    <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#a5b4fc" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="-15"></circle>
                     <text x="18" y="20.35" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#1f2937" className="dark:fill-white">$122k</text>
                </svg>
            </div>
            <div className="space-y-3">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Total Value</span>
                    <span className="font-semibold text-gray-900 dark:text-white">$122,123.50</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Day's Gain/Loss</span>
                    <span className="font-semibold text-green-600 dark:text-green-500">+$1,052.30 (+0.87%)</span>
                </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Total Gain/Loss</span>
                    <span className="font-semibold text-green-600 dark:text-green-500">+$21,800.10 (+21.75%)</span>
                </div>
            </div>
        </div>
    );
};
