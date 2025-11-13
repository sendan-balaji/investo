
import React from 'react';
import type { StockPick } from '../../types';
import { SparklesIcon } from '../icons/SparklesIcon';

interface AIStockPicksWidgetProps {
    stockPicks: StockPick[];
    onSelectStock: (stock: StockPick) => void;
}

const recommendationColors: Record<StockPick['recommendation'], string> = {
    Buy: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Hold: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Sell: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const changeColor = (change: number) => {
    if (change > 0) return 'text-green-600 dark:text-green-500';
    if (change < 0) return 'text-red-600 dark:text-red-500';
    return 'text-gray-500 dark:text-gray-400';
}

export const AIStockPicksWidget: React.FC<AIStockPicksWidgetProps> = ({ stockPicks, onSelectStock }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <SparklesIcon className="w-6 h-6 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">AI Stock Picks</h2>
            </div>
            <div className="space-y-1">
                {stockPicks.map((pick) => (
                    <button 
                        key={pick.symbol} 
                        onClick={() => onSelectStock(pick)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex items-center justify-center h-10 w-10">
                                <span className="font-bold text-gray-700 dark:text-gray-200 text-sm">{pick.symbol}</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{pick.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">${pick.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${recommendationColors[pick.recommendation]}`}>
                                {pick.recommendation}
                            </span>
                            <p className={`text-sm font-medium mt-1 ${changeColor(pick.change)}`}>
                                {pick.change > 0 ? '+' : ''}{pick.change.toFixed(2)}%
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
