import React, { useState } from 'react';
import type { Order } from '../types';

interface ModifyOrderModalProps {
    order: Order;
    onClose: () => void;
    onConfirm: (orderId: string, newQuantity: number, newPrice: number) => void;
}

export const ModifyOrderModal: React.FC<ModifyOrderModalProps> = ({ order, onClose, onConfirm }) => {
    const [quantity, setQuantity] = useState(order.quantity);
    const [price, setPrice] = useState(order.price);

    const handleSubmit = () => {
        onConfirm(order.id, quantity, price);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Modify Order ({order.symbol})</h2>
                <div className="space-y-4">
                     <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    {order.type !== 'Market' && (
                        <div>
                             <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                Price (₹)
                            </label>
                            <input
                                id="price"
                                type="number"
                                step="0.05"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    )}
                     <div className="text-sm text-gray-500 pt-2">
                        <div className="flex justify-between">
                            <span>Estimated Value:</span>
                            <span className="font-semibold text-gray-800">₹{(quantity * price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-6 mt-4 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        className="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700"
                    >
                        Confirm Changes
                    </button>
                </div>
            </div>
        </div>
    );
};
