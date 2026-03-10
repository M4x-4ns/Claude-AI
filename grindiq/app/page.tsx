import { redirect } from 'next/navigation'

// Splash screen — redirect to dashboard immediately
export default function SplashPage() {
  redirect('/home')
}
