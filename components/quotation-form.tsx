'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { X, Send } from 'lucide-react'
import { buildWhatsAppMessage } from '@/lib/whatsapp-helper'

interface QuotationFormProps {
  quotation: any
  onClose: () => void
}

export function QuotationForm({ quotation, onClose }: QuotationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields')
      return
    }

    // Build WhatsApp message
    const whatsappMessage = buildWhatsAppMessage(formData, quotation)

    // Send to WhatsApp
    const whatsappUrl = `https://wa.me/51987654321?text=${encodeURIComponent(whatsappMessage)}`

    // Open WhatsApp
    window.open(whatsappUrl, '_blank')

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    })

    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-lg border border-border shadow-lg max-w-md w-full p-6 max-h-screen overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Send Quote via WhatsApp</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Quote Summary */}
        {quotation.items.length > 0 && (
          <div className="bg-card p-4 rounded-lg border border-border mb-6">
            <h3 className="font-semibold text-foreground mb-2">Quote Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Items:</span>
                <span>{quotation.items.length}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal:</span>
                <span>${quotation.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-primary border-t border-border pt-2 mt-2">
                <span>Total:</span>
                <span>${quotation.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+51 987 654 321"
              className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground"
              required
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
              className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Additional Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any special requirements or notes..."
              rows={3}
              className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 gap-2">
              <Send size={18} />
              Send via WhatsApp
            </Button>
          </div>
        </form>

        {/* Info */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          You will be redirected to WhatsApp to send the quotation to DIBRO SAC
        </p>
      </motion.div>
    </motion.div>
  )
}
