// lib/api/index.ts - Service unifié (optionnel)
// Permet d'avoir une seule interface pour toutes vos API calls

// Export all Strapi functions
export {
  getProducts,
  getProductBySlug,
  getCategories,
  getCategoryBySlug,
  getPageContent,
  getBanners,
} from './strapi'

// Export Strapi delivery zones with a specific name
export { getDeliveryZones as getStrapiDeliveryZones } from './strapi'

// Export all Laravel functions
export {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  subscribeToNewsletter,
  submitContactForm,
  getStatistics,
  exportOrders
} from './laravel'

// Export Laravel delivery zones with a specific name
export { getDeliveryZones as getLaravelDeliveryZones } from './laravel'

// Utility function to decide which delivery zones to use
export const getDeliveryZones = async () => {
  // Selon votre cahier des charges, les zones peuvent être gérées dans Strapi
  // Mais vous pouvez choisir Laravel si vous préférez
  try {
    const { getDeliveryZones: getStrapiDeliveryZones } = await import('./strapi')
    return await getStrapiDeliveryZones()
  } catch (error) {
    console.error('Failed to get delivery zones from Strapi:', error)
    // Fallback to Laravel if Strapi fails
    const { getDeliveryZones: getLaravelDeliveryZones } = await import('./laravel')
    return await getLaravelDeliveryZones()
  }
}