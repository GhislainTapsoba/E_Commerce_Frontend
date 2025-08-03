"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { orderFormSchema } from "@/lib/utils/validation"
import DeliveryZoneSelector from "./DeliveryZoneSelector"
import { useState } from "react"
import type { DeliveryZone } from "@/types/order"
import { getDeliveryZones } from "@/lib/api/laravel"
import { useEffect } from "react"
import LoadingSpinner from "../common/LoadingSpinner"

type OrderFormData = z.infer<typeof orderFormSchema>

interface OrderFormProps {
  onSubmit: (data: OrderFormData, deliveryFee: number) => void
  isLoading: boolean
}

export default function OrderForm({ onSubmit, isLoading }: OrderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
  })

  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>([])
  const [zonesLoading, setZonesLoading] = useState(true)
  const [zonesError, setZonesError] = useState<string | null>(null)

  const selectedZoneId = watch("deliveryZone")
  const selectedZone = deliveryZones.find((zone) => zone.id === selectedZoneId)
  const deliveryFee = selectedZone ? selectedZone.fee : 0

  useEffect(() => {
    const fetchZones = async () => {
      try {
        setZonesLoading(true)
        const fetchedZones = await getDeliveryZones()
        setDeliveryZones(fetchedZones)
        if (fetchedZones.length > 0 && !selectedZoneId) {
          setValue("deliveryZone", fetchedZones[0].id) // Pre-select first zone
        }
      } catch (err) {
        setZonesError("Erreur lors du chargement des zones de livraison.")
        console.error(err)
      } finally {
        setZonesLoading(false)
      }
    }
    fetchZones()
  }, [setValue, selectedZoneId])

  const handleZoneSelect = (zoneId: string | undefined) => {
    setValue("deliveryZone", zoneId || "")
  }

  if (zonesLoading) {
    return <LoadingSpinner />
  }

  if (zonesError) {
    return <div className="text-red-500">{zonesError}</div>
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, deliveryFee))} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="customerName">Nom complet</Label>
        <Input id="customerName" {...register("customerName")} />
        {errors.customerName && <p className="text-sm text-destructive">{errors.customerName.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="customerPhone">Numéro de téléphone</Label>
        <Input id="customerPhone" type="tel" {...register("customerPhone")} />
        {errors.customerPhone && <p className="text-sm text-destructive">{errors.customerPhone.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="customerAddress">Adresse de livraison</Label>
        <Input id="customerAddress" {...register("customerAddress")} />
        {errors.customerAddress && <p className="text-sm text-destructive">{errors.customerAddress.message}</p>}
      </div>
      <DeliveryZoneSelector onZoneSelect={handleZoneSelect} selectedZoneId={selectedZoneId} />
      {errors.deliveryZone && <p className="text-sm text-destructive">{errors.deliveryZone.message}</p>}
      <div className="grid gap-2">
        <Label htmlFor="remarks">Remarques (facultatif)</Label>
        <Textarea
          id="remarks"
          {...register("remarks")}
          placeholder="Ex: Livraison après 17h, laisser chez le voisin..."
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Envoi en cours..." : "Confirmer la commande"}
      </Button>
    </form>
  )
}
