'use client'

import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold">DIBRO SAC</h3>
            <p className="text-sm opacity-90">
              Proveedor de confianza en fontanería industrial y piezas de gas
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#products"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Productos
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a
                  href="tel:+51987654321"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  +51 987 654 321
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href="mailto:info@dibro.pe"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  info@dibro.pe
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span className="opacity-90">Lima, Perú</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-primary-foreground/20 my-8" />

        <div className="text-center text-sm opacity-75">
          <p>
            &copy; {currentYear} DIBRO SAC. Todos los derechos reservados. |
            Fontanería industrial y suministros de gas
          </p>
        </div>
      </div>
    </footer>
  )
}
