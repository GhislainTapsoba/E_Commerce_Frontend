// lib/api/strapi.ts
import type { Product, Category } from "@/types/product"
import type { ApiResponse } from "@/types/api"

const STRAPI_API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api"
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

// Helper to fetch data from Strapi
async function fetchStrapi<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${STRAPI_API_BASE_URL}${path}`
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        // Add Strapi authorization token
        ...(STRAPI_TOKEN && { "Authorization": `Bearer ${STRAPI_TOKEN}` }),
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Failed to fetch data from Strapi")
    }

    return response.json()
  } catch (error) {
    console.error(`Error fetching from Strapi at ${url}:`, error)
    throw error
  }
}

// Transform Strapi response format (data array with attributes)
function transformStrapiData<T>(data: any[]): T[] {
  return data.map(item => ({
    id: item.id,
    ...item.attributes,
    // Transform nested relations if they exist
    ...(item.attributes.category && {
      category: {
        id: item.attributes.category.data?.id,
        ...item.attributes.category.data?.attributes
      }
    }),
    // Transform images if they exist
    ...(item.attributes.images && {
      images: item.attributes.images.data?.map((img: any) => ({
        id: img.id,
        url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '')}${img.attributes.url}`,
        alternativeText: img.attributes.alternativeText,
      }))
    }),
    ...(item.attributes.image && {
      image: item.attributes.image.data ? {
        id: item.attributes.image.data.id,
        url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '')}${item.attributes.image.data.attributes.url}`,
        alternativeText: item.attributes.image.data.attributes.alternativeText,
      } : null
    })
  }))
}

export const getProducts = async (params?: {
  category?: string;
  search?: string;
  limit?: number;
  page?: number;
  populate?: string[];
}): Promise<Product[]> => {
  const searchParams = new URLSearchParams()
  
  if (params?.category) {
    searchParams.append('filters[category][slug][$eq]', params.category)
  }
  
  if (params?.search) {
    searchParams.append('filters[title][$containsi]', params.search)
  }
  
  if (params?.limit) {
    searchParams.append('pagination[limit]', params.limit.toString())
  }
  
  if (params?.page) {
    searchParams.append('pagination[page]', params.page.toString())
  }

  // Always populate images and category by default
  const populate = params?.populate || ['images', 'category']
  populate.forEach(field => {
    searchParams.append('populate', field)
  })

  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : ""
  const response = await fetchStrapi<any>(`/products${queryString}`)
  
  // Transform Strapi format to your Product type
  return transformStrapiData<Product>(response.data)
}

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const response = await fetchStrapi<any>(`/products?filters[slug][$eq]=${slug}&populate=*`)
  const transformedData = transformStrapiData<Product>(response.data)
  return transformedData[0] || null
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetchStrapi<any>(`/categories?populate=image`)
  return transformStrapiData<Category>(response.data)
}

export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  const response = await fetchStrapi<any>(`/categories?filters[slug][$eq]=${slug}&populate=*`)
  const transformedData = transformStrapiData<Category>(response.data)
  return transformedData[0] || null
}

export const getPageContent = async (slug: string): Promise<any | null> => {
  const response = await fetchStrapi<any>(`/pages?filters[slug][$eq]=${slug}`)
  const transformedData = transformStrapiData<any>(response.data)
  return transformedData[0] || null
}

export const getBanners = async (): Promise<any[]> => {
  const response = await fetchStrapi<any>(`/banners?populate=*`)
  return transformStrapiData<any>(response.data)
}

// Get delivery zones from Strapi
export const getDeliveryZones = async (): Promise<any[]> => {
  const response = await fetchStrapi<any>(`/delivery-zones`)
  return transformStrapiData<any>(response.data)
}