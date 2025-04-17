"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, Search, SlidersHorizontal, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useDebounce } from "use-debounce"

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  sale_price: number | null
  category_id: string
  images: { url: string; alt_text: string }[]
}

interface Category {
  id: string
  name: string
  slug: string
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 })
  const [showFilters, setShowFilters] = useState(false)

  // Fetch products and categories
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("categories")
          .select("id, name, slug")

        if (categoriesError) throw categoriesError
        setCategories(categoriesData || [])

        // Fetch products
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("id, name, slug, description, price, sale_price, category_id")

        if (productsError) throw productsError

        // Get images for each product
        const productsWithImages = await Promise.all(
          productsData.map(async (product) => {
            const { data: imagesData, error: imagesError } = await supabase
              .from("product_images")
              .select("url, alt_text")
              .eq("product_id", product.id)
              .eq("is_primary", true)
              .limit(1)

            if (imagesError) throw imagesError

            return {
              ...product,
              images: imagesData || [],
            }
          }),
        )

        setProducts(productsWithImages)
        setFilteredProducts(productsWithImages)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter products based on search term and selected categories
  useEffect(() => {
    let filtered = [...products]

    // Filter by search term
    if (debouncedSearchTerm) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category_id))
    }

    // Filter by price range
    filtered = filtered.filter((product) => {
      const price = product.sale_price || product.price
      return price >= priceRange.min && price <= priceRange.max
    })

    setFilteredProducts(filtered)
  }, [debouncedSearchTerm, selectedCategories, products, priceRange])

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setPriceRange({ min: 0, max: 1000 })
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Shop</h1>
            <Button variant="outline" size="sm" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? <X className="h-4 w-4 mr-2" /> : <SlidersHorizontal className="h-4 w-4 mr-2" />}
              {showFilters ? "Hide Filters" : "Filters"}
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar / Filters */}
            <div
              className={`w-full md:w-64 shrink-0 ${showFilters ? "block" : "hidden md:block"} space-y-8 mb-8 md:mb-0`}
            >
              {/* Categories Filter */}
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Categories</h2>
                  {selectedCategories.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCategories([])}>
                      Clear
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Price Range</h2>
                  <Button variant="ghost" size="sm" onClick={() => setPriceRange({ min: 0, max: 1000 })}>
                    Reset
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="min-price" className="text-sm text-muted-foreground">
                        Min
                      </label>
                      <Input
                        id="min-price"
                        type="number"
                        min="0"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label htmlFor="max-price" className="text-sm text-muted-foreground">
                        Max
                      </label>
                      <Input
                        id="max-price"
                        type="number"
                        min="0"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear All Filters */}
              <Button variant="outline" className="w-full" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="overflow-hidden h-full">
                      <CardContent className="p-0">
                        <div className="h-64 w-full bg-muted animate-pulse" />
                        <div className="p-4 space-y-3">
                          <div className="h-5 bg-muted animate-pulse rounded-md w-3/4" />
                          <div className="h-4 bg-muted animate-pulse rounded-md w-1/2" />
                          <div className="h-6 bg-muted animate-pulse rounded-md w-1/4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground mb-6">{filteredProducts.length} products found</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <Link key={product.id} href={`/product/${product.slug}`}>
                        <Card className="product-card overflow-hidden h-full">
                          <CardContent className="p-0">
                            <div className="relative h-64 w-full bg-muted">
                              {product.images && product.images[0] ? (
                                <Image
                                  src={product.images[0].url || "/placeholder.svg?height=400&width=400"}
                                  alt={product.images[0].alt_text || product.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-muted">
                                  <span className="text-muted-foreground">No image</span>
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
                              <div className="flex items-center justify-between">
                                <div>
                                  {product.sale_price ? (
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg font-bold text-primary">
                                        ${product.sale_price.toFixed(2)}
                                      </span>
                                      <span className="text-sm line-through text-muted-foreground">
                                        ${product.price.toFixed(2)}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                                  )}
                                </div>
                                <Button size="sm" variant="secondary" className="rounded-full">
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Add
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
