// components/share-button.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
  product: {
    name: string
    description: string
    price: number
    sale_price?: number | null
    imageUrl: string
  }
}

export function ShareButton({ product }: ShareButtonProps) {
  const handleShare = async () => {
    try {
      const shareData = {
        title: product.name,
        text: `${product.name}\n${product.description}\n\nPrice: $${product.price.toFixed(2)}${
          product.sale_price ? ` (Sale: $${product.sale_price.toFixed(2)})` : ''
        }\n\nContact: 0676332113\nAddress: No238, Panadura Road, Horana`,
        url: window.location.href,
      }

      // Try native share first (works on mobile)
      if (navigator.share) {
        await navigator.share(shareData)
      } 
      // Fallback to WhatsApp
      else if (navigator.userAgent.match(/iPhone|Android/i)) {
        window.open(
          `whatsapp://send?text=${encodeURIComponent(
            `${shareData.title}\n${shareData.text}\n${shareData.url}`
          )}`,
          '_blank'
        )
      }
      // Desktop fallback
      else {
        window.open(
          `https://web.whatsapp.com/send?text=${encodeURIComponent(
            `${shareData.title}\n${shareData.text}\n${shareData.url}`
          )}`,
          '_blank'
        )
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="rounded-full"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4 mr-2" />
      Share
    </Button>
  )
}