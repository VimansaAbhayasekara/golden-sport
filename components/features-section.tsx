"use client"

import { motion } from "framer-motion"
import { Trophy, Zap, Shield, BarChart, Compass, Heart, RefreshCw, Droplets } from "lucide-react"

const features = [
  {
    icon: <Trophy className="h-8 w-8 text-primary" />,
    title: "Premium Quality",
    description: "Crafted with the finest materials for durability and performance",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Enhanced Performance",
    description: "Designed to improve your game and take your skills to the next level",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Maximum Protection",
    description: "Advanced safety features to prevent injuries during intense play",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Performance Tracking",
    description: "Built-in technology to monitor and analyze your performance",
  },
  {
    icon: <Compass className="h-8 w-8 text-primary" />,
    title: "Precision Control",
    description: "Engineered for accurate ball handling and superior control",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Athlete Approved",
    description: "Tested and endorsed by professional athletes worldwide",
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-primary" />,
    title: "Quick Recovery",
    description: "Specialized gear to help reduce fatigue and speed up recovery",
  },
  {
    icon: <Droplets className="h-8 w-8 text-primary" />,
    title: "Weather Resistant",
    description: "Performs consistently in all weather conditions and environments",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-4">
            PREMIUM <span className="text-primary">GEAR</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Advanced Sports Equipment for Champions</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
