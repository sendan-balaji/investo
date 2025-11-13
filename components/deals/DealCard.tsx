import React from 'react';
import type { Deal } from '../../types';

interface DealCardProps {
    deal: Deal;
    onClick: () => void;
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>, dealId: string) => void;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, onClick, onTouchStart }) => {
    
    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text', deal.id);
        e.currentTarget.style.opacity = '0.5';
    };

    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = '1';
    };

    const formatValue = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value * 83.5); // Mock conversion USD to INR
    };

    return (
        <div
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onTouchStart={(e) => onTouchStart(e, deal.id)}
            onClick={onClick}
            className="bg-white dark:bg-gray-800 p-3.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md hover:ring-2 hover:ring-indigo-500 transition-all"
        >
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{deal.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{deal.company}</p>
            <p className="font-bold text-gray-800 dark:text-gray-100 text-base">{formatValue(deal.value)}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-400 dark:text-gray-500">Updated {deal.updated}</span>
                <img 
                    src={deal.assigneeAvatar}
                    alt="Assignee"
                    className="w-6 h-6 rounded-full ring-2 ring-white dark:ring-gray-800"
                />
            </div>
        </div>
    );
};
