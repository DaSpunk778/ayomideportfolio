import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About"
import Service from "@/components/Service"
//import { Terminal } from "@/components/ui/terminal"
import HowIwork from "@/components/HowIwork"
import Stack from "@/components/Stack"
//import project from "@/components/project"
import MusicPlayer from "@/components/musicPlayer"
//import Testimonials from "@/components/Testimonals"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import AnimatedTestimonialsDemo from "@/components/AnimatedTestimonialsDemo";
import MusicPlaylist from "@/components/MusicPlayist";
//import Project from "@/components/project";
import PortfolioSection from "@/components/PortfolioSection";
import SmoothScroll from "@/components/SmoothScroll";



export default function Home() {
  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(124,58,237,0.3) transparent",
      }}
    >
      <Navbar />

      <SmoothScroll>
      <main>
        <Hero />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
        </div>

        <About />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
        </div>

        <Service />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
        </div>

        <HowIwork/>

       {/* <Project /> */}
       <PortfolioSection />

        {/* <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
        </div> */}

        <Stack />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
        </div>

        <AnimatedTestimonialsDemo />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
        </div>

        <MusicPlaylist />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
        </div>

        {/*<Gallery />

         <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
        </div>*/}

        <Contact />
      </main>

      <Footer />
      </SmoothScroll>

      <MusicPlayer />
    </div>
  );
}
