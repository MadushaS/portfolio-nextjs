'use client'

import About from "./About"
import Footer from "../Footer"
import Hero from "./Hero"
import Projects from "./Projects"
import Services from "./Services"
import TechStack from "./TechStack"
import TopArticles from "./TopArticles"
import { AuroraBackground } from "../ui/Aurora"
import NavBar from "../Navbar"
import ContactForm from "./ConatctMe"
import React from "react"
import Events from "./Events"

export default function HomePage() {
  return (
    <>
      <AuroraBackground className="absolute inset-0 overflow-hidden" />
      <NavBar />
      <Hero id="home" />
      <Services id="services" />
      <TechStack id="techstack" />
      <About id="about" />
      <Projects id="projects" />
      {0 && <TopArticles id="toparticles" />}
      <Events id="events" />
      <ContactForm id="contact" />
      <Footer id="footer" />
    </>
  )
}