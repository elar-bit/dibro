'use client'

import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { ProductsSection } from '@/components/products-section'
import { ContactSection } from '@/components/contact-section'
import { QuotationSidebar } from '@/components/quotation-sidebar'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
        <About />
        <ProductsSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Quotation Sidebar - Fixed on Desktop, Bottom Sheet on Mobile */}
      <QuotationSidebar />
    </div>
  )
}
