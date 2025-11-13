// pages/app/StockDeepDivePage.tsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import type { StockPick } from '../../types';
import { ArrowLeftIcon, CheckIcon, PlusIcon } from '../../components/icons';
import { usePrices } from '../../PriceContext'; // <-- CORRECTED PATH
import { DetailedLineChart } from '../../components/DetailedLineChart';

const CandlestickChart: React.FC = () => {
    // A simple placeholder for a candlestick chart
    return (
        <svg width="100%" height="100%" viewBox="0 0 180 100" preserveAspectRatio="none">
            {[...Array(5)].map((_, i) => {
                const isUp = Math.random() > 0.5;
                const high = 20 + Math.random() * 10;
                const low = 80 - Math.random() * 10;
                const open = 40 + Math.random() * 20;
                const close = 40 + Math.random() * 20;
                return (
                    <g key={i}>
                        <line x1={20 + i * 35} y1={high} x2={20 + i * 35} y2={low} stroke={isUp ? '#16a34a' : '#dc2626'} strokeWidth="1" />
                        <rect x={15 + i * 35} y={isUp ? close : open} width="10" height={Math.abs(open - close)} fill={isUp ? '#16a34a' : '#dc2626'} />
                    </g>
                );
            })}
        </svg>
    );
};

const ChartsSection: React.FC<{ symbol: string, isPositive: boolean }> = ({ symbol, isPositive }) => {
    const [chartType, setChartType] = useState(() => localStorage.getItem('chartPreference') || 'line');
    const [chartData, setChartData] = useState<number[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        localStorage.setItem('chartPreference', chartType);
    }, [chartType]);

    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            const { data, error } = await supabase.functions.invoke('get-price-history', { body: { symbol } });
            if (error) console.error("Chart Error:", error);
            else setChartData(data.history);
            setIsLoading(false);
        };
        if (symbol) fetchHistory();
    }, [symbol]);

    return (
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
            <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                <h3 className="font-bold text-text-primary">Price Chart</h3>
                <div className="flex items-center text-text-secondary p-0.5 border border-border rounded-lg">
                    <button onClick={() => setChartType('line')} className={`px-3 py-1 text-sm font-medium rounded-md ${chartType === 'line' ? 'bg-accent text-white' : ''}`}>Line</button>
                    <button onClick={() => setChartType('candle')} className={`px-3 py-1 text-sm font-medium rounded-md ${chartType === 'candle' ? 'bg-accent text-white' : ''}`}>Candle</button>
                </div>
            </div>
            <div className="h-80 flex items-center justify-center">
                {isLoading ? <div className="text-text-secondary">Loading Chart...</div> : (
                    chartType === 'line' ? <DetailedLineChart data={chartData} isPositive={isPositive} /> : <CandlestickChart />
                )}
            </div>
        </div>
    );
};

export const StockDeepDivePage: React.FC<any> = ({ stock, onBack, watchlist, addStockToWatchlist, removeStockFromWatchlist }) => {
    const isInWatchlist = watchlist.has(stock.symbol);
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-surface"><ArrowLeftIcon className="w-6 h-6 text-text-secondary" /></button>
                    <div>
                        <h1 className="text-2xl font-bold text-text-primary">{stock.name} ({stock.symbol})</h1>
                    </div>
                </div>
                {isInWatchlist ? (
                    <button onClick={() => removeStockFromWatchlist(stock.symbol)} className="flex items-center gap-2 py-2 px-4 bg-positive/20 text-positive font-semibold rounded-lg hover:bg-positive/30">
                        <CheckIcon className="w-5 h-5"/><span>On Watchlist</span>
                    </button>
                ) : (
                    <button onClick={() => addStockToWatchlist(stock.symbol)} className="flex items-center gap-2 py-2 px-4 bg-surface text-text-primary font-semibold rounded-lg hover:bg-border">
                        <PlusIcon className="w-5 h-5"/><span>Add to Watchlist</span>
                    </button>
                )}
            </div>
            <ChartsSection symbol={stock.symbol} isPositive={stock.change >= 0} />
        </div>
    );
};
