import { CardContent } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export const revalidate = 3600 // Revalidate at most every hour

interface ProductPageProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string) {
  const supabase = createServerClient()

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id, name, slug, description, price, sale_price, category_id, stock_quantity")
    .eq("slug", slug)
    .single()

  if (productError || !product) {
    return null
  }

  // Get category
  const { data: category } = await supabase
    .from("categories")
    .select("name, slug")
    .eq("id", product.category_id)
    .single()

  // Get images
  const { data: images } = await supabase
    .from("product_images")
    .select("id, url, alt_text, is_primary, display_order")
    .eq("product_id", product.id)
    .order("is_primary", { ascending: false })
    .order("display_order", { ascending: true })

  return {
    ...product,
    category,
    images: images || [],
  }
}

async function getRelatedProducts(categoryId: string, productId: string) {
  const supabase = createServerClient()

  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, slug, price, sale_price")
    .eq("category_id", categoryId)
    .neq("id", productId)
    .limit(4)

  if (error) {
    console.error("Error fetching related products:", error)
    return []
  }

  // Get images for each product
  const productsWithImages = await Promise.all(
    products.map(async (product) => {
      const { data: images } = await supabase
        .from("product_images")
        .select("url, alt_text")
        .eq("product_id", product.id)
        .eq("is_primary", true)
        .limit(1)

      return { ...product, images: images || [] }
    }),
  )

  return productsWithImages
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category_id, product.id)

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-primary">
              Shop
            </Link>
            {product.category && (
              <>
                <span className="mx-2">/</span>
                <Link href={`/category/${product.category.slug}`} className="hover:text-primary">
                  {product.category.name}
                </Link>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div>
              <div className="relative h-[400px] md:h-[500px] w-full bg-muted rounded-lg overflow-hidden mb-4">
                {product.images && product.images[0] ? (
                  <Image
                    src={product.images[0].url || "/placeholder.svg"}
                    alt={product.images[0].alt_text || product.name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>

              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(0, 4).map((image) => (
                    <div key={image.id} className="relative h-24 bg-muted rounded-md overflow-hidden">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt_text || product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

              <div className="mb-4">
                {product.sale_price ? (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-primary">${product.sale_price.toFixed(2)}</span>
                    <span className="text-lg line-through text-muted-foreground">${product.price.toFixed(2)}</span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
                      Save ${(product.price - product.sale_price).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                )}
              </div>

              <div className="mb-6">
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="w-24 text-sm text-muted-foreground">Availability:</span>
                  {product.stock_quantity > 0 ? (
                    <span className="text-green-500 font-medium">In Stock ({product.stock_quantity} available)</span>
                  ) : (
                    <span className="text-destructive font-medium">Out of Stock</span>
                  )}
                </div>

                {product.category && (
                  <div className="flex items-center">
                    <span className="w-24 text-sm text-muted-foreground">Category:</span>
                    <Link href={`/category/${product.category.slug}`} className="text-primary hover:underline">
                      {product.category.name}
                    </Link>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center border rounded-md">
                    <button className="px-3 py-2 text-lg border-r">-</button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock_quantity}
                      defaultValue="1"
                      className="w-16 px-3 py-2 text-center bg-transparent focus:outline-none"
                    />
                    <button className="px-3 py-2 text-lg border-l">+</button>
                  </div>

                  <Button size="lg" className="flex-1 rounded-full">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Wishlist
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.slug}`}>
                    <Card className="product-card overflow-hidden h-full">
                      <CardContent className="p-0">
                        <div className="relative h-48 w-full bg-muted">
                          {relatedProduct.images && relatedProduct.images[0] ? (
                            <Image
                              src={relatedProduct.images[0].url || "/placeholder.svg"}
                              alt={relatedProduct.images[0].alt_text || relatedProduct.name}
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
                          <h3 className="font-semibold text-lg mb-1">{relatedProduct.name}</h3>
                          <div>
                            {relatedProduct.sale_price ? (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-primary">
                                  ${relatedProduct.sale_price.toFixed(2)}
                                </span>
                                <span className="text-sm line-through text-muted-foreground">
                                  ${relatedProduct.price.toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-primary">${relatedProduct.price.toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
