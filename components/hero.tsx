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
      className="relative isolate -mt-px flex min-h-[min(86vh,820px)] items-center overflow-hidden py-16 pb-32 md:py-20 md:pb-40"
    >
      {/* Vídeo solo dentro del hero (debajo del header en el flujo del documento) */}
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

        {/* 1) Tira muy fina bajo el header: fundido casi imperceptible hacia el vídeo */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-[2] h-11 bg-gradient-to-b from-white from-0% via-white/18 via-35% to-transparent to-100% md:h-12"
        />

        {/* 2) Velo global: casi nada arriba, un poco más hacia el centro/abajo */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[6%] via-white/10 via-38% to-white/24 to-100%" />

        {/* 3) Fundido largo hacia Quiénes somos (oklch vía color-mix, sin línea dura) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[min(50vh,400px)] min-h-[220px]"
          style={{
            background:
              'linear-gradient(to top, var(--background) 0%, color-mix(in oklch, var(--background) 78%, transparent) 26%, color-mix(in oklch, var(--background) 38%, transparent) 52%, transparent 100%)',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl space-y-6 text-center md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl [text-shadow:0_2px_16px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.45)]">
              Fontanería industrial y
              <span className="mt-2 block text-sky-200 [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]">
                suministros de gas
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-white/92 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]"
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
              className="border-white/45 bg-white/12 text-white backdrop-blur-sm hover:border-white/55 hover:bg-white/20"
            >
              Contáctanos
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto max-w-xl pt-8 md:pt-12"
          >
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-bold text-sky-200 md:text-3xl [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
                  5+
                </p>
                <p className="text-sm text-white/80 [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
                  Años de experiencia
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-200 md:text-3xl [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
                  500+
                </p>
                <p className="text-sm text-white/80 [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
                  Productos
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-200 md:text-3xl [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
                  1000+
                </p>
                <p className="text-sm text-white/80 [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
                  Clientes
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
