"use client"

import { motion } from "framer-motion"

const Card = ({ children, className = "", onClick = null, hover = false, delay = 0 }) => {
    return (
        <motion.div
            className={`bg-white rounded-xl shadow-md overflow-hidden ${hover ? "cursor-pointer hover:shadow-lg transition-shadow duration-300" : ""} ${className}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={hover ? { y: -5 } : {}}
        >
            {children}
        </motion.div>
    )
}

export default Card

