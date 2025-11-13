
import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon } from '../../../components/icons/SparklesIcon';
import { PaperAirplaneIcon } from '../../../components/icons/PaperAirplaneIcon';
import { PaperClipIcon } from '../../../components/icons/PaperClipIcon';
import { GoogleGenAI, Chat } from "@google/genai";

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    attachments?: File[];
}

const initialMessages: Message[] = [
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you with your CRM tasks today? For example, you can ask 'Summarize my deals with Zeta Corp'.", sender: 'ai' },
];

export const AIAssistantPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chat = useRef<Chat | null>(null);

    useEffect(() => {
        // Initialize the chat session
        if (!chat.current) {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chat.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                systemInstruction: "You are an expert CRM assistant for a financial advisor named Matthew. You are embedded in his CRM tool. Your tone is professional, concise, and helpful. Use the context of his deals and tasks to answer questions. Current deals context: a $2200 branding deal with Zeta Corp is in the 'Proposal Sent' stage; a $12000 mobile app dev deal with Innovate.IO is in 'Negotiation'.",
            });
        }
    }, []);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleSend = async () => {
        if (input.trim() === '' || !chat.current) return;

        const newUserMessage: Message = {
            id: Date.now(),
            text: input,
            sender: 'user',
        };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsTyping(true);
        
        try {
            const responseStream = await chat.current.sendMessageStream({ message: input });
            
            let aiResponseText = "";
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "", sender: 'ai' }]);
            
            for await (const chunk of responseStream) {
                aiResponseText += chunk.text;
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    const updatedMessage = { ...lastMessage, text: aiResponseText };
                    return [...prev.slice(0, -1), updatedMessage];
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
                sender: 'ai',
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <SparklesIcon className="w-6 h-6 text-indigo-500" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5 text-indigo-500" /></div>}
                        <div className={`max-w-lg p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                            <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isTyping && (
                     <div className="flex items-end gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5 text-indigo-500" /></div>
                        <div className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-700 rounded-bl-none">
                            <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-xl">
                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <PaperClipIcon className="w-5 h-5" />
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about your deals, contacts, or tasks..."
                        className="flex-1 bg-transparent focus:outline-none text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <button onClick={handleSend} className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800" disabled={isTyping}>
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
