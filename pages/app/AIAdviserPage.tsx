
import React, { useState, useMemo } from 'react';
import type { StockPick, Recommendation, RiskLevel, TimeHorizon } from '../../types';
import { MagnifyingGlassIcon } from '../../components/icons/MagnifyingGlassIcon';

// Mock data for a richer AI Adviser page
const allStockPicks: StockPick[] = [
    {
        symbol: 'AAPL', name: 'Apple Inc.', recommendation: 'Buy', price: 172.25, change: 1.5, risk: 'Low', horizon: 'Long-term', logoUrl: 'https://logo.clearbit.com/apple.com',
        sector: 'Technology', confidence: 88, targetPrice: 210.00, stopLoss: 165.50, marketCap: 2800000000000, volume: 95000000, peRatio: 28.5, eps: 6.04, dividendYield: 0.53, debtToEquity: 1.47, revenueGrowth: 2.1, sectorPeAverage: 26.2,
        aiSummary: 'Apple is expected to show strong performance driven by consistent iPhone sales, services growth, and innovation in the wearables sector. Its strong brand loyalty and ecosystem provide a significant competitive advantage.',
        opportunities: ['Growing services revenue stream', 'High customer retention and brand loyalty', 'Potential for new product categories like Vision Pro'],
        risks: ['Regulatory scrutiny in US and Europe', 'Supply chain disruptions in Asia', 'Intense competition in the smartphone market'],
    },
    {
        symbol: 'GOOGL', name: 'Alphabet Inc.', recommendation: 'Hold', price: 2830.45, change: -0.2, risk: 'Low', horizon: 'Long-term', logoUrl: 'https://logo.clearbit.com/google.com',
        sector: 'Technology', confidence: 75, targetPrice: 2950.00, stopLoss: 2780.00, marketCap: 1800000000000, volume: 1500000, peRatio: 25.8, eps: 110.2, dividendYield: 0.00, debtToEquity: 0.08, revenueGrowth: 15.3, sectorPeAverage: 26.2,
        aiSummary: 'Alphabet holds a dominant position in search and advertising. While growth in its core business remains strong, increasing competition in cloud computing and AI presents both opportunities and challenges, justifying a "Hold" position.',
        opportunities: ['Leadership in AI and machine learning', 'Strong growth in Google Cloud Platform (GCP)', 'Monetization potential of autonomous driving (Waymo)'],
        risks: ['Antitrust lawsuits and regulatory pressures', 'Dependence on advertising revenue', 'High R&D spending with uncertain ROI'],
    },
    {
        symbol: 'TSLA', name: 'Tesla, Inc.', recommendation: 'Sell', price: 900.80, change: -2.1, risk: 'High', horizon: 'Short-term', logoUrl: 'https://logo.clearbit.com/tesla.com',
        sector: 'Automotive', confidence: 65, targetPrice: 850.00, stopLoss: 920.00, marketCap: 905000000000, volume: 25000000, peRatio: 95.2, eps: 9.46, dividendYield: 0.00, debtToEquity: 0.07, revenueGrowth: 55.8, sectorPeAverage: 15.4,
        aiSummary: 'Tesla\'s high valuation and increasing competition in the EV space suggest a cautious approach. While a market leader, recent price cuts may impact margins, and production challenges could pose short-term risks.',
        opportunities: ['Expansion of Gigafactories globally', 'Growth in energy storage business', 'Advancements in autonomous driving software'],
        risks: ['Extremely high P/E ratio compared to industry', 'Increased competition from traditional automakers', 'Key-person risk associated with CEO'],
    },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', recommendation: 'Buy', price: 3450.96, change: 2.3, risk: 'Medium', horizon: 'Mid-term', logoUrl: 'https://logo.clearbit.com/amazon.com', sector: 'E-Commerce', confidence: 82, targetPrice: 3800, stopLoss: 3300, marketCap: 1750000000000, volume: 3200000, peRatio: 65, eps: 53.1, dividendYield: 0, debtToEquity: 0.5, revenueGrowth: 12, sectorPeAverage: 45, aiSummary: 'Summary for AMZN', opportunities: [], risks: [] },
    { symbol: 'MSFT', name: 'Microsoft Corp.', recommendation: 'Buy', price: 304.36, change: 0.8, risk: 'Low', horizon: 'Long-term', logoUrl: 'https://logo.clearbit.com/microsoft.com', sector: 'Technology', confidence: 90, targetPrice: 350, stopLoss: 295, marketCap: 2200000000000, volume: 35000000, peRatio: 33, eps: 9.22, dividendYield: 0.8, debtToEquity: 0.4, revenueGrowth: 18, sectorPeAverage: 26.2, aiSummary: 'Summary for MSFT', opportunities: [], risks: [] },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', recommendation: 'Hold', price: 220.50, change: -1.1, risk: 'Medium', horizon: 'Mid-term', logoUrl: 'https://logo.clearbit.com/nvidia.com', sector: 'Technology', confidence: 78, targetPrice: 240, stopLoss: 210, marketCap: 550000000000, volume: 50000000, peRatio: 58, eps: 3.8, dividendYield: 0.07, debtToEquity: 0.25, revenueGrowth: 61, sectorPeAverage: 26.2, aiSummary: 'Summary for NVDA', opportunities: [], risks: [] },
];

