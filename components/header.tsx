'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useQuotation } from '@/hooks/use-quotation'
import { useQuotationPanel } from '@/contexts/quotation-panel-context'
import { cn } from '@/lib/utils'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { itemCount, totalQuantity } = useQuotation()
  const { open: openCart } = useQuotationPanel()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const goToProducts = () => scrollToSection('products')

  const linkClass = 'text-foreground hover:text-primary transition-colors'

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white transition-shadow duration-300',
        scrolled && 'shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="flex shrink-0 items-center gap-2 rounded-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label="DIBRO SAC — Inicio"
        >
          <Image
            src="/dibro-logo.png"
            alt="DIBRO SAC"
            width={320}
            height={264}
            priority
            className="h-[60px] w-auto object-contain object-left sm:h-[68px] md:h-[76px] lg:h-[84px]"
          />
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          <button type="button" onClick={() => scrollToSection('hero')} className={linkClass}>
            Inicio
          </button>
          <button type="button" onClick={() => scrollToSection('about')} className={linkClass}>
            Nosotros
          </button>
          <button type="button" onClick={() => scrollToSection('products')} className={linkClass}>
            Productos
          </button>
          <button type="button" onClick={() => scrollToSection('contact')} className={linkClass}>
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
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold leading-none text-white">
                {totalQuantity}
              </span>
            </Button>
          )}
          <Button className="hidden md:inline-flex" size="sm" onClick={goToProducts}>
            Solicitar cotización
          </Button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-foreground md:hidden"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="border-t border-neutral-100/80 bg-white md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className={cn(linkClass, 'py-2 text-left')}
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className={cn(linkClass, 'py-2 text-left')}
            >
              Nosotros
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('products')}
              className={cn(linkClass, 'py-2 text-left')}
            >
              Productos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className={cn(linkClass, 'py-2 text-left')}
            >
              Contacto
            </button>
            {itemCount > 0 && (
              <Button
                variant="outline"
                className="relative w-full gap-2"
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
