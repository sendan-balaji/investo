
import React from 'react';

interface ToggleSwitchProps {
    id: string;
    isOn: boolean;
    onToggle: () => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, isOn, onToggle }) => {
    return (
        <button
            id={id}
            onClick={onToggle}
            role="switch"
            aria-checked={isOn}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                isOn ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'
            }`}
        >
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isOn ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
        </button>
    );
};
