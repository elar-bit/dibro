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

const locale = 'es-PE'

export function generatePDF(quotation: QuotationData) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const primaryColor = [53, 93, 147]
  const darkColor = [38, 45, 64]
  const lightColor = [235, 238, 243]

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 15

  let yPos = margin

  pdf.setFillColor(...primaryColor)
  pdf.rect(0, 0, pageWidth, 40, 'F')

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(24)
  pdf.setFont('helvetica', 'bold')
  pdf.text('DIBRO SAC', margin, 25)

  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Fontanería industrial y suministros de gas', margin, 32)

  yPos = 50

  pdf.setTextColor(...darkColor)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'bold')
  pdf.text('DIBRO SAC', margin, yPos)

  pdf.setFont('helvetica', 'normal')
  yPos += 5
  pdf.text('Lima, Perú', margin, yPos)
  yPos += 5
  pdf.text('Tel.: +51 987 654 321', margin, yPos)
  yPos += 5
  pdf.text('Correo: info@dibro.pe', margin, yPos)

  yPos += 12

  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text('COTIZACIÓN', margin, yPos)

  yPos += 10
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  const quoteDate = new Date().toLocaleDateString(locale)
  const quoteNumber = `COT-${Date.now().toString().slice(-6)}`

  pdf.text(`Nº: ${quoteNumber}`, margin, yPos)
  yPos += 5
  pdf.text(`Fecha: ${quoteDate}`, margin, yPos)
  yPos += 5
  pdf.text('Válida por: 30 días', margin, yPos)

  yPos += 10

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

  pdf.text('Producto', col1, yPos)
  pdf.text('Categoría', col2, yPos)
  pdf.text('Cant.', col3, yPos)
  pdf.text('P. unit.', col4, yPos)
  pdf.text('Total', col5, yPos)

  yPos += 10

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(8)

  quotation.items.forEach((item, index) => {
    if (yPos > pageHeight - 50) {
      pdf.addPage()
      yPos = margin

      pdf.setFillColor(...lightColor)
      pdf.rect(margin, yPos - 4, pageWidth - 2 * margin, 7, 'F')
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(9)
      pdf.text('Producto', col1, yPos)
      pdf.text('Categoría', col2, yPos)
      pdf.text('Cant.', col3, yPos)
      pdf.text('P. unit.', col4, yPos)
      pdf.text('Total', col5, yPos)
      yPos += 10
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(8)
    }

    if (index % 2 === 0) {
      pdf.setFillColor(245, 248, 252)
      pdf.rect(margin, yPos - 3, pageWidth - 2 * margin, 6, 'F')
    }

    const totalPrice = (item.price * item.quantity).toFixed(2)

    pdf.text(item.name.substring(0, 25), col1, yPos)
    pdf.text(item.category, col2, yPos)
    pdf.text(item.quantity.toString(), col3, yPos)
    pdf.text(`US$${item.price.toFixed(2)}`, col4, yPos)
    pdf.text(`US$${totalPrice}`, col5, yPos)

    yPos += 6
  })

  yPos += 5

  const totalsX = col4
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(9)

  pdf.text('Subtotal:', totalsX - 15, yPos)
  pdf.text(`US$${quotation.subtotal.toFixed(2)}`, col5, yPos)
  yPos += 6

  pdf.text('IGV (18%):', totalsX - 15, yPos)
  pdf.text(`US$${quotation.tax.toFixed(2)}`, col5, yPos)
  yPos += 6

  pdf.setFillColor(...primaryColor)
  pdf.rect(totalsX - 20, yPos - 4, 45, 8, 'F')
  pdf.setTextColor(255, 255, 255)
  pdf.text('TOTAL:', totalsX - 15, yPos + 1)
  pdf.text(`US$${quotation.total.toFixed(2)}`, col5, yPos + 1)

  yPos += 12

  pdf.setTextColor(...darkColor)
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(9)
  pdf.text('Notas:', margin, yPos)

  yPos += 5
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(8)

  const notes = [
    'Esta cotización tiene una validez de 30 días desde su emisión.',
    'Los precios están en dólares estadounidenses (US$) y no incluyen flete.',
    'Condiciones de pago: según acuerdo comercial.',
    'Los productos están sujetos a disponibilidad y confirmación de stock.',
  ]

  notes.forEach((note) => {
    if (yPos > pageHeight - 30) {
      pdf.addPage()
      yPos = margin
    }
    pdf.text('• ' + note, margin + 5, yPos, {
      maxWidth: pageWidth - 2 * margin - 5,
    })
    yPos += 5
  })

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(8)
  pdf.setTextColor(120, 120, 120)
  pdf.text(
    'Más información: info@dibro.pe · +51 987 654 321',
    pageWidth / 2,
    pageHeight - 10,
    { align: 'center' }
  )

  const fileName = `DIBRO_Cotizacion_${quoteNumber}_${new Date().toISOString().split('T')[0]}.pdf`
  pdf.save(fileName)
}
