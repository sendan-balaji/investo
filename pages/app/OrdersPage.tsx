import React, { useState, useMemo, useEffect } from 'react';
import type { Order, OrderStatus } from '../../types';
import { MagnifyingGlassIcon } from '../../components/icons/MagnifyingGlassIcon';
import { SparklesIcon } from '../../components/icons/SparklesIcon';
import { XMarkIcon } from '../../components/icons/XMarkIcon';
import { PencilIcon } from '../../components/icons/PencilIcon';
import { TrashIcon } from '../../components/icons/TrashIcon';
import { CheckCircleIcon } from '../../components/icons/CheckCircleIcon';
import { ModifyOrderModal } from '../../components/ModifyOrderModal';
import { CancelOrderModal } from '../../components/CancelOrderModal';

const initialOrders: Order[] = [
    { id: 'ORD1001', symbol: 'RELIANCE', name: 'Reliance Industries', action: 'Buy', type: 'Limit', category: 'Delivery', quantity: 10, price: 2850.00, status: 'Pending', timestamp: '2024-08-16 10:30:15' },
    { id: 'ORD1002', symbol: 'TCS', name: 'Tata Consultancy', action: 'Sell', type: 'Market', category: 'Intraday', quantity: 5, price: 3890.10, status: 'Completed', timestamp: '2024-08-16 09:45:22' },
    { id: 'ORD1003', symbol: 'INFY', name: 'Infosys Ltd', action: 'Buy', type: 'Limit', category: 'Delivery', quantity: 20, price: 1555.00, status: 'Cancelled', timestamp: '2024-08-15 14:12:05' },
    { id: 'ORD1004', symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', action: 'Buy', type: 'Stop Loss', category: 'Intraday', quantity: 15, price: 1450.00, status: 'Failed', reason: 'Insufficient funds', timestamp: '2024-08-15 11:05:45' },
    { id: 'ORD1005', symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', action: 'Sell', type: 'Limit', category: 'Delivery', quantity: 50, price: 1110.00, status: 'Pending', timestamp: '2024-08-16 11:20:00' },
    { id: 'ORD1006', symbol: 'BHARTIARTL', name: 'Bharti Airtel', action: 'Buy', type: 'Market', category: 'Intraday', quantity: 30, price: 1381.50, status: 'Completed', timestamp: '2024-08-16 10:05:10' },
    { id: 'ORD1007', symbol: 'SBIN', name: 'State Bank of India', action: 'Buy', type: 'Limit', category: 'Delivery', quantity: 100, price: 830.00, status: 'Pending', timestamp: '2024-08-16 09:35:18' },
    { id: 'ORD1008', symbol: 'RELIANCE', name: 'Reliance Industries', action: 'Sell', type: 'Market', category: 'Intraday', quantity: 10, price: 2865.00, status: 'Completed', timestamp: '2024-08-14 13:00:55' },
];

const TABS: { name: string, status: OrderStatus | 'All' }[] = [
    { name: 'Active', status: 'Pending' },
    { name: 'Completed', status: 'Completed' },
    { name: 'Cancelled', status: 'Cancelled' },
    { name: 'Failed', status: 'Failed' },
    { name: 'All Orders', status: 'All' },
];

const actionColors: Record<Order['action'], string> = { Buy: 'text-green-600', Sell: 'text-red-600', };
const statusColors: Record<OrderStatus, string> = { Pending: 'bg-yellow-100 text-yellow-800', Completed: 'bg-green-100 text-green-800', Cancelled: 'bg-gray-100 text-gray-800', Failed: 'bg-red-100 text-red-800', };

const Toast: React.FC<{ message: string, type: 'success' | 'error', onDismiss: () => void }> = ({ message, type, onDismiss }) => (
    <div className={`fixed top-24 right-6 bg-white border ${type === 'success' ? 'border-green-300' : 'border-red-300'} shadow-lg rounded-lg p-4 flex items-center gap-3 z-50 transition-all duration-300`}>
        {type === 'success' ? <CheckCircleIcon className="w-6 h-6 text-green-500" /> : <XMarkIcon className="w-6 h-6 text-red-500" />}
        <div>
            <p className="font-semibold text-gray-800">{type === 'success' ? 'Success' : 'Notice'}</p>
            <p className="text-sm text-gray-600">{message}</p>
        </div>
        <button onClick={onDismiss} className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600"><XMarkIcon className="w-4 h-4" /></button>
    </div>
);

const StatusTimeline: React.FC<{ order: Order }> = ({ order }) => {
    const timelineSteps = [
        { name: 'Created', completed: true, date: order.timestamp.split(' ')[1] },
        { name: 'Pending', completed: order.status !== 'Failed', active: order.status === 'Pending' },
        { name: 'Executed', completed: order.status === 'Completed', active: false },
    ];
    
    if (order.status === 'Cancelled') {
        timelineSteps[2] = { name: 'Cancelled', completed: true, active: false };
    }
    if (order.status === 'Failed') {
        timelineSteps[1] = { name: 'Failed', completed: true, active: false };
        timelineSteps.pop();
    }

    return (
         <div className="mt-6 pt-4 border-t">
            <h3 className="font-semibold mb-4 text-gray-800">Status Timeline</h3>
            <ol className="relative border-l border-gray-200">
                {timelineSteps.map((step, index) => (
                    <li key={index} className="mb-6 ml-4">
                        <div className={`absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-white ${step.completed ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                        <p className="text-sm font-semibold text-gray-900">{step.name}</p>
                        {step.date && <time className="mb-1 text-xs font-normal leading-none text-gray-400">{step.date}</time>}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [activeTab, setActiveTab] = useState<OrderStatus | 'All'>('Pending');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [orderToModify, setOrderToModify] = useState<Order | null>(null);
    const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);
    const [toast, setToast] = useState<{ visible: boolean, message: string, type: 'success' | 'error' }>({ visible: false, message: '', type: 'success' });
    
    useEffect(() => {
        if (toast.visible) {
            const timer = setTimeout(() => setToast({ ...toast, visible: false }), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ visible: true, message, type });
    };

    const handleConfirmModify = (orderId: string, newQuantity: number, newPrice: number) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, quantity: newQuantity, price: newPrice, timestamp: new Date().toLocaleTimeString('en-GB') } : o));
        setOrderToModify(null);
        setSelectedOrder(prev => prev ? { ...prev, quantity: newQuantity, price: newPrice } : null);
        showToast('Order modified successfully!');
    };

    const handleConfirmCancel = (orderId: string) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
        setOrderToCancel(null);
        setSelectedOrder(null);
        showToast('Order has been cancelled.', 'error');
    };

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const statusMatch = activeTab === 'All' || order.status === activeTab;
            const searchMatch = order.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || order.name.toLowerCase().includes(searchTerm.toLowerCase());
            return statusMatch && searchMatch;
        });
    }, [activeTab, searchTerm, orders]);

    const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedOrder(order)}>
            <div className="flex justify-between items-start mb-3">
                <div>
                    <p className="font-bold text-gray-900">{order.symbol}</p>
                    <p className="text-xs text-gray-500">{order.name}</p>
                </div>
                <div className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>{order.status}</div>
            </div>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Action/Type</span>
                    <span className={`font-bold ${actionColors[order.action]}`}>{order.action} / {order.type}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-gray-500">Qty/Price</span>
                    <span>{order.quantity} @ ₹{order.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>
                    <span>{order.timestamp}</span>
                </div>
            </div>
             {order.status === 'Pending' && (
                <div className="mt-4 pt-3 border-t flex gap-2 justify-end">
                    <button onClick={(e) => { e.stopPropagation(); setOrderToModify(order); }} className="px-3 py-1 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 flex items-center gap-1.5"><PencilIcon className="w-4 h-4" />Modify</button>
                    <button onClick={(e) => { e.stopPropagation(); setOrderToCancel(order); }} className="px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-lg hover:bg-red-200 flex items-center gap-1.5"><TrashIcon className="w-4 h-4" />Cancel</button>
                </div>
            )}
        </div>
    );

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Content */}
                <div className="flex-1 bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex border-b border-gray-200 mb-4 flex-shrink-0 overflow-x-auto">
                        {TABS.map(tab => (
                            <button key={tab.name} onClick={() => setActiveTab(tab.status)} className={`px-4 py-2 text-sm font-semibold transition-colors relative whitespace-nowrap ${activeTab === tab.status ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                {tab.name}
                                {activeTab === tab.status && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />}
                            </button>
                        ))}
                    </div>
                    
                    {/* Responsive Order List */}
                    <div>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3">Stock</th>
                                        <th className="px-4 py-3">Action/Type</th>
                                        <th className="px-4 py-3">Qty/Price</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Time & Date</th>
                                        <th className="px-4 py-3 text-center">Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map(order => (
                                        <tr key={order.id} className="bg-white border-b hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                                            <td className="px-4 py-3"><div className="font-semibold">{order.symbol}</div><div className="text-xs text-gray-500">{order.name}</div></td>
                                            <td className="px-4 py-3"><span className={`font-bold ${actionColors[order.action]}`}>{order.action}</span> / {order.type}</td>
                                            <td className="px-4 py-3">{order.quantity} @ ₹{order.price.toFixed(2)}</td>
                                            <td className="px-4 py-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>{order.status}</span></td>
                                            <td className="px-4 py-3 whitespace-nowrap">{order.timestamp}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {order.status === 'Pending' ? (
                                                    <div className="flex gap-2 justify-center">
                                                        <button onClick={(e) => { e.stopPropagation(); setOrderToModify(order); }} className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full"><PencilIcon className="w-4 h-4" /></button>
                                                        <button onClick={(e) => { e.stopPropagation(); setOrderToCancel(order); }} className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full"><TrashIcon className="w-4 h-4" /></button>
                                                    </div>
                                                ) : '--'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                            {filteredOrders.map(order => <OrderCard key={order.id} order={order} />)}
                        </div>
                         {filteredOrders.length === 0 && (
                            <div className="text-center py-16">
                                <p className="font-semibold text-gray-700">No orders found.</p>
                                <p className="text-sm text-gray-500">There are no orders matching your current filters.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-full lg:w-80 lg:flex-shrink-0 space-y-6 lg:sticky lg:top-8 self-start">
                     <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">Filters & Search</h3>
                        <div className="relative mb-4">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input type="text" placeholder="Search by symbol..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">Trade Stats (Today)</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span>Total Orders:</span><span className="font-semibold">{orders.length}</span></div>
                            <div className="flex justify-between"><span>Completed:</span><span className="font-semibold">{orders.filter(o => o.status === 'Completed').length}</span></div>
                            <div className="flex justify-between"><span>Cancelled:</span><span className="font-semibold">{orders.filter(o => o.status === 'Cancelled').length}</span></div>
                            <div className="flex justify-between"><span>Failed:</span><span className="font-semibold">{orders.filter(o => o.status === 'Failed').length}</span></div>
                        </div>
                    </div>
                     <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-sm text-indigo-800"><div className="flex items-start gap-3"><SparklesIcon className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" /><div><p className="font-semibold">AI Insight</p><p>You cancelled 30% of limit orders last week. Try market orders for faster execution.</p></div></div></div>
                </div>
            </div>
            
            {/* Modals & Toasts */}
            {toast.visible && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast({ ...toast, visible: false })} />}
            {orderToModify && <ModifyOrderModal order={orderToModify} onClose={() => setOrderToModify(null)} onConfirm={handleConfirmModify} />}
            {orderToCancel && <CancelOrderModal order={orderToCancel} onClose={() => setOrderToCancel(null)} onConfirm={handleConfirmCancel} />}

            {/* Order Details Drawer */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${selectedOrder ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSelectedOrder(null)} />
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${selectedOrder ? 'translate-x-0' : 'translate-x-full'}`}>
                {selectedOrder && (
                     <div className="p-6 flex flex-col h-full"><div className="flex justify-between items-center pb-4 border-b border-gray-200 flex-shrink-0"><h2 className="text-xl font-bold text-gray-900">Order Details</h2><button onClick={() => setSelectedOrder(null)} className="p-2 rounded-full hover:bg-gray-100"><XMarkIcon className="w-6 h-6 text-gray-600" /></button></div><div className="mt-6 space-y-4 text-sm flex-grow overflow-y-auto"><div className="flex justify-between"><span className="text-gray-500">Stock</span><span className="font-semibold text-gray-900">{selectedOrder.name} ({selectedOrder.symbol})</span></div><div className="flex justify-between"><span className="text-gray-500">Placed Price</span><span className="font-semibold text-gray-900">₹{selectedOrder.price.toFixed(2)}</span></div><div className="flex justify-between"><span className="text-gray-500">Order Type</span><span className="font-semibold text-gray-900">{selectedOrder.type} / {selectedOrder.category}</span></div><div className="flex justify-between"><span className="text-gray-500">Timestamp</span><span className="font-semibold text-gray-900">{selectedOrder.timestamp}</span></div>{selectedOrder.reason && (<div className="flex justify-between items-start pt-2 border-t"><span className="text-gray-500">Failure Reason</span><span className="font-semibold text-red-600 text-right">{selectedOrder.reason}</span></div>)}<StatusTimeline order={selectedOrder} /></div>{selectedOrder.status === 'Pending' && (<div className="mt-8 grid grid-cols-2 gap-4 flex-shrink-0"><button onClick={() => setOrderToModify(selectedOrder)} className="py-2.5 px-4 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 flex items-center justify-center gap-2"><PencilIcon className="w-4 h-4"/>Modify</button><button onClick={() => setOrderToCancel(selectedOrder)} className="py-2.5 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 flex items-center justify-center gap-2"><TrashIcon className="w-4 h-4"/>Cancel</button></div>)}</div>
                )}
            </div>
        </>
    );
};