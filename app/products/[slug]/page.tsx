import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

async function getProduct(slug: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("products")
    .select(`
      id, 
      name,
      description,
      price, 
      sale_price, 
      slug,
      stock_quantity,
      product_images (url, alt_text, is_primary, display_order)
    `)
    .eq("slug", slug)
    .single()

  if (error || !data) {
    console.error("Error fetching product:", error)
    return null
  }

  return {
    ...data,
    images: data.product_images || [],
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  // Sort images to show primary first
  const sortedImages = [...product.images].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1
    if (!a.is_primary && b.is_primary) return 1
    return a.display_order - b.display_order
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg border border-border">
                <img
                  src={sortedImages[0]?.url || "/placeholder.svg?height=600&width=600"}
                  alt={sortedImages[0]?.alt_text || product.name}
                  className="object-cover w-full h-full"
                />
              </div>

              {sortedImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {sortedImages.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square overflow-hidden rounded-lg border border-border cursor-pointer"
                    >
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt_text || `${product.name} image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              <div className="flex items-center space-x-2 mb-6">
                {product.sale_price ? (
                  <>
                    <span className="text-2xl font-bold text-primary">${product.sale_price.toFixed(2)}</span>
                    <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                )}
              </div>

              <div className="mb-6">
                <p className="text-muted-foreground">
                  {product.stock_quantity > 0 ? (
                    <span className="text-green-500">In Stock</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </p>
              </div>

              <div className="mb-8">
                <Button size="lg" className="w-full md:w-auto" disabled={product.stock_quantity <= 0}>
                  Add to Cart
                </Button>
              </div>

              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="pt-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{product.description || "No description available."}</p>
                  </div>
                </TabsContent>
                <TabsContent value="details" className="pt-4">
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Material</span>
                      <span>Premium Quality</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span>Varies by size</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Weight</span>
                      <span>Lightweight</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Care</span>
                      <span>Hand wash recommended</span>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
