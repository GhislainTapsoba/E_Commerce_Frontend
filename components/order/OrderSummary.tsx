import type { CartItem } from "@/types/order"
import { formatPrice } from "@/lib/utils/format"
import { calculateCartTotal } from "@/lib/utils/cart"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface OrderSummaryProps {
  cartItems: CartItem[]
  deliveryFee: number
}

export default function OrderSummary({ cartItems, deliveryFee }: OrderSummaryProps) {
  const subtotal = calculateCartTotal(cartItems)
  const total = subtotal + deliveryFee

  return (
    <div className="grid gap-6">
      <h2 className="text-xl font-bold">Récapitulatif de la commande</h2>
      <div className="grid gap-4">
        {cartItems.map((item) => (
          <div key={item.productId} className="flex items-center gap-4">
            <Image
              src={item.image || "/placeholder.svg?height=64&width=64&text=Product"}
              alt={item.name}
              width={64}
              height={64}
              className="aspect-square rounded-md object-cover"
            />
            <div className="grid flex-1 gap-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                {item.quantity} x {formatPrice(item.price)}
              </p>
            </div>
            <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <Separator />
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
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  )
}
