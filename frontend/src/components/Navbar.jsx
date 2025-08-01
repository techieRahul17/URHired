import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ChevronDown, User, LogOut, LayoutGrid } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const { currentUser, userType, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    
    // Simple smooth scroll function
    const scrollToElement = (sectionId, offset = 80) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const handleSmoothScroll = (elementId) => {
        scrollToElement(elementId);
        setMobileMenuOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
            setUserDropdownOpen(false);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleDashboardNavigation = () => {
        if (userType === 'recruiter') {
            navigate('/recruiter/dashboard');
        } else {
            navigate('/user/dashboard');
        }
        setUserDropdownOpen(false);
    };

    const isHomePage = location.pathname === '/';

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled || !isHomePage ? 'bg-white/95 backdrop-blur-md shadow-lg navbar-blur' : 'bg-transparent'
            }`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="container mx-auto px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg"
                        aria-label="U R Hired - Go to homepage"
                    >
                        <motion.div
                            whileHover={{ rotate: 10 }}
                            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center"
                        >
                            <span className="text-white font-bold text-xl">Hi</span>
                        </motion.div>
                        <span className={`font-bold text-xl ${scrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`}>
                            U R Hired
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {isHomePage && (
                            <>
                                <NavLink 
                                    scrolled={scrolled || !isHomePage} 
                                    onClick={() => handleSmoothScroll('features')}
                                    ariaLabel="Navigate to Features section"
                                >
                                    Features
                                </NavLink>
                                <NavLink 
                                    scrolled={scrolled || !isHomePage} 
                                    onClick={() => handleSmoothScroll('process')}
                                    ariaLabel="Navigate to Process section"
                                >
                                    Process
                                </NavLink>
                                <NavLink 
                                    scrolled={scrolled || !isHomePage} 
                                    onClick={() => handleSmoothScroll('team')}
                                    ariaLabel="Navigate to Team section"
                                >
                                    Team
                                </NavLink>
                            </>
                        )}
                        
                        {!currentUser ? (
                            <Link to="/login">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                    aria-label="Login to your account"
                                >
                                    Login
                                </motion.button>
                            </Link>
                        ) : (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                                        scrolled || !isHomePage 
                                            ? 'text-gray-700 hover:bg-gray-100' 
                                            : 'text-white hover:bg-white/10'
                                    }`}
                                    aria-expanded={userDropdownOpen}
                                    aria-haspopup="true"
                                    aria-label={`User menu for ${currentUser?.displayName || currentUser?.name || 'User'}`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                                        <User size={16} className="text-white" />
                                    </div>
                                    <span className="font-medium">
                                        {currentUser?.displayName || currentUser?.name || 'User'}
                                    </span>
                                    <ChevronDown 
                                        size={16} 
                                        className={`transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} 
                                    />
                                </button>

                                <AnimatePresence>
                                    {userDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                                            role="menu"
                                            aria-orientation="vertical"
                                        >
                                            <div className="p-3 border-b border-gray-200">
                                                <p className="font-medium text-gray-800">
                                                    {currentUser?.displayName || currentUser?.name || 'User'}
                                                </p>
                                                <p className="text-xs text-gray-500 capitalize">
                                                    {userType} Account
                                                </p>
                                            </div>
                                            <div className="py-1">
                                                <button
                                                    onClick={handleDashboardNavigation}
                                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors text-sm flex items-center space-x-2 focus:outline-none focus:bg-gray-50"
                                                    role="menuitem"
                                                >
                                                    <LayoutGrid size={16} />
                                                    <span>Dashboard</span>
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors text-sm text-red-600 flex items-center space-x-2 border-t border-gray-100 focus:outline-none focus:bg-gray-50"
                                                    role="menuitem"
                                                >
                                                    <LogOut size={16} />
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                                scrolled || !isHomePage ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                            }`}
                            aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            ref={mobileMenuRef}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden mt-4 pb-4 border-t border-gray-200/20"
                            role="menu"
                            aria-orientation="vertical"
                        >
                            <div className="flex flex-col space-y-4 pt-4">
                                {isHomePage && (
                                    <>
                                        <MobileNavLink 
                                            scrolled={scrolled || !isHomePage}
                                            onClick={() => handleSmoothScroll('features')}
                                            ariaLabel="Navigate to Features section"
                                        >
                                            Features
                                        </MobileNavLink>
                                        <MobileNavLink 
                                            scrolled={scrolled || !isHomePage}
                                            onClick={() => handleSmoothScroll('process')}
                                            ariaLabel="Navigate to Process section"
                                        >
                                            Process
                                        </MobileNavLink>
                                        <MobileNavLink 
                                            scrolled={scrolled || !isHomePage}
                                            onClick={() => handleSmoothScroll('team')}
                                            ariaLabel="Navigate to Team section"
                                        >
                                            Team
                                        </MobileNavLink>
                                    </>
                                )}
                                
                                {!currentUser ? (
                                    <Link 
                                        to="/login" 
                                        className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-center smooth-transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                        aria-label="Login to your account"
                                    >
                                        Login
                                    </Link>
                                ) : (
                                    <div className={`pt-4 border-t ${scrolled || !isHomePage ? 'border-gray-200' : 'border-white/20'}`}>
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                                                <User size={20} className="text-white" />
                                            </div>
                                            <div>
                                                <p className={`font-medium ${scrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`}>
                                                    {currentUser?.displayName || currentUser?.name || 'User'}
                                                </p>
                                                <p className={`text-sm capitalize ${scrolled || !isHomePage ? 'text-gray-500' : 'text-white/70'}`}>
                                                    {userType} Account
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleDashboardNavigation}
                                            className={`w-full text-left py-2 px-4 rounded-md transition-colors mb-2 flex items-center space-x-2 focus:outline-none ${
                                                scrolled || !isHomePage 
                                                    ? 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100' 
                                                    : 'text-white hover:bg-white/10 focus:bg-white/10'
                                            }`}
                                            role="menuitem"
                                        >
                                            <LayoutGrid size={18} />
                                            <span>Dashboard</span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left py-2 px-4 rounded-md transition-colors text-red-500 hover:bg-red-50 focus:bg-red-50 flex items-center space-x-2 focus:outline-none"
                                            role="menuitem"
                                        >
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

const NavLink = ({ children, scrolled, onClick, ariaLabel }) => (
    <button
        onClick={onClick}
        className={`font-medium hover:text-purple-500 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2 py-1 ${
            scrolled ? 'text-gray-700' : 'text-white'
        }`}
        aria-label={ariaLabel}
    >
        {children}
    </button>
);

const MobileNavLink = ({ children, scrolled, onClick, ariaLabel }) => (
    <button
        onClick={onClick}
        className={`font-medium py-2 px-4 rounded-md transition-colors text-left focus:outline-none ${
            scrolled 
                ? 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100' 
                : 'text-white hover:bg-white/10 focus:bg-white/10'
        }`}
        role="menuitem"
        aria-label={ariaLabel}
    >
        {children}
    </button>
);

export default Navbar;
