
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon } from '../../components/icons/MagnifyingGlassIcon';
import { ArrowUpIcon } from '../../components/icons/ArrowUpIcon';
import { ArrowDownIcon } from '../../components/icons/ArrowDownIcon';
import { SparklesIcon } from '../../components/icons/SparklesIcon';
import { CheckCircleIcon } from '../../components/icons/CheckCircleIcon';
import { XMarkIcon } from '../../components/icons/XMarkIcon';
import { ExclamationTriangleIcon } from '../../components/icons/ExclamationTriangleIcon';


// --- MOCK DATA --- //
const mockWatchlist = [
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1380.90, change: -0.75 },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1560.25, change: 1.25 },
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2845.70, change: -0.52 },
    { symbol: 'TCS', name: 'Tata Consultancy', price: 3890.10, change: 0.89 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1455.40, change: -1.10 },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1105.00, change: 2.30 },
    { symbol: 'SBIN', name: 'State Bank of India', price: 834.60, change: 0.15 },
];

const mockMarketDepth = {
    buy: [ { orders: 15, qty: 120, price: 1380.80 }, { orders: 8, qty: 95, price: 1380.75 }, { orders: 22, qty: 250, price: 1380.70 }, { orders: 12, qty: 150, price: 1380.65 }, { orders: 18, qty: 200, price: 1380.60 }, ],
    sell: [ { orders: 12, qty: 110, price: 1380.95 }, { orders: 9, qty: 80, price: 1381.00 }, { orders: 25, qty: 300, price: 1381.05 }, { orders: 14, qty: 180, price: 1381.10 }, { orders: 20, qty: 220, price: 1381.15 }, ]
};

const mockPositions = [ { symbol: 'RELIANCE', qty: 10, avgPrice: 2800.50, ltp: 2845.70, pnl: 452.00 }, { symbol: 'TCS', qty: 5, avgPrice: 3850.00, ltp: 3890.10, pnl: 200.50 }, ];
const mockOrders = [ { symbol: 'HDFCBANK', type: 'LIMIT', side: 'BUY', qty: 20, price: 1450.00, status: 'OPEN' }, { symbol: 'INFY', type: 'MARKET', side: 'SELL', qty: 10, price: 1562.00, status: 'EXECUTED' }, ];
const mockTradeHistory = [ { symbol: 'BHARTIARTL', side: 'BUY', qty: 5, price: 1380.00, time: '11:05 AM'}, { symbol: 'ICICIBANK', side: 'SELL', qty: 10, price: 1100.50, time: '10:32 AM'} ];


// --- SUB-COMPONENTS --- //

