import Image from 'next/image'
import Link from 'next/link'
import { Star, Award, User, Waves, Key, MapPin, Wind, Cat, Calendar, ChevronRight, Wifi, Tv, Coffee, Bath, Trash, Utensils, ShieldCheck, DoorOpen, Clock, Info, Shield, Heart, Flag, Share, Languages, CheckCircle2, Bed } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookingWidget } from '@/components/booking/booking-widget'
import { ImageGallery } from '@/components/rooms/image-gallery'
import { reviews, propertyInfo } from '@/lib/mock-data'
import { listingDetail, listingPhotos } from '@/lib/listing-data'

export default function HomePage() {
  const host = listingDetail.primaryHost
  
  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-10 py-6 mb-12">
      {/* Listing Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-[26px] sm:text-[28px] font-semibold text-foreground mb-2">
            {listingDetail.name}
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
            {host.isSuperhost && (
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                <span>Superhost</span>
              </div>
            )}
            <div className="flex items-center gap-1 font-semibold underline hover:opacity-80 cursor-pointer">
              <Link href="#location">
                {listingDetail.city}, {listingDetail.country}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm font-semibold underline">
          <button className="flex items-center gap-2 hover:bg-muted p-2 rounded-lg transition-colors">
            <Share className="h-4 w-4" /> Share
          </button>
          <button className="flex items-center gap-2 hover:bg-muted p-2 rounded-lg transition-colors">
            <Heart className="h-4 w-4" /> Save
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-10 lg:mb-12">
        <ImageGallery images={listingDetail.photos.map(p => p.large)} title={listingDetail.name} />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-14 lg:gap-24 relative">
        
        {/* Left Column */}
        <div className="w-full">
          {/* Host Info */}
          <div className="flex justify-between items-start pb-6 border-b border-border">
            <div>
              <h2 className="text-[22px] font-semibold text-foreground mb-1">
                {listingDetail.roomType} anfitrión: {host.firstName}
              </h2>
              <p className="text-foreground/90">
                {listingDetail.numberOfGuests} huéspedes · {listingDetail.bedroomLabel} · {listingDetail.bedLabel} · {listingDetail.bathroomLabel}
              </p>
            </div>
            <div className="h-14 w-14 rounded-full overflow-hidden bg-muted ml-4 flex-shrink-0 relative border border-border">
              <Image 
                src={host.pictureUrl} 
                alt={host.firstName} 
                fill 
                className="object-cover"
              />
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
              <DoorOpen className="h-7 w-7 flex-shrink-0 mt-0.5 text-foreground" />
              <div>
                <h3 className="font-semibold text-foreground text-base">Self check-in</h3>
                <p className="text-foreground/70 text-sm">{listingDetail.houseRulesModule?.selfCheckinInfo ?? 'Check yourself in with the smartlock.'}</p>
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

          {/* AirCover Badge */}
          <div className="py-8 border-b border-border">
            <div className="text-[28px] font-bold tracking-tighter mb-4 flex">
              <span className="text-primary">air</span>cover
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
            <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap line-clamp-6">
              {listingDetail.sectionedDescription.summary}
              {"\n\n"}
              {listingDetail.sectionedDescription.space}
            </p>
            <Button variant="link" className="px-0 font-semibold underline underline-offset-4 text-foreground mt-4 flex items-center">
              Show more <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Where you'll sleep */}
          <div className="py-12 border-b border-border">
            <h2 className="text-[22px] font-semibold text-foreground mb-6">Where you'll sleep</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-4">
                <div className="relative aspect-[3/2] rounded-xl overflow-hidden border border-border">
                  <Image src={listingPhotos[11]?.large || listingDetail.photos[0].large} alt="Bedroom 1" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Bedroom 1</h3>
                  <p className="text-sm text-foreground/70">1 queen bed</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="relative aspect-[3/2] rounded-xl overflow-hidden border border-border">
                  <Image src={listingPhotos[12]?.large || listingDetail.photos[0].large} alt="Bedroom 2" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Bedroom 2</h3>
                  <p className="text-sm text-foreground/70">1 queen bed</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="relative aspect-[3/2] rounded-xl overflow-hidden border border-border">
                  <Image src={listingPhotos[14]?.large || listingDetail.photos[0].large} alt="Bedroom 3" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Bedroom 3</h3>
                  <p className="text-sm text-foreground/70">1 bunk bed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities Summary */}
          <div className="py-12 border-b border-border">
            <h2 className="text-[22px] font-semibold text-foreground mb-6">What this place offers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {listingDetail.amenities.slice(0, 10).map((amenity) => (
                <div key={amenity} className="flex items-center gap-4 text-foreground/90">
                  {amenity.toLowerCase().includes('piscina') && <Waves className="h-6 w-6 text-foreground/80" />}
                  {amenity.toLowerCase().includes('wifi') && <Wifi className="h-6 w-6 text-foreground/80" />}
                  {amenity.toLowerCase().includes('tv') && <Tv className="h-6 w-6 text-foreground/80" />}
                  {amenity.toLowerCase().includes('cocina') && <Utensils className="h-6 w-6 text-foreground/80" />}
                  {amenity.toLowerCase().includes('cafetera') && <Coffee className="h-6 w-6 text-foreground/80" />}
                  {amenity.toLowerCase().includes('aire acondicionado') && <Wind className="h-6 w-6 text-foreground/80" />}
                  {amenity.toLowerCase().includes('mascotas') && <Cat className="h-6 w-6 text-foreground/80" />}
                  {amenity.toLowerCase().includes('bañera') && <Bath className="h-6 w-6 text-foreground/80" />}
                  {!['piscina', 'wifi', 'tv', 'cocina', 'cafetera', 'aire', 'mascotas', 'bañera'].some(kw => amenity.toLowerCase().includes(kw)) && 
                    <ShieldCheck className="h-6 w-6 text-foreground/80" />
                  }
                  <span className="text-base">{amenity}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-8 px-6 py-3 font-semibold rounded-xl text-base w-full sm:w-auto h-auto border-foreground hover:bg-muted">
              Show all {listingDetail.amenities.length} amenities
            </Button>
          </div>

          {/* Meet your host */}
          <div className="py-12 border-b border-border">
            <h2 className="text-[22px] font-semibold text-foreground mb-6">Meet your host</h2>
            <div className="bg-muted/30 rounded-3xl p-8 flex flex-col items-center text-center md:items-start md:text-left md:flex-row gap-8">
              <div className="flex flex-col items-center bg-background p-6 rounded-3xl shadow-sm border border-border min-w-[240px]">
                <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
                  <Image src={host.pictureUrl} alt={host.firstName} fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold">{host.firstName}</h3>
                <div className="flex items-center gap-1 font-semibold text-sm mb-1">
                  <Award className="h-4 w-4" /> Superhost
                </div>
                <div className="text-sm text-foreground/70">
                  {host.hostIntroTags?.join(' · ') || '10 reviews'}
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-4 text-sm font-semibold">
                   <div className="flex items-center gap-2"><Star className="h-4 w-4" /> 10 Reviews</div>
                   <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Identity verified</div>
                   <div className="flex items-center gap-2"><Award className="h-4 w-4" /> Superhost</div>
                </div>
                <p className="text-foreground/80 leading-relaxed italic">
                  "{host.about}"
                </p>
                <div className="pt-4 flex flex-col gap-2 text-sm">
                  <div className="font-bold text-base">Co-hosts</div>
                  <div className="flex gap-2">
                    {listingDetail.additionalHosts.map(cohost => (
                      <div key={cohost.id} className="h-8 w-8 rounded-full overflow-hidden relative border border-background">
                        <Image src={cohost.pictureUrl} alt={cohost.firstName} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="mt-4 px-8 py-4 rounded-xl font-bold text-base h-auto">Message Host</Button>
              </div>
            </div>
          </div>

          {/* Things to know */}
          <div className="py-12">
            <h2 className="text-[22px] font-semibold text-foreground mb-8">Things to know</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div className="space-y-4">
                <h3 className="font-semibold text-base">House rules</h3>
                <div className="space-y-3 text-foreground/80">
                  <div className="flex gap-3"><Clock className="h-4 w-4" /> Check-in: {listingDetail.checkInTime}</div>
                  <div className="flex gap-3"><Clock className="h-4 w-4" /> Check-out: {listingDetail.checkOutTime}</div>
                  <div className="flex gap-3"><User className="h-4 w-4" /> 8 guests maximum</div>
                  <div className="flex gap-3"><Cat className="h-4 w-4" /> Pets allowed</div>
                </div>
                <Button variant="link" className="px-0 font-semibold underline text-foreground flex items-center h-auto">
                  Show more <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-base">Safety & property</h3>
                <div className="space-y-3 text-foreground/80">
                  <div className="flex gap-3"><ShieldCheck className="h-4 w-4" /> Smoke alarm</div>
                  <div className="flex gap-3"><ShieldCheck className="h-4 w-4" /> Carbon monoxide alarm</div>
                  <div className="flex gap-3"><ShieldCheck className="h-4 w-4" /> Fire extinguisher</div>
                  <div className="flex gap-3"><ShieldCheck className="h-4 w-4" /> First aid kit</div>
                </div>
                <Button variant="link" className="px-0 font-semibold underline text-foreground flex items-center h-auto">
                  Show more <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-base">Cancellation policy</h3>
                <div className="space-y-3 text-foreground/80">
                  <p className="font-semibold">Free cancellation for 48 hours.</p>
                  <p>Review the Host's full cancellation policy which applies even if you cancel for illness or other issues like trouble checking in.</p>
                </div>
                <Button variant="link" className="px-0 font-semibold underline text-foreground flex items-center h-auto">
                  Show more <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Widget (Desktop) */}
        <div className="hidden lg:block relative">
          <div className="sticky top-28 z-10 w-[350px]">
            {/* The BookingWidget wrapper will use Shadcn components natively. We add shadow for pop. */}
            <div className="bg-background border border-border rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.12)] p-6 block">
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-[22px] font-semibold text-foreground">$250</span>
                <span className="text-foreground/80">night</span>
              </div>
              <BookingWidget variant="compact" className="flex flex-col gap-4 [&>div]:w-full [&>button]:w-full" />
              <div className="mt-4 text-center text-sm text-foreground/70">
                You won't be charged yet
              </div>
              
              <div className="mt-6 space-y-4 border-b border-border pb-6 text-sm">
                <div className="flex justify-between text-foreground/90 underline">
                  <span>$250 x 5 nights</span>
                  <span>$1,250</span>
                </div>
                <div className="flex justify-between text-foreground/90 underline">
                  <span>Cleaning fee</span>
                  <span>$150</span>
                </div>
                <div className="flex justify-between text-foreground/90 underline">
                  <span>Service fee</span>
                  <span>$198</span>
                </div>
              </div>
              
              <div className="flex justify-between text-foreground font-semibold pt-6 text-lg">
                <span>Total before taxes</span>
                <span>$1,598</span>
              </div>
            </div>

            {/* Rare Find / Good Value Badge (Optional Airbnb style) */}
            <div className="mt-6 p-4 border border-border rounded-xl flex items-center gap-4">
               <div className="flex flex-col">
                  <span className="font-semibold text-base">This is a rare find</span>
                  <span className="text-sm text-foreground/70">{host.firstName}'s place is usually fully booked.</span>
               </div>
               <Award className="h-10 w-10 text-primary/80" />
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
          {reviews.slice(0, 6).map((review) => (
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
                    <span>{review.localizedDate || 'Stayed a few nights'}</span>
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
              </div>
              
              <p className="text-foreground/90 leading-relaxed mb-3 line-clamp-4">
                {review.comment}
              </p>
              {review.comment.length > 150 && (
                <Button variant="link" className="px-0 h-auto font-semibold text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity">
                  Show more
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-12 px-6 py-3 font-semibold rounded-xl text-base h-auto border-foreground hover:bg-muted">
          Show all {reviews.length} reviews
        </Button>
      </section>

      {/* Location Section */}
      <section id="location" className="py-12 border-b border-border">
        <div className="mb-6">
          <h2 className="font-serif text-[26px] font-semibold text-foreground">
            Where you'll be
          </h2>
          <p className="text-foreground/80 mt-1">{listingDetail.city}, {listingDetail.country}</p>
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
              {listingDetail.name}
            </h3>
            <p className="text-foreground/80 leading-relaxed text-base">
              {listingDetail.sectionedDescription.neighborhoodOverview}
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

      {/* Things to know */}
      <section className="py-12 mb-20">
        <h2 className="text-[22px] font-semibold text-foreground mb-8">Things to know</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-4">
            <h3 className="font-semibold text-base">House rules</h3>
            <div className="space-y-3 text-foreground/80">
              <div className="flex gap-3"><Clock className="h-4 w-4" /> Check-in: {listingDetail.checkInTime}</div>
              <div className="flex gap-3"><Clock className="h-4 w-4" /> Check-out: {listingDetail.checkOutTime}</div>
              <div className="flex gap-3"><User className="h-4 w-4" /> 8 guests maximum</div>
              <div className="flex gap-3"><Cat className="h-4 w-4" /> Pets allowed</div>
            </div>
            <Button variant="link" className="px-0 font-semibold underline text-foreground flex items-center h-auto">
              Show more <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Safety & property</h3>
            <div className="space-y-3 text-foreground/80">
              <div className="flex gap-3"><ShieldCheck className="h-4 w-4" /> Smoke alarm</div>
              <div className="flex gap-3"><ShieldCheck className="h-4 w-4" /> Carbon monoxide alarm</div>
              <div className="flex gap-3"><ShieldCheck className="h-4 w-4" /> Fire extinguisher</div>
              <div className="flex gap-3"><ShieldCheck className="h-4 w-4" /> First aid kit</div>
            </div>
            <Button variant="link" className="px-0 font-semibold underline text-foreground flex items-center h-auto">
              Show more <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-base">Cancellation policy</h3>
            <div className="space-y-3 text-foreground/80">
              <p>Free cancellation for 48 hours.</p>
              <p>Review the Host's full cancellation policy which applies even if you cancel for illness or other issues like trouble checking in.</p>
            </div>
            <Button variant="link" className="px-0 font-semibold underline text-foreground flex items-center h-auto">
              Show more <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Mobile Sticky Booking Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 flex justify-between items-center z-40">
        <div>
          <div className="font-semibold text-foreground text-lg flex items-center gap-1">
             $250 <span className="text-sm font-normal text-foreground/80">night</span>
          </div>
          <p className="text-xs text-foreground/80 underline font-medium">Add dates</p>
        </div>
        <Button className="w-1/2 rounded-lg font-semibold text-base py-6">
          Reserve
        </Button>
      </div>

    </div>
  )
}
