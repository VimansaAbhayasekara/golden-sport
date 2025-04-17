import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MessageSquare } from "lucide-react"

export default function SupportPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Support Center</h1>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-4">
                  Get in touch with our customer support team via email. We typically respond within 24 hours.
                </p>
                <a href="mailto:goldensports@gmail.com" className="text-primary hover:underline">
                goldensports@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone Support</h3>
                <p className="text-muted-foreground mb-4">
                  Speak directly with our support team. Available Monday to Friday, 9am to 5pm EST.
                </p>
                <a href="tel:+18001234567" className="text-primary hover:underline">
                +94 76 939 0612
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                <p className="text-muted-foreground mb-4">
                  Chat with our support team in real-time. Available 24/7 for quick assistance.
                </p>
                <Button className="rounded-full">Start Chat</Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                  <AccordionContent>
                    Standard shipping typically takes 3-5 business days within the continental United States. Express
                    shipping options are available at checkout for faster delivery. International shipping times vary by
                    location, usually between 7-14 business days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    We offer a 30-day return policy for all unused and unopened products in their original packaging. If
                    you're not completely satisfied with your purchase, you can return it for a full refund or exchange.
                    Please note that shipping costs are non-refundable.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we ship to most countries worldwide. International shipping rates and delivery times vary
                    depending on the destination. All applicable customs fees, duties, and taxes are the responsibility
                    of the recipient and are not included in the shipping cost.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I track my order?</AccordionTrigger>
                  <AccordionContent>
                    Once your order ships, you'll receive a confirmation email with a tracking number. You can use this
                    number to track your package on our website or directly through the carrier's website. If you have
                    any issues tracking your order, please contact our customer support team.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Are your products covered by warranty?</AccordionTrigger>
                  <AccordionContent>
                    Yes, all Golden Sports products come with a 1-year limited warranty against manufacturing defects.
                    Premium products may have extended warranty options. The warranty covers defects in materials and
                    workmanship under normal use. It does not cover damage from misuse, accidents, or normal wear and
                    tear.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
            <Card>
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Your message" rows={6} />
                  </div>
                  <Button type="submit" className="w-full rounded-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