const OrderPreviewModal: React.FC<{ order: any; onConfirm: () => void; onCancel: () => void; }> = ({ order, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-sm m-4">
            <h2 className="text-xl font-bold text-center mb-1 text-gray-900 dark:text-white">Confirm Order</h2>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">You are in Simulation Mode. This will not affect real funds.</p>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Action</span>
                    <span className={`font-bold text-lg ${order.side === 'BUY' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>{order.side} {order.symbol}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Quantity</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{order.quantity} Shares</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Order Type</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{order.orderType}</span>
                </div>
                 <div className="flex justify-between items-center pt-3 mt-3 border-t dark:border-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">Total Value</span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">₹{(order.quantity * order.price).toLocaleString('en-IN')}</span>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
                <button onClick={onCancel} className="py-2.5 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Cancel ❌</button>
                <button onClick={onConfirm} className="py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">Confirm ✅</button>
            </div>
        </div>
    </div>
);

const SuccessToast: React.FC<{ message: string; onDismiss: () => void; isVisible: boolean }> = ({ message, onDismiss, isVisible }) => (
     <div className={`fixed top-24 right-6 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 shadow-lg rounded-lg p-4 flex items-center gap-3 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
        <CheckCircleIcon className="w-6 h-6 text-green-500" />
        <div>
            <p className="font-semibold text-gray-800 dark:text-white">Success</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
        </div>
        <button onClick={onDismiss} className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-4 h-4" />
        </button>
    </div>
);


const WatchlistPanel: React.FC<{ onSelectStock: (symbol: string) => void, selectedStock: any }> = ({ onSelectStock, selectedStock }) => {
    return (
        <div className="bg-white dark:bg-gray-800 h-full border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:placeholder-gray-400" />
                </div>
                 <div className="mt-4">
                    <label htmlFor="category" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Categories</label>
                    <select id="category" className="w-full mt-1 px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                        <option>Equities 🏦</option>
                        <option>Commodities ⛏️</option>
                        <option>ETFs 📊</option>
                    </select>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {mockWatchlist.map(stock => (
                    <button key={stock.symbol} onClick={() => onSelectStock(stock.symbol)} className={`w-full text-left px-4 py-3 flex justify-between items-center transition-colors ${selectedStock.symbol === stock.symbol ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                        <div>
                            <p className={`font-bold ${selectedStock.symbol === stock.symbol ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-800 dark:text-gray-200'}`}>{stock.symbol}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">₹{stock.price.toFixed(2)}</p>
                            <p className={`text-xs font-medium ${stock.change >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>{stock.change.toFixed(2)}%</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const OrderPlacementPanel: React.FC<{ selectedStock: any; onPlaceOrder: (order: any) => void, orderSide: 'BUY' | 'SELL', setOrderSide: (side: 'BUY' | 'SELL') => void, quantityInputRef: React.RefObject<HTMLInputElement> }> = ({ selectedStock, onPlaceOrder, orderSide, setOrderSide, quantityInputRef }) => {
    const [quantity, setQuantity] = useState(1);
    const [orderType, setOrderType] = useState('Market');
    const requiredFunds = (quantity * selectedStock.price).toFixed(2);
    
    const handlePlaceOrderClick = () => {
        onPlaceOrder({
            symbol: selectedStock.symbol,
            side: orderSide,
            quantity,
            orderType,
            price: selectedStock.price
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 h-full border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 flex flex-col">
            <div className="grid grid-cols-2 gap-2 mb-4">
                <button onClick={() => setOrderSide('BUY')} className={`py-2 text-lg font-bold rounded-lg transition-all ${orderSide === 'BUY' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-700/50'}`}>BUY</button>
                <button onClick={() => setOrderSide('SELL')} className={`py-2 text-lg font-bold rounded-lg transition-all ${orderSide === 'SELL' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700/50'}`}>SELL</button>
            </div>
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Quantity</label>
                    <div className="relative flex items-center mt-1">
                        <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="absolute left-0 px-3 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-600">-</button>
                        <input ref={quantityInputRef} type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-full text-center px-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                        <button onClick={() => setQuantity(q => q+1)} className="absolute right-0 px-3 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-r-lg hover:bg-gray-200 dark:hover:bg-gray-600">+</button>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Order Type</label>
                    <select value={orderType} onChange={e => setOrderType(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                        <option>Market</option>
                        <option>Limit</option>
                        <option>Stop Loss</option>
                    </select>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm space-y-2 text-gray-800 dark:text-gray-300">
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Required Funds:</span> <span className="font-semibold">₹{requiredFunds}</span></div>
                 <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Available Funds:</span> <span className="font-semibold text-indigo-600 dark:text-indigo-400">₹1,00,000.00</span></div>
            </div>
            <div className="mt-auto pt-4">
                <button onClick={handlePlaceOrderClick} className={`w-full py-3 font-bold text-white rounded-lg text-lg ${orderSide === 'BUY' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
                    Confirm {orderSide}
                </button>
            </div>
        </div>
    );
};

const StockOverview: React.FC<{ stock: any, onAction: (side: 'BUY' | 'SELL') => void }> = ({ stock, onAction }) => (
    <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{stock.symbol}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
            </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => onAction('BUY')} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5">BUY</button>
            <button onClick={() => onAction('SELL')} className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5">SELL</button>
        </div>
        <div className="text-right">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">₹{stock.price.toFixed(2)}</p>
            <div className={`flex items-center justify-end gap-1 text-lg font-semibold ${stock.change >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                {stock.change >= 0 ? <ArrowUpIcon className="w-5 h-5" /> : <ArrowDownIcon className="w-5 h-5" />}
                <span>{stock.change.toFixed(2)}%</span>
            </div>
        </div>
    </div>
);

const MarketDepth: React.FC<{ data: typeof mockMarketDepth }> = ({ data }) => {
    const totalBuyQty = data.buy.reduce((sum, d) => sum + d.qty, 0);
    const totalSellQty = data.sell.reduce((sum, d) => sum + d.qty, 0);

    const DepthRow: React.FC<{ orders: number, qty: number, price: number, type: 'buy' | 'sell' }> = ({ orders, qty, price, type }) => {
        const percentage = (qty / (type === 'buy' ? totalBuyQty : totalSellQty)) * 100;
        return (
            <div className="grid grid-cols-3 gap-2 text-xs relative text-center py-0.5 text-gray-800 dark:text-gray-300">
                <div className={`absolute top-0 h-full ${type === 'buy' ? 'right-0 bg-green-100 dark:bg-green-900/20' : 'left-0 bg-red-100 dark:bg-red-900/20'}`} style={{ width: `${percentage}%` }}></div>
                <span className="z-10">{type === 'buy' ? orders : price.toFixed(2)}</span>
                <span className="z-10 font-semibold">{qty}</span>
                <span className={`z-10 font-semibold ${type === 'buy' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>{type === 'buy' ? price.toFixed(2) : orders}</span>
            </div>
        );
    };

    return (
        <div className="h-full border-l border-gray-200 dark:border-gray-700 pl-4 text-xs">
            <h3 className="font-bold text-center text-sm mb-2 text-gray-700 dark:text-gray-300">Market Depth</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="grid grid-cols-3 gap-2 text-gray-500 dark:text-gray-400 font-semibold text-center pb-1 border-b dark:border-gray-700">
                        <span>Orders</span><span>Qty</span><span>Bid</span>
                    </div>
                    {data.buy.map(d => <DepthRow key={d.price} {...d} type="buy" />)}
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-2 text-gray-500 dark:text-gray-400 font-semibold text-center pb-1 border-b dark:border-gray-700">
                        <span>Ask</span><span>Qty</span><span>Orders</span>
                    </div>
                    {data.sell.map(d => <DepthRow key={d.price} {...d} type="sell" />)}
                </div>
            </div>
            <div className="flex justify-between mt-2 pt-2 border-t dark:border-gray-700 text-sm">
                <div className="text-center"><p className="font-bold text-green-600 dark:text-green-500">{totalBuyQty}</p><p className="text-gray-500 dark:text-gray-400 text-xs">Total Bids</p></div>
                <div className="text-center"><p className="font-bold text-red-600 dark:text-red-500">{totalSellQty}</p><p className="text-gray-500 dark:text-gray-400 text-xs">Total Asks</p></div>
            </div>
        </div>
    );
};

const CandlestickChart: React.FC = () => (
    <svg width="100%" height="100%" viewBox="0 0 500 250" preserveAspectRatio="none" className="text-gray-300 dark:text-gray-600">
        <line x1="30" y1="230" x2="480" y2="230" stroke="currentColor" strokeWidth="1" />
        <line x1="30" y1="20" x2="30" y2="230" stroke="currentColor" strokeWidth="1" />
        <text x="25" y="25" textAnchor="end" fontSize="10" className="fill-gray-500 dark:fill-gray-400">1400</text>
        <text x="25" y="125" textAnchor="end" fontSize="10" className="fill-gray-500 dark:fill-gray-400">1380</text>
        <text x="25" y="225" textAnchor="end" fontSize="10" className="fill-gray-500 dark:fill-gray-400">1360</text>
        <line x1="60" y1="120" x2="60" y2="150" stroke="#16a34a" strokeWidth="1" /><rect x="55" y="130" width="10" height="10" fill="#16a34a" />
        <line x1="90" y1="110" x2="90" y2="145" stroke="#dc2626" strokeWidth="1" /><rect x="85" y="115" width="10" height="20" fill="#dc2626" />
        <line x1="120" y1="130" x2="120" y2="160" stroke="#16a34a" strokeWidth="1" /><rect x="115" y="140" width="10" height="10" fill="#16a34a" />
        <line x1="150" y1="140" x2="150" y2="170" stroke="#dc2626" strokeWidth="1" /><rect x="145" y="150" width="10" height="10" fill="#dc2626" />
        <line x1="180" y1="125" x2="180" y2="155" stroke="#16a34a" strokeWidth="1" /><rect x="175" y="135" width="10" height="10" fill="#16a34a" />
    </svg>
);


const TradeSummaryPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Positions');
    
    const renderContent = () => {
        switch (activeTab) {
            case 'Positions':
                return (<table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700"><tr><th scope="col" className="px-4 py-2">Symbol</th><th scope="col" className="px-4 py-2">Qty</th><th scope="col" className="px-4 py-2">Avg. Price</th><th scope="col" className="px-4 py-2">LTP</th><th scope="col" className="px-4 py-2">P&L</th></tr></thead>
                        <tbody>{mockPositions.map(p => (<tr key={p.symbol} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700"><td className="px-4 py-2 font-medium text-gray-900 dark:text-white">{p.symbol}</td><td className="px-4 py-2 dark:text-gray-300">{p.qty}</td><td className="px-4 py-2 dark:text-gray-300">₹{p.avgPrice.toFixed(2)}</td><td className="px-4 py-2 dark:text-gray-300">₹{p.ltp.toFixed(2)}</td><td className={`px-4 py-2 font-semibold ${p.pnl >=0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>{p.pnl >= 0 ? '+' : ''}₹{p.pnl.toFixed(2)}</td></tr>))}</tbody></table>);
            case 'Orders':
                 return (<table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700"><tr><th scope="col" className="px-4 py-2">Symbol</th><th scope="col" className="px-4 py-2">Type</th><th scope="col" className="px-4 py-2">Side</th><th scope="col" className="px-4 py-2">Qty</th><th scope="col" className="px-4 py-2">Price</th><th scope="col" className="px-4 py-2">Status</th></tr></thead>
                        <tbody>{mockOrders.map((o, i) => (<tr key={i} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700"><td className="px-4 py-2 font-medium text-gray-900 dark:text-white">{o.symbol}</td><td className="px-4 py-2 dark:text-gray-300">{o.type}</td><td className={`px-4 py-2 font-semibold ${o.side === 'BUY' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>{o.side}</td><td className="px-4 py-2 dark:text-gray-300">{o.qty}</td><td className="px-4 py-2 dark:text-gray-300">₹{o.price.toFixed(2)}</td><td className="px-4 py-2"><span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${o.status === 'OPEN' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'}`}>{o.status}</span></td></tr>))}</tbody></table>);
            case 'Trade History':
                return (<table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700"><tr><th scope="col" className="px-4 py-2">Symbol</th><th scope="col" className="px-4 py-2">Side</th><th scope="col" className="px-4 py-2">Qty</th><th scope="col" className="px-4 py-2">Price</th><th scope="col" className="px-4 py-2">Time</th></tr></thead>
                        <tbody>{mockTradeHistory.map((t, i) => (<tr key={i} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700"><td className="px-4 py-2 font-medium text-gray-900 dark:text-white">{t.symbol}</td><td className={`px-4 py-2 font-semibold ${t.side === 'BUY' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>{t.side}</td><td className="px-4 py-2 dark:text-gray-300">{t.qty}</td><td className="px-4 py-2 dark:text-gray-300">₹{t.price.toFixed(2)}</td><td className="px-4 py-2 dark:text-gray-300">{t.time}</td></tr>))}</tbody></table>);
            default: return null;
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex flex-col h-full"><div className="flex border-b border-gray-200 dark:border-gray-700">{['Positions', 'Orders', 'Trade History'].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === tab ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>{tab}</button>))}</div><div className="flex-1 overflow-y-auto">{renderContent()}</div></div>
    );
};

// --- MAIN PAGE COMPONENT --- //
export const SimulationPage: React.FC = () => {
    const [selectedStockSymbol, setSelectedStockSymbol] = useState(mockWatchlist[0].symbol);
    const [orderSide, setOrderSide] = useState<'BUY' | 'SELL'>('BUY');
    const [isPreviewOpen, setPreviewOpen] = useState(false);
    const [orderToPreview, setOrderToPreview] = useState<any>(null);
    const [isToastVisible, setToastVisible] = useState(false);
    const quantityInputRef = useRef<HTMLInputElement>(null);

    const selectedStock = useMemo(() => mockWatchlist.find(s => s.symbol === selectedStockSymbol) || mockWatchlist[0], [selectedStockSymbol]);

    const handleSelectStock = (symbol: string) => {
        setSelectedStockSymbol(symbol);
    };

    const handleActionClick = (side: 'BUY' | 'SELL') => {
        setOrderSide(side);
        quantityInputRef.current?.focus();
        quantityInputRef.current?.select();
    };

    const handlePlaceOrder = (order: any) => {
        setOrderToPreview(order);
        setPreviewOpen(true);
    };

    const handleConfirmOrder = () => {
        console.log('Order confirmed:', orderToPreview);
        setPreviewOpen(false);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
    };

    return (
        <div className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg flex items-center gap-3">
                <ExclamationTriangleIcon className="w-6 h-6" />
                <div>
                    <h3 className="font-bold">Simulation Mode</h3>
                    <p className="text-sm">You are using play money. No real funds will be used for these trades.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-15rem)]">
                <div className="lg:col-span-1 h-full min-h-[400px]">
                    <WatchlistPanel onSelectStock={handleSelectStock} selectedStock={selectedStock} />
                </div>
                <div className="lg:col-span-3 h-full flex flex-col gap-6">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 flex-grow flex flex-col">
                        <StockOverview stock={selectedStock} onAction={handleActionClick} />
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0">
                            <div className="md:col-span-2 h-64 md:h-full">
                                <CandlestickChart />
                            </div>
                            <div className="h-64 md:h-full">
                                <MarketDepth data={mockMarketDepth} />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full max-h-[300px] xl:max-h-[350px]">
                        <div className="md:col-span-2 h-full">
                            <TradeSummaryPanel />
                        </div>
                        <div className="h-full">
                            <OrderPlacementPanel selectedStock={selectedStock} onPlaceOrder={handlePlaceOrder} orderSide={orderSide} setOrderSide={setOrderSide} quantityInputRef={quantityInputRef} />
                        </div>
                    </div>
                </div>
                {isPreviewOpen && orderToPreview && (
                    <OrderPreviewModal
                        order={orderToPreview}
                        onConfirm={handleConfirmOrder}
                        onCancel={() => setPreviewOpen(false)}
                    />
                )}
                <SuccessToast
                    message="Your simulated order has been placed!"
                    isVisible={isToastVisible}
                    onDismiss={() => setToastVisible(false)}
                />
            </div>
        </div>
    );
};
