"use client"

import type React from "react"
import { Suspense } from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

function ClientLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="el">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </Suspense>
  )
}
