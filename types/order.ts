// types/order.ts
export interface OrderProduct {
  id: number
  title: string
  price: number
  quantity: number
  image?: string
  slug?: string
}

export interface Order {
  id: string
  customer_name: string
  customer_phone: string
  customer_address: string
  delivery_zone: string
  delivery_price: number
  total_amount: number
  remarks?: string
  status: 'new' | 'processing' | 'delivered' | 'cancelled' | 'paid'
  products: OrderProduct[]
  createdAt: string
  updatedAt?: string
}

export interface DeliveryZone {
  id: number
  name: string
  price: number
  description?: string
  status: 'active' | 'inactive'
}

// types/product.ts
export interface ProductImage {
  id: number
  url: string
  alternativeText?: string
}

export interface Product {
  id: number
  title: string
  slug: string
  description?: string
  price: number
  stock?: number
  images?: ProductImage[]
  image?: string // Single image fallback
  category?: Category
  status: 'active' | 'inactive'
  variants?: any
  createdAt?: string
  updatedAt?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  image?: ProductImage
  parent_category?: Category
}

// types/api.ts
export interface ApiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
  message?: string
  success?: boolean
}

export interface StrapiResponse<T> {
  data: Array<{
    id: number
    attributes: T
  }>
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// types/cart.ts
export interface CartItem extends Product {
  quantity: number
  selectedVariant?: {
    size?: string
    color?: string
    [key: string]: any
  }
}

// types/page.ts
export interface Page {
  id: number
  title: string
  slug: string
  content: string
  meta_description?: string
  status: 'published' | 'draft'
  createdAt: string
  updatedAt: string
}

export interface Banner {
  id: number
  title: string
  description?: string
  image: ProductImage
  link?: string
  status: 'active' | 'inactive'
  order?: number
}