'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { X, Send } from 'lucide-react'
import { buildWhatsAppMessage } from '@/lib/whatsapp-helper'
import type { QuotationData } from '@/hooks/use-quotation'

interface QuotationFormProps {
  quotation: QuotationData
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      alert('Completa todos los campos obligatorios')
      return
    }

    const whatsappMessage = buildWhatsAppMessage(formData, quotation)
    const whatsappUrl = `https://wa.me/51987654321?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')

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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-lg border border-border shadow-lg max-w-md w-full p-6 max-h-screen overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Enviar cotización por WhatsApp
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>

        {quotation.items.length > 0 && (
          <div className="bg-card p-4 rounded-lg border border-border mb-6">
            <h3 className="font-semibold text-foreground mb-2">
              Resumen de cotización
            </h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Ítems:</span>
                <span>{quotation.items.length}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal:</span>
                <span>US$ {quotation.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-primary border-t border-border pt-2 mt-2">
                <span>Total:</span>
                <span>US$ {quotation.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Nombre completo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Correo electrónico *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@empresa.com"
              className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Teléfono *
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

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Empresa
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nombre de la empresa"
              className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Mensaje adicional
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Requisitos especiales o comentarios…"
              rows={3}
              className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 gap-2">
              <Send size={18} />
              Enviar por WhatsApp
            </Button>
          </div>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Se abrirá WhatsApp para enviar la cotización a DIBRO SAC
        </p>
      </motion.div>
    </motion.div>
  )
}
