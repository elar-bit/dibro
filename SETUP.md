# DIBRO SAC Landing Page - Setup & Deployment Guide

## Quick Start

### Installation
1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run development server**:
   ```bash
   pnpm dev
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```

---

## Project Overview

This is a fully functional B2B landing page and quotation system with:
- Professional product catalog (15+ items)
- Interactive quotation builder
- PDF generation
- WhatsApp integration
- Responsive mobile design
- Smooth animations

---

## Key Configuration Points

### 1. WhatsApp Contact Number
**File**: `/lib/whatsapp-helper.ts`
```typescript
export function getWhatsAppContactNumber(): string {
  return '51987654321' // UPDATE THIS
}
```

### 2. Company Contact Information
**Files**:
- `/components/footer.tsx` - Phone, email, address
- `/components/contact-section.tsx` - Contact channels
- `/components/quotation-form.tsx` - Business phone

### 3. Product Catalog
**File**: `/lib/products.ts`
- Add/edit/remove products
- Update prices and descriptions
- Change product images

### 4. Tax Rate
**File**: `/hooks/use-quotation.ts`
```typescript
const TAX_RATE = 0.18 // Change from 18% to any rate
```

---

## Project Features Explained

### Landing Page Sections
1. **Header**: Sticky navigation with responsive mobile menu
2. **Hero**: Main call-to-action with trust indicators
3. **About**: Company information and key features
4. **Products**: Searchable and filterable catalog
5. **Contact**: Multiple contact methods and hours
6. **Footer**: Company info and quick links

### Quotation System
- Add products to quotation from product cards
- View quotation in desktop sidebar (right) or mobile bottom sheet
- Adjust quantities with +/- buttons
- Automatic price calculation (subtotal, 18% tax, total)
- Download as PDF
- Share via WhatsApp with pre-filled message

### Responsive Design
- Mobile-first approach
- Tablet-optimized layouts
- Desktop sidebar for quotation
- Mobile bottom sheet for quotation
- All animations smooth and performant

---

## Building & Deployment

### Development
```bash
pnpm dev
```
Runs on `http://localhost:3000` with hot reload.

### Production Build
```bash
pnpm build
pnpm start
```

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Click "Deploy"
4. Done! (No environment variables needed for basic setup)

---

## File Structure Reference

```
/app
  page.tsx ..................... Main landing page
  layout.tsx ................... Root layout with SEO metadata
  globals.css .................. Theme colors and global styles

/components
  header.tsx ................... Sticky navigation header
  hero.tsx ..................... Hero section with CTA
  about.tsx .................... Company info section
  products-section.tsx ......... Product grid with search/filter
  product-card.tsx ............. Individual product card
  quotation-sidebar.tsx ........ Quotation desktop/mobile UI
  quotation-form.tsx ........... WhatsApp inquiry form
  contact-section.tsx .......... Contact info and business hours
  footer.tsx ................... Footer with links

/hooks
  use-quotation.ts ............. Quotation state management

/lib
  products.ts .................. Product database
  pdf-generator.ts ............. PDF quotation generator
  whatsapp-helper.ts ........... WhatsApp message builder
  utils.ts ..................... Utility functions

/public/images
  dibro-logo.jpg ............... Logo image
  product-*.jpg ................ Product images
```

---

## Customization Examples

### Change Company Name
1. `/app/layout.tsx` - Update metadata title
2. `/components/header.tsx` - Update logo section
3. `/components/footer.tsx` - Update company name
4. `/components/about.tsx` - Update company description

### Update Product List
Edit `/lib/products.ts`:
```typescript
{
  id: 'new-product-id',
  name: 'New Product Name',
  category: 'Category',
  price: 25.99,
  image: '/images/product-image.jpg',
  description: 'Product description',
  specifications: {
    'Spec 1': 'Value 1',
    'Spec 2': 'Value 2'
  }
}
```

### Change Colors
Edit `/app/globals.css` color variables:
```css
:root {
  --primary: oklch(0.35 0.08 210); /* Primary blue */
  --secondary: oklch(0.45 0.04 200); /* Steel blue */
  /* ... other colors ... */
}
```

### Update WhatsApp Number
1. `/lib/whatsapp-helper.ts` - Change `getWhatsAppContactNumber()`
2. `/components/contact-section.tsx` - Update href in WhatsApp button
3. `/components/quotation-form.tsx` - Update phone number

---

## Common Questions

**Q: How do I add a new product?**
A: Edit `/lib/products.ts` and add a new object to the `products` array.

**Q: How do I change the company colors?**
A: Edit the CSS variables in `/app/globals.css` under `:root` and `.dark`.

**Q: Where is the WhatsApp phone number?**
A: `/lib/whatsapp-helper.ts` - `getWhatsAppContactNumber()` function.

**Q: How do I update the tax rate?**
A: Edit `TAX_RATE` in `/hooks/use-quotation.ts`.

**Q: Can I customize the PDF quotation?**
A: Yes, edit `/lib/pdf-generator.ts` to change formatting, colors, or layout.

**Q: Is there a database backend?**
A: No, this version uses localStorage for quotations (client-side only). The catalog is hardcoded but easily editable.

---

## Tips & Best Practices

1. **Images**: Replace placeholder images with real product photos for better conversion
2. **SEO**: Update metadata in `/app/layout.tsx` with real company info
3. **Content**: Make product descriptions detailed and benefit-focused
4. **Contact**: Ensure all contact information is accurate and current
5. **Testing**: Test on mobile devices before deployment
6. **Analytics**: The project includes Vercel Analytics (already enabled)

---

## Troubleshooting

**Issue**: WhatsApp button doesn't work
- Check that the phone number format is correct (51987654321, no + or spaces)
- Ensure the wa.me link is not blocked by browser extensions

**Issue**: PDF doesn't download
- Check browser console for errors
- Ensure jsPDF dependency is installed

**Issue**: Products don't show
- Verify `/lib/products.ts` has valid data
- Check that product images exist in `/public/images/`

**Issue**: Styling looks broken
- Clear browser cache
- Rebuild: `pnpm build`
- Check that globals.css is properly imported

---

## Next Steps

1. Update all company information
2. Replace placeholder product images
3. Add real contact numbers and emails
4. Customize color scheme if desired
5. Deploy to Vercel
6. Monitor analytics and user behavior
7. Gather customer feedback for improvements

---

## Support

For technical questions or issues:
- Check `/PROJECT_GUIDE.md` for detailed information
- Review component code for implementation details
- All components are well-commented for easy customization

---

**Ready to deploy?** You're all set! This landing page is production-ready and fully functional.
