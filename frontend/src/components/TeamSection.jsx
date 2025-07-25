import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const TeamSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    const team = [
        {
            name: "Rahul V S",
            role: "Frontend Developer",
            image: "src/assets/Prawin.jpeg",
            social: {
                linkedin: "https://www.linkedin.com/in/rahul-v-s/",
                github: "https://github.com/techieRahul17",
                twitter: "https://x.com/rahul_17_vs_dev"
            }
        },
        {
            name: "Prawin Kumar S",
            role: "Backend Developer",
            image: "src/assets/Rahul.jpeg",
            social: {
                linkedin: "https://www.linkedin.com/in/prawin-kumar-s-a60153284",
                github: "https://github.com/prawinkumar1506",
                twitter: "https://x.com/JEEAsp39595?t=G1qFn4xIdeIBRLjjYEPdKQ&s=08"
            }
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="team" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
            </div>

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
                    >
                        Meet Our Team
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-300 max-w-2xl mx-auto text-lg"
                    >
                        The brilliant minds behind our AI-powered recruitment platform.
                    </motion.p>
                </div>

                <motion.div
                    ref={ref}
                    variants={container}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="flex flex-wrap justify-center gap-12"
                >
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="relative group"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 w-72">
                                <div className="mb-6 relative">
                                    <div className="w-full h-72 rounded-lg overflow-hidden">
                                        <img
                                            src={member.image || "/placeholder.svg"}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                                        <div className="flex justify-center space-x-4">
                                            <a href={member.social.linkedin} className="text-white hover:text-purple-400 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                                </svg>
                                            </a>
                                            <a href={member.social.github} className="text-white hover:text-purple-400 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                            </a>
                                            <a href={member.social.twitter} className="text-white hover:text-purple-400 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                                <p className="text-gray-400 mb-4">{member.role}</p>
                                <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TeamSection;
