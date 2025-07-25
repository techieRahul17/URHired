"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Home } from "lucide-react"
import Button from "../components/ui/Button"

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
            <motion.div
                className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden text-center p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h1 className="text-9xl font-bold text-purple-600">404</h1>
                </motion.div>

                <motion.h2
                    className="text-2xl font-bold text-gray-800 mt-4 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    className="text-gray-600 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    The page you are looking for doesn't exist or has been moved.
                </motion.p>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <Link to="/">
                        <Button variant="primary" icon={<Home size={18} />}>
                            Back to Home
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default NotFound

