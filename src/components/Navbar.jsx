import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
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
                    <Link to="/" className="flex items-center space-x-2">
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

                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink scrolled={scrolled} href="#features">Features</NavLink>
                        <NavLink scrolled={scrolled} href="#process">Process</NavLink>
                        <NavLink scrolled={scrolled} href="#team">Team</NavLink>
                        <Link to="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium"
                            >
                                Login
                            </motion.button>
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button className={`text-2xl ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                            ☰
                        </button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

const NavLink = ({ href, children, scrolled }) => (
    <a
        href={href}
        className={`font-medium hover:text-purple-500 transition-colors ${
            scrolled ? 'text-gray-700' : 'text-white'
        }`}
    >
        {children}
    </a>
);

export default Navbar;
