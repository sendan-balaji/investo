
import React, { useState } from 'react';
import { DealsPipeline } from '../../../components/deals/DealsPipeline';
import { PlusIcon } from '../../../components/icons/PlusIcon';
import type { Deal, DealStage } from '../../../types';
import { DealDetailsModal } from '../../../components/deals/DealDetailsModal';
import { CreateDealModal } from '../../../components/deals/CreateDealModal';

const initialDeals: Deal[] = [
    { 
        id: 'deal-1', 
        title: 'Website Redesign', 
        company: 'LexiCo', 
        value: 1500, 
        updated: '1h ago', 
        assigneeAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61', 
        stage: 'New',
        contactPerson: 'Sarah Johnson',
        contactEmail: 'sarah.j@lexico.com',
        createdDate: '2024-08-15',
        notes: [
            { author: 'Matthew Parker', text: 'Initial contact made. Client is interested in our portfolio.', date: '2024-08-15' }
        ]
    },
    { 
        id: 'deal-2', 
        title: 'Branding Package', 
        company: 'Zeta Corp', 
        value: 2200, 
        updated: '3h ago', 
        assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', 
        stage: 'Proposal Sent',
        contactPerson: 'David Chen',
        contactEmail: 'david.chen@zetacorp.com',
        createdDate: '2024-08-14',
        notes: [
            { author: 'Matthew Parker', text: 'Sent proposal V1. Waiting for feedback.', date: '2024-08-16' },
            { author: 'David Chen', text: 'Received, will review with team.', date: '2024-08-16' }
        ]
    },
    { 
        id: 'deal-3', 
        title: 'Mobile App Dev', 
        company: 'Innovate.IO', 
        value: 12000, 
        updated: '1d ago', 
        assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', 
        stage: 'Negotiation',
        contactPerson: 'Maria Garcia',
        contactEmail: 'maria@innovate.io',
        createdDate: '2024-08-10',
        notes: [
            { author: 'Matthew Parker', text: 'Negotiating terms, price seems to be the main sticking point.', date: '2024-08-15' }
        ]
    },
    { 
        id: 'deal-4', 
        title: 'SEO & Marketing', 
        company: 'Market.ly', 
        value: 4500, 
        updated: '2d ago', 
        assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', 
        stage: 'Closed Won',
        contactPerson: 'Emily White',
        contactEmail: 'emily@market.ly',
        createdDate: '2024-07-20',
        notes: [
            { author: 'Matthew Parker', text: 'Contract signed. Project kickoff next week.', date: '2024-08-14' }
        ]
    },
    { 
        id: 'deal-5', 
        title: 'Legal Software', 
        company: 'Leggal.co', 
        value: 8000, 
        updated: '3d ago', 
        assigneeAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61', 
        stage: 'Closed Lost',
        contactPerson: 'Michael Brown',
        contactEmail: 'mbrown@leggal.co',
        createdDate: '2024-07-15',
        notes: [
            { author: 'Matthew Parker', text: 'Lost to competitor on price. Follow up in 6 months.', date: '2024-08-13' }
        ]
    },
    { 
        id: 'deal-6', 
        title: 'Laptop Fleet', 
        company: 'Venture Inc.', 
        value: 6200, 
        updated: '5d ago', 
        assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', 
        stage: 'Negotiation',
        contactPerson: 'Jessica Williams',
        contactEmail: 'jessica.w@venture.com',
        createdDate: '2024-08-01',
        notes: []
    },
];

export const DealsPage: React.FC = () => {
    const [deals, setDeals] = useState<Deal[]>(initialDeals);
    const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const handleDragEnd = (dealId: string, newStage: DealStage) => {
        setDeals(prevDeals =>
            prevDeals.map(deal =>
                deal.id === dealId ? { ...deal, stage: newStage } : deal
            )
        );
    };
    
    const handleDealClick = (deal: Deal) => {
        setSelectedDeal(deal);
    };

    const handleCloseModal = () => {
        setSelectedDeal(null);
    };

    const handleAddDeal = (dealData: Omit<Deal, 'id' | 'stage' | 'updated' | 'assigneeAvatar' | 'notes' | 'contactEmail' | 'createdDate'>) => {
        const newDeal: Deal = {
            id: `deal-${Date.now()}`,
            ...dealData,
            stage: 'New',
            updated: 'Just now',
            assigneeAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61', // Default to current user
            notes: [],
            contactEmail: `${dealData.contactPerson.split(' ')[0].toLowerCase()}@example.com`,
            createdDate: new Date().toISOString().split('T')[0],
        };
        setDeals(prev => [newDeal, ...prev]);
        setCreateModalOpen(false);
    };


    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Deals Pipeline</h2>
                <button
                    onClick={() => setCreateModalOpen(true)}
                    className="flex items-center gap-2 py-2 px-4 bg-gray-800 dark:bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-700 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Deal</span>
                </button>
            </div>
            <div className="flex-grow overflow-x-auto pb-4">
                <DealsPipeline deals={deals} onDragEnd={handleDragEnd} onDealClick={handleDealClick} />
            </div>
            {selectedDeal && <DealDetailsModal deal={selectedDeal} onClose={handleCloseModal} />}
            {isCreateModalOpen && <CreateDealModal onClose={() => setCreateModalOpen(false)} onAddDeal={handleAddDeal} />}
        </div>
    );
};
