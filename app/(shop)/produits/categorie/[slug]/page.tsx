import { getProducts, getCategoryBySlug } from "@/lib/api/strapi"
import ProductGrid from "@/components/product/ProductGrid"
import ProductFilters from "@/components/product/ProductFilters"
import { Suspense } from "react"
import LoadingSpinner from "@/components/common/LoadingSpinner"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface CategoryProductsPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: CategoryProductsPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    return {
      title: "Catégorie non trouvée",
      description: "La catégorie que vous recherchez n'existe pas.",
    }
  }

  return {
    title: category.name,
    description: category.description || `Découvrez tous les produits de la catégorie ${category.name}.`,
  }
}

export default async function CategoryProductsPage({ params }: CategoryProductsPageProps) {
  const categorySlug = params.slug
  let products = []
  let categoryName = categorySlug
  let error: string | null = null

  try {
    const category = await getCategoryBySlug(categorySlug)
    if (!category) {
      notFound()
    }
    categoryName = category.name

    const productParams = new URLSearchParams()
    productParams.append("filters[category][slug][$eq]", categorySlug)
    products = await getProducts(productParams)
  } catch (err: any) {
    console.error(`Failed to fetch products for category ${categorySlug}:`, err)
    error = "Impossible de charger les produits pour cette catégorie. Veuillez réessayer plus tard."
  }

  return (
    <div className="container grid md:grid-cols-[240px_1fr] gap-8 py-8 md:py-12">
      <aside className="md:sticky md:top-20 h-fit">
        <h2 className="text-xl font-bold mb-4">Filtres</h2>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ProductFilters
            categories={[]} // Categories would be fetched here if needed for other filters
            onFilterChange={() => {
              /* Client-side filtering */
            }}
            initialCategorySlugs={[categorySlug]}
          />
        )}
      </aside>
      <section>
        <h1 className="text-3xl font-bold mb-6">Produits dans la catégorie "{categoryName}"</h1>
        {error ? (
          <div className="text-red-500 text-center py-10">{error}</div>
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductGrid products={products} />
          </Suspense>
        )}
      </section>
    </div>
  )
}
