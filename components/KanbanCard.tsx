
import React from 'react';
import type { Task } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';
import { UserIcon } from './icons/UserIcon';

interface KanbanCardProps {
    task: Task;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {

    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('taskId', task.id);
        e.currentTarget.style.opacity = '0.5';
    }

    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = '1';
    }
    
    return (
        <div
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
        >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{task.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span>{task.dueDate}</span>
                </div>
                <div className="flex items-center gap-1.5" title={`Assigned to ${task.assignee}`}>
                    <UserIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{task.assignee}</span>
                </div>
            </div>
        </div>
    );
};
