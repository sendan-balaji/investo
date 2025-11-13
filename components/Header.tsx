// components/Header.tsx

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Bars3Icon, SunIcon, MoonIcon } from './icons';
import { HeaderDropdown } from './HeaderDropdown';
import type { AnyPage } from '../types';

interface HeaderProps {
    currentPage: string;
    onMenuClick: () => void;
    onNavigate: (page: AnyPage) => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onMenuClick, onNavigate, onLogout }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        // --- UPDATED THEME COLORS ---
        <header className="bg-surface border-b border-border p-4 sticky top-0 z-20">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 rounded-md text-text-secondary hover:bg-background"
                        aria-label="Open sidebar"
                    >
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-text-primary capitalize">{currentPage.replace('-', ' ')}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-text-secondary hover:bg-background"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                    </button>
                    <HeaderDropdown onNavigate={onNavigate} onLogout={onLogout} />
                </div>
            </div>
        </header>
    );
};
