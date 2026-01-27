import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Education from "@/components/education/Education";
import Experience from "@/components/experience/Experience";
import Testimonials from "@/components/testimonials/Testimonials";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/footer/Footer";

import Divider from "@/components/layout/Divider";
import SectionTracker from "@/components/3d/SectionTracker";
import Scene from "@/components/hero/Scene";

export default function Home() {
  return (
    <>
      <Navbar />
      <Scene />
      <SectionTracker />

      <Hero />

      <About />
      <Divider />

      <Skills />
      <Divider />

      <Projects />
      <Divider />

      <Education />
      <Divider />

      <Experience />
      <Divider />

      <Testimonials />
      <Divider />

      <ContactForm />

      <Footer />
    </>
  );
}