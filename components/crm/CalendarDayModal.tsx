
import React from 'react';
import type { Task } from '../../types';
import { TaskStatus } from '../../types';
import { XMarkIcon } from '../icons/XMarkIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { PencilIcon } from '../icons/PencilIcon';

interface CalendarDayModalProps {
    date: Date;
    tasks: Task[];
    onClose: () => void;
    onAddTask: () => void;
}

const statusStyles: Record<TaskStatus, { dot: string }> = {
    [TaskStatus.PLANNED]: { dot: 'bg-yellow-500' },
    [TaskStatus.IN_PROGRESS]: { dot: 'bg-blue-500' },
    [TaskStatus.COMPLETED]: { dot: 'bg-green-500' },
};

export const CalendarDayModal: React.FC<CalendarDayModalProps> = ({ date, tasks, onClose, onAddTask }) => {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md m-4"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
                
                <div className="space-y-3 min-h-[100px] max-h-64 overflow-y-auto">
                    {tasks.length > 0 ? tasks.map(task => (
                        <div key={task.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${statusStyles[task.status].dot} flex-shrink-0`}></div>
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{task.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Assignee: {task.assignee}</p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center pt-8">No tasks scheduled for this day.</p>
                    )}
                </div>

                <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-200 dark:border-gray-700">
                     <button
                        onClick={onAddTask}
                        className="flex items-center gap-2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add Task
                    </button>
                     <button
                        className="flex items-center gap-2 py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                        <PencilIcon className="w-5 h-5" />
                        Add Note
                    </button>
                </div>
            </div>
        </div>
    );
};
