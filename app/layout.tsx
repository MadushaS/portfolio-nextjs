// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { IBM_Plex_Sans } from 'next/font/google'
import { Chivo } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { FollowerPointerBody } from '@/components/ui/PointerBody'

const ibm_plex_sans = IBM_Plex_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm_plex_sans',
  weight: ['400', '700'],
})
const chivo = Chivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-chivo',
})

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <FollowerPointerBody title="Madusha" className={ibm_plex_sans.className + ' ' + chivo.variable + ' cursor-none lg:cursor-auto w-full bg-slate-100 dark:bg-slate-900 transition-colors overflow-x-hidden'} >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          {children}
        </ThemeProvider>
      </FollowerPointerBody>
    </html >
  )
}