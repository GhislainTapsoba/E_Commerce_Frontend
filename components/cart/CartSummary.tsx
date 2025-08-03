"use client"

import { useCart } from "@/lib/hooks/useCart"
import { formatPrice } from "@/lib/utils/format"
import { calculateCartTotal } from "@/lib/utils/cart"
import { Separator } from "@/components/ui/separator"

export default function CartSummary() {
  const { items } = useCart()
  const subtotal = calculateCartTotal(items)
  const deliveryFee = 0 // This will be dynamic based on selected zone in order form

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Sous-total</span>
        <span className="font-medium">{formatPrice(subtotal)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Frais de livraison</span>
        <span className="font-medium">{formatPrice(deliveryFee)}</span>
      </div>
      <Separator />
      <div className="flex items-center justify-between font-semibold text-lg">
        <span>Total</span>
        <span>{formatPrice(subtotal + deliveryFee)}</span>
      </div>
    </div>
  )
}
