import Link from "next/link"
import { Package2 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-8">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-6">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
            <Package2 className="h-6 w-6" />
            <span>ECMS</span>
          </Link>
          <p className="text-sm text-muted-foreground">Votre destination unique pour des produits de qualité.</p>
        </div>
        <div className="grid gap-2">
          <h3 className="font-semibold text-lg">Boutique</h3>
          <Link href="/produits" className="text-sm text-muted-foreground hover:text-primary">
            Tous les produits
          </Link>
          <Link href="/produits/categorie/electronique" className="text-sm text-muted-foreground hover:text-primary">
            Électronique
          </Link>
          <Link href="/produits/categorie/vetements" className="text-sm text-muted-foreground hover:text-primary">
            Vêtements
          </Link>
          <Link href="/produits/categorie/maison" className="text-sm text-muted-foreground hover:text-primary">
            Maison & Jardin
          </Link>
        </div>
        <div className="grid gap-2">
          <h3 className="font-semibold text-lg">Informations</h3>
          <Link href="/a-propos" className="text-sm text-muted-foreground hover:text-primary">
            À propos
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
            Contact
          </Link>
          <Link href="/conditions-generales" className="text-sm text-muted-foreground hover:text-primary">
            Conditions Générales de Vente
          </Link>
          <Link href="/conditions-livraison" className="text-sm text-muted-foreground hover:text-primary">
            Conditions de Livraison
          </Link>
          <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
            FAQ
          </Link>
        </div>
        <div className="grid gap-2">
          <h3 className="font-semibold text-lg">Contactez-nous</h3>
          <p className="text-sm text-muted-foreground">Email: arseneghislaintaps@gmail.com</p>
          <p className="text-sm text-muted-foreground">Téléphone: +226 05 92 98 83</p>
          <p className="text-sm text-muted-foreground">Adresse: 123 Rue du Commerce, Ouagadougou, Burkina Faso</p>
        </div>
      </div>
      <div className="container mt-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} ECMS. Tous droits réservés.
      </div>
    </footer>
  )
}
