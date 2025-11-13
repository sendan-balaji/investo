// components/AInsightsWidget.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { SparklesIcon } from './icons/SparklesIcon';

export const AIInsightsWidget = ({ marketData }) => {
    const [suggestion, setSuggestion] = useState('Generating insights...');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (marketData && marketData.length > 0) {
            const fetchSuggestion = async () => {
                setIsLoading(true);
                try {
                    const { data, error } = await supabase.functions.invoke('ai-suggestions', {
                        body: { marketData },
                    });

                    if (error) throw error;
                    setSuggestion(data.suggestion);
                } catch (err) {
                    console.error("Error fetching AI suggestion:", err);
                    setSuggestion("Could not load AI insights at this time.");
                } finally {
                    setIsLoading(false);
                }
            };

            const timer = setTimeout(() => {
                fetchSuggestion();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [marketData]);

    return (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 text-sm text-indigo-800 dark:text-indigo-200">
            <div className="flex items-start gap-3">
                <SparklesIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-semibold">AI Market Insights</p>
                    {isLoading ? (
                         <div className="space-y-1 mt-1">
                            <div className="h-3 bg-indigo-200 dark:bg-indigo-700 rounded-full w-3/4 animate-pulse"></div>
                            <div className="h-3 bg-indigo-200 dark:bg-indigo-700 rounded-full w-1/2 animate-pulse"></div>
                         </div>
                    ) : (
                        <p className="mt-1">{suggestion}</p>
                    )}
                </div>
            </div>
        </div>
    );
};
