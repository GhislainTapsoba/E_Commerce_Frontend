import { getPageContent } from "@/lib/api/strapi"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions de Livraison",
  description: "Informations détaillées sur nos politiques et délais de livraison.",
}

export default async function DeliveryConditionsPage() {
  let content: any = null
  let error: string | null = null

  try {
    content = await getPageContent("conditions-livraison") // Fetch content for 'conditions-livraison' slug
  } catch (err: any) {
    console.error("Failed to fetch 'conditions-livraison' page content:", err)
    error = "Impossible de charger le contenu de la page. Veuillez réessayer plus tard."
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Conditions de Livraison</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : content ? (
        <div className="prose max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: content.attributes?.content || "<p>Contenu des Conditions de Livraison à venir.</p>",
            }}
          />
        </div>
      ) : (
        <p className="text-muted-foreground">Contenu des Conditions de Livraison à venir.</p>
      )}
    </div>
  )
}
