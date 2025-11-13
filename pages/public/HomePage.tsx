// pages/public/HomePage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, ChartBarIcon, UsersIcon } from '../../components/icons';
import LiquidEther from '../../components/LiquidEther';

export const HomePage: React.FC = () => {
    const features = [
        { name: 'AI-Powered Adviser', description: 'Get data-driven recommendations from our advanced AI models.', icon: SparklesIcon },
        { name: 'Integrated CRM', description: 'Manage client relationships and streamline your workflow.', icon: UsersIcon },
        { name: 'Advanced Market Analytics', description: 'Utilize powerful charting and predictive analysis.', icon: ChartBarIcon },
    ];

    return (
        <div className="bg-surface">
            {/* Hero Section */}
            <div className="relative isolate pt-14">
                
                {/* --- LIQUID ETHER ANIMATION BACKGROUND --- */}
                <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -10, overflow: 'hidden' }}>
                    <LiquidEther
                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                        mouseForce={20}
                        cursorSize={100}
                        isViscous={false}
                        viscous={30}
                        iterationsViscous={32}
                        iterationsPoisson={32}
                        resolution={0.5}
                        isBounce={false}
                        autoDemo={true}
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                    />
                </div>

                <div className="py-24 sm:py-32 lg:pb-40">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
                                Your Unfair Advantage in the Market is Here.
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-text-secondary">
                                Investo fuses powerful AI-driven stock insights with a seamless CRM, giving you everything you need to out-maneuver and out-perform.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link to="/signup" className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-80 transition-opacity">
                                    Get started for free
                                </Link>
                                <Link to="/about" className="text-sm font-semibold leading-6 text-text-primary hover:opacity-80 transition-opacity">
                                    Learn more <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-background py-24 sm:py-32">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto lg:text-center">
                         <h2 className="text-base font-semibold leading-7 text-accent">Everything You Need</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                            A Better Way to Invest and Manage
                        </p>
                    </div>
                     <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {features.map((feature) => (
                                <div key={feature.name} className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-text-primary">
                                        <feature.icon className="h-5 w-5 flex-none text-accent" aria-hidden="true" />
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-text-secondary">
                                        <p className="flex-auto">{feature.description}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
            
            {/* CTA Section */}
            <div className="bg-surface py-24 sm:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-accent/90 px-6 py-24 text-center shadow-2xl rounded-2xl sm:px-16">
                         <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                           Ready to Elevate Your Strategy?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
                            Join thousands of users who trust Investo to make smarter financial decisions.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link to="/signup" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-accent shadow-sm hover:bg-indigo-50">
                                Sign Up Now
                            </Link>
                            <Link to="/contact" className="text-sm font-semibold leading-6 text-white">
                                Contact Sales <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};