"use client"

import type { DeliveryZone } from "@/types/order"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { formatPrice } from "@/lib/utils/format"
import { useEffect, useState } from "react"
import { getDeliveryZones } from "@/lib/api/laravel"
import LoadingSpinner from "../common/LoadingSpinner"

interface DeliveryZoneSelectorProps {
  onZoneSelect: (zoneId: string | undefined) => void
  selectedZoneId?: string
}

export default function DeliveryZoneSelector({ onZoneSelect, selectedZoneId }: DeliveryZoneSelectorProps) {
  const [zones, setZones] = useState<DeliveryZone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchZones = async () => {
      try {
        setLoading(true)
        const fetchedZones = await getDeliveryZones()
        setZones(fetchedZones)
      } catch (err) {
        setError("Erreur lors du chargement des zones de livraison.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchZones()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="grid gap-2">
      <Label htmlFor="deliveryZone">Zone de livraison</Label>
      <Select onValueChange={onZoneSelect} value={selectedZoneId}>
        <SelectTrigger id="deliveryZone">
          <SelectValue placeholder="Sélectionnez une zone" />
        </SelectTrigger>
        <SelectContent>
          {zones.map((zone) => (
            <SelectItem key={zone.id} value={zone.id}>
              {zone.name} ({formatPrice(zone.fee)})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
