import ClientCartPage from "./ClientCartPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Votre Panier",
  description: "Consultez et gérez les articles de votre panier avant de passer commande.",
}

export default function CartPage() {
  // This component needs to be a Client Component to use Zustand store
  // However, for a page, we can render a client component wrapper.
  // For simplicity, I'll make this page a client component.
  // In a real app, you might fetch initial cart state on server if authenticated.
  return <ClientCartPage />
}
