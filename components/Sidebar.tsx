// components/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, SparklesIcon, ChartBarIcon, WrenchScrewdriverIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon, BookmarkIcon, PencilSquareIcon } from './icons';
import type { AppPage } from '../types';

interface SidebarProps {
    onLogout: () => void;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

const mainNavigation: { name: string, path: string, icon: React.FC<any> }[] = [
    { name: 'Dashboard', path: 'dashboard', icon: HomeIcon },
    { name: 'AI Adviser', path: 'ai-adviser', icon: SparklesIcon },
    { name: 'Market', path: 'market', icon: ChartBarIcon },
    { name: 'Watchlist', path: 'watchlist', icon: BookmarkIcon },
    { name: 'Notes', path: 'notes', icon: PencilSquareIcon },
    { name: 'Tools', path: 'tools', icon: WrenchScrewdriverIcon },
];

const SidebarContent: React.FC<{ onLogout: () => void; }> = ({ onLogout }) => {
    const location = useLocation();
    const activePage = location.pathname.split('/app/')[1];

    return (
        <>
            <div className="flex items-center justify-center h-16 border-b border-border flex-shrink-0">
                <h1 className="text-2xl font-bold text-accent">Investo</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 p-4 space-y-2">
                    <p className="px-3 text-xs font-semibold text-text-secondary uppercase">Menu</p>
                    {mainNavigation.map((item) => (
                        <Link key={item.name} to={`/app/${item.path}`} className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${(activePage === item.path) ? 'bg-accent text-white' : 'text-text-secondary hover:bg-background hover:text-text-primary'}`}>
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-border space-y-2">
                    <Link to="/app/settings" className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activePage === 'settings' ? 'bg-accent text-white' : 'text-text-secondary hover:bg-background hover:text-text-primary'}`}>
                        <Cog6ToothIcon className="mr-3 h-5 w-5" />
                        Settings
                    </Link>
                    <button onClick={onLogout} className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-text-secondary hover:bg-background hover:text-text-primary">
                        <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, isOpen, setOpen }) => (
    <>
        <div className={`fixed inset-0 z-30 bg-black/60 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpen(false)} />
        <div className={`fixed top-0 left-0 h-full w-64 bg-surface border-r border-border flex flex-col z-40 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
            <SidebarContent onLogout={onLogout} />
        </div>
        <div className="hidden md:flex md:w-64 bg-surface border-r border-border flex-col flex-shrink-0">
            <SidebarContent onLogout={onLogout} />
        </div>
    </>
);
