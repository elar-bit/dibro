'use client'

import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'

export function About() {
  return (
    <section
      id="about"
      className="relative bg-background pt-10 pb-16 md:pt-14 md:pb-24"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Quiénes somos
          </h2>

          <p className="text-lg text-muted-foreground mb-14 leading-relaxed text-pretty">
            Somos una empresa distribuidora joven con más de 5 años de
            experiencia, fastuoso empeño y un trabajo en equipo empeñoso y
            honesto, una labor supervisada diariamente; debido y, en consecuencia
            de ello, hemos logrado introducirnos en más de 20 distritos en la
            ciudad de Lima y teniendo presencia en diferentes ciudades del sur y
            norte del país.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-primary/10 p-2.5">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Nuestra misión
                </h3>
              </div>
              <p className="text-foreground leading-relaxed">
                Ofrecer productos de la más alta calidad y un servicio
                personalizado a nuestros clientes, trabajar con perseverancia
                para cumplir con las expectativas de todos nuestros grupos de
                interés: clientes, proveedores, colaboradores y comunidad.
              </p>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-primary/10 p-2.5">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Nuestra visión
                </h3>
              </div>
              <p className="text-foreground leading-relaxed">
                Liderar los mercados en los cuales participamos, asegurar el
                crecimiento sostenido de nuestra organización y mantener las
                buenas relaciones con nuestros clientes a través del trabajo en
                equipo, mejora continua y excelente servicio.
              </p>
            </motion.article>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
