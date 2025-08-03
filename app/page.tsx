import { Input } from "@/components/ui/input"
import { getProducts, getBanners } from "@/lib/api/strapi"
import ProductGrid from "@/components/product/ProductGrid"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default async function HomePage() {
  let products = []
  let banners = []
  let error: string | null = null

  try {
    products = await getProducts(new URLSearchParams({ "pagination[limit]": "8" })) // Fetch 8 products for homepage
    banners = await getBanners()
  } catch (err: any) {
    console.error("Failed to fetch data for homepage:", err)
    error = "Impossible de charger les produits ou les bannières. Veuillez réessayer plus tard."
  }

  return (
    <div className="container py-8 md:py-12">
      {error && (
        <div className="text-center text-red-500 py-8">
          <p>{error}</p>
        </div>
      )}

      {/* Hero Section / Banners */}
      {banners.length > 0 ? (
        <section className="mb-12">
          <div className="relative h-[300px] md:h-[450px] lg:h-[600px] w-full overflow-hidden rounded-lg">
            <Image
              src={banners[0].attributes?.image?.url || "/placeholder.svg?height=600&width=1200&text=Hero Banner"}
              alt={banners[0].attributes?.title || "Bannière promotionnelle"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-12">
              <div className="text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                  {banners[0].attributes?.title || "Découvrez nos Nouveautés"}
                </h1>
                <p className="text-lg md:text-xl mb-4">
                  {banners[0].attributes?.description || "Des produits de qualité pour tous vos besoins."}
                </p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Link href="/produits">Explorer la boutique</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="mb-12 text-center py-12 bg-muted rounded-lg">
          <h1 className="text-4xl font-bold mb-4">Bienvenue chez ECMS</h1>
          <p className="text-lg text-muted-foreground mb-6">Votre destination unique pour des produits de qualité.</p>
          <Button asChild size="lg">
            <Link href="/produits">Découvrir nos produits</Link>
          </Button>
        </section>
      )}

      {/* Featured Products Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Produits Phares</h2>
          <Button variant="link" asChild>
            <Link href="/produits">Voir tout</Link>
          </Button>
        </div>
        <ProductGrid products={products} />
      </section>

      {/* Call to Action / Newsletter */}
      <section className="bg-primary text-primary-foreground p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Restez informé de nos offres !</h2>
        <p className="mb-6">Abonnez-vous à notre newsletter pour recevoir les dernières nouveautés et promotions.</p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Votre email"
            className="flex-1 bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70 border-primary-foreground"
          />
          <Button
            type="submit"
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            S'abonner
          </Button>
        </form>
      </section>
    </div>
  )
}
