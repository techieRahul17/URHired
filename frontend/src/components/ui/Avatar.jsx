"use client"

import { useState } from "react"

const Avatar = ({ src, alt = "Avatar", size = "md", status = null, className = "" }) => {
    const [error, setError] = useState(false)

    const sizes = {
        xs: "w-6 h-6",
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
        "2xl": "w-20 h-20",
    }

    const statusColors = {
        online: "bg-green-500",
        offline: "bg-gray-400",
        busy: "bg-red-500",
        away: "bg-yellow-500",
    }

    const getInitials = (name) => {
        if (!name) return "?"
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
    }

    return (
        <div className={`relative inline-block ${className}`}>
            {error || !src ? (
                <div
                    className={`${sizes[size]} flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium`}
                >
                    {getInitials(alt)}
                </div>
            ) : (
                <img
                    src={src || "/placeholder.svg"}
                    alt={alt}
                    className={`${sizes[size]} rounded-full object-cover`}
                    onError={() => setError(true)}
                />
            )}

            {status && (
                <span
                    className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${statusColors[status]}`}
                ></span>
            )}
        </div>
    )
}

export default Avatar

