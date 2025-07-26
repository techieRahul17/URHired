import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const FeaturesSection = () => {
  const [darkMode, setDarkMode] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 5H7C5.9 5 5 5.9 5 7v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-2M9 5c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2M9 5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "JD Analysis",
      description: "Automatically extracts skills and requirements from job descriptions."
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M17 8l4 4-4 4M21 12H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "CV Parsing",
      description: "Extracts skills, experience, and qualifications from resumes."
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 12l2 2 4-4M12 3a9 9 0 110 18 9 9 0 010-18z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Candidate Matching",
      description: "AI matches candidates with job requirements accurately."
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M8 7V3m8 4V3M7 11h10M5 21h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Interview Scheduling",
      description: "Automates scheduling and sends interview invites."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section
      id="features"
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-section)" }}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/20 via-pink-300/10 to-transparent blur-3xl"></div>

      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:scale-105 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Heading */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          >
            Powerful Recruitment Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "var(--text-secondary)" }}
            className="max-w-2xl mx-auto text-lg"
          >
            AI-powered tools to simplify your hiring process.
          </motion.p>
        </div>

        {/* Feature Cards */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="relative p-6 rounded-2xl border transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl backdrop-blur-xl"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--card-border)",
                color: "var(--text-primary)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
              }}
            >
              {/* Overlay for better contrast */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

              <div className="mb-4 text-purple-400 relative z-10">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 relative z-10" style={{ color: "var(--text-primary)" }}>
                {feature.title}
              </h3>
              <p className="relative z-10" style={{ color: "var(--text-secondary)" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
