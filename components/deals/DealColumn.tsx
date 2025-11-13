import React from 'react';
import type { Deal, DealStage } from '../../types';
import { DealCard } from './DealCard';

interface DealColumnProps {
    stage: DealStage;
    deals: Deal[];
    isDraggedOver: boolean;
    onDrop: (e: React.DragEvent<HTMLDivElement>, stage: DealStage) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
    onDealClick: (deal: Deal) => void;
    onCardTouchStart: (e: React.TouchEvent<HTMLDivElement>, dealId: string) => void;
}

const stageColors: Record<DealStage, string> = {
    'New': 'border-gray-400 dark:border-gray-500',
    'Proposal Sent': 'border-blue-500',
    'Negotiation': 'border-purple-500',
    'Closed Won': 'border-green-500',
    'Closed Lost': 'border-red-500',
};

const stageTextColors: Record<DealStage, string> = {
    'New': 'text-gray-500 dark:text-gray-400',
    'Proposal Sent': 'text-blue-600 dark:text-blue-400',
    'Negotiation': 'text-purple-600 dark:text-purple-400',
    'Closed Won': 'text-green-600 dark:text-green-500',
    'Closed Lost': 'text-red-600 dark:text-red-500',
};

export const DealColumn: React.FC<DealColumnProps> = ({ stage, deals, isDraggedOver, onDrop, onDragOver, onDragLeave, onDealClick, onCardTouchStart }) => {
    return (
        <div
            data-stage={stage}
            className={`bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 transition-colors duration-300 w-72 flex-shrink-0 ${isDraggedOver ? 'bg-indigo-50 dark:bg-indigo-900/50' : ''}`}
            onDrop={(e) => onDrop(e, stage)}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
        >
            <div className={`flex items-center gap-2 mb-4 pb-2 border-b-2 ${stageColors[stage]}`}>
                <h2 className={`font-bold text-gray-800 dark:text-white capitalize`}>{stage}</h2>
                <span className={`text-sm font-semibold ${stageTextColors[stage]}`}>
                    • {deals.length}
                </span>
            </div>
            <div className="space-y-4 min-h-[300px]">
                {deals.map(deal => (
                    <DealCard key={deal.id} deal={deal} onClick={() => onDealClick(deal)} onTouchStart={onCardTouchStart} />
                ))}
            </div>
        </div>
    );
};
