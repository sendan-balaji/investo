// pages/public/SignupPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleIcon } from '../../components/icons/GoogleIcon';
import { EyeIcon } from '../../components/icons/EyeIcon';
import { EyeSlashIcon } from '../../components/icons/EyeSlashIcon';
import { CheckCircleIcon } from '../../components/icons/CheckCircleIcon';

interface SignupPageProps {
    onEmailSignup: (email: string, password: string) => void;
    onGoogleLogin: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onEmailSignup, onGoogleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onEmailSignup(email, password);
    };

    return (
        <div className="min-h-full flex flex-col justify-center bg-surface py-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-4xl font-bold text-accent">Investo</h1>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-text-primary">
                    Create your free account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-background py-8 px-4 shadow-xl ring-1 ring-border sm:rounded-xl sm:px-10">
                     <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-text-primary">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border-0 bg-surface py-2.5 px-4 text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-secondary focus:ring-2 focus:ring-inset focus:ring-accent" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-text-primary">Password</label>
                            <div className="mt-2 relative">
                                <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md border-0 bg-surface py-2.5 pl-4 pr-10 text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-secondary focus:ring-2 focus:ring-inset focus:ring-accent" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary">
                                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-accent px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80">
                                Create account
                            </button>
                        </div>
                    </form>
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                            <div className="relative flex justify-center text-sm font-medium leading-6"><span className="bg-background px-6 text-text-primary">Or continue with</span></div>
                        </div>
                        <div className="mt-6">
                            <button onClick={onGoogleLogin} className="flex w-full items-center justify-center gap-3 rounded-md bg-surface px-3 py-2 text-text-primary shadow-sm ring-1 ring-inset ring-border hover:bg-background">
                                <GoogleIcon />
                                <span className="text-sm font-semibold leading-6">Google</span>
                            </button>
                        </div>
                    </div>
                </div>
                 <p className="mt-10 text-center text-sm text-text-secondary">
                    Already a member?{' '}
                    <Link to="/login" className="font-semibold leading-6 text-accent hover:opacity-80">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};