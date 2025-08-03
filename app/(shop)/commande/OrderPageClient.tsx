"use client"

import OrderForm from "@/components/order/OrderForm"
import OrderSummary from "@/components/order/OrderSummary"
import { useCartStore } from "@/store/cartStore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createOrder } from "@/lib/api/laravel"
import type { CartItem } from "@/types/order"
import type { z } from "zod"
import type { orderFormSchema } from "@/lib/utils/validation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type OrderFormData = z.infer<typeof orderFormSchema>

export default function OrderPageClient() {
  const { items, clearCart } = useCartStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [currentDeliveryFee, setCurrentDeliveryFee] = useState(0)

  if (items.length === 0) {
    return (
      <div className="container py-8 md:py-12 text-center text-muted-foreground">
        Votre panier est vide. Veuillez ajouter des produits avant de passer commande.
        <Button asChild className="mt-4">
          <Link href="/produits">Retour à la boutique</Link>
        </Button>
      </div>
    )
  }

  const handleOrderSubmit = async (formData: OrderFormData, deliveryFee: number) => {
    setIsLoading(true)
    setOrderError(null)
    try {
      const orderItems: CartItem[] = items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }))

      const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + deliveryFee

      const orderData = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerAddress: formData.customerAddress,
        deliveryZone: formData.deliveryZone,
        remarks: formData.remarks,
        items: orderItems,
        totalAmount: totalAmount,
        deliveryFee: deliveryFee,
      }

      const newOrder = await createOrder(orderData)
      clearCart() // Clear cart after successful order
      router.push(`/commande/confirmation?orderId=${newOrder.id}`)
    } catch (error: any) {
      console.error("Erreur lors de la création de la commande:", error)
      setOrderError(error.message || "Une erreur est survenue lors de la commande. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Finaliser votre commande</h1>
      {orderError && (
        <div className="bg-destructive/10 text-destructive border border-destructive rounded-md p-4 mb-6">
          <p>{orderError}</p>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <h2 className="text-xl font-bold mb-4">Vos informations</h2>
          <OrderForm onSubmit={handleOrderSubmit} isLoading={isLoading} />
        </div>
        <div>
          <div className="sticky top-20 rounded-lg border bg-card p-6 shadow-sm">
            <OrderSummary cartItems={items} deliveryFee={currentDeliveryFee} />
            {/* Delivery fee update logic can be added here if needed, e.g., based on zone selection in form */}
          </div>
        </div>
      </div>
    </div>
  )
}
