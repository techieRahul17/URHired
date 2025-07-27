import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-6">
                            <motion.div
                                whileHover={{ rotate: 10 }}
                                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center"
                            >
                                <span className="text-white font-bold text-xl">T</span>
                            </motion.div>
                            <span className="font-bold text-xl text-white">
                                TalentMatch AI
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6">
                            Revolutionizing the recruitment process with AI-powered candidate matching and interview scheduling.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social links remain <a> if they link externally */}
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                {/* Facebook */}
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="..." />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                {/* Twitter */}
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="..." />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                {/* GitHub */}
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="..." />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                {/* LinkedIn */}
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="..." />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors">Home</Link></li>
                            <li><a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors">Features</a></li>
                            <li><a href="#process" className="text-gray-400 hover:text-purple-400 transition-colors">How It Works</a></li>
                            <li><a href="#team" className="text-gray-400 hover:text-purple-400 transition-colors">Team</a></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-purple-400 transition-colors">Login</Link></li>
                        </ul>
                    </div>

                    {/* Features */}
                    <div className="col-span-1">
                        <h3 className="text-white font-semibold text-lg mb-6">Features</h3>
                        <ul className="space-y-3">
                            <li><a href="#jd-analysis" className="text-gray-400 hover:text-purple-400 transition-colors">JD Analysis</a></li>
                            <li><a href="#cv-parsing" className="text-gray-400 hover:text-purple-400 transition-colors">CV Parsing</a></li>
                            <li><a href="#candidate-matching" className="text-gray-400 hover:text-purple-400 transition-colors">Candidate Matching</a></li>
                            <li><a href="#interview-scheduling" className="text-gray-400 hover:text-purple-400 transition-colors">Interview Scheduling</a></li>
                            <li><a href="#analytics-dashboard" className="text-gray-400 hover:text-purple-400 transition-colors">Analytics Dashboard</a></li>
                            <li><a href="#ai-configuration" className="text-gray-400 hover:text-purple-400 transition-colors">AI Configuration</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1">
                        <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-purple-400 mt-1" fill="currentColor" viewBox="0 0 24 24" />
                                <span className="text-gray-400">contact@talentmatchai.com</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-purple-400 mt-1" fill="currentColor" viewBox="0 0 24 24" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-purple-400 mt-1" fill="currentColor" viewBox="0 0 24 24" />
                                <span className="text-gray-400">123 AI Street, Tech Valley, CA 94043</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            © {currentYear} TalentMatch AI. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link to="/privacy-policy" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">Privacy Policy</Link>
                            <Link to="/terms-of-service" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">Terms of Service</Link>
                            <Link to="/cookie-policy" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
