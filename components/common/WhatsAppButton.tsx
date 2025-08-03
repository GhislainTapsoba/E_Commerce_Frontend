"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Bonjour, je suis intéressé(e) par vos produits.",
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 rounded-full p-4 shadow-lg bg-green-500 hover:bg-green-600 text-white"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Contacter via WhatsApp</span>
    </Button>
  )
}
