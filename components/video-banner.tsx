"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function VideoBanner() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Only try to play the video if it exists and we're on the client side
    const videoElement = videoRef.current
    if (videoElement) {
      // Use a timeout to ensure the video is properly loaded in the DOM
      const timeoutId = setTimeout(() => {
        const playPromise = videoElement.play()

        // Handle the play promise to avoid uncaught promise errors
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Autoplay prevented:", error)
            // Video playback failed - add a play button or handle the error
          })
        }
      }, 1000)

      return () => clearTimeout(timeoutId)
    }
  }, [])

  if (!isClient) {
    return null // Return null on server-side to avoid hydration issues
  }

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-black">
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        poster="/placeholder.svg?height=1080&width=1920"
      >
        <source src="/placeholder.svg?height=1080&width=1920" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">PERFORMANCE REDEFINED</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Discover our latest collection of premium sports gear designed for champions.
          </p>
          <Link href="/shop">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg">
              Shop Collection
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
