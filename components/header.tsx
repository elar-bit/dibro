'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/dibro-logo.jpg"
            alt="DIBRO SAC Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <div>
            <h1 className="text-xl font-bold text-primary">DIBRO</h1>
            <p className="text-xs text-muted-foreground">SAC</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-foreground hover:text-primary transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('products')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Products
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* CTA Button + Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button className="hidden md:inline-flex" size="sm">
            Get Quote
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-foreground hover:text-primary transition-colors text-left py-2"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors text-left py-2"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-foreground hover:text-primary transition-colors text-left py-2"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors text-left py-2"
            >
              Contact
            </button>
            <Button className="w-full" size="sm">
              Get Quote
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
