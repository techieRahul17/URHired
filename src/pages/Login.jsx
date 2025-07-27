"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, Lock, User, Briefcase } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userType, setUserType] = useState("user")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const { login } = useAuth()
    const navigate = useNavigate()

    const isValidEmail = (email) => {
      // Basic email regex
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isStrongPassword = (password) => {
      // Minimum 8 chars, at least one uppercase, one number, one special char
      return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        // Validation
        if (!email.trim()) {
          return setError("Email is required");
        }
        if (!isValidEmail(email)) {
          return setError("Please enter a valid email address");
        }
        if (!password) {
          return setError("Password is required");
        }
        if (!isStrongPassword(password)) {
          return setError("Password must be at least 8 characters, include an uppercase letter, a number, and a special character.");
        }
        setLoading(true)

        try {
            // In a real app, you would call your API here
            // For demo purposes, we'll simulate a successful login
            setTimeout(() => {
                const user = {
                    id: "123",
                    email,
                    displayName: email.split("@")[0],
                }

                login(user, userType)

                // Redirect to the appropriate dashboard
                if (userType === "recruiter") {
                    navigate("/recruiter/dashboard")
                } else {
                    navigate("/user/dashboard")
                }
            }, 1500)
        } catch (err) {
            setError("Failed to log in. Please check your credentials.")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
            <motion.div
                className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-8">
                    <div className="text-center mb-8 text-black">
                        <motion.h1
                            className="text-3xl font-bold text-gray-800 mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Welcome Back
                        </motion.h1>
                        <motion.p
                            className="text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Sign in to your account
                        </motion.p>
                    </div>

                    {error && (
                        <motion.div
                            className="mb-4 p-3 bg-red-100 text-red-700 rounded-md"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
                            <div className="grid grid-cols-2 gap-4 text-black">
                                <motion.button
                                    type="button"
                                    className={`flex items-center justify-center p-3 rounded-md border-2 transition-all ${
                                        userType === "user"
                                            ? "border-purple-500 bg-purple-50 text-purple-700"
                                            : "border-gray-200 hover:border-purple-200"
                                    }`}
                                    onClick={() => setUserType("user")}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <User className="mr-2" size={18} />
                                    <span>Candidate</span>
                                </motion.button>

                                <motion.button
                                    type="button"
                                    className={`flex items-center justify-center p-3 rounded-md border-2 transition-all ${
                                        userType === "recruiter"
                                            ? "border-purple-500 bg-purple-50 text-purple-700"
                                            : "border-gray-200 hover:border-purple-200"
                                    }`}
                                    onClick={() => setUserType("recruiter")}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Briefcase className="mr-2" size={18} />
                                    <span>Recruiter</span>
                                </motion.button>
                            </div>
                        </div>

                        <div className={"text-black"}>
                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            icon={<Mail size={18} />}
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            icon={<Lock size={18} />}
                        />
                        </div>

                        <div className="flex items-center justify-between mb-6 text-black">
                            <div className="flex items-center text-black">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <Button type="submit" variant="primary" fullWidth disabled={loading} className="mb-4">
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default Login

