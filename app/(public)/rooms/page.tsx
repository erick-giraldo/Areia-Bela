import { Suspense } from 'react'
import { rooms } from '@/lib/mock-data'
import { RoomCard } from '@/components/rooms/room-card'
import { BookingWidget } from '@/components/booking/booking-widget'
import { Skeleton } from '@/components/ui/skeleton'

interface RoomsPageProps {
  searchParams: Promise<{
    checkIn?: string
    checkOut?: string
    guests?: string
  }>
}

function RoomsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[4/3] rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  )
}

async function RoomsList({ 
  checkIn, 
  checkOut, 
  guests 
}: { 
  checkIn?: string
  checkOut?: string
  guests?: number 
}) {
  // Filter rooms based on guest capacity
  const filteredRooms = guests 
    ? rooms.filter(room => room.capacity >= guests)
    : rooms

  if (filteredRooms.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No rooms available
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRooms.map((room) => (
        <RoomCard 
          key={room.id} 
          room={room}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
        />
      ))}
    </div>
  )
}

export default async function RoomsPage({ searchParams }: RoomsPageProps) {
  const params = await searchParams
  const guests = params.guests ? parseInt(params.guests) : undefined

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-muted/30 py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
              Accommodations
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Our Rooms & Suites
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our selection of beautifully appointed rooms and suites, 
              each designed to provide the ultimate comfort and luxury.
            </p>
          </div>

          <BookingWidget variant="hero" />
        </div>
      </section>

      {/* Room Listings */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {rooms.length} Room Types Available
              </h2>
              {guests && (
                <p className="text-sm text-muted-foreground">
                  Showing rooms for {guests} {guests === 1 ? 'guest' : 'guests'}
                </p>
              )}
            </div>
          </div>

          <Suspense fallback={<RoomsSkeleton />}>
            <RoomsList 
              checkIn={params.checkIn} 
              checkOut={params.checkOut} 
              guests={guests}
            />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
