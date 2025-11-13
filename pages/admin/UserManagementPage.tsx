import React from 'react';

export const UserManagementPage: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <h2 className="text-xl font-bold text-gray-800">User Management</h2>
            <p className="mt-2 text-gray-500">A table of all users with actions to suspend, upgrade, or delete accounts will be implemented here.</p>
        </div>
    );
};
