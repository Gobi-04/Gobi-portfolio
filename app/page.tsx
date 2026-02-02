import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Education from "@/components/education/Education";
import Experience from "@/components/experience/Experience";
import Certifications from "@/components/certifications/Certifications";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/footer/Footer";
import Divider from "@/components/layout/Divider";
import Galaxy from "@/components/ui/Galaxy";

export default function Home() {
  return (
    <main className="h-full w-full bg-white dark:bg-[#030014] transition-colors duration-500 relative">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50 dark:opacity-100">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>
      <div className="flex flex-col gap-10 relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <Certifications />
        <ContactForm />
        <Footer />
      </div>
    </main>
  );
}