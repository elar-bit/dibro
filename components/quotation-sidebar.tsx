'use client'

import { useState } from 'react'
import { useQuotation } from '@/hooks/use-quotation'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  MessageCircle,
  Download,
} from 'lucide-react'
import Image from 'next/image'
import { QuotationForm } from './quotation-form'
import { generatePDF } from '@/lib/pdf-generator'

export function QuotationSidebar() {
  const { quotation, removeItem, updateQuantity, clearQuotation, itemCount } =
    useQuotation()
  const [isOpen, setIsOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleDownloadPDF = () => {
    generatePDF(quotation)
  }

  return (
    <>
      {/* Fixed Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
        >
          <ShoppingCart size={24} />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-0 right-0 top-0 w-full md:hidden bg-card border-l border-border shadow-lg z-50 flex flex-col"
          >
            <SidebarContent
              quotation={quotation}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
              clearQuotation={clearQuotation}
              onClose={() => setIsOpen(false)}
              onDownloadPDF={handleDownloadPDF}
              onSendMessage={() => {
                setIsOpen(false)
                setShowForm(true)
              }}
              onContactUs={() => {
                setIsOpen(false)
                document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed right-0 top-0 h-screen w-96 bg-card border-l border-border shadow-lg z-40 flex flex-col overflow-hidden">
        <SidebarContent
          quotation={quotation}
          removeItem={removeItem}
          updateQuantity={updateQuantity}
          clearQuotation={clearQuotation}
          onClose={() => {}}
          onDownloadPDF={handleDownloadPDF}
          onSendMessage={() => setShowForm(true)}
          onContactUs={() => {
            document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth',
            })
          }}
        />
      </div>

      {/* Quotation Form Modal */}
      {showForm && (
        <QuotationForm
          quotation={quotation}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  )
}

interface SidebarContentProps {
  quotation: any
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearQuotation: () => void
  onClose: () => void
  onDownloadPDF: () => void
  onSendMessage: () => void
  onContactUs: () => void
}

function SidebarContent({
  quotation,
  removeItem,
  updateQuantity,
  clearQuotation,
  onClose,
  onDownloadPDF,
  onSendMessage,
  onContactUs,
}: SidebarContentProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <ShoppingCart size={24} />
          Your Quote
        </h2>
        <button
          onClick={onClose}
          className="md:hidden text-muted-foreground hover:text-foreground"
        >
          <X size={24} />
        </button>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-6">
        {quotation.items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No items in your quote yet</p>
            <p className="text-sm mt-2">
              Add products from the catalog to get started
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {quotation.items.map((item: any) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-background p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                {/* Product Info */}
                <div className="flex gap-3 mb-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded object-cover w-16 h-16"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.category}
                    </p>
                    <p className="font-bold text-primary mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-muted rounded">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="p-1 hover:bg-background transition-colors"
                    >
                      <Minus size={16} className="text-foreground" />
                    </button>
                    <span className="px-2 text-foreground font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 hover:bg-background transition-colors"
                    >
                      <Plus size={16} className="text-foreground" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Item Total */}
                <div className="mt-3 pt-3 border-t border-border text-right">
                  <p className="text-xs text-muted-foreground">Subtotal</p>
                  <p className="font-bold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer with Totals and Actions */}
      <div className="border-t border-border p-6 bg-background space-y-4">
        {quotation.items.length > 0 && (
          <>
            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal:</span>
                <span>${quotation.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (18%):</span>
                <span>${quotation.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-primary border-t border-border pt-2">
                <span>Total:</span>
                <span>${quotation.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Button
                onClick={onDownloadPDF}
                variant="outline"
                className="w-full gap-2"
              >
                <Download size={18} />
                Download PDF
              </Button>
              <Button onClick={onSendMessage} className="w-full gap-2">
                <MessageCircle size={18} />
                Send via WhatsApp
              </Button>
              <Button
                onClick={clearQuotation}
                variant="ghost"
                className="w-full text-destructive hover:text-destructive"
              >
                Clear Quote
              </Button>
            </div>
          </>
        )}

        {quotation.items.length === 0 && (
          <Button onClick={onContactUs} className="w-full">
            Contact Us
          </Button>
        )}
      </div>
    </>
  )
}
