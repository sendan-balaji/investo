
import React from 'react';
import type { Task, Column, TaskStatus } from '../types';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
    column: Column;
    tasks: Task[];
    onDrop: (e: React.DragEvent<HTMLDivElement>, status: TaskStatus) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
}

const statusColors: Record<TaskStatus, string> = {
    PLANNED: 'bg-yellow-500',
    IN_PROGRESS: 'bg-blue-500',
    COMPLETED: 'bg-green-500',
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks, onDrop, onDragOver, onDragLeave }) => {
    return (
        <div
            className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 transition-colors duration-300"
            onDrop={(e) => onDrop(e, column.id)}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${statusColors[column.id]}`}></div>
                    <h2 className="font-bold text-gray-800 dark:text-white">{column.title}</h2>
                </div>
                <span className="text-sm font-medium bg-gray-200 text-gray-600 rounded-full px-2.5 py-0.5 dark:bg-gray-700 dark:text-gray-300">
                    {tasks.length}
                </span>
            </div>
            <div className="space-y-4 min-h-[200px]">
                {tasks.map(task => (
                    <KanbanCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};
