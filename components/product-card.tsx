'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus } from 'lucide-react'

interface ProductCardProps {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  onAddToQuote: (product: any) => void
  quantity: number
}

export function ProductCard({
  id,
  name,
  category,
  price,
  image,
  description,
  onAddToQuote,
  quantity,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {/* Image Container */}
      <div className="relative h-48 md:h-56 bg-muted overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title and Description */}
        <div>
          <h3 className="font-bold text-foreground text-lg mb-1 line-clamp-2">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">per unit</span>
        </div>

        {/* Quantity and Action */}
        <div className="pt-2 border-t border-border space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              In Quote:
            </span>
            <span className="text-sm font-bold text-foreground">
              {quantity}
            </span>
          </div>

          <Button
            onClick={() =>
              onAddToQuote({
                id,
                name,
                category,
                price,
                image,
              })
            }
            className="w-full gap-2"
            size="sm"
          >
            <Plus size={16} />
            Add to Quote
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
