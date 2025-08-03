// lib/api/laravel.ts
import type { Order, DeliveryZone } from "@/types/order"
import type { ApiResponse } from "@/types/api"

const LARAVEL_API_BASE_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || "http://localhost:8000/api"
const LARAVEL_TOKEN = process.env.NEXT_PUBLIC_LARAVEL_TOKEN

// Helper to fetch data from Laravel
async function fetchLaravel<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${LARAVEL_API_BASE_URL}${path}`
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // Add Laravel authorization header if token exists
        ...(LARAVEL_TOKEN && { "Authorization": `Bearer ${LARAVEL_TOKEN}` }),
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Error fetching from Laravel at ${url}:`, error)
    throw error
  }
}

export const createOrder = async (orderData: Omit<Order, "id" | "status" | "createdAt">): Promise<Order> => {
  const response = await fetchLaravel<Order>("/orders", {
    method: "POST",
    body: JSON.stringify({
      ...orderData,
      // Ensure products array is properly formatted
      products: orderData.products?.map((product: any) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        image: product.image || product.images?.[0]?.url
      })) || []
    }),
  })
  return response.data
}

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await fetchLaravel<Order>(`/orders/${orderId}`)
  return response.data
}

// For admin: get all orders with filters
export const getOrders = async (params?: {
  page?: number;
  status?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
}): Promise<{
  data: Order[];
  current_page: number;
  last_page: number;
  total: number;
}> => {
  const searchParams = new URLSearchParams()
  
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.status) searchParams.append('status', params.status)
  if (params?.search) searchParams.append('search', params.search)
  if (params?.date_from) searchParams.append('date_from', params.date_from)
  if (params?.date_to) searchParams.append('date_to', params.date_to)

  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : ""
  const response = await fetchLaravel<any>(`/orders${queryString}`)
  return response.data
}

// Update order status (admin only)
export const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
  const response = await fetchLaravel<Order>(`/orders/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  })
  return response.data
}

// Get delivery zones from Laravel (if you want to manage them there instead of Strapi)
export const getDeliveryZones = async (): Promise<DeliveryZone[]> => {
  const response = await fetchLaravel<DeliveryZone[]>("/delivery-zones")
  return response.data
}

// Newsletter subscription
export const subscribeToNewsletter = async (email: string): Promise<{
  message: string;
  success: boolean;
}> => {
  const response = await fetchLaravel<any>("/v1/newsletter/subscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  })
  return response.data
}

// Newsletter unsubscription  
export const unsubscribeFromNewsletter = async (email: string): Promise<{
  message: string;
  success: boolean;
}> => {
  const response = await fetchLaravel<any>("/v1/newsletter/unsubscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  })
  return response.data
}

// Contact form submission
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<{
  message: string;
  success: boolean;
}> => {
  const response = await fetchLaravel<any>("/contact", {
    method: "POST",
    body: JSON.stringify(formData),
  })
  return response.data
}

// Get statistics (admin only)
export const getStatistics = async (period: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<{
  total_orders: number;
  total_revenue: number;
  orders_by_status: Record<string, number>;
  revenue_by_period: Array<{
    period: string;
    revenue: number;
    orders: number;
  }>;
  top_products: Array<{
    product_id: number;
    product_title: string;
    quantity_sold: number;
    revenue: number;
  }>;
}> => {
  const response = await fetchLaravel<any>(`/statistics?period=${period}`)
  return response.data
}

// Export orders (admin only)
export const exportOrders = async (params?: {
  format?: 'csv' | 'excel';
  date_from?: string;
  date_to?: string;
  status?: string;
}): Promise<Blob> => {
  const searchParams = new URLSearchParams()
  
  if (params?.format) searchParams.append('format', params.format)
  if (params?.date_from) searchParams.append('date_from', params.date_from)
  if (params?.date_to) searchParams.append('date_to', params.date_to)
  if (params?.status) searchParams.append('status', params.status)

  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : ""
  
  const response = await fetch(`${LARAVEL_API_BASE_URL}/orders/export${queryString}`, {
    headers: {
      ...(LARAVEL_TOKEN && { "Authorization": `Bearer ${LARAVEL_TOKEN}` }),
    },
  })

  if (!response.ok) {
    throw new Error('Failed to export orders')
  }

  return response.blob()
}