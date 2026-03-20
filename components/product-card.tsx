'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

interface ProductCardProps {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  onAddToQuote: (product: {
    id: string
    name: string
    category: string
    price: number
    image: string
  }) => void
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
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <div className="relative h-48 md:h-56 bg-muted overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-foreground text-lg mb-1 line-clamp-2">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            US$ {price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">por unidad</span>
        </div>

        <div className="pt-2 border-t border-border space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              En cotización:
            </span>
            <span className="text-sm font-bold text-foreground">{quantity}</span>
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
            Añadir a la cotización
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
