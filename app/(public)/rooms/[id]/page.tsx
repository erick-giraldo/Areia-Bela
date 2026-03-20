import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Maximize, Bed, Check, ChevronLeft, Wifi, Wind, Tv, Coffee, Bath, Waves, Award, Star, MapPin, Key, DoorOpen, Utensils, ShieldCheck, Cat, Calendar, ChevronRight, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { rooms, reviews, roomAvailability } from '@/lib/mock-data'
import { BookingCard } from '@/components/booking/booking-card'
import { listingDetail, listingPhotos } from '@/lib/listing-data'
import { ImageGallery } from '@/components/rooms/image-gallery'

const amenityIcons: Record<string, React.ElementType> = {
  'Wifi': Wifi,
  'Aire acondicionado': Wind,
  'TV': Tv,
  'Cafetera': Coffee,
  'Cafetera Keurig': Coffee,
  'Piscina': Waves,
  'Cocina': Utensils,
  'Bañera': Bath,
  'Admite mascotas': Cat,
}

interface RoomDetailPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{
    checkIn?: string
    checkOut?: string
    guests?: string
  }>
}

export default async function RoomDetailPage({ params, searchParams }: RoomDetailPageProps) {
  const { id } = await params
  const search = await searchParams
  
  const room = rooms.find(r => r.id === id)
  if (!room) notFound()

  const photos = listingPhotos.length >= 5 ? listingPhotos : room.images.map((url, i) => ({ id: i, large: url, caption: undefined }))
  const roomReviews = reviews.filter(r => r.roomType === room.type).slice(0, 3)
  const availability = roomAvailability.filter(a => a.roomId === room.id)
  const host = listingDetail.primaryHost
  const displayAmenities = listingDetail.amenities.slice(0, 24)

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
        {/* Listing Header */}
        <div className="mb-6">
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
              {listingDetail.city}, {listingDetail.country}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-10 lg:mb-12">
          <ImageGallery images={photos.map(p => p.large)} title={listingDetail.name} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-14 lg:gap-24 relative">
          {/* Main Content */}
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
              <div className="h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden bg-muted ml-4 flex-shrink-0 relative">
                <Image src={host.pictureUrl} alt={host.firstName} fill className="object-cover" />
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

            {/* Description */}
            <div className="py-8 border-b border-border">
              <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {listingDetail.sectionedDescription.summary}
              </p>
              <Button variant="link" className="px-0 font-semibold underline underline-offset-4 text-foreground mt-4 flex items-center">
                Show more <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* Amenities */}
            <div className="py-12 border-b border-border">
              <h2 className="text-[22px] font-semibold text-foreground mb-6">What this place offers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {displayAmenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] ?? ShieldCheck
                  return (
                    <div key={amenity} className="flex items-center gap-4 text-foreground/90">
                      <Icon className="h-6 w-6 text-foreground/80 flex-shrink-0" />
                      <span className="text-base">{amenity}</span>
                    </div>
                  )
                })}
              </div>
              <Button variant="outline" className="mt-8 px-6 py-3 font-semibold rounded-xl text-base h-auto border-foreground hover:bg-muted">
                Show all {listingDetail.amenities.length} amenities
              </Button>
            </div>

            {/* Reviews */}
            <section id="reviews" className="py-12">
              <div className="flex items-center gap-2 text-[22px] font-semibold text-foreground mb-8">
                <Star className="h-5 w-5 fill-current" />
                <span>4.9 · {reviews.length} reviews</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                {reviews.slice(0, 6).map((review) => (
                  <div key={review.id} className="w-full">
                    <div className="flex items-center gap-4 mb-4">
                      {review.guestAvatar ? (
                        <Image src={review.guestAvatar} alt={review.guestName} width={48} height={48} className="rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-foreground text-base">{review.guestName}</h3>
                        <p className="text-sm text-foreground/70">{review.localizedDate || 'Stayed a few nights'}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-2.5 w-2.5 ${i < review.rating ? 'fill-foreground text-foreground' : 'fill-muted text-muted'}`} />
                      ))}
                    </div>
                    <p className="text-foreground/90 leading-relaxed mb-3 line-clamp-4">{review.comment}</p>
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
          </div>

          {/* Booking Card */}
          <div className="hidden lg:block relative">
            <div className="sticky top-28 z-10 w-[350px]">
              <BookingCard 
                room={room}
                checkIn={search.checkIn}
                checkOut={search.checkOut}
                guests={search.guests ? parseInt(search.guests) : 2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
