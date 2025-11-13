// layouts/PublicLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from '../components/PublicHeader'; // Correctly imports the header component
import { Footer } from '../components/Footer';

export const PublicLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-surface">
            <PublicHeader />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};