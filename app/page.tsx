import { TickerBar } from "@/components/newztrade/TickerBar"
import { Header } from "@/components/newztrade/Header"
import { Hero } from "@/components/newztrade/Hero"
import { NewsGrid } from "@/components/newztrade/NewsGrid"
import { NepseSpotlight } from "@/components/newztrade/NepseSpotlight"
import { Movers } from "@/components/newztrade/Movers"
import { DailyDigestStrip } from "@/components/newztrade/DailyDigestStrip"
import { Newsletter } from "@/components/newztrade/Newsletter"
import { Footer } from "@/components/newztrade/Footer"

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NewzTrade",
  url: "https://newztrade.com",
  description:
    "Clean, fast trading news across stocks, crypto, forex, commodities and Nepal's NEPSE market.",
  publisher: { "@type": "Organization", name: "NewzTrade" },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <TickerBar />
      <Header />
      <main>
        <Hero />
        <NewsGrid />
        <NepseSpotlight />
        <Movers />
        <DailyDigestStrip />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
