import SmoothLoader from "@/components/SmoothLoader"
import Container from "@/components/Home/HomePage"

export const metadata = {
  title: "Home",
  description: "A personal portfolio website built with Next.js and Tailwind CSS.",
  image: "/placeholder.svg",
  date: "2022-01-01",
  tags: ["next.js", "tailwindcss"],
}

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <SmoothLoader />
      <Container />
    </div>
  )
}