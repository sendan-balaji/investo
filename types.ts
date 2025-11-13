// types.ts
export enum TaskStatus { PLANNED = 'PLANNED', IN_PROGRESS = 'IN_PROGRESS', COMPLETED = 'COMPLETED' }
export interface Task { id: string; title: string; dueDate: string; assignee: string; status: TaskStatus; }
export type Recommendation = 'Buy' | 'Hold' | 'Sell';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type TimeHorizon = 'Short-term' | 'Mid-term' | 'Long-term';
export interface StockPick { symbol: string; name: string; recommendation: Recommendation; price: number; change: number; risk: RiskLevel; horizon: TimeHorizon; logoUrl?: string; sector: string; confidence: number; targetPrice: number; stopLoss: number; marketCap: number; volume: number; peRatio: number; eps: number; dividendYield: number; debtToEquity: number; revenueGrowth: number; sectorPeAverage: number; aiSummary: string; opportunities: string[]; risks: string[]; }
export interface Note { id: number; title: string; content: string; lastModified: string; stockSymbol?: string; }
export type PublicPage = 'Home' | 'About' | 'Blog' | 'Contact' | 'Login' | 'Sign Up';
export type AppPage = 'Dashboard' | 'AI Adviser' | 'Market' | 'Watchlist' | 'Tools' | 'Settings' | 'Notes' | 'Stock Deep Dive';
export type AnyPage = PublicPage | AppPage;
