
import React, { useState } from 'react';
import { PaperAirplaneIcon } from '../icons/PaperAirplaneIcon';

interface ComposeEmailModalProps {
    onClose: () => void;
    onSend: (emailData: { to: string; subject: string; body: string }) => void;
}

export const ComposeEmailModal: React.FC<ComposeEmailModalProps> = ({ onClose, onSend }) => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!to || !subject || !body) {
            alert('Please fill out all fields.');
            return;
        }
        onSend({ to, subject, body });
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl m-4 flex flex-col h-[70vh]"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Compose Email</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="p-4 space-y-4">
                        <div>
                            <label htmlFor="to" className="sr-only">To</label>
                            <input
                                id="to" type="email" value={to} onChange={e => setTo(e.target.value)}
                                placeholder="To"
                                className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="sr-only">Subject</label>
                            <input
                                id="subject" type="text" value={subject} onChange={e => setSubject(e.target.value)}
                                placeholder="Subject"
                                className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="flex-1 p-4">
                         <textarea
                            value={body} onChange={e => setBody(e.target.value)}
                            placeholder="Write your message..."
                            className="w-full h-full resize-none focus:outline-none dark:bg-gray-800 dark:text-gray-300"
                        />
                    </div>
                    <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="submit"
                            className="flex items-center gap-2 py-2 px-5 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700"
                        >
                            <span>Send</span>
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                         <button
                            type="button" onClick={onClose}
                            className="py-2 px-4 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
