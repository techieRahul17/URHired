import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ProcessSection from '../components/ProcessSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';

const Home = () => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
    
    const [isLoading, setIsLoading] = useState(true);
    const [animationPhase, setAnimationPhase] = useState(0);
    
    useEffect(() => {
        const phases = [
            () => setTimeout(() => setAnimationPhase(1), 500),
            () => setTimeout(() => setAnimationPhase(2), 1200),
            () => setTimeout(() => setAnimationPhase(3), 2000),
            () => setTimeout(() => setIsLoading(false), 2800)
        ];
        
        const timers = phases.map(phase => phase());
        return () => timers.forEach(clearTimeout);
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen w-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    {/* Floating Resume Papers */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ 
                                x: Math.random() * window.innerWidth,
                                y: window.innerHeight + 100,
                                rotate: Math.random() * 360,
                                opacity: 0
                            }}
                            animate={{
                                y: -100,
                                rotate: Math.random() * 360 + 180,
                                opacity: animationPhase >= 1 ? 0.1 : 0
                            }}
                            transition={{
                                duration: 4 + Math.random() * 2,
                                delay: Math.random() * 2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute w-16 h-20 bg-white rounded-sm shadow-lg"
                            style={{
                                left: `${10 + Math.random() * 80}%`
                            }}
                        >
                            {/* Resume Content Lines */}
                            <div className="p-2 space-y-1">
                                <div className="h-1 bg-gray-800 rounded w-3/4"></div>
                                <div className="h-0.5 bg-gray-600 rounded w-full"></div>
                                <div className="h-0.5 bg-gray-600 rounded w-2/3"></div>
                                <div className="h-0.5 bg-gray-400 rounded w-1/2 mt-2"></div>
                                <div className="h-0.5 bg-gray-400 rounded w-3/4"></div>
                                <div className="h-0.5 bg-gray-400 rounded w-1/3"></div>
                            </div>
                        </motion.div>
                    ))}
                    
                    {/* Circuit Pattern */}
                    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
                        <motion.path
                            d="M10,10 L90,10 L90,50 L50,50 L50,90 L10,90 Z"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="0.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: animationPhase >= 1 ? 1 : 0 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60A5FA" />
                                <stop offset="100%" stopColor="#A855F7" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Main Content Container */}
                <div className="relative h-full flex items-center justify-center">
                    {/* Interview Icons Floating Around */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ 
                            scale: animationPhase >= 1 ? 1 : 0,
                            rotate: 0
                        }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="absolute top-1/4 left-1/4 text-blue-400"
                    >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 3.5C14.8 3.4 14.6 3.3 14.4 3.3H9.6C9.4 3.3 9.2 3.4 9 3.5L3 7V9H21ZM3 19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V11H3V19Z"/>
                        </svg>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ 
                            scale: animationPhase >= 1 ? 1 : 0,
                            rotate: 0
                        }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="absolute top-1/3 right-1/4 text-purple-400"
                    >
                        <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 4C16.55 4 17 4.45 17 5S16.55 6 16 6H8C7.45 6 7 5.55 7 5S7.45 4 8 4H16ZM3 10V8C3 7.45 3.45 7 4 7H20C20.55 7 21 7.45 21 8V10C21 10.55 20.55 11 20 11H4C3.45 11 3 10.55 3 10ZM15 13H9C8.45 13 8 13.45 8 14V20C8 20.55 8.45 21 9 21H15C15.55 21 16 20.55 16 20V14C16 13.45 15.55 13 15 13Z"/>
                        </svg>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ 
                            scale: animationPhase >= 2 ? 1 : 0,
                            rotate: 0
                        }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute bottom-1/3 left-1/3 text-pink-400"
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 11H15L13.5 9.5C13.1 9.1 12.9 8.6 12.9 8.1S13.1 7.1 13.5 6.7L15 5.2C15.4 4.8 15.9 4.6 16.4 4.6S17.4 4.8 17.8 5.2L19.3 6.7C19.7 7.1 19.9 7.6 19.9 8.1S19.7 8.6 19.3 9L17.8 10.5C17.4 10.9 16.9 11.1 16.4 11.1S15.4 10.9 15 10.5L13.5 9H9C8.4 9 8 9.4 8 10V14C8 14.6 8.4 15 9 15H15C15.6 15 16 14.6 16 14V13H18V14C18 15.7 16.7 17 15 17H9C7.3 17 6 15.7 6 14V10C6 8.3 7.3 7 9 7Z"/>
                        </svg>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0, rotate: 90 }}
                        animate={{ 
                            scale: animationPhase >= 2 ? 1 : 0,
                            rotate: 0
                        }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="absolute bottom-1/4 right-1/3 text-green-400"
                    >
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12L11 14L15 10M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                    </motion.div>

                    {/* Central Logo/Brand Area */}
                    <div className="text-center">
                        {/* Company Logo Placeholder */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                                scale: animationPhase >= 1 ? 1 : 0,
                                opacity: animationPhase >= 1 ? 1 : 0
                            }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8"
                        >
                            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
                                </svg>
                            </div>
                        </motion.div>

                        {/* Main Text Animation */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ 
                                y: animationPhase >= 2 ? 0 : 50,
                                opacity: animationPhase >= 2 ? 1 : 0
                            }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <motion.h1 
                                className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4"
                                animate={{ 
                                    scale: animationPhase >= 3 ? [1, 1.05, 1] : 1,
                                }}
                                transition={{ 
                                    duration: 0.6,
                                    repeat: animationPhase >= 3 ? 2 : 0,
                                    delay: 0.2
                                }}
                            >
                                U R Hired!
                            </motion.h1>
                            
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: animationPhase >= 3 ? 1 : 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="text-xl text-blue-200 font-light tracking-wide"
                            >
                                Connecting Dreams with Opportunities
                            </motion.p>
                        </motion.div>

                        {/* Loading Progress */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${animationPhase * 25}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-8 max-w-xs"
                        />
                    </div>

                    {/* Sparkle Effects */}
                    {animationPhase >= 3 && [...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                                x: [0, (Math.random() - 0.5) * 400],
                                y: [0, (Math.random() - 0.5) * 400]
                            }}
                            transition={{
                                duration: 1.5,
                                delay: Math.random() * 0.5,
                                repeat: Infinity,
                                repeatDelay: Math.random() * 2
                            }}
                            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                            style={{
                                left: '50%',
                                top: '50%'
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-hidden">
            <motion.div style={{ opacity }} className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 opacity-20"></div>
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            </motion.div>

            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <ProcessSection />
            <TeamSection />
            <Footer />
        </div>
    );
};

export default Home;