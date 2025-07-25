"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../../context/AuthContext"
import {
    Home,
    Briefcase,
    FileText,
    Calendar,
    User,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
    ChevronLeft,
} from "lucide-react"

const Sidebar = () => {
    const { userType, logout } = useAuth()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(true)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [expandedMenus, setExpandedMenus] = useState({})

    const basePath = userType === "recruiter" ? "/recruiter" : "/user"

    const toggleMenu = (menuKey) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [menuKey]: !prev[menuKey],
        }))
    }

    const recruiterMenuItems = [
        {
            title: "Dashboard",
            icon: <Home size={20} />,
            path: `${basePath}/dashboard`,
        },
        {
            title: "Jobs",
            icon: <Briefcase size={20} />,
            path: `${basePath}/jobs`,
        },
        {
            title: "Applications",
            icon: <FileText size={20} />,
            path: `${basePath}/applications`,
        },
        {
            title: "Interviews",
            icon: <Calendar size={20} />,
            path: `${basePath}/interviews`,
        },
        {
            title: "Settings",
            icon: <Settings size={20} />,
            path: `${basePath}/settings`,
        },
        {
            title: "Logout",
            icon: <LogOut size={20} />,
            path:`/`
        },
    ]

    const userMenuItems = [
        {
            title: "Dashboard",
            icon: <Home size={20} />,
            path: `${basePath}/dashboard`,
        },
        {
            title: "Browse Jobs",
            icon: <Briefcase size={20} />,
            path: `${basePath}/jobs`,
        },
        {
            title: "My Applications",
            icon: <FileText size={20} />,
            path: `${basePath}/applications`,
        },
        {
            title: "Interviews",
            icon: <Calendar size={20} />,
            path: `${basePath}/interviews`,
        },
        {
            title: "Profile",
            icon: <User size={20} />,
            path: `${basePath}/profile`,
        },
        {
            title: "Logout",
            icon: <LogOut size={20} />,
            path:`/`
        },
    ]

    const menuItems = userType === "recruiter" ? recruiterMenuItems : userMenuItems

    const sidebarVariants = {
        open: { width: "240px", transition: { duration: 0.3 } },
        closed: { width: "80px", transition: { duration: 0.3 } },
    }

    const mobileSidebarVariants = {
        open: { x: 0, transition: { duration: 0.3 } },
        closed: { x: "-100%", transition: { duration: 0.3 } },
    }

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md md:hidden"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                        />

                        <motion.div
                            className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl md:hidden"
                            variants={mobileSidebarVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-bold text-purple-700">AI Recruiter</h2>
                                <p className="text-sm text-gray-500">{userType === "recruiter" ? "HR Portal" : "Candidate Portal"}</p>
                            </div>

                            <nav className="p-4">
                                <ul className="space-y-2">
                                    {menuItems.map((item) => (
                                        <li key={item.path}>
                                            <Link
                                                to={item.path}
                                                className={`flex items-center p-2 rounded-md transition-colors ${
                                                    location.pathname === item.path
                                                        ? "bg-purple-100 text-purple-700"
                                                        : "text-gray-700 hover:bg-purple-50"
                                                }`}
                                                onClick={() => setIsMobileOpen(false)}
                                            >
                                                <span className="mr-3">{item.icon}</span>
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <motion.div
                className="hidden md:block fixed top-0 left-0 h-full bg-white shadow-lg z-30"
                variants={sidebarVariants}
                initial="open"
                animate={isOpen ? "open" : "closed"}
            >
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b flex items-center justify-between">
                        {isOpen ? (
                            <>
                                <div>
                                    <h2 className="text-xl font-bold text-purple-700">AI Recruiter</h2>
                                    <p className="text-sm text-gray-500">{userType === "recruiter" ? "HR Portal" : "Candidate Portal"}</p>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <ChevronLeft size={20} />
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsOpen(true)} className="mx-auto text-gray-500 hover:text-gray-700">
                                <ChevronRight size={20} />
                            </button>
                        )}
                    </div>

                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center p-2 rounded-md transition-colors ${
                                            location.pathname === item.path
                                                ? "bg-purple-100 text-purple-700"
                                                : "text-gray-700 hover:bg-purple-50"
                                        }`}
                                    >
                                        <span className={isOpen ? "mr-3" : "mx-auto"}>{item.icon}</span>
                                        {isOpen && <span>{item.title}</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </motion.div>
        </>
    )
}

export default Sidebar

