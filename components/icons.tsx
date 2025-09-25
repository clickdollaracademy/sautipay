import {
  Loader2,
  type LucideCrop as LucideProps,
  Moon,
  SunMedium,
  Twitter,
  Check,
  X,
  type LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  spinner: Loader2,
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      />
    </svg>
  ),
  mtn: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect width="24" height="24" rx="4" fill="#FFCC00" />
      <path
        d="M6 8h2l2 6 2-6h2v8h-1.5v-5.5L10.5 16h-1L7.5 10.5V16H6V8zm8 0h4v1.5h-2.5V11H18v1.5h-2.5V15H18V16h-4V8z"
        fill="#000"
      />
    </svg>
  ),
  airtel: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect width="24" height="24" rx="4" fill="#E60012" />
      <path d="M7 8h2l3 8h-1.5l-.5-1.5H7l-.5 1.5H5L7 8zm1 2l-1 3h2l-1-3zm6-2h4v1.5h-2.5v6.5H14V8z" fill="#FFF" />
    </svg>
  ),
  stripe: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect width="24" height="24" rx="4" fill="#635BFF" />
      <path
        d="M13.976 9.15c-2.172-.806-3.596-1.191-3.596-2.2 0-.896.869-1.46 2.253-1.46a9.77 9.77 0 0 1 4.621 1.369l.811-2.596a11.63 11.63 0 0 0-5.432-1.369C9.253 2.894 7.183 4.776 7.183 7.289c0 2.554 1.807 3.665 4.266 4.554 2.172.806 3.596 1.191 3.596 2.2 0 .896-.869 1.46-2.253 1.46a9.77 9.77 0 0 1-4.621-1.369L7.36 16.73a11.63 11.63 0 0 0 5.432 1.369c3.38 0 5.45-1.882 5.45-4.395 0-2.554-1.807-3.665-4.266-4.554z"
        fill="#FFF"
      />
    </svg>
  ),
  visa: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect width="24" height="24" rx="4" fill="#1A1F71" />
      <path d="M8.5 8l-1.5 8h2l1.5-8h-2zm4.5 0l-1 8h2l1-8h-2zm3.5 0l-.5 8h2l.5-8h-2z" fill="#FFF" />
    </svg>
  ),
  check: Check,
  close: X,
}
