"use client"

import { motion } from "framer-motion"

const ProgressBar = ({
                         value = 0,
                         max = 100,
                         label = null,
                         showValue = true,
                         size = "md",
                         color = "primary",
                         className = "",
                     }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    const sizes = {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
    }

    const colors = {
        primary: "bg-gradient-to-r from-purple-500 to-indigo-600",
        secondary: "bg-gradient-to-r from-gray-500 to-gray-600",
        success: "bg-gradient-to-r from-green-500 to-emerald-600",
        danger: "bg-gradient-to-r from-red-500 to-pink-600",
        warning: "bg-gradient-to-r from-yellow-400 to-amber-500",
    }

    return (
        <div className={`w-full ${className}`}>
            {(label || showValue) && (
                <div className="flex justify-between mb-1">
                    {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
                    {showValue && (
                        <span className="text-sm font-medium text-gray-700">
              {value}/{max}
            </span>
                    )}
                </div>
            )}

            <div className={`w-full bg-gray-200 rounded-full ${sizes[size]}`}>
                <motion.div
                    className={`${sizes[size]} rounded-full ${colors[color]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                ></motion.div>
            </div>
        </div>
    )
}

export default ProgressBar

