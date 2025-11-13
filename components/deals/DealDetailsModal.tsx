
import React from 'react';
import type { Deal } from '../../types';
import { XMarkIcon } from '../icons/XMarkIcon';
import { UserIcon } from '../icons/UserIcon';
import { EnvelopeIcon } from '../icons/EnvelopeIcon';
import { CalendarIcon } from '../icons/CalendarIcon';

interface DealDetailsModalProps {
    deal: Deal;
    onClose: () => void;
}

const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value * 83.5); // Mock conversion USD to INR
};

export const DealDetailsModal: React.FC<DealDetailsModalProps> = ({ deal, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-lg m-4 transform transition-all"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{deal.title}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{deal.company}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>

                {/* Body */}
                <div className="py-6 space-y-6 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Deal Value</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{formatValue(deal.value)}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Current Stage</p>
                            <p className="font-semibold text-indigo-600 dark:text-indigo-400 text-lg">{deal.stage}</p>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Contact Info</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-gray-700 dark:text-gray-300">{deal.contactPerson}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <EnvelopeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                <a href={`mailto:${deal.contactEmail}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">{deal.contactEmail}</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-gray-700 dark:text-gray-300">Created on: {deal.createdDate}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Notes</h3>
                        <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                            {deal.notes.length > 0 ? deal.notes.map((note, index) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                                    <p className="text-gray-800 dark:text-gray-200">{note.text}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">— {note.author} on {note.date}</p>
                                </div>
                            )) : (
                                <p className="text-gray-500 dark:text-gray-400 italic">No notes yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        type="button"
                        onClick={onClose}
                        className="py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none transition-colors"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none transition-colors"
                    >
                        Edit Deal
                    </button>
                </div>
            </div>
        </div>
    );
};
