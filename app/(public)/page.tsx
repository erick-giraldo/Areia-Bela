import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, MapPin, Award, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BookingWidget } from '@/components/booking/booking-widget'
import { RoomCard } from '@/components/rooms/room-card'
import { rooms, reviews, propertyInfo, specialOffers } from '@/lib/mock-data'

export default function HomePage() {
  const featuredRooms = rooms.slice(0, 3)
  const featuredReviews = reviews.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={propertyInfo.images[0]}
            alt={`${propertyInfo.name} front view`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />
        </div>

        <div className="relative z-10 container px-4 md:px-6 text-center text-background">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-background/80">
            Welcome to
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold mb-6 text-balance">
            {propertyInfo.name}
          </h1>
          <p className="text-lg md:text-xl text-background/90 max-w-2xl mx-auto mb-8 text-pretty">
            Experience comfort and style. A private heated pool, fantastic amenities,
            and impeccable design await you at {propertyInfo.city}'s premier destination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/rooms">
              <Button size="lg" className="text-base px-8">
                Explore Our Rooms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-base px-8 bg-background/10 border-background/30 text-background hover:bg-background/20">
                Discover More
              </Button>
            </Link>
          </div>
        </div>

        {/* Booking Widget Overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20 container px-4 md:px-6">
          <BookingWidget />
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-32 pb-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: MapPin, label: 'Prime Location', value: 'Beachfront' },
              { icon: Star, label: 'Guest Rating', value: '4.9/5' },
              { icon: Award, label: 'Experience', value: '15+ Years' },
              { icon: Clock, label: 'Service', value: '24/7' },
            ].map((feature) => (
              <div key={feature.label} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-semibold text-foreground">{feature.value}</p>
                <p className="text-sm text-muted-foreground">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
              Accommodations
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              The Property
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the perfect space for your stay in our newly renovated casa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/rooms">
              <Button variant="outline" size="lg">
                View All Rooms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src={propertyInfo.images[1]}
                  alt="Casa interior"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-lg overflow-hidden border-4 border-background shadow-lg hidden md:block">
                <Image
                  src={propertyInfo.images[2]}
                  alt="Casa amenities"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
                About Us
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                A Legacy of Luxury
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {propertyInfo.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {propertyInfo.amenities.slice(0, 4).map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <Button>
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
              Special Offers
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Exclusive Deals
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take advantage of our limited-time offers for an exceptional stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialOffers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {offer.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {offer.description}
                      </p>
                    </div>
                    {offer.discount > 0 && (
                      <span className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full">
                        {offer.discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                      {offer.code}
                    </code>
                    <Link href="/rooms">
                      <Button variant="ghost" size="sm">
                        Book Now
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/offers">
              <Button variant="outline" size="lg">
                View All Offers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
              Testimonials
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((review) => (
              <Card key={review.id} className="bg-card">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating
                            ? 'fill-primary text-primary'
                            : 'fill-muted text-muted'
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 line-clamp-4">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    {review.guestAvatar && (
                      <Image
                        src={review.guestAvatar}
                        alt={review.guestName}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{review.guestName}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.roomType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/reviews">
              <Button variant="outline" size="lg">
                Read All Reviews
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Ready for an Unforgettable Stay?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Book your escape today and experience the finest hospitality {propertyInfo.city} has to offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms">
              <Button size="lg" variant="secondary" className="text-base px-8">
                Book Your Stay
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
