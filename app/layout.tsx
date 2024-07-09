// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { IBM_Plex_Sans, Chivo } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { FollowerPointerBody } from '@/components/ui/PointerBody'
import NavBar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
      <FollowerPointerBody className={ibm_plex_sans.className + ' ' + chivo.variable + ' cursor-auto lg:cursor-none w-full bg-slate-100 dark:bg-slate-950 transition-colors overflow-x-hidden'} >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <NavBar />
          <div className="mt-4 sm:-mt-8 md:-mt-12 lg:-mt-16 xl:-mt-16">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </FollowerPointerBody>
    </html >
  )
}