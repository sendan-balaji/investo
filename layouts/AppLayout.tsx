// layouts/AppLayout.tsx
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { DraggableChart } from '../components/DraggableChart';
import type { StockPick } from '../types';

interface AppLayoutProps {
    onLogout: () => void;
    openCharts: StockPick[];
    onCloseChart: (symbol: string) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ onLogout, openCharts, onCloseChart }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const activePage = location.pathname.split('/app/')[1] || 'dashboard';

    return (
        <div className="flex h-screen bg-background text-text-primary">
            <Sidebar onLogout={onLogout} isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header currentPage={activePage} onMenuClick={() => setSidebarOpen(true)} onLogout={onLogout} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
                {openCharts.map((stock, index) => (
                    <DraggableChart key={stock.symbol} stock={stock} onClose={onCloseChart} zIndex={50 + index} />
                ))}
            </div>
        </div>
    );
};
