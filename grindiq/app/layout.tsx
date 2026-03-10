import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GrindIQ',
  description: 'Smart grind calculator for specialty coffee',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'GrindIQ' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#C8922A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen" style={{ background: '#F5F0E8' }}>
        {children}
      </body>
    </html>
  )
}
