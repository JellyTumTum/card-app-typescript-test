import React from 'react';
import { useRef, useEffect } from 'react';

interface SettingsDialogProps {
    closeDialog: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ closeDialog }) => {

    const divRef = useRef<HTMLDivElement>(null);

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        const isDarkMode: boolean = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDarkMode.toString());
    };

    return (
        <div>
            <div className="bg-gray-300 dark:bg-gray-800 p-8 rounded-full shadow-md w-96 z-50">
                <div ref={divRef} className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold dark:text-slate-300">Settings</h2>
                    <button onClick={closeDialog} className="text-gray-500 hover:text-black dark:hover:text-white">✕</button>
                </div>

                <div className="flex items-center gap-4 ">
                    <p className="dark:text-slate-300">Dark Mode:</p>
                    {/* This toggle switch was taken straight out of one of my previous projects that also had a darkMode Toggle. credit : https://github.com/JellyTumTum/SAM */}
                    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                        <input
                            id="darkModeSwitch"
                            type="checkbox"
                            className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-gray-300 dark:bg-gray-700"
                            defaultChecked={document.documentElement.classList.contains('dark')}
                            onChange={toggleDarkMode}
                        />
                        <label htmlFor="darkModeSwitch"
                            className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-gray-500 dark:border-gray-600 bg-yellow-500 dark:bg-cyan-700 shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-cyan-700 before:dark:bg-yellow-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:dark:bg-gray-600 peer-checked:before:bg-white">
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsDialog;
