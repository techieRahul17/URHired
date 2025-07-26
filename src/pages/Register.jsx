"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Briefcase, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name.trim()) {
      return setError("Name is required");
    }
    if (!isValidEmail(email)) {
      return setError("Please enter a valid email address");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      // In a real app, you would call your API here
      // For demo purposes, we'll simulate a successful registration
      setTimeout(() => {
        const user = {
          id: "123",
          email,
          displayName: name,
        };

        login(user, userType);

        // Redirect to the appropriate dashboard
        if (userType === "recruiter") {
          navigate("/recruiter/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }, 1500);
    } catch (err) {
      setError("Failed to create an account. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <motion.h1
              className="text-3xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Create Account
            </motion.h1>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Join our AI-powered recruitment platform
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  className={`flex items-center justify-center p-3 rounded-md border-2 transition-all text-gray-900 ${
                    userType === "user"
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-400 hover:border-purple-200"
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
                  className={`flex items-center justify-center p-3 rounded-md border-2 transition-all text-gray-900 ${
                    userType === "recruiter"
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-400 hover:border-purple-200"
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

            <Input
              label="Full Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="text-gray-900 mb-4"
              required
              icon={<User size={18} />}
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="text-gray-900 mb-4"
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
              className="text-gray-900 mb-4"
              required
              icon={<Lock size={18} />}
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="text-gray-900 mb-4"
              required
              icon={<Lock size={18} />}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
              className="mb-4"
              icon={<UserPlus size={18} />}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
