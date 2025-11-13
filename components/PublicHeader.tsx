// components/PublicHeader.tsx

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bars3Icon } from './icons/Bars3Icon'; // This path is correct from this file's location

const navigation = [
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
];

export const PublicHeader: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const handleMobileNav = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-30 border-b border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-2xl font-bold text-accent">Investo</Link>
                         <nav className="hidden md:flex items-center gap-8">
                            {navigation.map(item => <NavLink key={item.name} to={item.path} className={({isActive}) => `text-base font-medium transition-colors ${isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'}`}>{item.name}</NavLink>)}
                        </nav>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login" className="text-base font-medium text-text-secondary hover:text-text-primary">Login</Link>
                        <Link to="/signup" className="px-4 py-2 bg-accent text-white font-semibold rounded-lg shadow-sm hover:opacity-80">Sign Up Free</Link>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-text-secondary hover:bg-surface">
                            <Bars3Icon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
            
            {isMenuOpen && (
                <div className="md:hidden bg-surface border-t border-border">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={handleMobileNav}
                                className={({isActive}) => `block w-full text-left px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-accent/20 text-accent' : 'text-text-secondary hover:bg-background'}`}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-border">
                        <div className="px-5 space-y-3">
                             <Link to="/login" onClick={handleMobileNav} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:bg-background">
                                Login
                            </Link>
                            <Link to="/signup" onClick={handleMobileNav} className="block w-full text-center px-4 py-2 bg-accent text-white font-semibold rounded-lg shadow-sm hover:opacity-80">
                                Sign Up Free
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};