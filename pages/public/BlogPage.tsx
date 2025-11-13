// pages/public/BlogPage.tsx

import React from 'react';
import { PageHeader } from '../../components/PageHeader';

const mockPosts = [
    { id: 1, title: 'Understanding Market Sentiment with AI', category: { title: 'AI Insights' }, date: 'Mar 16, 2024', author: { name: 'Jane Doe', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, imageUrl: 'https://images.unsplash.com/photo-1620712943543-285f7267a868?q=80&w=2070' },
    { id: 2, title: 'Top 5 CRM Strategies for Financial Advisors', category: { title: 'CRM' }, date: 'Mar 10, 2024', author: { name: 'John Smith', imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e2775df?q=80&w=2070' },
];

export const BlogPage: React.FC = () => {
    return (
        <div className="bg-background text-text-primary">
            <PageHeader
                title="Investo Insights"
                subtitle="Stay updated with the latest in financial technology, market trends, and AI-driven analysis from our experts."
            />
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    {mockPosts.map((post) => (
                        <article key={post.id} className="flex flex-col items-start justify-between bg-surface p-6 rounded-2xl border border-border group relative">
                            <div className="relative w-full">
                                <img src={post.imageUrl} alt="" className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"/>
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-border/10"/>
                            </div>
                            <div className="max-w-xl">
                                <div className="mt-8 flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.date} className="text-text-secondary">{post.date}</time>
                                    <span className="relative z-10 rounded-full bg-accent/20 px-3 py-1.5 font-medium text-accent">{post.category.title}</span>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-text-primary group-hover:text-accent">
                                        <a href="#"><span className="absolute inset-0"/>{post.title}</a>
                                    </h3>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50"/>
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-text-primary">{post.author.name}</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};