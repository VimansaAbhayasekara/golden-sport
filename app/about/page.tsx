"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CustomerReviews } from "@/components/customer-reviews"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useRef } from 'react';

export default function AboutPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // Set speed to 0.7x
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[70vh] w-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
      <source src="/videos/nike1.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About Golden Sports</h1>
              <p className="text-xl text-white/80 max-w-2xl mb-8">
                Your premier destination for high-quality sports accessories and equipment
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Golden Sports was established in 2015 with a simple mission: to provide athletes and sports enthusiasts
                with premium quality equipment that enhances their performance and enjoyment of the game.
              </p>
              <p className="text-muted-foreground mb-4">
                What began as a small local shop has grown into a trusted destination for sports accessories across the
                region. Our founder, an avid sports enthusiast, noticed a gap in the market for high-quality, durable
                sports equipment at reasonable prices.
              </p>
              <p className="text-muted-foreground">
                Today, Golden Sports continues to uphold its commitment to quality, innovation, and customer
                satisfaction. We carefully select each product in our inventory, ensuring that it meets our rigorous
                standards for performance, durability, and value.
              </p>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/store1.jpg"
                alt="Our Store"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl text-primary">🏆</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Quality</h3>
                  <p className="text-muted-foreground">
                    We never compromise on quality. Each product in our store is carefully selected and tested to ensure
                    it meets our high standards.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl text-primary">👥</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Community</h3>
                  <p className="text-muted-foreground">
                    We believe in building a community of sports enthusiasts. Our store is more than just a shop—it's a
                    gathering place for people who share our passion.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl text-primary">🌱</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We're committed to reducing our environmental impact by partnering with brands that use sustainable
                    materials and manufacturing processes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Store Photos */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/store1.jpg"
                alt="Store Interior"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/store2.jpg"
                alt="Product Display"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/store3.jpg"
                alt="Customer Service"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <CustomerReviews />

        {/* Store Location */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Visit Our Store</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="bg-card p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-xl font-bold mb-4">Store Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>11:00 AM - 5:00 PM</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="font-medium w-24">Address:</span>
                    <span>No:388,B kalapaluwawa,Rajagiriya.</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium w-24">Phone:</span>
                    <span>075 634 4607 / 076 939 0612</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium w-24">Email:</span>
                    <span>goldensports@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.54862517717208!2d79.91922151393672!3d6.91712341006305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25736b6c83a59%3A0x32915ecf12fbb712!2sGolden%20Sports!5e0!3m2!1sen!2slk!4v1744820322447!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
