import Image from 'next/image'
import Link from 'next/link'
import { Star, Award, User, Waves, Key, MapPin, Wind, Cat, Calendar, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookingWidget } from '@/components/booking/booking-widget'
import { ImageGallery } from '@/components/rooms/image-gallery'
import { reviews, propertyInfo } from '@/lib/mock-data'

export default function HomePage() {
  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-10 py-6 mb-12">
      {/* Listing Header */}
      <div className="mb-6">
        <h1 className="text-[26px] sm:text-[28px] font-semibold text-foreground mb-2">
          {propertyInfo.name}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground">
          <div className="flex items-center gap-1 font-semibold">
            <Star className="h-4 w-4 fill-foreground" />
            <span>4.9</span>
            <span>·</span>
            <Link href="#reviews" className="underline hover:opacity-80">
              {reviews.length} reviews
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>Superhost</span>
          </div>
          <div className="flex items-center gap-1 font-semibold underline hover:opacity-80 cursor-pointer">
            <Link href="#location">
              {propertyInfo.city}, Florida, United States
            </Link>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-10 lg:mb-12">
        <ImageGallery images={propertyInfo.images} title={propertyInfo.name} />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-14 lg:gap-24 relative">
        
        {/* Left Column */}
        <div className="w-full">
          {/* Host Info */}
          <div className="flex justify-between items-start pb-6 border-b border-border">
            <div>
              <h2 className="text-[22px] font-semibold text-foreground mb-1">
                Entire casa hosted by Areia Bela
              </h2>
              <p className="text-foreground/90">
                6 guests · 3 bedrooms · 4 beds · 2 baths
              </p>
            </div>
            <div className="h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden bg-muted ml-4 flex-shrink-0 relative">
              <User className="absolute inset-0 m-auto h-7 w-7 md:h-8 md:w-8 text-muted-foreground" />
            </div>
          </div>

          {/* Highlights */}
          <div className="py-8 border-b border-border space-y-6">
            <div className="flex gap-4 items-start">
              <Waves className="h-7 w-7 flex-shrink-0 mt-0.5 text-foreground" />
              <div>
                <h3 className="font-semibold text-foreground text-base">Dive right in</h3>
                <p className="text-foreground/70 text-sm">This is one of the few places in the area with a private heated pool.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Key className="h-7 w-7 flex-shrink-0 mt-0.5 text-foreground" />
              <div>
                <h3 className="font-semibold text-foreground text-base">Self check-in</h3>
                <p className="text-foreground/70 text-sm">Check yourself in with the smartlock.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Calendar className="h-7 w-7 flex-shrink-0 mt-0.5 text-foreground" />
              <div>
                <h3 className="font-semibold text-foreground text-base">Free cancellation for 48 hours</h3>
                <p className="text-foreground/70 text-sm">Lock in this great location with peace of mind.</p>
              </div>
            </div>
          </div>

          {/* AirCover Badge (Simulated) */}
          <div className="py-8 border-b border-border">
            <div className="text-[28px] font-bold text-primary tracking-tighter mb-4 flex">
              <span className="text-foreground">air</span>cover
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
            </p>
            <Button variant="link" className="px-0 font-semibold underline underline-offset-4 text-foreground">
              Learn more
            </Button>
          </div>

          {/* Description Content */}
          <div className="py-8 border-b border-border">
            <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {propertyInfo.description}
            </p>
            <Button variant="link" className="px-0 font-semibold underline underline-offset-4 text-foreground mt-4 flex items-center">
              Show more <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Amenities Summary */}
          <div className="py-12 border-b border-border">
            <h2 className="text-[22px] font-semibold text-foreground mb-6">What this place offers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {propertyInfo.amenities.slice(0, 8).map((amenity, index) => (
                <div key={amenity} className="flex items-center gap-4 text-foreground/90">
                  {/* Pseudo-randomizing icons for visual fidelity */}
                  {index % 4 === 0 && <Waves className="h-6 w-6 text-foreground/80" />}
                  {index % 4 === 1 && <Wind className="h-6 w-6 text-foreground/80" />}
                  {index % 4 === 2 && <Cat className="h-6 w-6 text-foreground/80" />}
                  {index % 4 === 3 && <User className="h-6 w-6 text-foreground/80" />}
                  <span className="text-base">{amenity}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-8 px-6 py-6 font-semibold rounded-xl text-base w-full sm:w-auto h-auto border-foreground hover:bg-muted">
              Show all 10 amenities
            </Button>
          </div>
        </div>

        {/* Right Column: Sticky Booking Widget (Desktop) */}
        <div className="hidden lg:block relative">
          <div className="sticky top-28 z-10 w-[350px]">
            {/* The BookingWidget wrapper will use Shadcn components natively. We add shadow for pop. */}
            <div className="bg-background border border-border rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.12)] p-6 block">
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-[22px] font-semibold text-foreground">$150</span>
                <span className="text-foreground/80">night</span>
              </div>
              <BookingWidget variant="compact" className="flex flex-col gap-4 [&>div]:w-full [&>button]:w-full" />
              <div className="mt-4 text-center text-sm text-foreground/70">
                You won't be charged yet
              </div>
              
              <div className="mt-6 space-y-4 border-b border-border pb-6">
                <div className="flex justify-between text-foreground/90 underline">
                  <span>$150 x 3 nights</span>
                  <span>$450</span>
                </div>
                <div className="flex justify-between text-foreground/90 underline">
                  <span>Cleaning fee</span>
                  <span>$120</span>
                </div>
                <div className="flex justify-between text-foreground/90 underline">
                  <span>Airbnb service fee</span>
                  <span>$80</span>
                </div>
              </div>
              
              <div className="flex justify-between text-foreground font-semibold pt-6 text-lg">
                <span>Total before taxes</span>
                <span>$650</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Reviews Section */}
      <section id="reviews" className="py-12 border-b border-border">
        <div className="flex items-center gap-2 text-[22px] font-semibold text-foreground mb-8">
          <Star className="h-5 w-5 fill-current" />
          <span>4.9 · {reviews.length} reviews</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {reviews.map((review) => (
            <div key={review.id} className="w-full">
              <div className="flex items-center gap-4 mb-4">
                {review.guestAvatar ? (
                  <Image
                    src={review.guestAvatar}
                    alt={review.guestName}
                    width={48}
                    height={48}
                    className="rounded-full object-cover bg-muted"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                     <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-foreground text-base">{review.guestName}</h3>
                  <div className="text-sm text-foreground/70 flex items-center gap-1">
                    <span>{review.rating >= 4 ? `${review.rating} years on Airbnb` : 'Joined 2024'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-foreground mb-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-2.5 w-2.5 ${i < review.rating
                          ? 'fill-foreground text-foreground'
                          : 'fill-muted text-muted'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-foreground/50">·</span>
                <span className="font-semibold text-foreground/80">{review.rating >= 4.5 ? '2 weeks ago' : '1 month ago'}</span>
                <span className="text-foreground/50">·</span>
                <span className="text-foreground/80">Stayed a few nights</span>
              </div>
              
              <p className="text-foreground/90 leading-relaxed mb-3 line-clamp-4">
                {review.comment}
              </p>
              <Button variant="link" className="px-0 h-auto font-semibold text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity">
                Show more
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-8 px-6 py-6 font-semibold rounded-xl text-base h-auto border-foreground hover:bg-muted">
          Show all {reviews.length} reviews
        </Button>
      </section>

      {/* Location Section */}
      <section id="location" className="py-12 border-b border-border">
        <div className="mb-6">
          <h2 className="font-serif text-[26px] font-semibold text-foreground">
            Where you'll be
          </h2>
          <p className="text-foreground/80 mt-1">St. Petersburg, Florida, United States</p>
        </div>
        
        <div className="group relative w-full h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-sm mb-8">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3528.27419102434!2d-82.78821252441964!3d27.816251620242203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2fd15ebc9ec1f%3A0xea5d3d7f3368a9aa!2sAreia%20Bela!5e0!3m2!1sen!2sus!4v1710128828956!5m2!1sen!2sus"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Areia Bela Exact Location Map"
            className="transition-transform duration-700 group-hover:scale-[1.02]"
          ></iframe>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <div className="max-w-2xl">
            <h3 className="font-semibold text-foreground mb-3 text-lg">
              Areia Bela, Madeira Beach, Florida
            </h3>
            <p className="text-foreground/80 leading-relaxed text-base">
              The property is ideally located just a 5-minute walk from the stunning white sands of Madeira Beach. 
              You'll be close to local shops, waterfront dining, and the famous John's Pass Village & Boardwalk.
            </p>
            <div className="mt-4">
              <Button variant="link" className="px-0 h-auto font-semibold text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity flex items-center" asChild>
                <a href="https://www.google.com/maps/place/Areia+Bela/@27.8162469,-82.7856376,17z/data=!3m1!4b1!4m6!3m5!1s0x88c2fd15ebc9ec1f:0xea5d3d7f3368a9aa!8m2!3d27.8162469!4d-82.7856376!16s%2Fg%2F11ysmwhml3!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                  Show more <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-[300px] bg-muted/30 p-6 rounded-2xl flex-shrink-0">
             <h4 className="font-semibold text-foreground mb-4">Neighborhood highlights</h4>
             <ul className="space-y-4">
               <li className="flex items-center gap-3 text-sm text-foreground/80">
                  <Waves className="h-5 w-5 text-primary" />
                  <span>5 mins to Madeira Beach</span>
               </li>
               <li className="flex items-center gap-3 text-sm text-foreground/80">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>John's Pass Village</span>
               </li>
               <li className="flex items-center gap-3 text-sm text-foreground/80">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Waterfront Dining</span>
               </li>
             </ul>
          </div>
        </div>
      </section>
      
      {/* Mobile Sticky Booking Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 flex justify-between items-center z-40">
        <div>
          <div className="font-semibold text-foreground text-lg flex items-center gap-1">
             $150 <span className="text-sm font-normal text-foreground/80">night</span>
          </div>
          <p className="text-xs text-foreground/80 underline font-medium">Oct 12 - 17</p>
        </div>
        <Button className="w-1/2 rounded-lg font-semibold text-base py-6">
          Reserve
        </Button>
      </div>

    </div>
  )
}
