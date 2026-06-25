import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About"
import Service from "@/components/Service"
import Stack from "@/components/Stack"
import Projects from "@/components/Projects"
import MusicPlayer from "@/components/musicPlayer"
import Testimonials from "@/components/Testimonals"
//import Gallery from "@/components/Gallery"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"



export default function Home() {
  return (
    <div
      className="min-h-screen bg-[#09090b] text-[#f4f4f5] overflow-x-hidden"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(124,58,237,0.3) transparent",
      }}
    >
  <Navbar />

      <main>
       <Hero />

       <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
        </div>

        <About />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
        </div>

        <Service />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
        </div>

        <Stack />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
        </div>

         <Projects />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
        </div>

        <Testimonials />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
        </div>

        {/*<Gallery />

         <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
        </div>*/}

          <Contact />
      </main>

      <MusicPlayer />
      <Footer />
    </div>
  );
}
