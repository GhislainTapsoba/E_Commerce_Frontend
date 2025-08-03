import { NextResponse } from "next/server"
import { getProducts } from "@/lib/api/strapi"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  try {
    const products = await getProducts(searchParams)
    return NextResponse.json(products)
  } catch (error: any) {
    console.error("Error in /api/products:", error)
    return NextResponse.json({ message: error.message || "Failed to fetch products" }, { status: 500 })
  }
}
