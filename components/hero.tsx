'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section
      id="hero"
      className="py-20 md:py-32 bg-gradient-to-b from-card to-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Industrial Plumbing &
              <span className="block text-primary mt-2">Gas Parts Supplier</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Premium quality plumbing fixtures, gas components, and industrial parts for businesses throughout Peru. Trusted by professionals for over 15 years.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
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
              Browse Products
            </Button>
            <Button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
              variant="outline"
              size="lg"
              className="text-base"
            >
              Get in Touch
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-8 md:pt-12 border-t border-border"
          >
            <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  15+
                </p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  500+
                </p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  1000+
                </p>
                <p className="text-sm text-muted-foreground">Customers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
