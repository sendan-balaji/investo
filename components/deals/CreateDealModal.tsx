
import React, { useState } from 'react';
import type { Deal } from '../../types';

interface CreateDealModalProps {
    onClose: () => void;
    onAddDeal: (dealData: Omit<Deal, 'id' | 'stage' | 'updated' | 'assigneeAvatar' | 'notes' | 'contactEmail' | 'createdDate'>) => void;
}

export const CreateDealModal: React.FC<CreateDealModalProps> = ({ onClose, onAddDeal }) => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [value, setValue] = useState('');
    const [contactPerson, setContactPerson] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !company || !value || !contactPerson) {
            alert('Please fill out all fields.');
            return;
        }
        onAddDeal({ title, company, value: Number(value), contactPerson });
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md m-4"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Deal</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Deal Title
                        </label>
                        <input
                            id="title" type="text" value={title} onChange={e => setTitle(e.target.value)}
                            placeholder="e.g., Website Redesign Project"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                     <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Company Name
                        </label>
                        <input
                            id="company" type="text" value={company} onChange={e => setCompany(e.target.value)}
                            placeholder="e.g., LexiCo"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                     <div>
                        <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Deal Value ($)
                        </label>
                        <input
                            id="value" type="number" value={value} onChange={e => setValue(e.target.value)}
                            placeholder="e.g., 1500"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Contact Person
                        </label>
                        <input
                            id="contactPerson" type="text" value={contactPerson} onChange={e => setContactPerson(e.target.value)}
                            placeholder="e.g., Sarah Johnson"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button" onClick={onClose}
                            className="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none"
                        >
                            Create Deal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
