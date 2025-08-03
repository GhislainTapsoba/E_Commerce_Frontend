import { getPageContent } from "@/lib/api/strapi"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "À Propos de Nous",
  description: "Découvrez l'histoire et la mission de notre entreprise.",
}

export default async function AboutPage() {
  let content: any = null
  let error: string | null = null

  try {
    content = await getPageContent("a-propos") // Fetch content for 'a-propos' slug
  } catch (err: any) {
    console.error("Failed to fetch 'a-propos' page content:", err)
    error = "Impossible de charger le contenu de la page. Veuillez réessayer plus tard."
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6">À Propos de Nous</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : content ? (
        <div className="prose max-w-none">
          {/* Assuming content.attributes.content is HTML or Markdown that can be rendered */}
          <div
            dangerouslySetInnerHTML={{
              __html: content.attributes?.content || '<p>Contenu de la page "À Propos" à venir.</p>',
            }}
          />
        </div>
      ) : (
        <p className="text-muted-foreground">Contenu de la page "À Propos" à venir.</p>
      )}
    </div>
  )
}
