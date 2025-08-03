"use client"
import CartSummary from "@/components/cart/CartSummary"
import CartItem from "@/components/cart/CartItem"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCartStore } from "@/store/cartStore"

export default function ClientCartPage() {
  const { items, clearCart } = useCartStore()

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>
      {items.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          Votre panier est vide.{" "}
          <Link href="/produits" className="text-primary hover:underline">
            Commencez vos achats ici !
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 grid gap-6">
            {items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>
          <div className="md:col-span-1">
            <div className="sticky top-20 rounded-lg border bg-card p-6 shadow-sm">
              <CartSummary />
              <div className="flex flex-col gap-2 mt-6">
                <Button asChild size="lg">
                  <Link href="/commande">Passer la commande</Link>
                </Button>
                <Button variant="outline" size="lg" onClick={clearCart}>
                  Vider le panier
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
