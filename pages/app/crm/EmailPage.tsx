
import React, { useState } from 'react';
import { EnvelopeIcon } from '../../../components/icons/EnvelopeIcon';
import { PaperAirplaneIcon } from '../../../components/icons/PaperAirplaneIcon';
import { PencilIcon } from '../../../components/icons/PencilIcon';
import { PlusIcon } from '../../../components/icons/PlusIcon';
import { UserIcon } from '../../../components/icons/UserIcon';
import { ComposeEmailModal } from '../../../components/crm/ComposeEmailModal';

interface Email {
    id: number;
    from?: string;
    to?: string;
    subject: string;
    snippet: string;
    date: string;
    read: boolean;
}

// Fix: Added explicit type to mockEmailsData and included 'drafts' to ensure type consistency and support all folder types.
const mockEmailsData: { inbox: Email[]; sent: Email[]; drafts: Email[] } = {
    inbox: [
        { id: 1, from: 'Sarah Johnson', subject: 'Re: Website Redesign Proposal', snippet: 'Hi Matthew, thanks for sending that over. We have a few questions about the timeline...', date: '3:45 PM', read: false },
        { id: 2, from: 'David Chen', subject: 'Branding Package Feedback', snippet: 'Hey, the team and I have reviewed the branding concepts. We love option 2, but...', date: '11:20 AM', read: true },
        { id: 3, from: 'Innovate.IO', subject: 'Follow-up on Mobile App Dev', snippet: 'Just wanted to check in and see if you had any updates on our discussion from last week.', date: 'Yesterday', read: true },
    ],
    sent: [
        { id: 4, to: 'Sarah Johnson', subject: 'Website Redesign Proposal', snippet: 'Hi Sarah, please find the attached proposal for the LexiCo website redesign. Looking forward to your feedback!', date: '1:10 PM', read: true },
        { id: 5, to: 'internal-team@tradify.com', subject: 'Q3 Sales Goals', snippet: 'Team, let\'s sync up tomorrow to discuss our goals for the upcoming quarter.', date: 'Yesterday', read: true },
    ],
    drafts: [],
};

type Folder = 'inbox' | 'sent' | 'drafts';

export const EmailPage: React.FC = () => {
    const [activeFolder, setActiveFolder] = useState<Folder>('inbox');
    const [selectedEmailId, setSelectedEmailId] = useState<number | null>(1);
    const [mockEmails, setMockEmails] = useState(mockEmailsData);
    const [isComposeOpen, setComposeOpen] = useState(false);

    const handleSendEmail = (emailData: { to: string; subject: string; body: string }) => {
        const newEmail: Email = {
            id: Date.now(),
            to: emailData.to,
            subject: emailData.subject,
            snippet: emailData.body.substring(0, 100) + '...',
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: true,
        };
        setMockEmails(prev => ({
            ...prev,
            sent: [newEmail, ...prev.sent]
        }));
        setComposeOpen(false);
        setActiveFolder('sent');
        setSelectedEmailId(newEmail.id);
    };

    // Fix: Corrected logic to retrieve emails for the currently active folder.
    const emails = mockEmails[activeFolder];
    const selectedEmail = emails.find(e => e.id === selectedEmailId) || (emails.length > 0 ? emails[0] : null);

    const FolderLink: React.FC<{ name: string, label: Folder, icon: React.FC<any> }> = ({ name, label, icon: Icon }) => (
        <button onClick={() => { setActiveFolder(label); setSelectedEmailId(null); }} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeFolder === label ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            <Icon className="w-5 h-5" />
            {name}
        </button>
    );

    return (
        <>
        <div className="flex h-[calc(100vh-10rem)] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4 flex-col hidden sm:flex">
                <button onClick={() => setComposeOpen(true)} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors mb-6">
                    <PlusIcon className="w-5 h-5" />
                    Compose
                </button>
                <div className="space-y-2">
                    <FolderLink name="Inbox" label="inbox" icon={EnvelopeIcon} />
                    <FolderLink name="Sent" label="sent" icon={PaperAirplaneIcon} />
                    <FolderLink name="Drafts" label="drafts" icon={PencilIcon} />
                </div>
            </div>

            {/* Email List */}
            <div className="w-full sm:w-80 md:w-96 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize">{activeFolder}</h2>
                </div>
                <div className="overflow-y-auto">
                    {emails.map(email => (
                        <button key={email.id} onClick={() => setSelectedEmailId(email.id)} className={`w-full text-left p-4 border-b dark:border-gray-700/50 ${selectedEmailId === email.id ? 'bg-gray-50 dark:bg-gray-900/50' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                            <div className="flex justify-between items-baseline">
                                <p className={`font-semibold truncate ${!email.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>{email.from || email.to}</p>
                                <p className={`text-xs flex-shrink-0 ml-2 ${!email.read ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>{email.date}</p>
                            </div>
                            <p className={`text-sm mt-1 truncate ${!email.read ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>{email.subject}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{email.snippet}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Email Content */}
            <div className="flex-1 p-6 overflow-y-auto hidden md:block">
                {selectedEmail ? (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedEmail.subject}</h2>
                        <div className="flex items-center gap-3 mt-4 py-4 border-y border-gray-200 dark:border-gray-700">
                             <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <UserIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{selectedEmail.from || 'You'}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">to {selectedEmail.to || 'me'}</p>
                            </div>
                        </div>
                        <div className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                            <p>{selectedEmail.snippet} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <p>Best regards,</p>
                            <p>{selectedEmail.from || 'Matthew Parker'}</p>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <p>Select an email to read</p>
                    </div>
                )}
            </div>
        </div>
        {isComposeOpen && <ComposeEmailModal onClose={() => setComposeOpen(false)} onSend={handleSendEmail} />}
        </>
    );
};
