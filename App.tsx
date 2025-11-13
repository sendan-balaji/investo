// App.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

// Layouts & Routing
import { AppLayout } from './layouts/AppLayout';
import { PublicLayout } from './layouts/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';

// All Page Imports
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { BlogPage } from './pages/public/BlogPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { SignupPage } from './pages/public/SignupPage';
import { DashboardPage } from './pages/app/DashboardPage';
import { MarketPage } from './pages/app/MarketPage';
import { WatchlistPage } from './pages/app/WatchlistPage';
import { SettingsPage } from './pages/app/SettingsPage';
import { StockDeepDivePage } from './pages/app/StockDeepDivePage';
import { ToolsPage } from './pages/app/ToolsPage';
import { NotesPage } from './pages/app/NotesPage';
import { AIAdviserPage } from './pages/app/AIAdviserPage';

import type { StockPick, Note, Task } from './types';

const App: React.FC = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedStock, setSelectedStock] = useState<StockPick | null>(null);
    const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
    const [openCharts, setOpenCharts] = useState<StockPick[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
            if (session) {
                fetchWatchlist(session.user.id);
            } else {
                setWatchlist(new Set());
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    const fetchWatchlist = async (userId: string) => {
        const { data } = await supabase.from('watchlist').select('stock_symbol').eq('user_id', userId);
        if (data) setWatchlist(new Set(data.map(item => item.stock_symbol)));
    };

    const addStockToWatchlist = async (symbol: string) => {
        if (!session?.user?.id) return;
        await supabase.from('watchlist').insert({ user_id: session.user.id, stock_symbol: symbol });
        setWatchlist(prev => new Set(prev).add(symbol));
    };

    const removeStockFromWatchlist = async (symbol: string) => {
        if (!session?.user?.id) return;
        await supabase.from('watchlist').delete().match({ user_id: session.user.id, stock_symbol: symbol });
        setWatchlist(prev => {
            const newSet = new Set(prev);
            newSet.delete(symbol);
            return newSet;
        });
    };

    const handleEmailSignup = async (email, password) => { await supabase.auth.signUp({ email, password }); };
    const handleEmailLogin = async (email, password) => { await supabase.auth.signInWithPassword({ email, password }); };
    const handleGoogleLogin = async () => { await supabase.auth.signInWithOAuth({ provider: 'google' }); };
    
    const handleLogout = useCallback(async () => {
        await supabase.auth.signOut();
        navigate('/');
    }, [navigate]);

    const handleSelectStock = useCallback((stock: StockPick) => {
        setSelectedStock(stock);
        navigate('/app/stock-deep-dive');
    }, [navigate]);

    const handleOpenChart = useCallback((stock: StockPick) => { if (!openCharts.some(c => c.symbol === stock.symbol)) setOpenCharts(prev => [...prev, stock]); }, [openCharts]);
    const handleCloseChart = useCallback((symbol: string) => setOpenCharts(prev => prev.filter(s => s.symbol !== symbol)), []);
    
    const pageProps = { onSelectStock: handleSelectStock, onOpenChart: handleOpenChart, watchlist, addStockToWatchlist, removeStockFromWatchlist, navigate };

    if (loading) {
        return <div className="bg-background w-full h-screen" />;
    }

    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage onEmailLogin={handleEmailLogin} onGoogleLogin={handleGoogleLogin} />} />
                <Route path="/signup" element={<SignupPage onEmailSignup={handleEmailSignup} onGoogleLogin={handleGoogleLogin} />} />
            </Route>

            <Route path="/app" element={<ProtectedRoute session={session}><AppLayout onLogout={handleLogout} openCharts={openCharts} onCloseChart={handleCloseChart} /></ProtectedRoute>}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage {...pageProps} tasks={[]} />} />
                <Route path="market" element={<MarketPage {...pageProps} />} />
                <Route path="watchlist" element={<WatchlistPage {...pageProps} />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="tools" element={<ToolsPage />} />
                <Route path="notes" element={<NotesPage notes={[]} setNotes={() => {}} />} />
                <Route path="ai-adviser" element={<AIAdviserPage {...pageProps} />} />
                <Route path="stock-deep-dive" element={selectedStock ? <StockDeepDivePage stock={selectedStock} onBack={() => navigate(-1)} {...pageProps} /> : <Navigate to="/app/market" replace />} />
            </Route>
        </Routes>
    );
};

export default App;