import { useState, useContext, ChangeEvent, MouseEvent } from 'react'
import { EntryContext } from '../utilities/globalContext'
import { Entry, EntryContextType } from '../@types/context'

export default function NewEntry() {
    // const [showSchedulingOption, setShowSchedulingOption] = useState(false);
    const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), scheduled_for: new Date() }
    const { saveEntry } = useContext(EntryContext) as EntryContextType
    const [newEntry, setNewEntry] = useState<Entry>(emptyEntry)
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name]: event.target.value
        })
    }
    const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
        saveEntry(newEntry)
        setNewEntry(emptyEntry)
    }

    // const toggleSchedulingOption = () => {
    //     setShowSchedulingOption(!showSchedulingOption)
    // }

    return (
        <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 dark:bg-gray-800 p-8 rounded-md">
            <input className="p-3 rounded-lg  dark:bg-gray-700 focus:outline-none focus:border-2
            dark:text-slate-200 text-gray-800" type="text" placeholder="Title" name="title" value={newEntry.title} onChange={handleInputChange} />
            <textarea className="p-3 rounded-lg dark:bg-gray-700 border-0 focus:outline-none focus:border-2
            dark:text-slate-200 text-gray-800" placeholder="Description" name="description" value={newEntry.description} onChange={handleInputChange} />
            {/* <div className="flex flex-row gap-4 items-center">
                <label>Set Scheduling Date</label>
                <input type="checkbox" className="rounded-lg w-4 h-4" checked={showSchedulingOption} onChange={toggleSchedulingOption}></input>
            </div> */}
            <label className="dark:text-slate-200 -mb-2">Scheduled For:</label>
            <input className="p-3 rounded-lg  dark:bg-gray-700 focus:outline-none focus:border-2
            dark:text-slate-200 text-gray-800" type="date" name="scheduled_for" value={(new Date(newEntry.scheduled_for)).toISOString().split('T')[0]} onChange={handleInputChange} />

            <label className="dark:text-slate-200 -mb-2" >Create Date:</label>
            <input className="p-3 rounded-lg dark:bg-gray-700 focus:outline-none focus:border-2
            dark:text-slate-200" type="date" name="created_at" value={(new Date(newEntry.created_at)).toISOString().split('T')[0]} onChange={handleInputChange} />
            <button onClick={(e) => { handleSend(e) }} className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md">Create</button>
        </section>
    )
}