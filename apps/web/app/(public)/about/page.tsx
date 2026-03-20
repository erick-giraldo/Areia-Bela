import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Waves, Utensils, Sparkles, Car, Wifi, Clock, Umbrella, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { propertyInfo } from '@/lib/mock-data'

const amenities = [
  { icon: Waves, name: 'Heated Pool', description: 'Private heated pool for year-round enjoyment' },
  { icon: Umbrella, name: 'Beach Gear', description: 'Towels, chairs, umbrellas, and beach stroller provided' },
  { icon: Sparkles, name: 'Smart Home', description: 'Smart toilet, keypad entry, and high-tech amenities' },
  { icon: Coffee, name: 'Coffee Bar', description: 'Full coffee bar with Keurig and premium selections' },
  { icon: Utensils, name: 'Full Kitchen', description: 'Fully stocked kitchen for all your culinary needs' },
  { icon: Car, name: 'Free Parking', description: 'Complimentary on-site driveway and street parking' },
  { icon: Wifi, name: 'High-Speed WiFi', description: 'Unlimited high-speed WiFi throughout the house' },
  { icon: Clock, name: 'Host Support', description: 'Responsive and dedicated host assistance' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920"
            alt={propertyInfo.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative z-10 text-center text-background px-4">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-background/80">
            About Us
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            A Legacy of Luxury
          </h1>
          <p className="text-lg text-background/90 max-w-2xl mx-auto">
            {propertyInfo.name} is designed for memorable stays with a modern, guest-first experience.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
                Our Story
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Where Luxury Meets the Sea
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {propertyInfo.description}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our commitment to guest satisfaction has earned us glowing reviews from families and groups alike. 
                From our private heated pool to our thoughtful in-home features, every detail has been 
                curated to provide the ultimate vacation experience.
              </p>
              <div className="space-y-3">
                {propertyInfo.policies.map((policy) => (
                  <div key={policy} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{policy}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"
                  alt="Resort lobby"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
              Amenities
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              World-Class Facilities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every amenity has been thoughtfully designed to enhance your stay and create unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((amenity) => (
              <Card key={amenity.name} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <amenity.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{amenity.name}</h3>
                  <p className="text-sm text-muted-foreground">{amenity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
              Gallery
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              Discover Our Property
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
              'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600',
              'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600',
              'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600',
              'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600',
              'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
            ].map((image, index) => (
              <div
                key={index}
                className={`relative rounded-lg overflow-hidden ${
                  index === 0 || index === 3 ? 'aspect-[4/3] md:col-span-2' : 'aspect-square'
                }`}
              >
                <Image
                  src={image}
                  alt={`Resort gallery image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Ready to book {propertyInfo.name}?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Book your stay today with a fast, modern checkout experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms/1489399156507737323">
              <Button size="lg" variant="secondary">
                Book Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
