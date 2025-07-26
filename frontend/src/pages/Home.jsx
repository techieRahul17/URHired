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

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="text-white text-4xl font-bold"
                >
                    U R Hired!
                </motion.div>
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
