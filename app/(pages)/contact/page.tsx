import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contactez-nous",
  description: "Envoyez-nous un message ou trouvez nos coordonnées.",
}

export default function ContactPage() {
  return (
    <div className="container py-8 md:py-12 grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="text-3xl font-bold mb-6">Contactez-nous</h1>
        <p className="text-muted-foreground mb-6">
          Nous sommes là pour répondre à toutes vos questions. N'hésitez pas à nous envoyer un message ou à nous
          contacter via les coordonnées ci-dessous.
        </p>
        <div className="grid gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Nos Coordonnées</h2>
            <p className="text-muted-foreground">
              Email:{" "}
              <a href="mailto:arseneghislaintaps@gmail.com" className="text-primary hover:underline">
                arseneghislaintaps@gmail.com
              </a>
            </p>
            <p className="text-muted-foreground">
              Téléphone:{" "}
              <a href="tel:+22605929883" className="text-primary hover:underline">
                +226 05 92 98 83
              </a>
            </p>
            <p className="text-muted-foreground">Adresse: 123 Rue du Commerce, Ouagadougou, Burkina Faso</p>
          </div>
          {/* You can add a map component here if desired */}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Envoyez-nous un message</h2>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" placeholder="Votre nom" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Votre email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Sujet</Label>
            <Input id="subject" placeholder="Sujet de votre message" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Votre message..." rows={5} />
          </div>
          <Button type="submit" className="w-full">
            Envoyer le message
          </Button>
        </form>
      </div>
    </div>
  )
}
