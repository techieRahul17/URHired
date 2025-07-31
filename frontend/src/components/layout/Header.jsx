"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Search, User, Settings, LogOut, X, Briefcase, Users, Star } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import Avatar from "../ui/Avatar"
import { useNavigate } from "react-router-dom"

const Header = ({ title }) => {
    const { currentUser, userType, logout } = useAuth()
    const [showNotifications, setShowNotifications] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [notifications, setNotifications] = useState([
        { 
            id: 1, 
            title: "New Application Received",
            message: "New application received for Frontend Developer", 
            time: "5 min ago", 
            read: false,
            type: "application"
        },
        { 
            id: 2, 
            title: "Interview Scheduled",
            message: "Interview scheduled with John Doe", 
            time: "1 hour ago", 
            read: false,
            type: "interview"
        },
        { 
            id: 3, 
            title: "Resume Analysis Complete",
            message: "Resume analysis complete for 5 candidates", 
            time: "3 hours ago", 
            read: true,
            type: "analysis"
        }
    ])

    const navigate = useNavigate()
    const notificationRef = useRef(null)
    const profileRef = useRef(null)

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false)
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = async () => {
        await logout()
        navigate("/")
    }

    const handleProfileNavigation = () => {
        navigate("/user/profile")
        setShowProfile(false)
    }

    const markAsRead = (id) => {
        setNotifications(prev => 
            prev.map(notif => 
                notif.id === id ? { ...notif, read: true } : notif
            )
        )
    }

    const markAllAsRead = () => {
        setNotifications(prev => 
            prev.map(notif => ({ ...notif, read: true }))
        )
    }

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id))
    }

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'application': return '📄'
            case 'interview': return '🗓️'
            case 'analysis': return '🔍'
            default: return '📩'
        }
    }

    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                <p className="text-sm text-gray-500">
                    {userType === "recruiter" ? "Recruiter Portal" : "Candidate Portal"}
                </p>
            </div>

            <div className="flex items-center space-x-4 text-black">
                {/* Enhanced Search */}
                <div className="relative hidden md:block text-black">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 w-64"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Enhanced Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button
                        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell size={20} className="text-gray-700" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                                    <h3 className="font-medium text-gray-800">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-sm text-purple-600 hover:text-purple-800 transition-colors font-medium"
                                        >
                                            Mark all as read
                                        </button>
                                    )}
                                </div>

                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group ${
                                                    !notification.read ? "bg-purple-50" : ""
                                                }`}
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span className="text-lg flex-shrink-0">
                                                        {getNotificationIcon(notification.type)}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-gray-800 font-medium">
                                                            {notification.title}
                                                        </p>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            deleteNotification(notification.id)
                                                        }}
                                                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-3 text-center text-gray-500">No notifications</div>
                                    )}
                                </div>

                                {notifications.length > 0 && (
                                    <div className="p-2 border-t border-gray-200 text-center">
                                        <button className="text-sm text-purple-600 hover:text-purple-800 transition-colors">
                                            View all notifications
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Enhanced User Profile */}
                <div className="relative" ref={profileRef}>
                    <button 
                        className="flex items-center cursor-pointer space-x-2 text-gray-700 hover:text-gray-900 transition-colors" 
                        onClick={() => setShowProfile(!showProfile)}
                    >
                        <Avatar 
                            src={currentUser?.photoURL} 
                            alt={currentUser?.displayName || "User"} 
                            size="sm" 
                        />
                        <span className="hidden md:block text-sm font-medium">
                            {currentUser?.displayName || "User"}
                        </span>
                    </button>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="p-3 border-b border-gray-200">
                                    <p className="font-medium text-gray-800">
                                        {currentUser?.displayName || "User"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {currentUser?.email || "user@example.com"}
                                    </p>
                                </div>

                                <div>
                                    <button 
                                        onClick={handleProfileNavigation}
                                        className="w-full text-left cursor-pointer px-3 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700 flex items-center space-x-2"
                                    >
                                        <User size={16} className="text-gray-500" />
                                        <span>Profile Settings</span>
                                    </button>
                                    <button className="w-full text-left cursor-pointer px-3 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700 flex items-center space-x-2">
                                        <Star size={16} className="text-gray-500" />
                                        <span>Help & Support</span>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full cursor-pointer text-left px-3 py-2 hover:bg-gray-50 transition-colors text-sm border-t border-gray-100 text-red-500 flex items-center space-x-2"
                                    >
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    )
}

export default Header