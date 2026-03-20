import jsPDF from 'jspdf'

export interface QuotationData {
  items: Array<{
    id: string
    name: string
    category: string
    price: number
    image: string
    quantity: number
  }>
  total: number
  subtotal: number
  tax: number
}

export function generatePDF(quotation: QuotationData) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  // Colors matching the theme
  const primaryColor = [53, 93, 147] // Primary blue
  const darkColor = [38, 45, 64] // Dark blue
  const lightColor = [235, 238, 243] // Light blue

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 15

  let yPos = margin

  // Header
  pdf.setFillColor(...primaryColor)
  pdf.rect(0, 0, pageWidth, 40, 'F')

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(24)
  pdf.setFont('helvetica', 'bold')
  pdf.text('DIBRO SAC', margin, 25)

  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Industrial Plumbing & Gas Parts Supplier', margin, 32)

  yPos = 50

  // Company Info
  pdf.setTextColor(...darkColor)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'bold')
  pdf.text('DIBRO SAC', margin, yPos)

  pdf.setFont('helvetica', 'normal')
  yPos += 5
  pdf.text('Lima, Peru', margin, yPos)
  yPos += 5
  pdf.text('Phone: +51 987 654 321', margin, yPos)
  yPos += 5
  pdf.text('Email: info@dibro.pe', margin, yPos)

  yPos += 12

  // Title
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text('QUOTATION', margin, yPos)

  // Quote Details
  yPos += 10
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  const quoteDate = new Date().toLocaleDateString()
  const quoteNumber = `QT-${Date.now().toString().slice(-6)}`

  pdf.text(`Quote #: ${quoteNumber}`, margin, yPos)
  yPos += 5
  pdf.text(`Date: ${quoteDate}`, margin, yPos)
  yPos += 5
  pdf.text(`Valid for: 30 days`, margin, yPos)

  yPos += 10

  // Table Headers
  pdf.setFillColor(...lightColor)
  pdf.rect(margin, yPos - 4, pageWidth - 2 * margin, 7, 'F')

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(9)
  pdf.setTextColor(...darkColor)

  const col1 = margin + 2
  const col2 = col1 + 90
  const col3 = col2 + 25
  const col4 = col3 + 20
  const col5 = col4 + 25

  pdf.text('Product', col1, yPos)
  pdf.text('Category', col2, yPos)
  pdf.text('Qty', col3, yPos)
  pdf.text('Unit Price', col4, yPos)
  pdf.text('Total', col5, yPos)

  yPos += 10

  // Table Data
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(8)

  quotation.items.forEach((item, index) => {
    // Check if we need a new page
    if (yPos > pageHeight - 50) {
      pdf.addPage()
      yPos = margin

      // Repeat headers on new page
      pdf.setFillColor(...lightColor)
      pdf.rect(margin, yPos - 4, pageWidth - 2 * margin, 7, 'F')
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(9)
      pdf.text('Product', col1, yPos)
      pdf.text('Category', col2, yPos)
      pdf.text('Qty', col3, yPos)
      pdf.text('Unit Price', col4, yPos)
      pdf.text('Total', col5, yPos)
      yPos += 10
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(8)
    }

    // Alternate row background
    if (index % 2 === 0) {
      pdf.setFillColor(245, 248, 252)
      pdf.rect(margin, yPos - 3, pageWidth - 2 * margin, 6, 'F')
    }

    const totalPrice = (item.price * item.quantity).toFixed(2)

    pdf.text(item.name.substring(0, 25), col1, yPos)
    pdf.text(item.category, col2, yPos)
    pdf.text(item.quantity.toString(), col3, yPos)
    pdf.text(`$${item.price.toFixed(2)}`, col4, yPos)
    pdf.text(`$${totalPrice}`, col5, yPos)

    yPos += 6
  })

  yPos += 5

  // Totals Section
  const totalsX = col4
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(9)

  // Subtotal
  pdf.text('Subtotal:', totalsX - 15, yPos)
  pdf.text(`$${quotation.subtotal.toFixed(2)}`, col5, yPos)
  yPos += 6

  // Tax
  pdf.text('Tax (18%):', totalsX - 15, yPos)
  pdf.text(`$${quotation.tax.toFixed(2)}`, col5, yPos)
  yPos += 6

  // Total
  pdf.setFillColor(...primaryColor)
  pdf.rect(totalsX - 20, yPos - 4, 45, 8, 'F')
  pdf.setTextColor(255, 255, 255)
  pdf.text('TOTAL:', totalsX - 15, yPos + 1)
  pdf.text(`$${quotation.total.toFixed(2)}`, col5, yPos + 1)

  yPos += 12

  // Notes
  pdf.setTextColor(...darkColor)
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(9)
  pdf.text('Notes:', margin, yPos)

  yPos += 5
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(8)

  const notes = [
    'This quotation is valid for 30 days from the issue date.',
    'Prices are in USD and do not include shipping costs.',
    'Payment terms are net 30 days from date of invoice.',
    'Products are subject to availability and stock confirmation.',
  ]

  notes.forEach((note) => {
    if (yPos > pageHeight - 30) {
      pdf.addPage()
      yPos = margin
    }
    pdf.text('• ' + note, margin + 5, yPos, { maxWidth: pageWidth - 2 * margin - 5 })
    yPos += 5
  })

  // Footer
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(8)
  pdf.setTextColor(120, 120, 120)
  pdf.text(
    'For more information, contact us at info@dibro.pe or call +51 987 654 321',
    pageWidth / 2,
    pageHeight - 10,
    { align: 'center' }
  )

  // Save the PDF
  const fileName = `DIBRO_Quotation_${quoteNumber}_${new Date().toISOString().split('T')[0]}.pdf`
  pdf.save(fileName)
}
