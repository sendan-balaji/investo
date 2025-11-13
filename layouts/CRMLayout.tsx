import React from 'react';
import { CRMSidebar } from '../components/crm/CRMSidebar';
import { CRMHeader } from '../components/crm/CRMHeader';
import type { CRMPageName } from '../pages/app/crm/CRMApp';

interface CRMLayoutProps {
    children: React.ReactNode;
    activePage: CRMPageName;
    onNavigate: (page: CRMPageName) => void;
    onExit: () => void;
}

export const CRMLayout: React.FC<CRMLayoutProps> = ({ children, activePage, onNavigate, onExit }) => {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <CRMSidebar activePage={activePage} onNavigate={onNavigate} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <CRMHeader onExit={onExit} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};