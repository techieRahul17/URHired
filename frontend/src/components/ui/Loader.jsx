"use client"

import { motion } from "framer-motion"

const Loader = ({ size = "md", color = "primary", className = "" }) => {
    const sizes = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
    }

    const colors = {
        primary: "border-purple-600",
        secondary: "border-gray-600",
        white: "border-white",
    }

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <motion.div
                className={`${sizes[size]} border-4 border-t-transparent rounded-full ${colors[color]}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            ></motion.div>
        </div>
    )
}

export default Loader

