import { NextResponse } from "next/server"
import { createOrder } from "@/lib/api/laravel"
import type { Order } from "@/types/order"

export async function POST(request: Request) {
  try {
    const orderData: Omit<Order, "id" | "status" | "createdAt"> = await request.json()
    const newOrder = await createOrder(orderData)
    return NextResponse.json(newOrder, { status: 201 })
  } catch (error: any) {
    console.error("Error in /api/orders:", error)
    return NextResponse.json({ message: error.message || "Failed to create order" }, { status: 500 })
  }
}