const recommendationOptions: Recommendation[] = ['Buy', 'Hold', 'Sell'];
const riskOptions: RiskLevel[] = ['Low', 'Medium', 'High'];
const horizonOptions: TimeHorizon[] = ['Short-term', 'Mid-term', 'Long-term'];

const recommendationColors: Record<Recommendation, { bg: string, text: string }> = {
    Buy: { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-800 dark:text-green-300' },
    Hold: { bg: 'bg-yellow-100 dark:bg-yellow-900/50', text: 'text-yellow-800 dark:text-yellow-300' },
    Sell: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-300' },
};

const riskColors: Record<RiskLevel, string> = {
    Low: 'bg-green-500',
    Medium: 'bg-yellow-500',
    High: 'bg-red-500',
};

const StockCard: React.FC<{ stock: StockPick, onSelect: (stock: StockPick) => void; }> = ({ stock, onSelect }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
        <div>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <img src={stock.logoUrl} alt={`${stock.name} logo`} className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 object-contain" />
                    <div>
                        <p className="font-bold text-lg text-gray-900 dark:text-white">{stock.symbol}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{stock.name}</p>
                    </div>
                </div>
                <div className={`px-3 py-1 text-sm font-semibold rounded-full ${recommendationColors[stock.recommendation].bg} ${recommendationColors[stock.recommendation].text}`}>
                    {stock.recommendation}
                </div>
            </div>
            <div className="flex justify-between items-baseline my-4">
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">₹{stock.price.toFixed(2)}</p>
                <p className={`text-md font-semibold ${stock.change >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </p>
            </div>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Risk Level</span>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${riskColors[stock.risk]}`}></div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{stock.risk}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Time Horizon</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{stock.horizon}</span>
                </div>
            </div>
        </div>
        <button 
            onClick={() => onSelect(stock)}
            className="mt-4 w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            View Details
        </button>
    </div>
);

interface AIAdviserPageProps {
    onSelectStock: (stock: StockPick) => void;
    onOpenChart: (stock: StockPick) => void;
}

export const AIAdviserPage: React.FC<AIAdviserPageProps> = ({ onSelectStock, onOpenChart }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeRecommendation, setActiveRecommendation] = useState<Recommendation | 'All'>('All');
    const [activeRisk, setActiveRisk] = useState<RiskLevel | 'All'>('All');
    const [activeHorizon, setActiveHorizon] = useState<TimeHorizon | 'All'>('All');

    const filteredStocks = useMemo(() => {
        return allStockPicks.filter(stock => {
            const searchMatch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
            const recommendationMatch = activeRecommendation === 'All' || stock.recommendation === activeRecommendation;
            const riskMatch = activeRisk === 'All' || stock.risk === activeRisk;
            const horizonMatch = activeHorizon === 'All' || stock.horizon === activeHorizon;
            return searchMatch && recommendationMatch && riskMatch && horizonMatch;
        });
    }, [searchTerm, activeRecommendation, activeRisk, activeHorizon]);

    const FilterPill: React.FC<{ value: string, activeValue: string, onClick: () => void }> = ({ value, activeValue, onClick }) => (
         <button
            onClick={onClick}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${activeValue === value ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-500'}`}
        >
            {value}
        </button>
    );

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                    <div className="relative col-span-1 md:col-span-2 lg:col-span-1">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by name or symbol..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:placeholder-gray-400"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Recommendation</label>
                        <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <FilterPill value="All" activeValue={activeRecommendation} onClick={() => setActiveRecommendation('All')} />
                            {recommendationOptions.map(r => <FilterPill key={r} value={r} activeValue={activeRecommendation} onClick={() => setActiveRecommendation(r)} />)}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Risk Level</label>
                        <select
                            value={activeRisk}
                            onChange={(e) => setActiveRisk(e.target.value as RiskLevel | 'All')}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option>All</option>
                            {riskOptions.map(r => <option key={r}>{r}</option>)}
                        </select>
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Horizon</label>
                         <select
                            value={activeHorizon}
                            onChange={(e) => setActiveHorizon(e.target.value as TimeHorizon | 'All')}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option>All</option>
                            {horizonOptions.map(r => <option key={r}>{r}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredStocks.length > 0 ? (
                    filteredStocks.map(stock => <StockCard key={stock.symbol} stock={stock} onSelect={onSelectStock} />)
                ) : (
                    <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">No stocks match your criteria.</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters to find more AI-powered insights.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
