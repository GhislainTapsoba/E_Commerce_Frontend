"use client"

import { useCart } from "@/lib/hooks/useCart"
import CartItem from "./CartItem"
import CartSummary from "./CartSummary"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CartDrawer() {
  const { items, clearCart } = useCart()

  return (
    <div className="flex flex-col h-full">
      {items.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-muted-foreground">Votre panier est vide.</div>
      ) : (
        <>
          <ScrollArea className="flex-1 pr-4">
            <div className="grid gap-4">
              {items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>
          </ScrollArea>
          <div className="mt-auto border-t pt-4">
            <CartSummary />
            <div className="flex flex-col gap-2 mt-4">
              <Button asChild>
                <Link href="/commande">Passer la commande</Link>
              </Button>
              <Button variant="outline" onClick={clearCart}>
                Vider le panier
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
