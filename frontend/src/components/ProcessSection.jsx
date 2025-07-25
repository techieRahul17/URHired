import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const ProcessSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    const steps = [
        {
            number: "01",
            title: "Job Description Analysis",
            description: "Our AI reads and summarizes key elements from the JD, including required skills, experience, qualifications, and job responsibilities."
        },
        {
            number: "02",
            title: "CV Data Extraction",
            description: "The system extracts key data from CVs, such as education, work experience, skills, certifications, and other relevant information."
        },
        {
            number: "03",
            title: "Candidate Matching",
            description: "The AI compares the extracted data from the CV to the summarized JD and calculates a match score based on relevance."
        },
        {
            number: "04",
            title: "Shortlisting Candidates",
            description: "Based on the match score, candidates who meet or exceed a defined threshold are shortlisted for interviews."
        },
        {
            number: "05",
            title: "Interview Scheduling",
            description: "The system sends personalized interview requests to shortlisted candidates, including potential dates, times, and interview format."
        }
    ];

    return (
        <section id="process" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20"></div>
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
                        How It Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-300 max-w-2xl mx-auto text-lg"
                    >
                        Our multi-agent AI system streamlines the entire recruitment process from job description analysis to interview scheduling.
                    </motion.p>
                </div>

                <div ref={ref} className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 hidden md:block"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`flex flex-col md:flex-row items-center mb-16 last:mb-0 ${
                                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                            }`}
                        >
                            <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 text-right' : 'md:pl-16 text-left'}`}>
                                <div className="mb-4">
                                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">{step.number}</span>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-300">{step.description}</p>
                            </div>

                            <div className="md:w-0 relative flex items-center justify-center my-8 md:my-0">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                    className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center z-10"
                                >
                                    <span className="text-white font-bold">{index + 1}</span>
                                </motion.div>
                            </div>

                            <div className="md:w-1/2"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
