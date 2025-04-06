"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Search } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import Avatar from "../ui/Avatar"

const Header = ({ title }) => {
    const { currentUser, userType } = useAuth()
    const [showNotifications, setShowNotifications] = useState(false)
    const [showProfile, setShowProfile] = useState(false)

    // Mock notifications
    const notifications = [
        { id: 1, message: "New application received for Frontend Developer", time: "5 min ago", read: false },
        { id: 2, message: "Interview scheduled with John Doe", time: "1 hour ago", read: false },
        { id: 3, message: "Resume analysis complete for 5 candidates", time: "3 hours ago", read: true },
    ]

    return (
        <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                <p className="text-sm text-gray-500">{userType === "recruiter" ? "Recruiter Portal" : "Candidate Portal"}</p>
            </div>

            <div className="flex items-center space-x-4 text-black">
                {/* Search */}
                <div className="relative hidden md:block text-black">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-full border border-black focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 w-64"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button
                        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell size={20} />
                        {notifications.some((n) => !n.read) && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                    </button>

                    {showNotifications && (
                        <motion.div
                            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="p-3 border-b border-gray-200">
                                <h3 className="font-medium">Notifications</h3>
                            </div>

                            <div className="max-h-80 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                                                !notification.read ? "bg-purple-50" : ""
                                            }`}
                                        >
                                            <p className="text-sm text-gray-800">{notification.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-3 text-center text-gray-500">No notifications</div>
                                )}
                            </div>

                            <div className="p-2 border-t border-gray-200 text-center">
                                <button className="text-sm text-purple-600 hover:text-purple-800 transition-colors">
                                    Mark all as read
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* User Profile */}
                <div className="relative">
                    <button className="flex items-center space-x-2" onClick={() => setShowProfile(!showProfile)}>
                        <Avatar src={currentUser?.photoURL} alt={currentUser?.displayName || "User"} size="sm" />
                        <span className="hidden md:block text-sm font-medium">{currentUser?.displayName || "User"}</span>
                    </button>

                    {showProfile && (
                        <motion.div
                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="p-3 border-b border-gray-200">
                                <p className="font-medium">{currentUser?.displayName || "User"}</p>
                                <p className="text-xs text-gray-500">{currentUser?.email || "user@example.com"}</p>
                            </div>

                            <div>
                                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors text-sm">
                                    Profile Settings
                                </button>
                                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors text-sm">
                                    Help & Support
                                </button>
                                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors text-sm border-t border-gray-100 text-red-500">
                                    Logout
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header

