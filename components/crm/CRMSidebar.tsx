import React from 'react';
import type { CRMPageName } from '../../pages/app/crm/CRMApp';
import { HomeIcon } from '../icons/HomeIcon';
import { BriefcaseIcon } from '../icons/BriefcaseIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { FunnelIcon } from '../icons/FunnelIcon';
import { ClipboardDocumentCheckIcon } from '../icons/ClipboardDocumentCheckIcon';
import { CalendarDaysIcon } from '../icons/CalendarDaysIcon';
import { EnvelopeIcon } from '../icons/EnvelopeIcon';
import { DocumentTextIcon } from '../icons/DocumentTextIcon';
import { LightBulbIcon } from '../icons/LightBulbIcon';
import { Cog6ToothIcon } from '../icons/Cog6ToothIcon';

interface CRMSidebarProps {
    activePage: CRMPageName;
    onNavigate: (page: CRMPageName) => void;
}

const crmNavigation: { name: CRMPageName, icon: React.FC<any> }[] = [
    { name: 'Dashboard', icon: HomeIcon },
    { name: 'Leads', icon: FunnelIcon },
    { name: 'Contacts', icon: UsersIcon },
    { name: 'Deals', icon: BriefcaseIcon },
    { name: 'Tasks', icon: ClipboardDocumentCheckIcon },
    { name: 'Calendar', icon: CalendarDaysIcon },
    { name: 'Email Templates', icon: EnvelopeIcon },
    { name: 'Proposals', icon: DocumentTextIcon },
    { name: 'AI Assistant', icon: LightBulbIcon },
];

const SidebarLink: React.FC<{ name: CRMPageName, icon: React.FC<any>, isActive: boolean, onClick: () => void }> = ({ name, icon: Icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            isActive 
                ? 'bg-gray-700 text-white dark:bg-indigo-50 dark:text-indigo-600' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white dark:text-gray-500 dark:hover:bg-gray-100 dark:hover:text-gray-900'
        }`}
    >
        <Icon className="mr-3 h-5 w-5" />
        {name}
    </button>
);

export const CRMSidebar: React.FC<CRMSidebarProps> = ({ activePage, onNavigate }) => {
    return (
        <div className="hidden md:flex md:w-64 bg-gray-900 dark:bg-white text-white dark:text-gray-800 flex-col flex-shrink-0">
            <div className="flex items-center justify-center h-16 border-b border-gray-700 dark:border-gray-200 flex-shrink-0">
                <h1 className="text-xl font-bold text-white dark:text-gray-900">Tradify <span className="font-light text-indigo-400 dark:text-indigo-500">CRM</span></h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 p-4 space-y-2">
                    {crmNavigation.map((item) => (
                        <SidebarLink 
                            key={item.name} 
                            name={item.name} 
                            icon={item.icon} 
                            isActive={activePage === item.name} 
                            onClick={() => onNavigate(item.name)} 
                        />
                    ))}
                </nav>
                 <div className="p-4 border-t border-gray-700 dark:border-gray-200">
                    <SidebarLink name="Settings" icon={Cog6ToothIcon} isActive={activePage === 'Settings'} onClick={() => onNavigate('Settings')} />
                </div>
            </div>
        </div>
    );
};