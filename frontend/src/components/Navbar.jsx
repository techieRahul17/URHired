import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
                }`}
            >
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" onClick={closeMenu} className="flex items-center space-x-2">
                            <motion.div
                                whileHover={{ rotate: 10 }}
                                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center"
                            >
                                <span className="text-white font-bold text-xl">Hi</span>
                            </motion.div>
                            <span className={`font-bold text-xl ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                                U R Hired
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <NavLink scrolled={scrolled} href="#features">Features</NavLink>
                            <NavLink scrolled={scrolled} href="#process">Process</NavLink>
                            <NavLink scrolled={scrolled} href="#team">Team</NavLink>
                            <Link to="/login">
                                <motion.button
                                    whileHover={{
                                        scale: 1.07,
                                        boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-md hover:brightness-110 hover:tracking-wide duration-300 ease-in-out"
                                >
                                    Login
                                </motion.button>
                            </Link>
                        </div>

                        {/* Hamburger */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`text-3xl focus:outline-none ${scrolled ? 'text-gray-800' : 'text-white'}`}
                            >
                                ☰
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-8 text-white md:hidden">
                    <a href="#features" onClick={closeMenu} className="text-xl font-semibold hover:text-pink-400 transition">
                        Features
                    </a>
                    <a href="#process" onClick={closeMenu} className="text-xl font-semibold hover:text-pink-400 transition">
                        Process
                    </a>
                    <a href="#team" onClick={closeMenu} className="text-xl font-semibold hover:text-pink-400 transition">
                        Team
                    </a>
                    <Link to="/login" onClick={closeMenu}>
                        <motion.button
                            whileHover={{
                                scale: 1.07,
                                boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-md"
                        >
                            Login
                        </motion.button>
                    </Link>

                    <button
                        onClick={closeMenu}
                        className="absolute top-5 right-6 text-4xl text-white"
                    >
                        &times;
                    </button>
                </div>
            )}
        </>
    );
};

const NavLink = ({ href, children, scrolled }) => (
    <a
        href={href}
        className={`block font-medium hover:text-purple-500 transition-colors ${
            scrolled ? 'text-gray-800' : 'text-white'
        }`}
    >
        {children}
    </a>
);

export default Navbar;
