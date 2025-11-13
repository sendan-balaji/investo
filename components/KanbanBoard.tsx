
import React from 'react';
import type { Task, TaskStatus, Column } from '../types';
import { KanbanColumn } from './KanbanColumn';
import { TaskStatus as TaskStatusEnum } from '../types';

interface KanbanBoardProps {
    tasks: Task[];
    onDragEnd: (taskId: string, newStatus: TaskStatus) => void;
}

const columns: Column[] = [
    { id: TaskStatusEnum.PLANNED, title: 'Planned' },
    { id: TaskStatusEnum.IN_PROGRESS, title: 'In-progress' },
    { id: TaskStatusEnum.COMPLETED, title: 'Completed' },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onDragEnd }) => {

    const onDrop = (e: React.DragEvent<HTMLDivElement>, status: TaskStatus) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        if(taskId) {
            onDragEnd(taskId, status);
        }
        e.currentTarget.classList.remove('bg-indigo-100', 'dark:bg-indigo-900/50');
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('bg-indigo-100', 'dark:bg-indigo-900/50');
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('bg-indigo-100', 'dark:bg-indigo-900/50');
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {columns.map(column => (
                <KanbanColumn
                    key={column.id}
                    column={column}
                    tasks={tasks.filter(task => task.status === column.id)}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                />
            ))}
        </div>
    );
};
