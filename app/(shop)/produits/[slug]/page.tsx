import { getProductBySlug } from "@/lib/api/strapi"
import ProductDetails from "@/components/product/ProductDetails"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface ProductDetailPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Produit non trouvé",
      description: "Le produit que vous recherchez n'existe pas.",
    }
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.length > 0 ? [{ url: product.images[0].url }] : [],
    },
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound() // Renders the closest not-found.tsx or the default Next.js 404 page
  }

  return (
    <div className="container py-8 md:py-12">
      <ProductDetails product={product} />
    </div>
  )
}
