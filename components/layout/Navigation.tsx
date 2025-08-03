import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavigationProps extends React.ComponentPropsWithoutRef<"nav"> {}

export default function Navigation({ className, ...props }: NavigationProps) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Accueil
      </Link>
      <Link href="/produits" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Produits
      </Link>
      <Link href="/a-propos" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        À propos
      </Link>
      <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Contact
      </Link>
    </nav>
  )
}
