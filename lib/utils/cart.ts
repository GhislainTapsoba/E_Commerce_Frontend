import type { CartItem } from "@/types/order"

export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export const calculateItemTotal = (item: CartItem): number => {
  return item.price * item.quantity
}
