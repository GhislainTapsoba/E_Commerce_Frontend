import { getPageContent } from "@/lib/api/strapi"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Consultez nos conditions générales de vente.",
}

export default async function TermsPage() {
  let content: any = null
  let error: string | null = null

  try {
    content = await getPageContent("conditions-generales") // Fetch content for 'conditions-generales' slug
  } catch (err: any) {
    console.error("Failed to fetch 'conditions-generales' page content:", err)
    error = "Impossible de charger le contenu de la page. Veuillez réessayer plus tard."
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Conditions Générales de Vente</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : content ? (
        <div className="prose max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: content.attributes?.content || "<p>Contenu des Conditions Générales de Vente à venir.</p>",
            }}
          />
        </div>
      ) : (
        <p className="text-muted-foreground">Contenu des Conditions Générales de Vente à venir.</p>
      )}
    </div>
  )
}
