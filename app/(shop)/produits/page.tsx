import type { Metadata } from "next"
import ProductsPageClient from "./ProductsPageClient"

export const metadata: Metadata = {
  title: "Nos Produits",
  description: "Découvrez tous nos produits disponibles à la vente en ligne.",
}

interface ProductsPageProps {
  searchParams: {
    category?: string
    // Add other filter params like minPrice, maxPrice, etc.
  }
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return <ProductsPageClient searchParams={searchParams} />
}
