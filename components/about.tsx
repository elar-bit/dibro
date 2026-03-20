'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export function About() {
  const features = [
    'Materiales y componentes de primera calidad',
    'Precios competitivos y descuentos por volumen',
    'Entrega confiable en todo el Perú',
    'Asesoría técnica profesional',
    'Soluciones OEM y a medida',
    'Productos certificados según normativa',
  ]

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Sobre DIBRO SAC
          </h2>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            DIBRO SAC es un proveedor líder de fontanería industrial y piezas
            para gas en el Perú. Con más de 15 años de trayectoria, hemos
            construido nuestra reputación ofreciendo productos de calidad,
            atención cercana y entregas puntuales. Nuestro equipo trabaja junto
            a cada cliente para entender sus necesidades y ofrecer soluciones
            adecuadas.
          </p>

          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Nos asociamos con fabricantes de primer nivel para que cada producto
            cumpla los más altos estándares de calidad y desempeño. Ya sea que
            seas contratista, instalador o empresa, DIBRO SAC es tu aliado en
            suministros de fontanería y gas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-foreground text-lg">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
