import * as React from "react"
import { cn } from "@/lib/utils"

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "destructive" | "success" | "warning" | "info"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantStyles = {
    default: "bg-background text-foreground border-border",
    destructive:
      "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/10",
    success:
      "border-green-500/50 text-primary-foreground dark:text-primary-foreground [&>svg]:text-primary bg-primary/10 dark:bg-primary/20",
    warning:
      "border-orange-500/50 text-orange-700 dark:text-orange-300 [&>svg]:text-orange-500 bg-orange-50 dark:bg-orange-950/30",
    info: "border-blue-500/50 text-blue-700 dark:text-blue-300 [&>svg]:text-blue-500 bg-blue-50 dark:bg-blue-950/30",
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground shadow-sm transition-all duration-200",
        variantStyles[variant],
        "hover:shadow-sm hover:border-opacity-90",
        className,
      )}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight text-lg", className)} {...props} />
  ),
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed opacity-90", className)} {...props} />
  ),
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

