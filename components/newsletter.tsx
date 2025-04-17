"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to your API
    console.log("Subscribing email:", email)
    setSubmitted(true)
    setEmail("")
  }

  return (
    <div className="bg-primary/10 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>

          {submitted ? (
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-4 rounded-lg">
              Thanks for subscribing! We'll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="rounded-full px-8">
                Subscribe
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
