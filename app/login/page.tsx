"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Shield, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  // State management
  const [activeTab, setActiveTab] = useState<"user" | "admin">("user")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset states
    setError("")
    setIsLoading(true)
    setIsSuccess(false)

    try {
      // Simulate authentication process
      console.log("Login credentials:", {
        email: formData.email,
        role: activeTab === "admin" ? "owner" : "user",
      })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful login
      setIsSuccess(true)
      console.log("Login successful (simulated)")

      // Redirect after a short delay
      setTimeout(() => {
        // Use router.push for client-side navigation
        router.push(activeTab === "admin" ? "/owner" : "/dashboard")
      }, 500)
    } catch (err: any) {
      // This won't be triggered in the simulation, but keeping for future implementation
      console.error("Login error:", err)
      setError(err.message || "Authentication failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  // Switch between tabs
  const switchTab = (tab: "user" | "admin") => {
    setActiveTab(tab)
    setError("")
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Blue Background */}
      <div className="hidden md:flex md:w-1/2 bg-[#002B5B] items-center justify-center">
        <Link href="/" className="flex flex-col items-center text-center p-8">
          <h1 className="text-4xl font-bold text-white mb-3">Sauti Pay</h1>
          <p className="text-white text-lg italic">Travel insurance simplified...</p>
        </Link>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-[#F8F9FA]">
        <div className="w-full max-w-md">
          {/* Mobile Logo (visible only on small screens) */}
          <div className="md:hidden text-center mb-8">
            <Link href="/">
              <h1 className="text-3xl font-bold text-[#002B5B] mb-1">Sauti Pay</h1>
              <p className="text-gray-600 text-sm italic">Travel insurance simplified...</p>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border-2 border-green-500 p-8">
            <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-center mb-6">Sign in to your account to continue</p>

            {/* Login Tabs */}
            <div className="flex mb-6 border-b">
              <button
                type="button"
                className={`flex-1 py-2 text-center text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "user"
                    ? "border-[#002B5B] text-[#002B5B]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => switchTab("user")}
              >
                User Login
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-center text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "admin"
                    ? "border-[#002B5B] text-[#002B5B]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => switchTab("admin")}
              >
                Admin Login
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">{error}</div>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div className="p-3 mb-4 text-sm text-green-600 bg-green-50 rounded-md border border-green-100">
                Login successful! Redirecting...
              </div>
            )}

            {/* Login Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {activeTab === "admin" ? "Admin Email" : "Email Address"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-transparent"
                  placeholder={activeTab === "admin" ? "Enter admin email" : "Enter your email"}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-transparent"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-2.5 px-4 text-white rounded-md flex justify-center items-center transition-colors ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                } ${activeTab === "admin" ? "bg-black hover:bg-black/90" : "bg-[#002B5B] hover:bg-[#003366]"}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    {activeTab === "admin" && <Shield className="mr-2" size={18} />}
                    {activeTab === "admin" ? "Admin Login" : "Sign In"}
                  </>
                )}
              </button>

              {/* Forgot Password */}
              <div className="text-center mt-4">
                <button type="button" className="text-[#002B5B] hover:text-[#0056b3] text-sm transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center text-sm text-gray-600 mt-6 pt-4 border-t">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-[#002B5B] hover:text-[#0056b3] font-medium">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

