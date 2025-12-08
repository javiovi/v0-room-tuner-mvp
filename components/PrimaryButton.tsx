"use client"

import type { ButtonHTMLAttributes } from "react"

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function PrimaryButton({ className, children, ...props }: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        "w-full bg-primary text-primary-foreground py-4 px-6 rounded-full font-semibold text-center hover:opacity-90 transition-all active:scale-[0.98] shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
