"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userType, setUserType] = useState(null) // 'recruiter' or 'user'

    useEffect(() => {
        // Check if user is logged in from localStorage
        const storedUser = localStorage.getItem("user")
        const storedUserType = localStorage.getItem("userType")

        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser))
            setUserType(storedUserType)
        }

        setLoading(false)
    }, [])

    const login = (user, type) => {
        setCurrentUser(user)
        setUserType(type)
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("userType", type)
    }

    const logout = () => {
        setCurrentUser(null)
        setUserType(null)
        localStorage.removeItem("user")
        localStorage.removeItem("userType")
    }

    const value = {
        currentUser,
        userType,
        login,
        logout,
        loading,
    }

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

