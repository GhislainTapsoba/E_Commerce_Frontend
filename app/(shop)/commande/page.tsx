import OrderPageClient from "./OrderPageClient"
import type { Metadata } from "next"

// Metadata for the page (can't be async in client component, so define here)
export const metadata: Metadata = {
  title: "Passer Commande",
  description: "Remplissez vos informations pour finaliser votre commande.",
}

export default function OrderPage() {
  return <OrderPageClient />
}
