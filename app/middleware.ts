import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")
  const userRole = request.cookies.get("user_role")?.value
  const isAuthenticated = !!authToken
  const isOwner = userRole === "owner"

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard")
  const isOwnerPage = request.nextUrl.pathname.startsWith("/owner")

  // If user is not authenticated and tries to access protected pages
  if (!isAuthenticated && (isDashboardPage || isOwnerPage)) {
    const url = new URL("/auth", request.url)
    url.searchParams.set("from", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // If user is authenticated but not owner and tries to access owner pages
  if (isAuthenticated && !isOwner && isOwnerPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // If user is authenticated and tries to access auth pages
  if (isAuthenticated && isAuthPage) {
    if (isOwner) {
      return NextResponse.redirect(new URL("/owner", request.url))
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/owner/:path*"],
}
