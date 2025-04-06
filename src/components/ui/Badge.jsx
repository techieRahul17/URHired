"use client"

import { motion } from "framer-motion"

const Badge = ({ children, variant = "primary", size = "md", className = "" }) => {
    const variants = {
        primary: "bg-purple-100 text-purple-800",
        secondary: "bg-gray-100 text-gray-800",
        success: "bg-green-100 text-green-800",
        danger: "bg-red-100 text-red-800",
        warning: "bg-yellow-100 text-yellow-800",
        info: "bg-blue-100 text-blue-800",
    }

    const sizes = {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-0.5",
        lg: "text-base px-3 py-1",
    }

    return (
        <motion.span
            className={`inline-flex bg-black items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.span>
    )
}

export default Badge

