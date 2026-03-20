'use client'

import { useEffect, useState } from 'react'
import { useQuotation } from '@/hooks/use-quotation'
import { useQuotationPanel } from '@/contexts/quotation-panel-context'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
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
import type { QuotationData } from '@/hooks/use-quotation'

export function QuotationSidebar() {
  const {
    quotation,
    removeItem,
    updateQuantity,
    clearQuotation,
    itemCount,
    totalQuantity,
  } = useQuotation()
  const { isOpen, open, close, setOpen } = useQuotationPanel()
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (itemCount === 0) {
      close()
    }
  }, [itemCount, close])

  const handleDownloadPDF = () => {
    generatePDF(quotation)
  }

  return (
    <>
      {itemCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40 md:hidden">
          <button
            type="button"
            onClick={open}
            className="relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
            aria-label="Abrir cotización"
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-destructive text-white rounded-full min-w-[1.5rem] h-6 px-1 flex items-center justify-center text-xs font-bold">
              {totalQuantity}
            </span>
          </button>
        </div>
      )}

      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-0 gap-0 flex flex-col h-full max-h-screen border-l border-border [&>button]:hidden"
        >
          <SheetHeader className="sr-only shrink-0">
            <SheetTitle>Tu cotización</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <SidebarContent
            quotation={quotation}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
            clearQuotation={clearQuotation}
            onClose={close}
            onDownloadPDF={handleDownloadPDF}
            onSendMessage={() => {
              close()
              setShowForm(true)
            }}
          />
          </div>
        </SheetContent>
      </Sheet>

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
  quotation: QuotationData
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearQuotation: () => void
  onClose: () => void
  onDownloadPDF: () => void
  onSendMessage: () => void
}

function SidebarContent({
  quotation,
  removeItem,
  updateQuantity,
  clearQuotation,
  onClose,
  onDownloadPDF,
  onSendMessage,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2 pr-8">
          <ShoppingCart size={24} />
          Tu cotización
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground absolute right-4 top-4"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        <div className="space-y-4">
            {quotation.items.map((item) => (
              <div
                key={item.id}
                className="bg-background p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
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
                      US$ {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-muted rounded">
                    <button
                      type="button"
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
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 hover:bg-background transition-colors"
                    >
                      <Plus size={16} className="text-foreground" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                    aria-label="Quitar"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-border text-right">
                  <p className="text-xs text-muted-foreground">Subtotal</p>
                  <p className="font-bold text-foreground">
                    US$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="border-t border-border p-6 bg-background space-y-4 shrink-0">
        {quotation.items.length > 0 && (
          <>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal:</span>
                <span>US$ {quotation.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>IGV (18%):</span>
                <span>US$ {quotation.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-primary border-t border-border pt-2">
                <span>Total:</span>
                <span>US$ {quotation.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Button
                onClick={onDownloadPDF}
                variant="outline"
                className="w-full gap-2"
              >
                <Download size={18} />
                Descargar PDF
              </Button>
              <Button onClick={onSendMessage} className="w-full gap-2">
                <MessageCircle size={18} />
                Enviar por WhatsApp
              </Button>
              <Button
                onClick={clearQuotation}
                variant="ghost"
                className="w-full text-destructive hover:text-destructive"
              >
                Vaciar cotización
              </Button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
