// This hook simply wraps the Zustand store for easier consumption in components.
// It's useful if you want to add more logic or context around cart operations later.
import { useCartStore } from "@/store/cartStore"
import type { Product } from "@/types/product"

export const useCart = () => {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const getItemCount = useCartStore((state) => state.getItemCount)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)

  return {
    items,
    addItem: (product: Product, quantity = 1) => addItem(product, quantity),
    removeItem: (productId: string) => removeItem(productId),
    updateQuantity: (productId: string, quantity: number) => updateQuantity(productId, quantity),
    clearCart,
    getItemCount,
    getTotalPrice,
  }
}
