"use client"

import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils/format"
import { useCart } from "@/lib/hooks/useCart"
import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import ProductGallery from "./ProductGallery"

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <ProductGallery images={product.images.map((img) => img.url)} />
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold lg:text-4xl">{product.name}</h1>
          <p className="mt-2 text-2xl font-semibold text-primary">{formatPrice(product.price)}</p>
        </div>
        <div className="prose max-w-none text-muted-foreground">
          <p>{product.description}</p>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium">{quantity}</span>
            <Button variant="outline" size="icon" onClick={() => setQuantity((prev) => prev + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
            <Button onClick={handleAddToCart} className="ml-auto">
              Ajouter au panier
            </Button>
          </div>
          {product.stock <= 5 && product.stock > 0 && (
            <p className="text-sm text-orange-500">Seulement {product.stock} articles restants en stock !</p>
          )}
          {product.stock === 0 && <p className="text-sm text-red-500">Rupture de stock.</p>}
        </div>
      </div>
    </div>
  )
}
