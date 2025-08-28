"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const Input = ({
                   label,
                   type = "text",
                   name,
                   value,
                   onChange,
                   placeholder = "",
                   error = "",
                   required = false,
                   className = "",
                   icon = null,
               }) => {
    const [focused, setFocused] = useState(false)

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        {icon}
                    </div>
                )}

                <motion.input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`
            w-full px-4 py-2 rounded-md border ${error ? "border-red-500" : focused ? "border-purple-500" : "border-gray-300"}
            focus:outline-none focus:ring-2 ${error ? "focus:ring-red-200" : "focus:ring-purple-200"}
            transition-all duration-200
            ${icon ? "pl-10" : ""}
            text-gray-900 placeholder-gray-400 bg-white
            dark:text-white dark:placeholder-gray-500 dark:bg-gray-900
          `}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    animate={focused ? { scale: 1.01 } : { scale: 1 }}
                />
            </div>

            {error && (
                <motion.p
                    className="mt-1 text-sm text-red-500"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {error}
                </motion.p>
            )}
        </div>
    )
}

export default Input

