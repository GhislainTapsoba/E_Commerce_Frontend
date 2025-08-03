import { getPageContent } from "@/lib/api/strapi"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Foire Aux Questions (FAQ)",
  description: "Trouvez les réponses aux questions fréquemment posées.",
}

export default async function FAQPage() {
  let content: any = null
  let error: string | null = null

  try {
    content = await getPageContent("faq") // Fetch content for 'faq' slug
  } catch (err: any) {
    console.error("Failed to fetch 'faq' page content:", err)
    error = "Impossible de charger le contenu de la page. Veuillez réessayer plus tard."
  }

  // Assuming FAQ content from Strapi might be an array of { question: string, answer: string }
  // Or a single HTML string. For this example, I'll assume a simple HTML string.
  const faqItems = [
    {
      question: "Comment passer une commande ?",
      answer:
        "Pour passer une commande, parcourez notre catalogue de produits, ajoutez les articles souhaités à votre panier, puis suivez les étapes du processus de commande en remplissant vos informations de livraison.",
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer:
        "Actuellement, nous acceptons le paiement à la livraison. D'autres options de paiement en ligne seront bientôt disponibles.",
    },
    {
      question: "Quel est le délai de livraison ?",
      answer:
        "Les délais de livraison varient en fonction de votre zone. Généralement, les livraisons sont effectuées sous 24 à 48 heures ouvrables après confirmation de la commande.",
    },
    {
      question: "Puis-je modifier ou annuler ma commande ?",
      answer:
        "Si vous souhaitez modifier ou annuler votre commande, veuillez nous contacter immédiatement via le bouton WhatsApp ou par téléphone. Les modifications sont possibles tant que la commande n'a pas été expédiée.",
    },
    {
      question: "Comment puis-je suivre ma commande ?",
      answer:
        "Une fois votre commande expédiée, vous recevrez une notification. Vous pouvez également nous contacter pour obtenir des mises à jour sur le statut de votre livraison.",
    },
  ]

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Foire Aux Questions (FAQ)</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
          {content && content.attributes?.content && (
            <div className="prose max-w-none mt-8">
              <div dangerouslySetInnerHTML={{ __html: content.attributes.content }} />
            </div>
          )}
        </Accordion>
      )}
    </div>
  )
}
