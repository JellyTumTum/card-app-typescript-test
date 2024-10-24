import { NavLink } from 'react-router-dom'

interface NavBarProps {
    showSettings: boolean;
    setShowSettings: (show: boolean) => void; 
}

export default function NavBar({ showSettings, setShowSettings }: NavBarProps) {

    const openSettings = () => setShowSettings((true));

    return (
        <div className="">
            <nav className="flex justify-center gap-5">
                <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/'}>All Entries</NavLink>
                <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/create'}>New Entry</NavLink>
            </nav>
            <div className="absolute top-2 right-8 rounded-md w-fit h-12 justify-center items-center gap-4 px-4 flex flex-row">
                {/* Credit for following switch goes to a previous project of mine which has been slightly adjusted for this use case. (https://github.com/JellyTumTum/SAM) */}
                <div className="relative inline-block rounded-full cursor-pointer p-0.5 hover:bg-gray-300 dark:hover:bg-gray-800">
                    <button onClick={openSettings} className="text-3xl cursor-pointer">
                        ⚙️ {/* Replace this with an SVG or react-icons setting icon */}
                    </button>
                </div>
            </div>
        </div>
    )
}