import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 lg:col-span-1">
                        <h1 className="text-2xl font-bold text-indigo-600">Investo</h1>
                        <p className="mt-4 text-gray-500 text-sm">AI-powered Trading + CRM to elevate your financial strategy.</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Solutions</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">AI Adviser</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Trading</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">CRM</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Analytics</a></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Documentation</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Guides</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">About</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Blog</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Jobs</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Partners</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Claim</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy</a></li>
                            <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-8 flex items-center justify-between">
                    <p className="text-base text-gray-400">&copy; 2024 Investo, Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
