// components/HeaderDropdown.tsx
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { BellIcon } from './icons/BellIcon';
import { ToggleSwitch } from './ToggleSwitch';
import { Cog6ToothIcon } from './icons/Cog6ToothIcon';
import { ArrowLeftOnRectangleIcon } from './icons/ArrowLeftOnRectangleIcon';
import { Avatar } from './Avatar'; // We can reuse the Avatar component here!

export const HeaderDropdown: React.FC<{ onNavigate: (page: any) => void, onLogout: () => void }> = ({ onNavigate, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<'notifications' | 'profile'>('profile');

    // --- USER PROFILE STATE ---
    const [loading, setLoading] = useState(true);
    const [fullName, setFullName] = useState<string | null>('User');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [user, setUser] = useState(null);

    // --- NOTIFICATIONS STATE ---
    const [priceAlerts, setPriceAlerts] = useState(true);
    const [aiAlerts, setAiAlerts] = useState(true);

    useEffect(() => {
        // Fetch user and profile data
        const fetchUserAndProfile = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select(`full_name, avatar_url`)
                    .eq('id', user.id)
                    .single();

                if (data) {
                    setFullName(data.full_name);
                    setAvatarUrl(data.avatar_url);
                }
            }
            setLoading(false);
        };
        fetchUserAndProfile();
    }, []);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleUpdateAvatar = async (url: string) => {
        const { error } = await supabase.from('profiles').upsert({ id: user.id, avatar_url: url });
        if (!error) {
            setAvatarUrl(url); // Update local state to show new avatar instantly
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => { setIsOpen(true); setActiveTab('notifications'); }}
                    className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <BellIcon className="w-6 h-6" />
                </button>
                <button onClick={() => { setIsOpen(true); setActiveTab('profile'); }} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Avatar url={avatarUrl} size={36} onUpload={() => {}} />
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 max-w-[90vw] origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                            <Avatar url={avatarUrl} size={48} onUpload={handleUpdateAvatar} />
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{fullName || 'New User'}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Toggles */}
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="price-alerts" className="text-sm font-medium text-gray-800 dark:text-gray-200">Price Movement Alerts</label>
                            <ToggleSwitch id="price-alerts" isOn={priceAlerts} onToggle={() => setPriceAlerts(!priceAlerts)} />
                        </div>
                         <div className="flex items-center justify-between">
                            <label htmlFor="ai-alerts" className="text-sm font-medium text-gray-800 dark:text-gray-200">AI Recommendation Alerts</label>
                            <ToggleSwitch id="ai-alerts" isOn={aiAlerts} onToggle={() => setAiAlerts(!aiAlerts)} />
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="border-t border-gray-200 dark:border-gray-700">
                        <button onClick={() => { onNavigate('Settings'); setIsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <Cog6ToothIcon className="w-5 h-5"/>
                            Manage All Settings
                        </button>
                         <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <ArrowLeftOnRectangleIcon className="w-5 h-5"/>
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
