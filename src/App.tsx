import HeroSection from "./components/hero-section"
import Navbar04Page from "./components/navbar-04/navbar-04"
import Footer05Page from "./components/footer-05/footer-05"
import CarouselWithProgress from "./components/carousel"
import TechStack from "./components/tech-stack"
import AboutMe from "./components/about-me"
import CallToAction from "./components/CTA"
import FeatureProject from "./components/feature-projects"
import MySkill from "./components/my-skill"

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden scroll-smooth">
      <Navbar04Page />
      <main className="space-y-0">
        <HeroSection />
        <AboutMe />
        <MySkill />
        <FeatureProject />
        <CarouselWithProgress />
        <TechStack />
        <CallToAction />
      </main>
      <Footer05Page />
    </div>
  )
}