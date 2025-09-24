import type { Metadata } from "next"
import SignUpForm from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up | Sauti Pay",
  description: "Create a new account on Sauti Pay",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8 border-2 border-green-500 rounded-lg p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#002B5B]">Create an account</h1>
          <p className="mt-2 text-sm text-gray-600">Join Sauti Pay and get access to our payment solutions</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}
