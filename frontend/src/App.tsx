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
import { useEffect } from 'react';

export default function App() {

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode');
        if (isDarkMode?.includes('true')) {
            document.documentElement.classList.add('dark');
        }
    }, []);


    return (
        <div className="min-h-screen min-w-screen bg-slate-50 dark:bg-gray-700">
            <section>
                <Router>
                    <EntryProvider>
                        <NavBar></NavBar>
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
        </div>

    );
}
