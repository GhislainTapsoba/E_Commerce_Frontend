"use client"

import { getProducts, getCategories } from "@/lib/api/strapi"
import ProductGrid from "@/components/product/ProductGrid"
import ProductFilters from "@/components/product/ProductFilters"
import { Suspense } from "react"
import LoadingSpinner from "@/components/common/LoadingSpinner"
import { useState, useEffect } from "react"

interface ProductsPageProps {
  searchParams: {
    category?: string
    // Add other filter params like minPrice, maxPrice, etc.
  }
}

export default function ProductsPageClient({ searchParams }: ProductsPageProps) {
  const categorySlug = searchParams.category
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productParams = new URLSearchParams()
        if (categorySlug) {
          productParams.append("filters[category][slug][$eq]", categorySlug)
        }
        // Add other filter parameters here if needed
        const productsData = await getProducts(productParams)
        const categoriesData = await getCategories()
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (err: any) {
        console.error("Failed to fetch products or categories:", err)
        setError("Impossible de charger les produits ou les filtres. Veuillez réessayer plus tard.")
      }
    }

    fetchData()
  }, [categorySlug])

  const initialCategorySlugs = categorySlug ? [categorySlug] : []

  return (
    <div className="container grid md:grid-cols-[240px_1fr] gap-8 py-8 md:py-12">
      <aside className="md:sticky md:top-20 h-fit">
        <h2 className="text-xl font-bold mb-4">Filtres</h2>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ProductFilters
            categories={categories}
            onFilterChange={() => {
              /* Client-side filtering will re-render, or you can use client components for filters */
            }}
            initialCategorySlugs={initialCategorySlugs}
          />
        )}
      </aside>
      <section>
        <h1 className="text-3xl font-bold mb-6">
          {categorySlug ? `Produits dans la catégorie "${categorySlug}"` : "Tous nos produits"}
        </h1>
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
