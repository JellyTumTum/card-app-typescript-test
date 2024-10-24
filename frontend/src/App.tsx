import React from "react";
import NavBar from './components/NavBar'
import AllEntries from './routes/AllEntries'
import NewEntry from './routes/NewEntry'
import EditEntry from './routes/EditEntry'
import { EntryProvider } from './utilities/globalContext'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { useEffect, useState } from 'react';
import SettingsDialog from "./components/SettingsDialog";

export default function App() {

    const [showSettings, setShowSettings] = useState<boolean>(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode');
        if (isDarkMode?.includes('true')) {
            document.documentElement.classList.add('dark');
        }
    }, []);


    return (
        <div className={`min-h-screen min-w-screen bg-slate-50 dark:bg-gray-700`}>
            <section className={`${showSettings ? 'blur-sm': ''}`}>
                <Router>
                    <EntryProvider>
                        <NavBar showSettings={showSettings} setShowSettings={setShowSettings}></NavBar>
                        <Routes>
                            <Route path="/" element={<AllEntries />}>
                            </Route>
                            <Route path="create" element={<NewEntry />}>
                            </Route>
                            <Route path="edit/:id" element={<EditEntry />}>
                            </Route>
                        </Routes>
                    </EntryProvider>
                </Router>
            </section>
            {showSettings && 
            <>
            <SettingsDialog closeDialog={() => setShowSettings(false)} ></SettingsDialog>
            </>

            }
        </div>

    );
}
