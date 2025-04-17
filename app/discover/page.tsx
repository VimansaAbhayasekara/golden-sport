import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DiscoverPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-0 pb-16">
        {/* Hero Section */}
        <div className="relative h-[70vh] w-full">
          <Image
            src="/back2.jpg"
            alt="Discover Golden Sports"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Discover Golden Sports</h1>
              <p className="text-xl text-white/80 max-w-2xl mb-8">
                Learn about our mission, values, and the technology behind our premium sports accessories.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-muted-foreground mb-4">
              At Golden Sports, our vision is to empower athletes of all levels with high-quality, innovative sports 
              accessories that elevate their performance and confidence. We believe that the right gear can make a real 
              difference, whether you're stepping onto the field for the first time or competing at a professional level.
              </p>
              <p className="text-muted-foreground mb-4">
              Our mission is to become the trusted destination for sports enthusiasts who value reliability, style, and
              cutting-edge functionality. Every product we offer is designed with the athlete in mind—crafted from premium
              materials and built to perform under pressure.
              </p>
              <p className="text-muted-foreground">
              We are committed to continuous innovation, exceptional customer experiences, and supporting a community 
              of individuals passionate about an active lifestyle. As we grow, our focus remains the same: to help
              you reach your full potential and push the boundaries of what’s possible in your game.
              </p>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image src="/story.jpg" alt="Our Story" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-primary">🏆</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in everything we do, from product design and manufacturing to customer
                  service and community engagement.
                </p>
              </div>
              <div className="bg-background p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-primary">🔍</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Innovation</h3>
                <p className="text-muted-foreground">
                  We're constantly exploring new technologies and materials to create products that push the boundaries
                  of performance and design.
                </p>
              </div>
              <div className="bg-background p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-primary">🌱</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to reducing our environmental impact by using sustainable materials and implementing
                  eco-friendly manufacturing processes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/tech.jpg"
                alt="GripTech Technology"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">GripTech™ Technology</h3>
              <p className="text-muted-foreground mb-4">
                Our proprietary GripTech™ technology provides unparalleled grip and control in all weather conditions.
                Used in our basketballs, footballs, and tennis rackets, this innovative material enhances performance
                while maintaining durability.
              </p>
              <p className="text-muted-foreground">
                Developed over three years of intensive research and testing with professional athletes, GripTech™
                represents the pinnacle of sports equipment innovation.
              </p>
            </div>

            <div className="flex flex-col justify-center md:order-3">
              <h3 className="text-2xl font-bold mb-4">UltraLight™ Framework</h3>
              <p className="text-muted-foreground mb-4">
                Our UltraLight™ Framework reduces weight without compromising strength or durability. This revolutionary
                design approach allows us to create equipment that's lighter, faster, and more responsive.
              </p>
              <p className="text-muted-foreground">
                Used in our premium line of sports accessories, UltraLight™ technology gives athletes the competitive
                edge they need to perform at their best.
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden md:order-4">
              <Image
                src="/tech2.jpg"
                alt="UltraLight Framework"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Athletes */}
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Athletes Who Trust Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {img: '/athl1.jpeg', name: 'Kusal Mendis', sport: 'Cricket'},
              {img: '/athl2.jpg', name: 'Jos Butler', sport: 'Cricket'},
              {img: '/athl3.jpg', name: 'Ravindra Jadeja', sport: 'Cricket'}
            ].map((athlete) => (
              <div key={athlete.name} className="bg-background rounded-lg overflow-hidden shadow-sm">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={athlete.img}
                    alt={`${athlete.name} - ${athlete.sport}`}
                    fill
                    className="object-cover"
                  />
                </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{athlete.name}</h3>
                    <p className="text-muted-foreground mb-4">
                      "Golden Sports equipment has been a game-changer for my performance. The quality and innovation
                      are unmatched in the industry."
                    </p>
                    <Link href="/shop">
                      <Button variant="link" className="p-0 h-auto text-primary">
                        Shop Their Gear
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Join Us */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Golden Sports Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with fellow sports enthusiasts, get exclusive offers, and stay up-to-date with the latest product
            releases and innovations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full">
              Shop Now
            </Button>
            <Button variant="outline" size="lg" className="rounded-full">
              Follow Us
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
