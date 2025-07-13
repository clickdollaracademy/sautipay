"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const isAdmin = formData.get("isAdmin") === "true"
  const role = isAdmin ? "owner" : "user"

  if (!email || !password) {
    return {
      error: "Email and password are required",
    }
  }

  try {
    // In a real application, you would validate credentials against a database
    // For demo purposes, we'll accept any credentials

    // Set authentication cookies
    cookies().set("auth_token", "demo_token_" + Math.random().toString(36).substring(2, 15), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    cookies().set("user_role", role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return {
      success: true,
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      error: "Authentication failed",
    }
  }
}

export async function logout() {
  cookies().delete("auth_token")
  cookies().delete("user_role")
  redirect("/login")
}

