
import React from 'react';
import type { Task, StockPick } from '../../types';
import { TaskStatus } from '../../types';
import { AIStockPicksWidget } from '../../components/widgets/AIStockPicksWidget';
import { CRMTasksWidget } from '../../components/widgets/CRMTasksWidget';
import { PortfolioSnapshotWidget } from '../../components/widgets/PortfolioSnapshotWidget';
import { MarketTrendsWidget } from '../../components/widgets/MarketTrendsWidget';

const stockPicks: StockPick[] = [
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
];

interface DashboardPageProps {
    onSelectStock: (stock: StockPick) => void;
    onOpenChart: (stock: StockPick) => void;
    tasks: Task[];
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onSelectStock, onOpenChart, tasks }) => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Main Widgets */}
                <div className="xl:col-span-2 space-y-6">
                    <AIStockPicksWidget stockPicks={stockPicks} onSelectStock={onSelectStock} />
                    <MarketTrendsWidget />
                </div>

                {/* Side Widgets */}
                <div className="space-y-6">
                    <PortfolioSnapshotWidget />
                    <CRMTasksWidget tasks={tasks} />
                </div>
            </div>
        </div>
    );
};