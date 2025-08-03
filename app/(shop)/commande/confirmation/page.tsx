import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Commande Confirmée",
  description: "Votre commande a été passée avec succès.",
}

interface OrderConfirmationPageProps {
  searchParams: {
    orderId?: string
  }
}

export default function OrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
  const orderId = searchParams.orderId

  return (
    <div className="container py-12 md:py-24 text-center">
      <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
      <h1 className="text-4xl font-bold mb-4">Commande Confirmée !</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Merci pour votre achat. Votre commande a été passée avec succès.
      </p>
      {orderId && (
        <p className="text-xl font-semibold mb-8">
          Votre numéro de commande est : <span className="text-primary">{orderId}</span>
        </p>
      )}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/produits">Continuer vos achats</Link>
        </Button>
        <Button variant="outline" asChild size="lg">
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  )
}
