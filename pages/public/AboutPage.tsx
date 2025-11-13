// pages/public/AboutPage.tsx

import React from 'react';
import { PageHeader } from '../../components/PageHeader'; // Import the new component

const team = [
    { name: 'Sendan Balaji', role: 'Founder & CEO', imageUrl: '/home/sendan/Documents/investo-main/sendan-balaji.jpg' },
    
];

export const AboutPage: React.FC = () => {
    return (
        <div className="bg-background text-text-primary">
            <PageHeader
                title="Our Mission: Democratizing Finance"
                subtitle="We believe that powerful financial tools and AI-driven insights should be accessible to everyone, not just the institutions."
            />

            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-4xl space-y-16">
                        {/* Our Vision Section */}
                        <div className="bg-surface border border-border rounded-xl p-8">
                             <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Our Vision</h2>
                             <p className="mt-6 text-lg leading-8 text-text-secondary">
                                Investo was founded on a simple principle: level the playing field. We're building a seamless, intelligent ecosystem where individual investors and financial advisors can thrive. By integrating the latest advancements in AI with user-centric design, we provide our users with a decisive edge in the market, empowering them to make smarter, more confident financial decisions.
                             </p>
                        </div>
                        
                        {/* Meet the Team Section */}
                        <div>
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Meet Our Leadership</h2>
                                <p className="mt-6 text-lg leading-8 text-text-secondary">
                                    We’re a dynamic group of individuals who are passionate about what we do.
                                </p>
                            </div>
                            <ul role="list" className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                {team.map((person) => (
                                    <li key={person.name} className="bg-surface border border-border rounded-2xl p-6">
                                        <img className="aspect-[1/1] w-full rounded-2xl object-cover" src={person.imageUrl} alt="" />
                                        <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-text-primary">{person.name}</h3>
                                        <p className="text-base leading-7 text-accent">{person.role}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};