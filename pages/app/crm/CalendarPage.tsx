
import React, { useState, useMemo } from 'react';
import { ChevronLeftIcon } from '../../../components/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '../../../components/icons/ChevronRightIcon';
import { GoogleIcon } from '../../../components/icons/GoogleIcon';
import type { Task } from '../../../types';
import { TaskStatus } from '../../../types';
import { CalendarDayModal } from '../../../components/crm/CalendarDayModal';
import { CreateTaskModal } from '../../../components/CreateTaskModal';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const taskColors: Record<TaskStatus, string> = {
    [TaskStatus.PLANNED]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    [TaskStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    [TaskStatus.COMPLETED]: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
};

interface CalendarPageProps {
    tasks: Task[];
    onAddTask: (taskData: Omit<Task, 'id' | 'status'>) => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ tasks, onAddTask }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const changeMonth = (delta: number) => {
        setCurrentDate(new Date(currentYear, currentMonth + delta, 1));
    };

    const changeYear = (year: number) => {
        setCurrentDate(new Date(year, currentMonth, 1));
    };
    
    const handleAddTask = (taskData: Omit<Task, 'id' | 'status'>) => {
        onAddTask(taskData);
        setCreateTaskModalOpen(false);
        setSelectedDate(null);
    };

    const tasksByDate = useMemo(() => {
        return tasks.reduce<Record<string, Task[]>>((acc, task) => {
            const date = task.dueDate;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(task);
            return acc;
        }, {});
    }, [tasks]);

    const getCalendarGrid = () => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        const grid: ({ day: number | null, date: Date | null, tasks: Task[] })[] = [];
        
        for (let i = 0; i < firstDayOfMonth; i++) {
            grid.push({ day: null, date: null, tasks: [] });
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            const cellDate = new Date(currentYear, currentMonth, i);
            const dateStr = cellDate.toISOString().split('T')[0];
            grid.push({ day: i, date: cellDate, tasks: tasksByDate[dateStr] || [] });
        }
        
        return grid;
    };

    const calendarGrid = getCalendarGrid();
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === currentYear && today.getMonth() === currentMonth;

    return (
        <>
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                            <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">{MONTH_NAMES[currentMonth]}</span>
                            <select 
                                value={currentYear} 
                                onChange={(e) => changeYear(Number(e.target.value))}
                                className="text-xl font-bold text-gray-900 dark:text-white bg-transparent border-0 focus:ring-0 p-1"
                            >
                                {Array.from({ length: 11 }, (_, i) => 2020 + i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                        <GoogleIcon className="w-5 h-5" />
                        <span>Sync with Google Calendar</span>
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center flex-shrink-0">
                    {DAYS_OF_WEEK.map(day => (
                        <div key={day} className="text-xs font-semibold text-gray-500 dark:text-gray-400 py-2">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 grid-rows-5 gap-1 flex-grow">
                    {calendarGrid.map((cell, index) => (
                        <div 
                            key={index} 
                            onClick={() => cell.date && setSelectedDate(cell.date)}
                            className={`relative bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-lg p-1 flex flex-col ${cell.date ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''}`}
                        >
                            {cell.day && (
                                <>
                                    <span className={`absolute top-1.5 right-2 text-xs font-semibold 
                                        ${isCurrentMonth && cell.day === today.getDate() 
                                            ? 'bg-indigo-600 text-white rounded-full flex items-center justify-center w-5 h-5' 
                                            : 'text-gray-500 dark:text-gray-400'
                                        }`
                                    }>
                                        {cell.day}
                                    </span>
                                    <div className="mt-6 space-y-1 overflow-y-auto pr-1">
                                        {cell.tasks.map(task => (
                                            <div key={task.id} title={task.title} className={`px-1.5 py-0.5 text-[10px] rounded-md truncate ${taskColors[task.status]}`}>
                                                {task.title}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {selectedDate && (
                <CalendarDayModal 
                    date={selectedDate}
                    tasks={tasksByDate[selectedDate.toISOString().split('T')[0]] || []}
                    onClose={() => setSelectedDate(null)}
                    onAddTask={() => setCreateTaskModalOpen(true)}
                />
            )}
            {isCreateTaskModalOpen && selectedDate && (
                 <CreateTaskModal 
                    defaultDate={selectedDate.toISOString().split('T')[0]}
                    onClose={() => { setCreateTaskModalOpen(false); setSelectedDate(null); }} 
                    onAddTask={handleAddTask}
                />
            )}
        </>
    );
};