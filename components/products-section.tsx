'use client'

import { useState, useMemo } from 'react'
import { ProductCard } from './product-card'
import { products } from '@/lib/products'
import { useQuotation } from '@/hooks/use-quotation'
import { motion } from 'framer-motion'

const CATEGORIAS = [
  'Todos',
  'Tuberías',
  'Válvulas',
  'Racores',
  'Gas',
  'Filtros',
  'Medidores',
] as const

export function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [searchQuery, setSearchQuery] = useState('')
  const { quotation, addItem } = useQuotation()

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const getProductQuantity = (productId: string) => {
    return (
      quotation.items.find((item) => item.id === productId)?.quantity || 0
    )
  }

  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestros productos
          </h2>
          <p className="text-lg text-muted-foreground">
            Explora nuestro catálogo de piezas de fontanería y gas para
            instalaciones profesionales
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <input
            type="search"
            placeholder="Buscar productos…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap gap-3 justify-center"
        >
          {CATEGORIAS.map((category) => (
            <button
              key={category}
              type="button"
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
              No hay productos que coincidan con tu búsqueda
            </p>
          </motion.div>
        )}

        {filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredProducts.length} de {products.length} productos
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
