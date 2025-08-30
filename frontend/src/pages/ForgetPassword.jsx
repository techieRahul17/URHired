"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, ShieldCheck } from "lucide-react"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

const ForgetPassword = () => {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState(new Array(6).fill(""))
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleOtpChange = (value, index) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)
            if (value && index < 5) {
                const next = document.getElementById(`otp-${index + 1}`)
                if (next) next.focus()
            }
        }
    }

    const handleSendOtp = () => {
        setLoading(true)
        setTimeout(() => {
            setStep(2)
            setLoading(false)
        }, 1000)
    }

    const handleVerifyOtp = () => {
        if (otp.join("").length !== 6) {
            setError("Please enter 6-digit OTP")
            return
        }
        setError("")
        setStep(3)
    }

    const handleResetPassword = () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match")
            return
        }
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setStep(4)
            setTimeout(() => navigate("/login"), 2000)
        }, 1500)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
            <motion.div
                className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-8 text-black">
                    <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
                    <p className="text-center mb-6 text-gray-600">
                        {step === 1 && "Enter your registered email"}
                        {step === 2 && "Enter the 6-digit OTP sent to your email"}
                        {step === 3 && "Reset your password"}
                        {step === 4 && "Your password has been reset successfully!"}
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {step === 1 && (
                        <>
                            <Input
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                                icon={<Mail size={18} />}
                            />
                            <Button fullWidth onClick={handleSendOtp} disabled={loading} className="mt-4">
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </Button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="flex justify-between gap-0 mb-4">
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        id={`otp-${i}`}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e.target.value, i)}
                                        className="w-10 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                ))}
                            </div>
                            <Button fullWidth onClick={handleVerifyOtp}>
                                Verify OTP
                            </Button>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <Input
                                label="New Password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password"
                                icon={<Lock size={18} />}
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                icon={<Lock size={18} />}
                            />
                            <Button fullWidth onClick={handleResetPassword} disabled={loading} className="mt-4">
                                {loading ? "Resetting..." : "Reset Password"}
                            </Button>
                        </>
                    )}

                    {step === 4 && (
                        <div className="flex flex-col items-center text-green-600">
                            <ShieldCheck size={48} />
                            <p className="mt-4 font-semibold">Password reset successful!</p>
                            <p className="text-sm text-gray-500">Redirecting to login...</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

export default ForgetPassword
