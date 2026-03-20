import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Users, 
  Maximize, 
  Bed, 
  Check, 
  ChevronLeft,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Bath,
  Mountain,
  UtensilsCrossed,
  Waves
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { rooms, reviews, roomAvailability } from '@/lib/mock-data'
import { BookingCard } from '@/components/booking/booking-card'

const amenityIcons: Record<string, React.ElementType> = {
  'WiFi': Wifi,
  'Air Conditioning': Wind,
  'Flat Screen TV': Tv,
  'Coffee Maker': Coffee,
  'Bathrobe': Bath,
  'Ocean View': Mountain,
  'Kitchenette': UtensilsCrossed,
  'Private Pool': Waves,
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
  
  if (!room) {
    notFound()
  }

  const roomReviews = reviews.filter(r => r.roomType === room.type).slice(0, 3)
  const availability = roomAvailability.filter(a => a.roomId === room.id)

  return (
    <div className="min-h-screen pb-20">
      {/* Back Button */}
      <div className="container px-4 md:px-6 py-4">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
      </div>

      {/* Image Gallery */}
      <section className="container px-4 md:px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={room.images[0]}
              alt={room.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {room.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${room.name} view ${index + 2}`}
                  fill
                  className="object-cover"
                />
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
              <Badge className="mb-3">
                {room.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </Badge>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                {room.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-border mb-8">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">Up to {room.capacity} guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">{room.size} m²</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">{room.beds}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                What this room offers
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Check
                  return (
                    <div key={amenity} className="flex items-center gap-3 text-foreground">
                      <Icon className="h-5 w-5 text-muted-foreground" />
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
                  Guest Reviews
                </h2>
                <div className="space-y-6">
                  {roomReviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-border last:border-0">
                      <div className="flex items-start gap-4">
                        {review.guestAvatar && (
                          <Image
                            src={review.guestAvatar}
                            alt={review.guestName}
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{review.guestName}</span>
                            <span className="text-sm text-muted-foreground">{review.createdAt}</span>
                          </div>
                          <div className="flex gap-0.5 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-3 w-3 rounded-full ${
                                  i < review.rating ? 'bg-primary' : 'bg-muted'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/reviews" className="inline-block mt-4">
                  <Button variant="outline">
                    View All Reviews
                  </Button>
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
