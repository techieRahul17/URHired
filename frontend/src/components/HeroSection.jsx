import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 2 }}
                    className="absolute top-20 right-20 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 2, delay: 0.3 }}
                    className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500 rounded-full filter blur-3xl opacity-20"
                />
            </div>

            {/* Floating elements */}
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay:1
                }}
                className="absolute top-20 right-[15%] w-20 h-20 opacity-70"
            >
                <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M9,13V19H7V13H9M15,15V19H17V15H15M11,11V19H13V11H11Z" />
                </svg>
            </motion.div>

            <motion.div
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                 
                   
                }}
                className="absolute top-50 left-[15%] w-16 h-16 opacity-40"
            >
                <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                    <path d="M20,17A2,2 0 0,0 22,15V4A2,2 0 0,0 20,2H9.46C9.81,2.61 10,3.3 10,4H20V15H11V17M15,7V9H9V22H7V16H5V22H3V14H1.5V9A2,2 0 0,1 3.5,7H15M8,4A2,2 0 0,1 6,6A2,2 0 0,1 4,4A2,2 0 0,1 6,2A2,2 0 0,1 8,4Z" />
                </svg>
            </motion.div>

            <div className="container mx-auto px-6 py-24 relative z-10">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-12 md:mb-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                                <span className="block">Revolutionize Your</span>
                                <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                  Recruitment Process
                </span>
                            </h1>
                            <p className="text-xl text-gray-200 mb-8 max-w-lg">
                                Our AI-powered platform automates CV screening, candidate matching, and interview scheduling, saving you time and finding the best talent.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <motion.button
  whileHover={{
    scale: 1.07,
    boxShadow: "0px 0px 20px rgba(236, 72, 153, 0.6)", // pinkish glow
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
  className="px-8 py-3 cursor-pointer rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-md hover:brightness-110 hover:tracking-wide duration-300 ease-in-out"
>
  Get Started
</motion.button>

                                <motion.button
  whileHover={{
    scale: 1.07,
    boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.4)",
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
  className="px-8 py-3 cursor-pointer rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg shadow-md hover:brightness-110 hover:tracking-wide duration-300 ease-in-out"
>
  Learn More
</motion.button>

                            </div>
                        </motion.div>
                    </div>

                    <div className="md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative z-10 bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/10">
                                <div className="flex items-center mb-6">
                                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                    <div className="ml-auto text-white/70 text-sm">AI Recruitment Dashboard</div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-white/5 rounded-lg p-4">
                                        <div className="text-white font-medium mb-2">Job Description Analysis</div>
                                        <div className="h-2 bg-purple-500/30 rounded-full w-3/4"></div>
                                        <div className="mt-2 flex justify-between text-xs text-white/60">
                                            <span>Skills extracted</span>
                                            <span>85%</span>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4">
                                        <div className="text-white font-medium mb-2">Candidate Matching</div>
                                        <div className="flex items-center space-x-2 mb-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-pink-500/50 rounded-full"></div>
                                            </div>
                                            <div className="text-white">92%</div>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-pink-500/50 rounded-full w-4/5"></div>
                                            </div>
                                            <div className="text-white">78%</div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-pink-500/50 rounded-full w-3/5"></div>
                                            </div>
                                            <div className="text-white">65%</div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4">
                                        <div className="text-white font-medium mb-2">Interview Scheduling</div>
                                        <div className="flex justify-between text-xs text-white/60 mb-2">
                                            <span>Today</span>
                                            <span>3 interviews</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-white/60">
                                            <span>This week</span>
                                            <span>12 interviews</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                animate={{
                                    rotate: [0, 5, 0, -5, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 10,
                                    ease: "easeInOut"
                                }}
                                className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl -z-10 opacity-70 blur-xl"
                            />
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-24 flex flex-wrap justify-center gap-8 text-center"
                >
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 w-64">
                        <div className="text-4xl font-bold text-white mb-2">85%</div>
                        <div className="text-gray-300">Reduction in hiring time</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 w-64">
                        <div className="text-4xl font-bold text-white mb-2">95%</div>
                        <div className="text-gray-300">Matching accuracy</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 w-64">
                        <div className="text-4xl font-bold text-white mb-2">3x</div>
                        <div className="text-gray-300">Increase in productivity</div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                    }}
                    className="text-white/70"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
