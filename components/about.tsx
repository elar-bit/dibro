'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export function About() {
  const features = [
    'Premium quality materials and components',
    'Competitive pricing with bulk discounts',
    'Fast and reliable delivery across Peru',
    'Professional technical support and guidance',
    'OEM and custom solutions available',
    'Certified products meeting industry standards',
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
            About DIBRO SAC
          </h2>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            DIBRO SAC is a leading supplier of industrial plumbing and gas parts
            in Peru. With over 15 years of experience, we have built our
            reputation on providing high-quality products, exceptional customer
            service, and reliable delivery. Our team of experts works closely
            with customers to understand their needs and deliver tailored
            solutions.
          </p>

          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            We partner with the best manufacturers worldwide to ensure every
            product meets the highest standards of quality and performance.
            Whether you're a contractor, installer, or business owner, DIBRO
            SAC is your trusted partner for all your plumbing and gas supply
            needs.
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
