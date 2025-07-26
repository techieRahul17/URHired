"use client"

import { motion } from "framer-motion"

const Button = ({
                    children,
                    onClick,
                    variant = "primary",
                    size = "md",
                    fullWidth = false,
                    disabled = false,
                    type = "button",
                    className = "",
                    icon = null,
                }) => {
    const baseClasses = "rounded-md font-medium transition-all duration-200 flex items-center justify-center"

    const variants = {
        primary:
            "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl",
        secondary: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
        success: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600",
        danger: "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600",
        outline: "bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-50",
        ghost: "bg-transparent text-purple-600 hover:bg-purple-50",
    }

    const sizes = {
        sm: "py-1 px-3 text-sm",
        md: "py-2 px-4 text-base",
        lg: "py-3 px-6 text-lg",
    }

    const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `

    return (
        <motion.button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </motion.button>
    )
}

export default Button

