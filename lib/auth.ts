import { cookies } from "next/headers"

export async function getAuthToken() {
  // Get token from cookies only
  const cookieStore = cookies()
  return cookieStore.get("auth_token")?.value
}

export async function getUserRole() {
  // Get role from cookies only
  const cookieStore = cookies()
  return cookieStore.get("user_role")?.value
}

export async function requireAuth() {
  const token = await getAuthToken()

  if (!token) {
    return {
      success: false,
      message: "Authentication required",
    }
  }

  // In a real application, you would verify the token
  // For demo purposes, we'll just return a mock user

  return {
    success: true,
    user: {
      id: "user123",
      email: "user@example.com",
      companyId: "company123",
      role: (await getUserRole()) || "user",
    },
  }
}

export async function requireAdmin() {
  const authResult = await requireAuth()

  if (!authResult.success) {
    return authResult
  }

  const role = await getUserRole()

  if (role !== "owner" && role !== "admin") {
    return {
      success: false,
      message: "Admin privileges required",
    }
  }

  return {
    success: true,
    user: {
      ...authResult.user,
      role,
    },
  }
}

export function isAuthenticated() {
  return !!getAuthToken()
}

export function isAdmin() {
  return getUserRole() === "owner" || getUserRole() === "admin"
}

