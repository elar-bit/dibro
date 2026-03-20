'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useQuotation } from '@/hooks/use-quotation'
import { useQuotationPanel } from '@/contexts/quotation-panel-context'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { itemCount, totalQuantity } = useQuotation()
  const { open: openCart } = useQuotationPanel()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const goToProducts = () => scrollToSection('products')

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/dibro-logo.jpg"
            alt="Logo DIBRO SAC"
            width={40}
            height={40}
            className="rounded"
          />
          <div>
            <h1 className="text-xl font-bold text-primary">DIBRO</h1>
            <p className="text-xs text-muted-foreground">SAC</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Inicio
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Nosotros
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('products')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Productos
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Contacto
          </button>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {itemCount > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="relative shrink-0 px-3"
              onClick={openCart}
              aria-label="Abrir cotización"
            >
              <ShoppingCart className="size-4" />
              <span className="absolute -top-2 -right-2 bg-destructive text-white rounded-full min-w-[1.25rem] h-5 px-1 text-[10px] font-bold flex items-center justify-center leading-none">
                {totalQuantity}
              </span>
            </Button>
          )}
          <Button
            className="hidden md:inline-flex"
            size="sm"
            onClick={goToProducts}
          >
            Solicitar cotización
          </Button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-1"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="text-foreground hover:text-primary transition-colors text-left py-2"
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors text-left py-2"
            >
              Nosotros
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('products')}
              className="text-foreground hover:text-primary transition-colors text-left py-2"
            >
              Productos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors text-left py-2"
            >
              Contacto
            </button>
            {itemCount > 0 && (
              <Button
                variant="outline"
                className="w-full gap-2 relative"
                onClick={() => {
                  openCart()
                  setIsOpen(false)
                }}
              >
                <ShoppingCart className="size-4" />
                Ver cotización ({totalQuantity})
              </Button>
            )}
            <Button className="w-full" size="sm" onClick={goToProducts}>
              Solicitar cotización
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
