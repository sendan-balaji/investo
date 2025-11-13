
import React, { useState, useMemo } from 'react';
import { WrenchScrewdriverIcon } from '../../components/icons/WrenchScrewdriverIcon';

export const ToolsPage: React.FC = () => {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [timePeriod, setTimePeriod] = useState(10);

    const calculation = useMemo(() => {
        const i = (expectedReturn / 100) / 12;
        const n = timePeriod * 12;
        const M = monthlyInvestment;

        if (i === 0) { // Handle case where return is 0
            const totalValue = M * n;
            const investedAmount = M * n;
            return {
                investedAmount,
                estimatedReturns: 0,
                totalValue
            };
        }

        const totalValue = M * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        const investedAmount = M * n;
        const estimatedReturns = totalValue - investedAmount;

        return {
            investedAmount,
            estimatedReturns,
            totalValue
        };
    }, [monthlyInvestment, expectedReturn, timePeriod]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center">
                <WrenchScrewdriverIcon className="w-10 h-10 mx-auto text-indigo-500" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Financial Tools</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Plan your investments with our simple calculators.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">SIP Calculator</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex justify-between">
                                <span>Monthly Investment</span>
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(monthlyInvestment)}</span>
                            </label>
                            <input
                                type="range"
                                min="500"
                                max="100000"
                                step="500"
                                value={monthlyInvestment}
                                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex justify-between">
                                <span>Expected Return Rate (p.a)</span>
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">{expectedReturn}%</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="30"
                                step="0.5"
                                value={expectedReturn}
                                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex justify-between">
                                <span>Time Period (Years)</span>
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">{timePeriod} Yr</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="40"
                                step="1"
                                value={timePeriod}
                                onChange={(e) => setTimePeriod(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Results */}
                    <div className="text-center bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col justify-center">
                         <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
                         <p className="text-4xl font-bold text-gray-900 dark:text-white my-2">{formatCurrency(calculation.totalValue)}</p>
                         <div className="mt-4 text-sm space-y-2">
                             <div className="flex justify-between">
                                 <span className="text-gray-600 dark:text-gray-300">Invested Amount</span>
                                 <span className="font-medium text-gray-800 dark:text-gray-100">{formatCurrency(calculation.investedAmount)}</span>
                             </div>
                             <div className="flex justify-between">
                                 <span className="text-gray-600 dark:text-gray-300">Est. Returns</span>
                                 <span className="font-medium text-green-600 dark:text-green-500">{formatCurrency(calculation.estimatedReturns)}</span>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
