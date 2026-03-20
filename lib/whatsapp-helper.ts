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
  let message = '🎯 *SOLICITUD DE COTIZACIÓN – WEB DIBRO*\n\n'

  message += '*📋 DATOS DE CONTACTO:*\n'
  message += `Nombre: ${contactInfo.name}\n`
  message += `Correo: ${contactInfo.email}\n`
  message += `Teléfono: ${contactInfo.phone}\n`

  if (contactInfo.company) {
    message += `Empresa: ${contactInfo.company}\n`
  }

  message += '\n'

  if (quotation.items.length > 0) {
    message += '*📦 PRODUCTOS SOLICITADOS:*\n'
    message += '─'.repeat(50) + '\n\n'

    quotation.items.forEach((item, index) => {
      const itemTotal = (item.price * item.quantity).toFixed(2)
      message += `${index + 1}. *${item.name}*\n`
      message += `   Categoría: ${item.category}\n`
      message += `   Precio unit.: US$ ${item.price.toFixed(2)}\n`
      message += `   Cantidad: ${item.quantity}\n`
      message += `   Subtotal: US$ ${itemTotal}\n\n`
    })

    message += '─'.repeat(50) + '\n\n'

    message += '*💰 TOTALES:*\n'
    message += `Subtotal: US$ ${quotation.subtotal.toFixed(2)}\n`
    message += `IGV (18%): US$ ${quotation.tax.toFixed(2)}\n`
    message += `*TOTAL: US$ ${quotation.total.toFixed(2)}*\n\n`
  }

  if (contactInfo.message) {
    message += '*💬 MENSAJE ADICIONAL:*\n'
    message += `${contactInfo.message}\n\n`
  }

  message += '─'.repeat(50) + '\n'
  message += 'Generado desde el sitio web DIBRO SAC\n'
  message += `Fecha: ${new Date().toLocaleDateString('es-PE')}\n`
  message += `Hora: ${new Date().toLocaleTimeString('es-PE')}\n`

  return message
}

export function getWhatsAppContactNumber(): string {
  return '51987654321'
}

export function openWhatsApp(message: string, phoneNumber?: string): void {
  const number = phoneNumber || getWhatsAppContactNumber()
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`

  window.open(whatsappUrl, '_blank', 'width=800,height=600')
}
