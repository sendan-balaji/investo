
import React from 'react';
import type { Task } from '../../types';
import { TaskStatus } from '../../types';
import { CalendarIcon } from '../icons/CalendarIcon';
import { UsersIcon } from '../icons/UsersIcon';

interface CRMTasksWidgetProps {
    tasks: Task[];
}

const statusColors: Record<TaskStatus, string> = {
    [TaskStatus.PLANNED]: 'border-yellow-500',
    [TaskStatus.IN_PROGRESS]: 'border-blue-500',
    [TaskStatus.COMPLETED]: 'border-green-500',
};


export const CRMTasksWidget: React.FC<CRMTasksWidgetProps> = ({ tasks }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <UsersIcon className="w-6 h-6 text-indigo-500" />
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">CRM Tasks</h2>
                </div>
                <a href="#" className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400">View All</a>
            </div>
            <div className="space-y-3">
                {tasks.map((task) => (
                    <div key={task.id} className={`p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 ${statusColors[task.status]}`}>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{task.title}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <div className="flex items-center gap-1">
                                <CalendarIcon className="w-3 h-3"/>
                                <span>{task.dueDate}</span>
                            </div>
                            <span>{task.assignee}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
