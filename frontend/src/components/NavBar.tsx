import { NavLink } from 'react-router-dom'

export default function NavBar() {

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        const isDarkMode: boolean = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDarkMode.toString());
    };

    return (
        <div className="">
            <nav className="flex justify-center gap-5">
                <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/'}>All Entries</NavLink>
                <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/create'}>New Entry</NavLink>
            </nav>
            <div className="absolute top-2 right-8 rounded-md w-fit h-12 justify-center items-center gap-4 px-4 flex flex-row">
                <div>
                    <p className="text-md font-bold">Dark Mode: </p>
                </div>
                {/* Credit for following switch goes to a previous project of minem which has been slightly adjusted for this use case. (https://github.com/JellyTumTum/SAM) */}
                <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                    <input id="darkModeSwitch" type="checkbox"
                        className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-white dark:bg-gray-900"
                        defaultChecked={document.documentElement.classList.contains('dark')}
                        onChange={toggleDarkMode} />
                    <label htmlFor="darkModeSwitch"
                        className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-background dark:border-darkBackground bg-yellow-500 dark:bg-cyan-700 shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-cyan-700 before:dark:bg-yellow-500  before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:gray-700 peer-checked:before:white">
                        <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                            data-ripple-dark="true">

                        </div>

                    </label>
                </div>
            </div>
        </div>
    )
}