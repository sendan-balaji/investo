// pages/public/ContactPage.tsx

import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { EnvelopeIcon } from '../../components/icons/EnvelopeIcon'; // Assuming you have these

export const ContactPage: React.FC = () => {
    return (
        <div className="bg-background text-text-primary">
            <PageHeader
                title="Get in Touch"
                subtitle="We’d love to hear from you. Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions."
            />
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="relative">
                        <h2 className="text-3xl font-bold tracking-tight text-text-primary">Contact Information</h2>
                        <p className="mt-4 text-lg text-text-secondary">
                            Find us at our headquarters or reach out to us via email.
                        </p>
                        <dl className="mt-8 space-y-4 text-base text-text-secondary">
                            <div className="flex gap-3">
                                <dt className="flex-none"><span className="sr-only">Address</span>🏢</dt>
                                <dd>123 Innovation Drive, Tech City, 12345</dd>
                            </div>
                             <div className="flex gap-3">
                                <dt className="flex-none"><span className="sr-only">Email</span><EnvelopeIcon className="w-6 h-6"/></dt>
                                <dd><a className="hover:text-text-primary" href="mailto:hello@investo.com">hello@investo.com</a></dd>
                            </div>
                        </dl>
                    </div>

                    {/* Contact Form */}
                    <form className="space-y-6 bg-surface p-8 rounded-xl border border-border">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-text-primary">Full name</label>
                            <div className="mt-2.5">
                                <input type="text" name="name" id="name" autoComplete="name" className="block w-full rounded-md border-0 px-3.5 py-2 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-secondary focus:ring-2 focus:ring-inset focus:ring-accent" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-text-primary">Email</label>
                            <div className="mt-2.5">
                                <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-secondary focus:ring-2 focus:ring-inset focus:ring-accent" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-text-primary">Message</label>
                            <div className="mt-2.5">
                                <textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-secondary focus:ring-2 focus:ring-inset focus:ring-accent"></textarea>
                            </div>
                        </div>
                        <div className="mt-10">
                            <button type="submit" className="block w-full rounded-md bg-accent px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:opacity-80">Let's talk</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};