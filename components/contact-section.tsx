'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Globe,
} from 'lucide-react'

export function ContactSection() {
  const contactChannels = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+51 987 654 321',
      href: 'tel:+51987654321',
      description: 'Call us for immediate assistance',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@dibro.pe',
      href: 'mailto:info@dibro.pe',
      description: 'Send us your inquiries',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: 'Chat with us',
      href: 'https://wa.me/51987654321',
      description: 'Quick response on WhatsApp',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Lima, Peru',
      href: 'https://maps.google.com',
      description: 'Visit our office',
    },
  ]

  const businessHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ]

  return (
    <section id="contact" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Have a question or need a custom solution? Our team is here to help
          </p>
        </motion.div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactChannels.map((channel, index) => {
            const Icon = channel.icon
            return (
              <motion.a
                key={index}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background border border-border p-6 rounded-lg hover:border-primary/50 hover:shadow-md transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-1">
                  {channel.title}
                </h3>
                <p className="text-primary font-semibold text-sm mb-2">
                  {channel.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {channel.description}
                </p>
              </motion.a>
            )
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-background border border-border p-8 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-foreground">
                Business Hours
              </h3>
            </div>

            <div className="space-y-4">
              {businessHours.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-foreground font-medium">
                    {item.day}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-6 p-4 bg-muted rounded-lg">
              We respond to inquiries within 2 hours during business hours.
              WhatsApp messages are answered immediately.
            </p>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-background border border-border p-8 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-foreground">Why DIBRO?</h3>
            </div>

            <ul className="space-y-3">
              {[
                'Premium quality products from trusted manufacturers',
                'Competitive pricing with volume discounts',
                'Fast delivery throughout Peru',
                'Expert technical support and consultation',
                'Flexible payment terms for businesses',
                'Dedicated account management',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Ready to start your project? Let's connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+51987654321">
              <Button className="gap-2" size="lg">
                <Phone size={20} />
                Call Us Now
              </Button>
            </a>
            <a
              href="https://wa.me/51987654321"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2" size="lg">
                <MessageCircle size={20} />
                Message on WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
