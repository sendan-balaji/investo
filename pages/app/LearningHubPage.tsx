
import React from 'react';
import { BookOpenIcon } from '../../components/icons/BookOpenIcon';
import { MagnifyingGlassIcon } from '../../components/icons/MagnifyingGlassIcon';

const articles = [
    {
        category: 'Basics',
        title: 'What is a Stock?',
        description: 'Understand the fundamentals of what a stock represents and why companies issue them.',
        imageUrl: 'https://images.unsplash.com/photo-1628258334105-2a0b3d6ef5f3?q=80&w=2070&auto=format&fit=crop',
        readTime: '5 min read'
    },
    {
        category: 'Trading',
        title: 'Introduction to Technical Analysis',
        description: 'Learn how to read charts, identify patterns, and use indicators to make informed trading decisions.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        readTime: '12 min read'
    },
    {
        category: 'Investing',
        title: 'The Power of Compounding',
        description: 'Discover how consistent, long-term investing can grow your wealth exponentially over time.',
        imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932&auto=format&fit=crop',
        readTime: '7 min read'
    },
     {
        category: 'CRM',
        title: 'Building Client Trust as an Advisor',
        description: 'Explore strategies for using CRM tools to enhance communication and build lasting client relationships.',
        imageUrl: 'https://images.unsplash.com/photo-1573496799515-e6b72a39b4f9?q=80&w=2069&auto=format&fit=crop',
        readTime: '8 min read'
    },
];

const categories = ['All', 'Basics', 'Trading', 'Investing', 'CRM'];

export const LearningHubPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center">
                <BookOpenIcon className="w-12 h-12 mx-auto text-indigo-500" />
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4">Learning Hub</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">Your go-to resource for financial literacy, trading strategies, and investment knowledge.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm sticky top-20 z-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                     <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {categories.map(cat => (
                            <button key={cat} className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap ${cat === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                     <div className="relative">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:placeholder-gray-400"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col group">
                        <div className="h-48 overflow-hidden">
                           <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{article.category}</p>
                            <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white flex-grow">{article.title}</h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{article.description}</p>
                            <div className="mt-6 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span>{article.readTime}</span>
                                <a href="#" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Read More →</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
