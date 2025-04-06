"use client"

import { motion } from "framer-motion"
import Sidebar from "./Sidebar"
import Header from "./Header"

const PageLayout = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />

            <div className="md:ml-64 min-h-screen">
                <Header title={title} />

                <motion.main className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    {children}
                </motion.main>
            </div>
        </div>
    )
}

export default PageLayout

