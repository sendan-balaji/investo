import React, { useState } from 'react';
import { CRMLayout } from '../../../layouts/CRMLayout';

// Import all CRM pages
import { DealsPage } from './DealsPage';
import { DashboardPage } from './DashboardPage';
import { LeadsPage } from './LeadsPage';
import { ContactsPage } from './ContactsPage';
import { TasksPage } from './TasksPage';
import { CalendarPage } from './CalendarPage';
import { EmailTemplatesPage } from './EmailTemplatesPage';
import { ProposalsPage } from './ProposalsPage';
import { AIAssistantPage } from './AIAssistantPage';
// Fix: Import Task type to be used in CRMAppProps.
import type { Task } from '../../../types';

// Simple placeholder for pages not fully implemented yet
const SettingsPage = () => <div className="bg-white p-6 rounded-xl shadow-sm"><h2>Settings</h2><p>CRM settings will be here.</p></div>;

export type CRMPageName = 'Dashboard' | 'Leads' | 'Contacts' | 'Deals' | 'Tasks' | 'Calendar' | 'Email Templates' | 'Proposals' | 'AI Assistant' | 'Settings';

// Fix: Add tasks and onAddTask to CRMAppProps to resolve missing properties error in child components.
interface CRMAppProps {
    onExit: () => void;
    tasks: Task[];
    onAddTask: (taskData: Omit<Task, 'id' | 'status'>) => void;
}

export const CRMApp: React.FC<CRMAppProps> = ({ onExit, tasks, onAddTask }) => {
    const [activePage, setActivePage] = useState<CRMPageName>('Deals');

    const renderPage = () => {
        switch (activePage) {
            case 'Deals':
                return <DealsPage />;
            case 'Dashboard':
                return <DashboardPage />;
            case 'Leads':
                return <LeadsPage />;
            case 'Contacts':
                return <ContactsPage />;
            case 'Tasks':
                // Fix: Pass tasks and onAddTask props to TasksPage.
                return <TasksPage tasks={tasks} onAddTask={onAddTask} />;
            case 'Calendar':
                // Fix: Pass tasks and onAddTask props to CalendarPage.
                return <CalendarPage tasks={tasks} onAddTask={onAddTask} />;
            case 'Email Templates':
                return <EmailTemplatesPage />;
            case 'Proposals':
                return <ProposalsPage />;
            case 'AI Assistant':
                return <AIAssistantPage />;
            case 'Settings':
                return <SettingsPage />;
            default:
                return <DealsPage />;
        }
    };

    return (
        <CRMLayout activePage={activePage} onNavigate={setActivePage} onExit={onExit}>
            {renderPage()}
        </CRMLayout>
    );
};