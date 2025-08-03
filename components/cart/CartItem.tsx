"use client"

import Image from "next/image"
import type { CartItem as TCartItem } from "@/types/order"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash } from "lucide-react"
import { useCart } from "@/lib/hooks/useCart"
import { formatPrice } from "@/lib/utils/format"
import { calculateItemTotal } from "@/lib/utils/cart"

interface CartItemProps {
  item: TCartItem
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
      <Image
        src={item.image || "/placeholder.svg?height=80&width=80&text=Product"}
        alt={item.name}
        width={80}
        height={80}
        className="aspect-square rounded-md object-cover"
      />
      <div className="grid flex-1 gap-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 bg-transparent"
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Diminuer la quantité</span>
          </Button>
          <span className="text-sm font-medium">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 bg-transparent"
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Augmenter la quantité</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="font-semibold">{formatPrice(calculateItemTotal(item))}</span>
        <Button variant="ghost" size="icon" onClick={() => removeItem(item.productId)}>
          <Trash className="h-4 w-4 text-destructive" />
          <span className="sr-only">Supprimer l'article</span>
        </Button>
      </div>
    </div>
  )
}
