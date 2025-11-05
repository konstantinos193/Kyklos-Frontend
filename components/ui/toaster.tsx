"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Choose icon based on variant
        let Icon = null
        if (variant === "success") {
          Icon = CheckCircle2
        } else if (variant === "destructive") {
          Icon = XCircle
        } else {
          Icon = AlertCircle
        }

        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-start gap-3 w-full">
              {Icon && (
                <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${
                  variant === "success" 
                    ? "text-green-600 dark:text-green-400" 
                    : variant === "destructive"
                    ? "text-red-600 dark:text-red-400"
                    : "text-foreground"
                }`} />
              )}
              <div className="grid gap-1 flex-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </div>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
