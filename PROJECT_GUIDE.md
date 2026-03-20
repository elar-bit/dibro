# DIBRO SAC - Industrial Plumbing & Gas Parts Supplier
## Landing Page & E-Quotation Platform

### Project Overview
This is a professional B2B landing page and interactive quotation system for DIBRO SAC, a Peru-based industrial plumbing and gas parts supplier. The platform allows customers to browse a comprehensive product catalog, build custom quotations, generate PDF quotations, and send inquiries directly through WhatsApp.

---

## Key Features

### 1. **Professional Landing Page**
- Responsive design optimized for all devices
- Sticky navigation header with mobile menu
- Hero section with trust indicators
- Company information and feature highlights
- Professional styling with industrial color scheme (blues and grays)

### 2. **Dynamic Product Catalog**
- 15+ products across multiple categories (Pipes, Valves, Fittings, Gas Parts, Filters, Gauges)
- Category filtering system
- Product search functionality
- Detailed product cards with specifications
- Real-time quantity tracking in quotation

### 3. **Interactive Quotation System**
- Add/remove products from quotation
- Automatic price calculation with 18% tax
- Real-time quotation updates
- Desktop sidebar + Mobile bottom sheet UI
- Persistent storage using localStorage

### 4. **PDF Generation**
- Professional quotation PDFs with DIBRO branding
- Automatic quote numbering and dating
- Itemized product list with totals
- Notes and company information

### 5. **WhatsApp Integration**
- One-click quotation sharing via WhatsApp
- Pre-formatted message with all quotation details
- Contact form for customer inquiries
- Direct links to WhatsApp business number
- Message builder with customer information

### 6. **Contact Section**
- Multiple contact channels (Phone, Email, WhatsApp, Location)
- Business hours display
- Value propositions
- Call-to-action buttons

---

## Project Structure

```
/app
  /page.tsx                    # Main landing page
  /layout.tsx                  # Root layout with metadata
  /globals.css                 # Global styles and theme variables

/components
  /header.tsx                  # Navigation header with mobile menu
  /hero.tsx                    # Hero section with CTA
  /about.tsx                   # Company information
  /products-section.tsx        # Product grid with filters and search
  /product-card.tsx            # Individual product card component
  /quotation-sidebar.tsx       # Desktop sidebar + mobile bottom sheet
  /quotation-form.tsx          # WhatsApp inquiry form
  /contact-section.tsx         # Contact information and CTA
  /footer.tsx                  # Footer with company info

/hooks
  /use-quotation.ts            # Custom hook for quotation state management

/lib
  /products.ts                 # Product catalog data
  /pdf-generator.ts            # PDF quotation generator
  /whatsapp-helper.ts          # WhatsApp message builder
  /utils.ts                    # Utility functions (cn, etc.)

/public/images
  /dibro-logo.jpg             # Company logo
  /product-pipes.jpg          # Pipes product image
  /product-valves.jpg         # Valves product image
  /product-fittings.jpg       # Fittings product image
  /product-gas-parts.jpg      # Gas parts product image
```

---

## Technology Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4 with custom design tokens
- **UI Components**: shadcn/ui (custom component library)
- **Animations**: Framer Motion
- **PDF Generation**: jsPDF
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **Type Safety**: TypeScript

---

## Design System

### Color Palette (Industrial Blue Theme)
- **Primary**: Deep Blue (oklch(0.35 0.08 210)) - Main brand color
- **Secondary**: Steel Blue (oklch(0.45 0.04 200)) - Accent color
- **Background**: Off-white (oklch(0.98 0.001 220))
- **Foreground**: Dark Blue (oklch(0.15 0.02 210))
- **Dark Mode**: Complete dark theme support

### Typography
- **Font Family**: Geist (default system font)
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight with proper line-height for readability
- **Max font sizes**: Optimized for all screen sizes

---

## Data Management

### Products Database
Located in `/lib/products.ts`, contains 16 products with:
- Name, category, price
- Description and specifications
- Product images
- ID for unique identification

