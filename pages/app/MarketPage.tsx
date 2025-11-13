// pages/app/MarketPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import type { StockPick } from '../../types';
import { usePrices } from '../../PriceContext';
import { PlusIcon } from '../../components/icons/PlusIcon';
import { CheckIcon } from '../../components/icons/CheckIcon';
import { MagnifyingGlassIcon } from '../../components/icons/MagnifyingGlassIcon';
import { EyeIcon } from '../../components/icons/EyeIcon';
import { ChartBarIcon } from '../../components/icons/ChartBarIcon';
import { AIInsightsWidget } from '../../components/AInsightsWidget';

interface MarketPageProps {
    onSelectStock: (stock: StockPick) => void;
    onOpenChart: (stock: StockPick) => void;
    watchlist: Set<string>;
    addStockToWatchlist: (symbol: string) => void;
    removeStockFromWatchlist: (symbol: string) => void;
}

const createStockPickFromSearchResult = (result: any): StockPick => ({
    symbol: result.symbol,
    name: result.description,
    price: 0, change: 0, sector: 'N/A', marketCap: 0, volume: 0, recommendation: 'Hold', risk: 'Medium', horizon: 'Mid-term',
    logoUrl: `https://logo.clearbit.com/${result.description?.split(' ')[0].toLowerCase().replace('.', '')}.com`,
    confidence: 70, targetPrice: 0, stopLoss: 0, peRatio: 0, eps: 0, dividendYield: 0, debtToEquity: 0, revenueGrowth: 0, sectorPeAverage: 0, aiSummary: '', opportunities: [], risks: [],
});

export const MarketPage: React.FC<MarketPageProps> = ({ onSelectStock, onOpenChart, watchlist, addStockToWatchlist, removeStockFromWatchlist }) => {
    const { livePrices } = usePrices();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    const performSearch = async (query: string) => {
        if (query.length < 2) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }
        setIsSearching(true);
        try {
            const { data, error } = await supabase.functions.invoke(`search-stocks?q=${query}`);
            if (error) throw error;
            setSearchResults(data);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const debouncedSearch = useCallback(debounce(performSearch, 400), []);

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    const aiMarketData = searchResults.slice(0, 5).map(stock => {
        const liveData = livePrices[stock.symbol];
        return {
            symbol: stock.symbol,
            price: liveData ? liveData.current_price : 'N/A',
            change: liveData ? liveData.change_percent : 0,
        };
    });

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="relative">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search for any stock (e.g., TATASTEEL, AAPL)..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {searchResults.length > 0 && <AIInsightsWidget marketData={aiMarketData} />}

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                {isSearching && <div className="text-center py-10 text-gray-500">Searching...</div>}
                {!isSearching && searchResults.length > 0 && (
                    <StockTable
                        stocks={searchResults}
                        onSelectStock={onSelectStock}
                        onOpenChart={onOpenChart}
                        livePrices={livePrices}
                        watchlist={watchlist}
                        addStockToWatchlist={addStockToWatchlist}
                        removeStockFromWatchlist={removeStockFromWatchlist}
                    />
                )}
                {!isSearching && searchResults.length === 0 && (
                    <div className="text-center py-16">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {searchTerm ? "No results found" : "Search for a stock to see results"}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            {searchTerm ? `No stocks found for "${searchTerm}".` : "Start typing in the search bar above."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const StockTable: React.FC<any> = ({ stocks, livePrices, watchlist, addStockToWatchlist, removeStockFromWatchlist, onSelectStock, onOpenChart }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th className="px-4 py-3">Symbol</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3 text-right">Live Price</th>
                    <th className="px-4 py-3 text-right">% Change</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {stocks.map(stock => {
                    const liveData = livePrices[stock.symbol];
                    const displayPrice = liveData ? liveData.current_price : '...';
                    const displayChange = liveData ? liveData.change_percent : 0;
                    const isInWatchlist = watchlist.has(stock.symbol);
                    const stockPickData = createStockPickFromSearchResult(stock);

                    return (
                        <tr key={stock.symbol} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{stock.symbol}</td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 truncate max-w-xs">{stock.description}</td>
                            <td className="px-4 py-3 font-semibold text-right dark:text-gray-200">
                                {typeof displayPrice === 'number' ? `₹${displayPrice.toFixed(2)}` : displayPrice}
                            </td>
                            <td className={`px-4 py-3 font-semibold text-right ${displayChange >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                                {displayChange.toFixed(2)}%
                            </td>
                            <td className="px-4 py-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <button onClick={() => onOpenChart(stockPickData)} className="p-1.5 text-gray-400 hover:text-indigo-600" title="Open Chart"><ChartBarIcon className="w-5 h-5"/></button>
                                    <button onClick={() => onSelectStock(stockPickData)} className="p-1.5 text-gray-400 hover:text-indigo-600" title="View Details"><EyeIcon className="w-5 h-5"/></button>
                                    {isInWatchlist ? (
                                        <button onClick={() => removeStockFromWatchlist(stock.symbol)} className="p-1.5 text-green-500 hover:text-red-500" title="Remove from Watchlist">
                                            <CheckIcon className="w-5 h-5"/>
                                        </button>
                                    ) : (
                                        <button onClick={() => addStockToWatchlist(stock.symbol)} className="p-1.5 text-gray-400 hover:text-green-500" title="Add to Watchlist">
                                            <PlusIcon className="w-5 h-5"/>
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
);
