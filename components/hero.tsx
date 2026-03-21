'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduceMotion || !videoRef.current) return
    videoRef.current.play().catch(() => {})
  }, [reduceMotion])

  return (
    <section
      id="hero"
      className="relative isolate -mt-32 flex min-h-[min(92vh,880px)] items-center overflow-hidden pt-32 pb-20 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {!reduceMotion && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full scale-105 object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          >
            <source src="/bgvideo.mp4" type="video/mp4" />
          </video>
        )}
        {/* Velos suaves: el vídeo se ve con claridad; refuerzo ligero arriba/abajo para el texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl space-y-6 text-center md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] md:text-6xl">
              Fontanería industrial y
              <span className="mt-2 block text-primary drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                suministros de gas
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
          >
            Componentes y repuestos de primera calidad para empresas en todo el
            Perú. Más de 5 años de experiencia acompañando a profesionales del
            sector.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Button
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
              size="lg"
              className="text-base"
            >
              Ver catálogo
            </Button>
            <Button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
              variant="outline"
              size="lg"
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              Contáctanos
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto max-w-xl border-t border-white/25 pt-8 md:pt-12"
          >
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-bold text-primary md:text-3xl">5+</p>
                <p className="text-sm text-white/75">
                  Años de experiencia
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary md:text-3xl">
                  500+
                </p>
                <p className="text-sm text-white/75">Productos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary md:text-3xl">
                  1000+
                </p>
                <p className="text-sm text-white/75">Clientes</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
