'use client'

import { useState, useEffect, useCallback } from 'react'

export interface QuotationItem {
  id: string
  name: string
  category: string
  price: number
  image: string
  quantity: number
}

export interface QuotationData {
  items: QuotationItem[]
  total: number
  subtotal: number
  tax: number
}

const STORAGE_KEY = 'dibro_quotation'
const TAX_RATE = 0.18 // 18% tax

export function useQuotation() {
  const [quotation, setQuotation] = useState<QuotationData>({
    items: [],
    total: 0,
    subtotal: 0,
    tax: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setQuotation(parsed)
      }
    } catch (error) {
      console.error('Failed to load quotation:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save to localStorage whenever quotation changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quotation))
      } catch (error) {
        console.error('Failed to save quotation:', error)
      }
    }
  }, [quotation, isLoading])

  // Calculate totals
  const calculateTotals = useCallback((items: QuotationItem[]) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    const tax = subtotal * TAX_RATE
    const total = subtotal + tax

    return {
      items,
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100,
    }
  }, [])

  // Add or update item
  const addItem = useCallback(
    (product: {
      id: string
      name: string
      category: string
      price: number
      image: string
    }) => {
      setQuotation((prev) => {
        const existingItem = prev.items.find((item) => item.id === product.id)

        let newItems: QuotationItem[]

        if (existingItem) {
          newItems = prev.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        } else {
          newItems = [
            ...prev.items,
            {
              ...product,
              quantity: 1,
            },
          ]
        }

        return calculateTotals(newItems)
      })
    },
    [calculateTotals]
  )

  // Update quantity
  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setQuotation((prev) => {
        let newItems: QuotationItem[]

        if (quantity <= 0) {
          newItems = prev.items.filter((item) => item.id !== productId)
        } else {
          newItems = prev.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
        }

        return calculateTotals(newItems)
      })
    },
    [calculateTotals]
  )

  // Remove item
  const removeItem = useCallback(
    (productId: string) => {
      setQuotation((prev) => {
        const newItems = prev.items.filter((item) => item.id !== productId)
        return calculateTotals(newItems)
      })
    },
    [calculateTotals]
  )

  // Clear all items
  const clearQuotation = useCallback(() => {
    setQuotation({
      items: [],
      total: 0,
      subtotal: 0,
      tax: 0,
    })
  }, [])

  return {
    quotation,
    addItem,
    updateQuantity,
    removeItem,
    clearQuotation,
    isLoading,
    itemCount: quotation.items.length,
  }
}