### Quotation State (useQuotation Hook)
- **localStorage Integration**: Persists quotations across sessions
- **Automatic Calculations**: Subtotal, tax (18%), and total
- **Item Management**: Add, update quantity, remove items
- **Clear Function**: Reset entire quotation

### WhatsApp Integration
- **Contact Number**: +51 987 654 321 (configurable in whatsapp-helper.ts)
- **Message Format**: Formatted with customer info and itemized list
- **URL Scheme**: Uses wa.me for direct WhatsApp links

---

## How to Use

### 1. Browsing Products
- Use category filters to narrow results
- Search by product name or description
- Click product cards to view details
- See current quantity in quotation

### 2. Creating a Quotation
- Click "Add to Quote" on any product
- Adjust quantities using +/- buttons in sidebar
- View real-time total calculations
- Remove items as needed

### 3. Sharing Quotation
**PDF Download**:
- Click "Download PDF" in sidebar
- Generates professional quotation PDF
- Includes all items, totals, and company info

**WhatsApp**:
- Click "Send via WhatsApp"
- Fill in contact information
- Message is automatically formatted
- Opens WhatsApp with pre-filled message

### 4. Contacting Support
- Use contact section for multiple channels
- Phone, email, WhatsApp links available
- Business hours clearly displayed
- Quick response indicators

---

## Customization Guide

### Adding New Products
1. Edit `/lib/products.ts`
2. Add product to `products` array with required fields:
   ```typescript
   {
     id: 'unique-id',
     name: 'Product Name',
     category: 'Category Name',
     price: 99.99,
     image: '/images/product.jpg',
     description: 'Product description',
     specifications: { /* optional */ }
   }
   ```
3. Products appear automatically in catalog

### Changing Colors
1. Edit `/app/globals.css`
2. Modify CSS custom properties in `:root` and `.dark`
3. All components automatically use new colors via design tokens

### Updating Contact Information
1. Edit `/lib/whatsapp-helper.ts` - Update `getWhatsAppContactNumber()`
2. Edit `/components/contact-section.tsx` - Update phone, email, location
3. Edit `/components/footer.tsx` - Update contact details

### Modifying Tax Rate
1. Edit `/hooks/use-quotation.ts`
2. Change `TAX_RATE` constant (currently 0.18 for 18%)

### Changing WhatsApp Phone Number
1. Edit `/lib/whatsapp-helper.ts`
2. Update the number in `getWhatsAppContactNumber()`
3. Number format: country code + phone without + or spaces

---

## Performance Optimizations

- **Image Optimization**: Next.js Image component for responsive images
- **Code Splitting**: Lazy loading with dynamic imports
- **State Management**: Efficient localStorage caching
- **Animations**: GPU-accelerated with Framer Motion
- **CSS**: Utility-first Tailwind with tree-shaking

---

## Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Deployment

The project is ready for deployment on Vercel:

1. Push to GitHub repository
2. Connect to Vercel
3. Environment variables (if any): None required for basic setup
4. Deploy automatically on push

For production:
- Update metadata in `/app/layout.tsx` with real company info
- Replace placeholder phone numbers with real contact details
- Update product images with actual product photos
- Consider adding analytics (already included: @vercel/analytics)

---

## Future Enhancements

Potential features to add:
- Product inventory management
- Customer authentication and saved quotations
- Email quotation delivery
- Advanced product filtering (price range, specifications)
- Product comparison tool
- Customer testimonials section
- Blog/resource center
- Multi-language support
- Integration with CRM system

---

## Support & Maintenance

For updates or modifications:
1. All product data is in `/lib/products.ts`
2. All contact info is centralized in components
3. Styling is controlled via theme variables
4. Components are modular and reusable
5. Quotation logic is isolated in the custom hook

---

## License & Attribution

This project was built with:
- Next.js framework
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- jsPDF library

All assets and code are for DIBRO SAC's exclusive use.
