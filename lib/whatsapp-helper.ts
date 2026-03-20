export interface ContactForm {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

export interface QuotationData {
  items: Array<{
    id: string
    name: string
    category: string
    price: number
    quantity: number
  }>
  total: number
  subtotal: number
  tax: number
}

export function buildWhatsAppMessage(
  contactInfo: ContactForm,
  quotation: QuotationData
): string {
  let message = '🎯 *QUOTATION REQUEST FROM DIBRO WEBSITE*\n\n'

  // Contact Information
  message += '*📋 CONTACT INFORMATION:*\n'
  message += `Name: ${contactInfo.name}\n`
  message += `Email: ${contactInfo.email}\n`
  message += `Phone: ${contactInfo.phone}\n`

  if (contactInfo.company) {
    message += `Company: ${contactInfo.company}\n`
  }

  message += '\n'

  // Quotation Items
  if (quotation.items.length > 0) {
    message += '*📦 REQUESTED ITEMS:*\n'
    message += '─'.repeat(50) + '\n\n'

    quotation.items.forEach((item, index) => {
      const itemTotal = (item.price * item.quantity).toFixed(2)
      message += `${index + 1}. *${item.name}*\n`
      message += `   Category: ${item.category}\n`
      message += `   Unit Price: $${item.price.toFixed(2)}\n`
      message += `   Quantity: ${item.quantity}\n`
      message += `   Subtotal: $${itemTotal}\n\n`
    })

    message += '─'.repeat(50) + '\n\n'

    // Totals
    message += '*💰 QUOTATION TOTALS:*\n'
    message += `Subtotal: $${quotation.subtotal.toFixed(2)}\n`
    message += `Tax (18%): $${quotation.tax.toFixed(2)}\n`
    message += `*TOTAL: $${quotation.total.toFixed(2)}*\n\n`
  }

  // Additional Message
  if (contactInfo.message) {
    message += '*💬 ADDITIONAL MESSAGE:*\n'
    message += `${contactInfo.message}\n\n`
  }

  // Footer
  message += '─'.repeat(50) + '\n'
  message += 'Generated from: DIBRO SAC Website\n'
  message += `Date: ${new Date().toLocaleDateString()}\n`
  message += `Time: ${new Date().toLocaleTimeString()}\n`

  return message
}

export function getWhatsAppContactNumber(): string {
  // Peru WhatsApp number for DIBRO SAC
  return '51987654321' // This should be replaced with the actual WhatsApp business number
}

export function openWhatsApp(message: string, phoneNumber?: string): void {
  const number = phoneNumber || getWhatsAppContactNumber()
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`

  window.open(whatsappUrl, '_blank', 'width=800,height=600')
}
