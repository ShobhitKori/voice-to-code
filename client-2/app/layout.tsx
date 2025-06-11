import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Plus_Jakarta_Sans, VT323 } from "next/font/google"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
  variable: "--font-jakarta",
})

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
})

export const metadata: Metadata = {
  title: "Voice to Code",
  description: "Generates code from audio instruction",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${vt323.variable}`}>
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
