'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Maximize, ChevronLeft, ChevronRight, Wifi, Wind, Tv } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Room } from '@/types'
import { cn } from '@/lib/utils'

interface RoomCardProps {
  room: Room
  checkIn?: string
  checkOut?: string
  guests?: number
}

const amenityIcons: Record<string, React.ElementType> = {
  'WiFi': Wifi,
  'High-speed WiFi': Wifi,
  'Air Conditioning': Wind,
  'Flat Screen TV': Tv,
  'HDTV with Roku': Tv,
}

export function RoomCard({ room, checkIn, checkOut, guests }: RoomCardProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImage((prev) => (prev + 1) % room.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImage((prev) => (prev - 1 + room.images.length) % room.images.length)
  }

  const searchParams = new URLSearchParams()
  if (checkIn) searchParams.set('checkIn', checkIn)
  if (checkOut) searchParams.set('checkOut', checkOut)
  if (guests) searchParams.set('guests', guests.toString())

  const href = `/rooms/${room.id}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

  return (
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-shadow">
      <Link href={href}>
        {/* Image Carousel */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={room.images[currentImage]}
            alt={room.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Navigation Arrows */}
          {room.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {room.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {room.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentImage(index)
                  }}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-colors',
                    index === currentImage ? 'bg-background' : 'bg-background/50'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Room Type Badge */}
          <Badge className="absolute top-3 left-3 bg-background/90 text-foreground hover:bg-background/90">
            {room.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </Badge>
        </div>

        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {room.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {room.description}
              </p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>Up to {room.capacity}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4" />
              <span>{room.size} m²</span>
            </div>
          </div>

          {/* Top Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {room.amenities.slice(0, 4).map((amenity) => {
              const Icon = amenityIcons[amenity]
              return (
                <span
                  key={amenity}
                  className="text-xs text-muted-foreground flex items-center gap-1"
                >
                  {Icon && <Icon className="h-3 w-3" />}
                  {amenity}
                </span>
              )
            })}
            {room.amenities.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{room.amenities.length - 4} more
              </span>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="text-2xl font-semibold text-foreground">
                ${room.basePrice}
              </span>
              <span className="text-sm text-muted-foreground"> / night</span>
            </div>
            <Button size="sm">
              View Details
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
