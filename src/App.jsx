import Preloader from './components/Preloader.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import AmbientScene from './components/three/AmbientScene.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Education from './components/Education.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Certificates from './components/Certificates.jsx'
import Languages from './components/Languages.jsx'
import Interests from './components/Interests.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
export default function App() {
  return (
    <div className="relative">
      <Preloader />
      <CustomCursor />
      <ScrollProgress />

      {/* fixed 3D field behind everything */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <AmbientScene />
      </div>

      {/* page content above the 3D field */}
      <div className="relative z-[2]">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <Languages />
          <Interests />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* subtle film grain for a premium finish */}
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  )
}