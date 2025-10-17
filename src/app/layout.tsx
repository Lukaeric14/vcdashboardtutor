import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VC Metrics Dashboard',
  description: 'Interactive dashboard to learn and practice VC metrics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
