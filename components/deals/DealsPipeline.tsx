import React, { useState } from 'react';
import type { Deal, DealStage } from '../../types';
import { DEAL_STAGES } from '../../types';
import { DealColumn } from './DealColumn';

interface DealsPipelineProps {
    deals: Deal[];
    onDragEnd: (dealId: string, newStage: DealStage) => void;
    onDealClick: (deal: Deal) => void;
}

export const DealsPipeline: React.FC<DealsPipelineProps> = ({ deals, onDragEnd, onDealClick }) => {
    const [draggedOverCol, setDraggedOverCol] = useState<DealStage | null>(null);

    const onDrop = (e: React.DragEvent<HTMLDivElement>, stage: DealStage) => {
        e.preventDefault();
        const dealId = e.dataTransfer.getData('text');
        if (dealId) {
            onDragEnd(dealId, stage);
        }
        e.currentTarget.classList.remove('bg-indigo-50', 'dark:bg-indigo-900/50');
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('bg-indigo-50', 'dark:bg-indigo-900/50');
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('bg-indigo-50', 'dark:bg-indigo-900/50');
    };

    // --- Touch Handlers for Mobile Drag & Drop ---
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, dealId: string) => {
        const originalCard = e.currentTarget;
        originalCard.style.opacity = '0.5';

        const touchMove = (moveEvent: TouchEvent) => {
            const touch = moveEvent.touches[0];
            const elementUnder = document.elementFromPoint(touch.clientX, touch.clientY);
            const columnEl = elementUnder?.closest('[data-stage]');
            const stage = columnEl?.getAttribute('data-stage') as DealStage | null;
            setDraggedOverCol(stage);
        };

        const touchEnd = () => {
            if (draggedOverCol) {
                onDragEnd(dealId, draggedOverCol);
            }
            originalCard.style.opacity = '1';
            setDraggedOverCol(null);
            window.removeEventListener('touchmove', touchMove);
            window.removeEventListener('touchend', touchEnd);
        };

        window.addEventListener('touchmove', touchMove);
        window.addEventListener('touchend', touchEnd, { once: true });
    };


    return (
        <div className="flex gap-6">
            {DEAL_STAGES.map(stage => (
                <DealColumn
                    key={stage}
                    stage={stage}
                    deals={deals.filter(deal => deal.stage === stage)}
                    isDraggedOver={draggedOverCol === stage}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDealClick={onDealClick}
                    onCardTouchStart={handleTouchStart}
                />
            ))}
        </div>
    );
};
