
import React, { useState, useMemo } from 'react';
import type { Task } from '../../../types';
import { TaskStatus } from '../../../types';
import { ClipboardDocumentCheckIcon } from '../../../components/icons/ClipboardDocumentCheckIcon';
import { PlusIcon } from '../../../components/icons/PlusIcon';
import { CreateTaskModal } from '../../../components/CreateTaskModal';

type TaskFilter = 'Today' | 'Next 7 Days' | 'All';

const statusStyles: Record<TaskStatus, { bg: string, text: string, dot: string }> = {
    [TaskStatus.PLANNED]: { bg: 'bg-yellow-100 dark:bg-yellow-900/50', text: 'text-yellow-800 dark:text-yellow-300', dot: 'bg-yellow-500' },
    [TaskStatus.IN_PROGRESS]: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-800 dark:text-blue-300', dot: 'bg-blue-500' },
    [TaskStatus.COMPLETED]: { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-800 dark:text-green-300', dot: 'bg-green-500' },
};

interface TasksPageProps {
    tasks: Task[];
    onAddTask: (taskData: Omit<Task, 'id' | 'status'>) => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({ tasks, onAddTask }) => {
    const [activeFilter, setActiveFilter] = useState<TaskFilter>('Today');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddTask = (taskData: Omit<Task, 'id' | 'status'>) => {
        onAddTask(taskData);
        setIsModalOpen(false);
    };

    const filteredTasks = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayStr = today.toISOString().split('T')[0];

        switch (activeFilter) {
            case 'Today':
                return tasks.filter(task => {
                    const taskDate = new Date(task.dueDate);
                    taskDate.setHours(0, 0, 0, 0);
                    return taskDate.toISOString().split('T')[0] === todayStr;
                });
            case 'Next 7 Days':
                 const sevenDaysFromNow = new Date(today);
                 sevenDaysFromNow.setDate(today.getDate() + 7);
                 return tasks.filter(task => {
                    const taskDate = new Date(task.dueDate);
                    return taskDate >= today && taskDate <= sevenDaysFromNow;
                });
            case 'All':
            default:
                return tasks;
        }
    }, [tasks, activeFilter]);

    const FilterButton: React.FC<{ label: TaskFilter }> = ({ label }) => (
        <button
            onClick={() => setActiveFilter(label)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeFilter === label ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
        >
            {label}
        </button>
    );

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <ClipboardDocumentCheckIcon className="w-8 h-8 text-indigo-500" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
                            <p className="text-gray-500 dark:text-gray-400">Manage and track all your team's tasks.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                        <PlusIcon className="w-5 h-5" />
                        New Task
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                        <FilterButton label="Today" />
                        <FilterButton label="Next 7 Days" />
                        <FilterButton label="All" />
                    </div>
                    
                    <div className="space-y-3">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map(task => (
                                <div key={task.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2.5 h-2.5 rounded-full ${statusStyles[task.status].dot} flex-shrink-0`}></div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">{task.title}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{task.dueDate} • {task.assignee}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[task.status].bg} ${statusStyles[task.status].text}`}>
                                        {task.status.replace('_', ' ')}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <p className="font-semibold text-gray-700 dark:text-gray-300">No tasks found.</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">There are no tasks for the selected filter.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isModalOpen && <CreateTaskModal onClose={() => setIsModalOpen(false)} onAddTask={handleAddTask} />}
        </>
    );
};