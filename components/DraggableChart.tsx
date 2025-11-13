// components/DraggableChart.tsx
import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import type { StockPick } from '../types';
import { XMarkIcon } from './icons/XMarkIcon';
import { usePrices } from '../PriceContext';
// THIS IMPORT must use curly braces to match the named export
import { DetailedLineChart } from './DetailedLineChart';

export const DraggableChart: React.FC<{ stock: StockPick, onClose: (symbol: string) => void, zIndex: number }> = ({ stock, onClose, zIndex }) => {
    const { livePrices } = usePrices();
    const liveData = livePrices[stock.symbol];
    const displayPrice = liveData ? liveData.current_price : stock.price;
    const displayChange = liveData ? liveData.change_percent : stock.change;
    const [chartData, setChartData] = useState<number[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [position, setPosition] = useState({ x: window.innerWidth / 2 - 225, y: 100 });
    const dragInfo = useRef({ isDragging: false, offset: { x: 0, y: 0 } });
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            const { data, error } = await supabase.functions.invoke('get-price-history', { body: { symbol: stock.symbol } });
            if (error) console.error(`Chart Error for ${stock.symbol}:`, error);
            else setChartData(data.history);
            setIsLoading(false);
        };
        fetchHistory();
    }, [stock.symbol]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!nodeRef.current) return;
        const rect = nodeRef.current.getBoundingClientRect();
        dragInfo.current = { isDragging: true, offset: { x: e.clientX - rect.left, y: e.clientY - rect.top } };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!dragInfo.current.isDragging) return;
            setPosition({ x: e.clientX - dragInfo.current.offset.x, y: e.clientY - dragInfo.current.offset.y });
        };
        const handleMouseUp = () => { dragInfo.current.isDragging = false; };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div ref={nodeRef} style={{ top: `${position.y}px`, left: `${position.x}px`, zIndex }} className="fixed w-[450px] h-[320px] max-w-[90vw] bg-surface rounded-xl shadow-2xl border border-border flex flex-col">
            <div onMouseDown={handleMouseDown} className="p-3 border-b border-border flex justify-between items-center cursor-move">
                <div>
                    <h3 className="font-bold text-text-primary">{stock.symbol}</h3>
                    <p className={`font-semibold text-sm ${displayChange >= 0 ? 'text-positive' : 'text-negative'}`}>
                        {typeof displayPrice === 'number' ? `₹${displayPrice.toFixed(2)}` : '...'} ({typeof displayChange === 'number' ? `${displayChange > 0 ? '+' : ''}${displayChange.toFixed(2)}%` : '...'})
                    </p>
                </div>
                <button onClick={() => onClose(stock.symbol)} className="p-1 rounded-full hover:bg-background">
                    <XMarkIcon className="w-5 h-5 text-text-secondary" />
                </button>
            </div>
            <div className="flex-grow bg-background p-4">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full text-text-secondary">Loading Chart...</div>
                ) : (
                    <DetailedLineChart data={chartData} isPositive={displayChange >= 0} />
                )}
            </div>
        </div>
    );
};
