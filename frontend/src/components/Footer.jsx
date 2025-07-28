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
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
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
                            <li><a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors">JD Analysis</a></li>
                            <li><a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors">CV Parsing</a></li>
                            <li><a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors">Candidate Matching</a></li>
                            <li><a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors">Interview Scheduling</a></li>
                            <li><a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors">Analytics Dashboard</a></li>
                            <li><a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors">AI Configuration</a></li>
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