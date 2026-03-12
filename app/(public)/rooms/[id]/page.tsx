import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Maximize, Bed, Check, ChevronLeft, Wifi, Wind, Tv, Coffee, Bath, Waves } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { rooms, reviews, roomAvailability } from '@/lib/mock-data'
import { BookingCard } from '@/components/booking/booking-card'
import { listingDetail, listingPhotos } from '@/lib/listing-data'

const amenityIcons: Record<string, React.ElementType> = {
  'Wifi': Wifi,
  'Aire acondicionado': Wind,
  'TV': Tv,
  'Cafetera': Coffee,
  'Cafetera Keurig': Coffee,
  'Piscina': Waves,
  'Cocina': Coffee,
  'Bañera': Bath,
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
      <div className="container px-4 md:px-6 py-4">
        <Link href="/rooms" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a la casa
        </Link>
      </div>

      {/* Image Gallery */}
      <section className="container px-4 md:px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image src={photos[0].large} alt={room.name} fill className="object-cover" priority />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {photos.slice(1, 5).map((photo) => (
              <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden">
                <Image src={photo.large} alt={photo.caption ?? room.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Details */}
      <section className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <Badge className="mb-3">{listingDetail.roomType}</Badge>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                {listingDetail.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {listingDetail.sectionedDescription.summary}
              </p>
            </div>

            {/* Host */}
            <div className="flex items-center gap-4 py-6 border-y border-border mb-8">
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                <Image src={host.pictureUrl} alt={host.name} fill className="object-cover" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">
                  Alojamiento completo con {host.firstName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {listingDetail.numberOfGuests} huéspedes · {listingDetail.bedroomLabel} · {listingDetail.bedLabel} · {listingDetail.bathroomLabel}
                </p>
                {host.isSuperhost && <Badge variant="secondary" className="mt-1 text-xs">Superhost</Badge>}
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-border mb-8">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">Hasta {listingDetail.numberOfGuests} huéspedes</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">{listingDetail.bedLabel}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Lo que ofrece esta casa
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {displayAmenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] ?? Check
                  return (
                    <div key={amenity} className="flex items-center gap-3 text-foreground">
                      <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Reviews */}
            {roomReviews.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Reseñas de huéspedes
                </h2>
                <div className="space-y-6">
                  {roomReviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-border last:border-0">
                      <div className="flex items-start gap-4">
                        {review.guestAvatar && (
                          <Image src={review.guestAvatar} alt={review.guestName} width={48} height={48} className="rounded-full object-cover" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{review.guestName}</span>
                            <span className="text-sm text-muted-foreground">{review.localizedDate ?? review.createdAt}</span>
                          </div>
                          <div className="flex gap-0.5 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div key={i} className={`h-3 w-3 rounded-full ${i < review.rating ? 'bg-primary' : 'bg-muted'}`} />
                            ))}
                          </div>
                          <p className="text-foreground">{review.comment}</p>
                          {review.hostResponse && (
                            <div className="mt-3 pl-4 border-l-2 border-primary/30">
                              <p className="text-sm font-medium text-muted-foreground mb-1">Respuesta de {host.firstName}</p>
                              <p className="text-sm text-muted-foreground">{review.hostResponse.replace(/<br\/?>/gi, '\n')}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/reviews" className="inline-block mt-4">
                  <Button variant="outline">Ver todas las reseñas</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingCard 
                room={room}
                checkIn={search.checkIn}
                checkOut={search.checkOut}
                guests={search.guests ? parseInt(search.guests) : 2}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
