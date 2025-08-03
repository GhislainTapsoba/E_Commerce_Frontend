"use client"

import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils/format"
import { useCart } from "@/lib/hooks/useCart"
import { Plus } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product, 1)
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <Link href={`/produits/${product.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Voir le produit {product.name}</span>
      </Link>
      <Image
        src={product.images[0]?.url || "/placeholder.svg?height=400&width=400&text=Product"}
        alt={product.name}
        width={400}
        height={400}
        className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-tight">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold">{formatPrice(product.price)}</span>
          <Button size="sm" onClick={handleAddToCart} className="z-20">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  )
}
