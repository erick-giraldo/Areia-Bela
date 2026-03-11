import Link from 'next/link'
import { ArrowRight, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/lib/mock-data'

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-muted/30 py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
              Help Center
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about your stay at Grand Azure Resort.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 md:px-6 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-semibold text-foreground">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-8 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="mt-12 text-center p-8 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our team is happy to help with any questions you may have.
            </p>
            <Link href="/contact">
              <Button>
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
