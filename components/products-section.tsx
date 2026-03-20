'use client'

import { useState, useMemo } from 'react'
import { ProductCard } from './product-card'
import { products } from '@/lib/products'
import { useQuotation } from '@/hooks/use-quotation'
import { motion } from 'framer-motion'

const CATEGORIES = ['All', 'Pipes', 'Valves', 'Fittings', 'Gas Parts', 'Filters', 'Gauges']

export function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const { quotation, addItem } = useQuotation()

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Get quantity for each product in quotation
  const getProductQuantity = (productId: string) => {
    return (
      quotation.items.find((item) => item.id === productId)?.quantity || 0
    )
  }

  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-lg text-muted-foreground">
            Browse our comprehensive catalog of quality plumbing and gas parts
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap gap-3 justify-center"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:border-primary/50'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <ProductCard
                  {...product}
                  quantity={getProductQuantity(product.id)}
                  onAddToQuote={addItem}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-lg text-muted-foreground">
              No products found matching your criteria
            </p>
          </motion.div>
        )}

        {/* Results Info */}
        {filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
