import { Header } from '../components/header'
import { Hero } from '../components/hero'
import { Features } from '../components/features'
import { HowItWorks } from '../components/how-it-works'
// import { Pricing } from '../components/pricing'
import { FAQ } from '../components/faq'
import { Footer } from '../components/footer'
import { ContactSection } from '../components/contact-section'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        {/* <Pricing /> */}
        <ContactSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

