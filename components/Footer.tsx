import { Facebook, Github, Linkedin, LucideProps, Twitter } from "lucide-react"
import Link from "next/link"

const navigation = [
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/madusha.kv',
        icon: (props: LucideProps) => <Facebook {...props} />,
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/_MadushaS',
        icon: (props: LucideProps) => <Twitter {...props} />,
    },
    {
        name: 'GitHub',
        href: 'https://github.com/MadushaS',
        icon: (props: LucideProps) => <Github {...props} />,
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/madushasandaruwan/',
        icon: (props: LucideProps) => <Linkedin {...props} />,
    },
]

const year = new Date().getFullYear().toString()

export default function Footer(props: React.HTMLProps<HTMLDivElement>) {
    return (
        <footer className="mt-8  bg-slate-50 dark:bg-slate-800" {...props}>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-slate-600 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-200 hover:scale-110 transform transition duration-100 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full" target="_blank">
                            <span className="sr-only">{item.name}</span>
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                        </Link>
                    ))}
                </div>
                <div className="mt-8 md:mt-0 md:order-1">
                    <p className="text-center text-base text-gray-400">&copy; {year} Madusha Sandaruwan. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
