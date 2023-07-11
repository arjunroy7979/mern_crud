import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/') {
            setActiveTab("Home")
        } else if (location.pathname === '/add') {
            setActiveTab("AddUser")
        }
    }, [location])
    return (
        < >
            <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to={'#'} className="flex items-center font-medium text-xl"><h1>User Management System</h1></Link>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            <li>
                                <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page"><span className={`${activeTab === "Home" ? "active" : ""}`} onClick={() => setActiveTab('Home')}>Home</span></Link>
                            </li>
                            <li>
                                <Link to="/add" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><span className={`${activeTab === "AddUser" ? "active" : ""}`} onClick={() => setActiveTab('AddUser')}>Add User</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </ >
    )
}

export default Header
