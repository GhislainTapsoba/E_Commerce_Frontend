// types/product.ts
export interface Product {
  id: number
  title: string
  slug: string
  description: string
  price: number
  stock: number
  images?: Array<{
    id: number
    url: string
    alternativeText?: string
  }>
  category?: Category
  status: 'active' | 'inactive'
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  image?: {
    id: number
    url: string
    alternativeText?: string
  }
}