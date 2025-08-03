"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0] || "/placeholder.svg?height=600&width=600&text=Product")

  return (
    <div className="grid gap-4 md:gap-6">
      <div className="relative aspect-square overflow-hidden rounded-lg border">
        <Image
          src={mainImage || "/placeholder.svg"}
          alt="Image principale du produit"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-2 md:gap-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border transition-all hover:opacity-75",
              mainImage === image ? "border-primary ring-2 ring-primary" : "",
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Miniature du produit ${index + 1}`}
              fill
              className="object-cover"
            />
            <span className="sr-only">Voir l'image {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
