'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'

type QuotationPanelContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
  setOpen: (open: boolean) => void
}

const QuotationPanelContext =
  createContext<QuotationPanelContextValue | null>(null)

export function QuotationPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const setOpen = useCallback((o: boolean) => setIsOpen(o), [])

  const value = useMemo(
    () => ({ isOpen, open, close, setOpen }),
    [isOpen, open, close, setOpen]
  )

  return (
    <QuotationPanelContext.Provider value={value}>
      {children}
    </QuotationPanelContext.Provider>
  )
}

export function useQuotationPanel() {
  const ctx = useContext(QuotationPanelContext)
  if (!ctx) {
    throw new Error(
      'useQuotationPanel debe usarse dentro de QuotationPanelProvider'
    )
  }
  return ctx
}
