import { TickerBar } from "@/components/newztrade/TickerBar"
import { Header } from "@/components/newztrade/Header"
import { Hero } from "@/components/newztrade/Hero"
import { NewsGrid } from "@/components/newztrade/NewsGrid"
import { NepseSpotlight } from "@/components/newztrade/NepseSpotlight"
import { Movers } from "@/components/newztrade/Movers"
import { Newsletter } from "@/components/newztrade/Newsletter"
import { Footer } from "@/components/newztrade/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <TickerBar />
      <Header />
      <main>
        <Hero />
        <NewsGrid />
        <NepseSpotlight />
        <Movers />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
