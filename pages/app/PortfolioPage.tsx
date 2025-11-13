
import React from 'react';
import type { StockPick, Holding } from '../../types';

interface PortfolioPageProps {
    onSelectStock: (stock: StockPick) => void;
}

const mockHoldings: Holding[] = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', logoUrl: 'https://logo.clearbit.com/ril.com', quantity: 15, avgCost: 2750.50, ltp: 2865.30 },
    { symbol: 'TCS', name: 'Tata Consultancy', logoUrl: 'https://logo.clearbit.com/tcs.com', quantity: 25, avgCost: 3800.00, ltp: 3890.10 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', logoUrl: 'https://logo.clearbit.com/hdfcbank.com', quantity: 50, avgCost: 1480.20, ltp: 1455.40 },
    { symbol: 'INFY', name: 'Infosys', logoUrl: 'https://logo.clearbit.com/infosys.com', quantity: 30, avgCost: 1550.00, ltp: 1560.25 },
    { symbol: 'TATAMOTORS', name: 'Tata Motors', logoUrl: 'https://logo.clearbit.com/tatamotors.com', quantity: 100, avgCost: 950.75, ltp: 980.50 },
];

const stockPicksMap: { [key: string]: StockPick } = {
    'RELIANCE': { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2865.30, change: 1.82, sector: 'Energy', marketCap: 19380000000000, volume: 8500000, recommendation: 'Buy', risk: 'Medium', horizon: 'Long-term', logoUrl: 'https://logo.clearbit.com/ril.com', confidence: 85, targetPrice: 3200, stopLoss: 2750, peRatio: 28.5, eps: 100.5, dividendYield: 0.3, debtToEquity: 0.4, revenueGrowth: 15, sectorPeAverage: 25, aiSummary: '', opportunities: [], risks: [] },
    'TCS': { symbol: 'TCS', name: 'Tata Consultancy', price: 3890.10, change: -0.45, sector: 'IT', marketCap: 14210000000000, volume: 3200000, recommendation: 'Hold', risk: 'Low', horizon: 'Long-term', logoUrl: 'https://logo.clearbit.com/tcs.com', confidence: 78, targetPrice: 4000, stopLoss: 3800, peRatio: 30.1, eps: 129.2, dividendYield: 1.1, debtToEquity: 0.05, revenueGrowth: 12, sectorPeAverage: 28, aiSummary: '', opportunities: [], risks: [] },
    'HDFCBANK': { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1455.40, change: 2.15, sector: 'Banking', marketCap: 11050000000000, volume: 15000000, recommendation: 'Buy', risk: 'Low', horizon: 'Long-term', logoUrl: 'https://logo.clearbit.com/hdfcbank.com', confidence: 90, targetPrice: 1600, stopLoss: 1400, peRatio: 19.8, eps: 73.5, dividendYield: 1.0, debtToEquity: 0, revenueGrowth: 18, sectorPeAverage: 18, aiSummary: '', opportunities: [], risks: [] },
    'INFY': { symbol: 'INFY', name: 'Infosys', price: 1560.25, change: -1.20, sector: 'IT', marketCap: 6530000000000, volume: 7500000, recommendation: 'Hold', risk: 'Low', horizon: 'Long-term', logoUrl: 'https://logo.clearbit.com/infosys.com', confidence: 80, targetPrice: 1650, stopLoss: 1500, peRatio: 26.3, eps: 59.3, dividendYield: 1.5, debtToEquity: 0.08, revenueGrowth: 14, sectorPeAverage: 28, aiSummary: '', opportunities: [], risks: [] },
    'TATAMOTORS': { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 980.50, change: 4.50, sector: 'Auto', marketCap: 3260000000000, volume: 25000000, recommendation: 'Buy', risk: 'High', horizon: 'Mid-term', logoUrl: 'https://logo.clearbit.com/tatamotors.com', confidence: 75, targetPrice: 1100, stopLoss: 920, peRatio: 16.5, eps: 59.4, dividendYield: 0.5, debtToEquity: 1.5, revenueGrowth: 25, sectorPeAverage: 22, aiSummary: '', opportunities: [], risks: [] },
};


