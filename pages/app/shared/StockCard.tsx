// pages/app/shared/StockCard.tsx

import React, { useState, useRef, useEffect } from 'react';
import type { StockPick } from '../../../types';
import { usePrices } from '../../../PriceContext';
import { EyeIcon, TrashIcon, EllipsisVerticalIcon, ChartBarIcon } from '../../../components/icons';

const formatMarketCap = (value: number): string => {
    if (!value) return 'N/A';
    if (value >= 1e12) return `₹${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `₹${(value / 1e9).toFixed(2)}B`;
    return `₹${(value / 1e6).toFixed(2)}M`;
};

const MiniChart: React.FC<{ change: number }> = ({ change }) => {
    const isPositive = change >= 0;
    const color = isPositive ? '#00c46a' : '#ff5c5c';
    const path = isPositive
        ? "M0 30 Q 15 10, 30 20 T 60 5 T 90 20 T 120 10"
        : "M0 10 Q 15 30, 30 20 T 60 35 T 90 20 T 120 30";
    return (
        <svg width="100%" height="40px" viewBox="0 0 120 40" preserveAspectRatio="none">
            <path d={path} stroke={color} fill="transparent" strokeWidth="2" />
        </svg>
    );
};

interface StockCardProps {
    stock: StockPick;
    onSelectStock: (stock: StockPick) => void;
    onOpenChart: (stock: StockPick) => void;
    onRemove?: () => void;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, onSelectStock, onOpenChart, onRemove }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { livePrices } = usePrices();

    // --- THIS IS THE CRITICAL FIX ---
    // If the main stock data prop is missing or incomplete, render a loading skeleton and stop.
    if (!stock || !stock.symbol) {
        return (
            <div className="bg-surface p-4 rounded-xl border border-border shadow-sm animate-pulse">
                <div className="h-6 bg-border rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-border rounded w-1/2"></div>
            </div>
        );
    }

    const liveData = livePrices[stock.symbol];
    const displayPrice = liveData ? liveData.current_price : stock.price;
    const displayChange = liveData ? liveData.change_percent : stock.change;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsMenuOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    return (
        <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-col justify-between">
            <div>
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => onSelectStock(stock)}>
                        <img src={stock.logoUrl} alt="" className="h-10 w-10 rounded-full bg-background object-contain p-0.5" />
                        <div>
                            <p className="font-bold text-lg text-text-primary">{stock.symbol}</p>
                            <p className="text-sm text-text-secondary truncate w-32">{stock.name}</p>
                        </div>
                    </div>
                    <div className="relative" ref={menuRef}>
                        <button onClick={() => setIsMenuOpen(p => !p)} className="p-1.5 text-text-secondary hover:bg-background rounded-full">
                            <EllipsisVerticalIcon className="w-5 h-5" />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg ring-1 ring-border z-20">
                                <div className="py-1">
                                    <button onClick={() => { onOpenChart(stock); setIsMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-text-primary hover:bg-surface">
                                        <ChartBarIcon className="w-4 h-4" /> Open Chart
                                    </button>
                                    <button onClick={() => { onSelectStock(stock); setIsMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-text-primary hover:bg-surface">
                                        <EyeIcon className="w-4 h-4" /> View Details
                                    </button>
                                    {onRemove && (
                                        <button onClick={() => { onRemove(); setIsMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-negative hover:bg-surface">
                                            <TrashIcon className="w-4 h-4" /> Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="my-2 grid grid-cols-2 gap-4 items-center">
                    <div>
                        <p className="text-xl font-bold text-text-primary">
                            {typeof displayPrice === 'number' ? `₹${displayPrice.toFixed(2)}` : '...'}
                        </p>
                        <p className={`text-md font-semibold ${displayChange >= 0 ? 'text-positive' : 'text-negative'}`}>
                            {typeof displayChange === 'number' ? `${displayChange >= 0 ? '+' : ''}${displayChange.toFixed(2)}%` : '...'}
                        </p>
                    </div>
                    <div className="h-10">
                        <MiniChart change={typeof displayChange === 'number' ? displayChange : 0} />
                    </div>
                </div>

                <div className="space-y-1 text-xs border-t border-border pt-3 mt-2">
                    <div className="flex justify-between items-center text-text-secondary">
                        <span>Mkt Cap</span>
                        <span className="font-medium text-text-primary">{formatMarketCap(stock.marketCap)}</span>
                    </div>
                    <div className="flex justify-between items-center text-text-secondary">
                        <span>P/E Ratio</span>
                        <span className="font-medium text-text-primary">{stock.peRatio?.toFixed(1) || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center text-text-secondary">
                        <span>Volume</span>
                        <span className="font-medium text-text-primary">{stock.volume ? `${(stock.volume / 1e6).toFixed(2)}M` : 'N/A'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
