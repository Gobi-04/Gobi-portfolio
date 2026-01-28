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

export default function Home() {
  return (
    <main className="h-full w-full bg-white dark:bg-[#030014] transition-colors duration-500">
      <div className="flex flex-col gap-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <Testimonials />
        <ContactForm />
        <Footer />
      </div>
    </main>
  );
}