// pages/app/SettingsPage.tsx

import React from 'react';
import { Cog6ToothIcon } from '../../components/icons/Cog6ToothIcon';
import { ToggleSwitch } from '../../components/ToggleSwitch';
import { Avatar } from '../../components/Avatar';
import { supabase } from '../../supabaseClient';

const SettingRow: React.FC<{ title: string; description: string; isOn: boolean; onToggle: () => void; id: string; }> = ({ title, description, isOn, onToggle, id }) => (
    <div className="flex items-center justify-between pt-6 first:pt-0">
        <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <ToggleSwitch id={id} isOn={isOn} onToggle={onToggle} />
    </div>
);

export const SettingsPage: React.FC = () => {
    const [loading, setLoading] = React.useState(true);
    const [fullName, setFullName] = React.useState(null);
    const [avatarUrl, setAvatarUrl] = React.useState(null);
    const [locality, setLocality] = React.useState('IND');
    const [user, setUser] = React.useState(null);
    const [settings, setSettings] = React.useState({
        emailAlerts: true,
        pushAlerts: true,
        whatsappAlerts: false,
        aiUpdates: true,
        priceMovements: true,
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    React.useEffect(() => {
        const fetchUserAndProfile = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                let { data, error } = await supabase.from('profiles').select(`full_name, avatar_url, locality`).eq('id', user.id).single();
                if (error && error.code !== 'PGRST116') console.warn('Error fetching profile:', error);
                if (data) {
                    setFullName(data.full_name);
                    setAvatarUrl(data.avatar_url);
                    setLocality(data.locality);
                }
            }
            setLoading(false);
        };
        fetchUserAndProfile();
    }, []);

    const updateProfile = async ({ newAvatarUrl }: { newAvatarUrl?: string } = {}) => {
        if (!user) return;
        setLoading(true);
        const userAvatarUrl = newAvatarUrl !== undefined ? newAvatarUrl : avatarUrl;

        const updates = { id: user.id, full_name: fullName, avatar_url: userAvatarUrl, locality, updated_at: new Date() };
        let { error } = await supabase.from('profiles').upsert(updates);

        if (error) alert(error.message);
        else if (newAvatarUrl !== undefined) setAvatarUrl(newAvatarUrl);

        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
                <Cog6ToothIcon className="w-8 h-8 text-indigo-500" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your account and notification preferences.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Your Profile</h2>
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Picture</label>
                        <Avatar url={avatarUrl} size={120} onUpload={(url) => updateProfile({ newAvatarUrl: url })} />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input id="email" type="text" value={user?.email || ''} disabled
                            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 shadow-sm text-gray-500 dark:text-gray-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input id="fullName" type="text" value={fullName || ''} onChange={(e) => setFullName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="locality" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Locality / Country</label>
                        <select id="locality" value={locality} onChange={(e) => setLocality(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="IND">India</option>
                            <option value="USA">United States</option>
                            <option value="MEX">Mexico</option>
                            <option value="CAN">Canada</option>
                        </select>
                    </div>

                    <div>
                        <button onClick={() => updateProfile()} disabled={loading} className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 disabled:opacity-50">
                            {loading ? 'Saving...' : 'Save Profile Changes'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Notification Settings</h2>
                <div className="space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
                    <SettingRow id="email-alerts" title="Email Notifications" description="Receive important alerts in your inbox." isOn={settings.emailAlerts} onToggle={() => handleToggle('emailAlerts')} />
                    <SettingRow id="push-alerts" title="Push Notifications" description="Get real-time alerts on your mobile device." isOn={settings.pushAlerts} onToggle={() => handleToggle('pushAlerts')} />
                    <SettingRow id="whatsapp-alerts" title="WhatsApp Alerts" description="Receive critical alerts via WhatsApp." isOn={settings.whatsappAlerts} onToggle={() => handleToggle('whatsappAlerts')} />
                    <SettingRow id="ai-updates" title="AI Recommendation Updates" description="Notify me when the AI adviser updates a stock." isOn={settings.aiUpdates} onToggle={() => handleToggle('aiUpdates')} />
                    <SettingRow id="price-movements" title="Price Movement Alerts" description="Alerts for significant price movements." isOn={settings.priceMovements} onToggle={() => handleToggle('priceMovements')} />
                </div>
            </div>
        </div>
    );
};
