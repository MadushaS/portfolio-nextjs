'use client'

import About from "./About"
import Hero from "./Hero"
import Projects from "./Projects"
import Services from "./Services"
import TechStack from "./TechStack"
import TopArticles from "./TopArticles"
import { AuroraBackground } from "../ui/Aurora"
import ContactMe from "./ConatctMe"
import React from "react"

export default function HomePage() {
  return (
    <>
      <AuroraBackground className="absolute inset-0 overflow-hidden" />
      <Hero id="home" />
      <Services id="services" />
      <TechStack id="techstack" />
      <About id="about" />
      <Projects id="projects" />
      <TopArticles id="toparticles" />
      <ContactMe id="contact" />
    </>
  )
}