import * as z from "zod"

export const orderFormSchema = z.object({
  customerName: z.string().min(2, "Le nom est requis et doit contenir au moins 2 caractères."),
  customerPhone: z.string().regex(/^\d{8,15}$/, "Le numéro de téléphone est invalide."),
  customerAddress: z.string().min(5, "L'adresse est requise et doit contenir au moins 5 caractères."),
  deliveryZone: z.string().min(1, "Veuillez sélectionner une zone de livraison."),
  remarks: z.string().optional(),
})

export const newsletterSchema = z.object({
  email: z.string().email("Adresse email invalide."),
})
