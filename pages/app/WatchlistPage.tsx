// pages/app/WatchlistPage.tsx
import React from 'react';
import type { StockPick, AnyPage } from '../../types';
import { BookmarkIcon, PlusIcon } from '../../components/icons';
import { StockCard } from './shared/StockCard';

interface WatchlistPageProps {
    onSelectStock: (stock: StockPick) => void;
    onOpenChart: (stock: StockPick) => void;
    watchlist: Set<string>;
    removeStockFromWatchlist: (symbol: string) => void;
    onNavigate: (page: AnyPage) => void;
}

// This map acts as a local cache for detailed stock data.
// It's a fallback for stocks whose full details haven't been fetched yet.
const allStocksMap: { [key: string]: StockPick } = {
    'RELIANCE.NS': { symbol: 'RELIANCE.NS', name: 'Reliance Industries', price: 2865.30, change: 1.82, sector: 'Energy', marketCap: 19380000000000, volume: 8500000, recommendation: 'Buy', risk: 'Medium', horizon: 'Long-term', logoUrl: 'https://logo.clearbit.com/ril.com', confidence: 85, targetPrice: 3200, stopLoss: 2750, peRatio: 28.5, eps: 100.5, dividendYield: 0.3, debtToEquity: 0.4, revenueGrowth: 15, sectorPeAverage: 25, aiSummary: '', opportunities: [], risks: [] },
    'TCS.NS': { symbol: 'TCS.NS', name: 'Tata Consultancy', price: 3890.10, change: -0.45, sector: 'IT', marketCap: 14210000000000, volume: 3200000, recommendation: 'Hold', risk: 'Low', horizon: 'Long-term', logoUrl: 'https://logo.clearbit.com/tcs.com', confidence: 78, targetPrice: 4000, stopLoss: 3800, peRatio: 30.1, eps: 129.2, dividendYield: 1.1, debtToEquity: 0.05, revenueGrowth: 12, sectorPeAverage: 28, aiSummary: '', opportunities: [], risks: [] },
    'AAPL': { symbol: 'AAPL', name: 'Apple Inc.', price: 172.25, change: 1.5, risk: 'Low', horizon: 'Long-term', logoUrl: 'https://logo.clearbit.com/apple.com', sector: 'Technology', confidence: 88, targetPrice: 210, stopLoss: 165.5, marketCap: 2800000000000, volume: 95000000, peRatio: 28.5, eps: 6.04, dividendYield: 0.53, debtToEquity: 1.47, revenueGrowth: 2.1, sectorPeAverage: 26.2, aiSummary: 'Summary...', opportunities: [], risks: []},
};

export const WatchlistPage: React.FC<WatchlistPageProps> = ({ onSelectStock, onOpenChart, watchlist, removeStockFromWatchlist, onNavigate }) => {
    const watchlistSymbols = Array.from(watchlist);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <BookmarkIcon className="w-8 h-8 text-accent" />
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">My Watchlist</h1>
                        <p className="text-text-secondary">Track your favorite stocks and their performance.</p>
                    </div>
                </div>
            </div>

            {watchlistSymbols.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {watchlistSymbols.map(symbol => {
                        // --- THIS IS THE KEY FIX ---
                        // If stock details aren't in our map, create a minimal "loading" object.
                        // This prevents passing `undefined` to the StockCard.
                        const stockData = allStocksMap[symbol] || { symbol: symbol };

                        return (
                            <StockCard
                                key={symbol}
                                stock={stockData as StockPick}
                                onSelectStock={onSelectStock}
                                onOpenChart={onOpenChart}
                                onRemove={() => removeStockFromWatchlist(symbol)}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="col-span-full text-center py-20 bg-surface rounded-xl border-2 border-dashed border-border">
                    <BookmarkIcon className="mx-auto h-12 w-12 text-text-secondary" />
                    <h3 className="mt-2 text-lg font-semibold text-text-primary">Your Watchlist is Empty</h3>
                    <p className="mt-1 text-sm text-text-secondary">Add stocks from the Market page to start tracking them.</p>
                    <div className="mt-6">
                        <button
                            onClick={() => onNavigate('Market')}
                            type="button"
                            className="inline-flex items-center rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80"
                        >
                            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                            Find Stocks to Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
