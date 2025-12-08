"use client"

import type React from "react"

interface CenteredLayoutProps {
  children: React.ReactNode
}

export function CenteredLayout({ children }: CenteredLayoutProps) {
  return (
    <main className="min-h-svh flex flex-col items-center px-4 py-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-md w-full glass-strong shadow-2xl shadow-primary/5 md:rounded-3xl rounded-2xl p-6 md:p-8 space-y-6 border border-border/40">
        {children}
      </div>
    </main>
  )
}
