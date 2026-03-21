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
  const [heroInView, setHeroInView] = useState(true)
  const { itemCount, totalQuantity } = useQuotation()
  const { open: openCart } = useQuotationPanel()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const io = new IntersectionObserver(
      ([e]) => setHeroInView(e.isIntersecting),
      { threshold: 0, rootMargin: '0px' }
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  const barElevated = scrolled || isOpen

  const headerSurface =
    !heroInView
      ? 'bg-background/92 backdrop-blur-md border-b border-border/40 shadow-sm'
      : barElevated
        ? 'bg-white/60 backdrop-blur-md border-b border-border/30 shadow-sm'
        : 'bg-transparent border-b border-transparent shadow-none'

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const goToProducts = () => scrollToSection('products')

  const linkClass = 'text-foreground hover:text-primary transition-colors'

  const iconBtnClass = 'text-foreground'

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 ease-out',
        headerSurface
      )}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm drop-shadow-sm"
          aria-label="DIBRO SAC — Inicio"
        >
          <Image
            src="/dibro-logo.png"
            alt="DIBRO SAC"
            width={320}
            height={264}
            priority
            className="h-[60px] w-auto sm:h-[68px] md:h-[76px] lg:h-[84px] object-contain object-left"
          />
        </button>

        <nav className="hidden md:flex items-center gap-8">
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
              <span className="absolute -top-2 -right-2 bg-destructive text-white rounded-full min-w-[1.25rem] h-5 px-1 text-[10px] font-bold flex items-center justify-center leading-none">
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
            className={cn('md:hidden p-1', iconBtnClass)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          className={cn(
            'md:hidden border-t backdrop-blur-xl',
            heroInView
              ? 'bg-white/88 border-border/35'
              : 'bg-background/95 border-border/50'
          )}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className={cn(linkClass, 'text-left py-2')}
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className={cn(linkClass, 'text-left py-2')}
            >
              Nosotros
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('products')}
              className={cn(linkClass, 'text-left py-2')}
            >
              Productos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className={cn(linkClass, 'text-left py-2')}
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
