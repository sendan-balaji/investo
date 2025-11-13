
import React from 'react';
import { MagnifyingGlassIcon } from '../icons/MagnifyingGlassIcon';
import { BellIcon } from '../icons/BellIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { ArrowUturnLeftIcon } from '../icons/ArrowUturnLeftIcon';

interface CRMHeaderProps {
    onExit: () => void;
}

export const CRMHeader: React.FC<CRMHeaderProps> = ({ onExit }) => {
    return (
        <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-20">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome back, Matthew</h1>
                    <p className="hidden sm:block text-sm text-gray-500">Here are today's stats from your online store.</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button onClick={onExit} className="flex items-center gap-2 py-2 px-3 bg-gray-100 text-gray-600 font-semibold rounded-lg hover:bg-gray-200 text-sm">
                        <ArrowUturnLeftIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Exit CRM</span>
                    </button>
                    <div className="relative hidden sm:block">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full sm:w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                    <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        <BellIcon className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2 cursor-pointer">
                         <img
                            className="h-9 w-9 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop"
                            alt="User avatar"
                        />
                        <div className="hidden sm:block">
                             <span className="font-semibold text-sm">Matthew Parker</span>
                        </div>
                        <ChevronDownIcon className="hidden sm:block w-4 h-4 text-gray-500" />
                    </div>
                </div>
            </div>
        </header>
    );
};
