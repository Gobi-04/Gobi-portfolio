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




// indha 3D background enakku un satisfacion ah irukku , enakku , itha example ah eduthuttu , oru scenerio vachu apdiyae portfolio venum , 

// simple ah kuduthuraatha , itha vida better ah venum , like oru small game maathiri , which means ithula ore veeta rotate panni kaatrilla , new va panna porathula , ore place la rotate pannam ah oru place la irundhu innoru place kku move aaganum ,
// simple ah kudukaatha enakku high quality ah venum 

// and also darkmode ad light mode kku font autoatic ah adjust aaganum 