const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onSelectStock }) => {
    const totalInvested = mockHoldings.reduce((sum, h) => sum + h.avgCost * h.quantity, 0);
    const currentValue = mockHoldings.reduce((sum, h) => sum + h.ltp * h.quantity, 0);
    const totalPnl = currentValue - totalInvested;
    const totalPnlPercentage = (totalPnl / totalInvested) * 100;

    const portfolioData = mockHoldings.map(h => {
        const invested = h.avgCost * h.quantity;
        const currentVal = h.ltp * h.quantity;
        const pnl = currentVal - invested;
        const pnlPercentage = (pnl / invested) * 100;
        return { ...h, invested, currentVal, pnl, pnlPercentage };
    });
    
    const colors = ['#4f46e5', '#7c3aed', '#db2777', '#f59e0b', '#10b981'];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Summary Cards */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                     <SummaryCard title="Current Value" value={formatCurrency(currentValue)} />
                     <SummaryCard title="Total Investment" value={formatCurrency(totalInvested)} />
                     <SummaryCard 
                        title="Overall P&L" 
                        value={formatCurrency(totalPnl)} 
                        subtitle={`${totalPnl > 0 ? '+' : ''}${totalPnlPercentage.toFixed(2)}%`}
                        color={totalPnl >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'} 
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Holdings Table */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Holdings ({portfolioData.length})</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                             <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left">Stock</th>
                                    <th className="px-4 py-3 text-right">Qty</th>
                                    <th className="px-4 py-3 text-right">Avg. Cost</th>
                                    <th className="px-4 py-3 text-right">LTP</th>
                                    <th className="px-4 py-3 text-right">P&L</th>
                                </tr>
                            </thead>
                            <tbody>
                                {portfolioData.map(h => (
                                    <tr key={h.symbol} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer" onClick={() => onSelectStock(stockPicksMap[h.symbol])}>
                                        <td className="px-4 py-3 flex items-center gap-3">
                                            <img src={h.logoUrl} alt={h.name} className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-700 object-contain p-0.5" />
                                            <div>
                                                <div className="font-semibold text-gray-900 dark:text-white">{h.symbol}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">{h.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right dark:text-gray-300">{h.quantity}</td>
                                        <td className="px-4 py-3 text-right dark:text-gray-300">{formatCurrency(h.avgCost)}</td>
                                        <td className="px-4 py-3 text-right font-semibold dark:text-gray-200">{formatCurrency(h.ltp)}</td>
                                        <td className={`px-4 py-3 text-right font-semibold ${h.pnl >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                                            <div>{formatCurrency(h.pnl)}</div>
                                            <div className="text-xs">({h.pnlPercentage.toFixed(2)}%)</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Allocation Chart */}
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Asset Allocation</h2>
                    <div className="flex justify-center items-center my-6">
                        <svg width="180" height="180" viewBox="0 0 36 36">
                            {portfolioData.reduce((acc, holding, index) => {
                                const percentage = (holding.currentVal / currentValue) * 100;
                                const offset = acc.offset;
                                acc.offset += percentage;
                                acc.elements.push(
                                    <circle key={index} cx="18" cy="18" r="15.9155" fill="transparent" stroke={colors[index % colors.length]} strokeWidth="4" strokeDasharray={`${percentage} ${100 - percentage}`} strokeDashoffset={-offset}></circle>
                                );
                                return acc;
                            }, { offset: 25, elements: [] as JSX.Element[] }).elements}
                             <text x="18" y="20.35" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1f2937" className="dark:fill-white">Holdings</text>
                        </svg>
                    </div>
                    <div className="space-y-2 text-sm">
                        {portfolioData.map((h, i) => (
                            <div key={h.symbol} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }}></div>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{h.symbol}</span>
                                </div>
                                <span className="text-gray-600 dark:text-gray-300">{((h.currentVal / currentValue) * 100).toFixed(2)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const SummaryCard: React.FC<{ title: string; value: string; subtitle?: string; color?: string }> = ({ title, value, subtitle, color = 'text-gray-900 dark:text-white' }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        {subtitle && <p className={`text-sm font-semibold mt-1 ${color}`}>{subtitle}</p>}
    </div>
);
