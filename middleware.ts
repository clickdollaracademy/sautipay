import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simplified middleware that doesn't check for authentication
export function middleware(request: NextRequest) {
  // For now, just pass through all requests
  return NextResponse.next()

  // Authentication logic will be implemented later
  // This is a placeholder for future implementation
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

