'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Grid, ChevronLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-background z-50 overflow-y-auto w-full h-full animate-in fade-in zoom-in duration-300">
        <div className="sticky top-0 bg-background z-10 w-full px-4 py-4 md:px-8 border-b border-border flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={() => setShowAllPhotos(false)} className="rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex gap-2">
           <Button variant="ghost" size="icon" onClick={() => setShowAllPhotos(false)} className="rounded-full">
            <X className="h-5 w-5" />
           </Button>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative aspect-video w-full">
              <Image
                src={img}
                alt={`${title} - Photo ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Handle case with fewer than 5 images gracefully, though mock data has 5
  if (images.length < 5) {
    return (
      <div className="relative aspect-video w-full rounded-xl overflow-hidden group">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority
        />
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px] rounded-xl overflow-hidden">
        {/* Main large image */}
        <div className="md:col-span-2 relative h-full group">
          <Image
            src={images[0]}
            alt={`${title} - Main Photo`}
            fill
            className="object-cover group-hover:opacity-90 transition-opacity cursor-pointer"
            onClick={() => setShowAllPhotos(true)}
            priority
          />
        </div>
        
        {/* Grid of 4 smaller images */}
        <div className="hidden md:grid col-span-2 grid-cols-2 gap-2 h-full">
          <div className="relative h-full group">
             <Image
              src={images[1]}
              alt={`${title} - Photo 2`}
              fill
              className="object-cover group-hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
          </div>
          <div className="relative h-full group">
            <Image
              src={images[2]}
              alt={`${title} - Photo 3`}
              fill
              className="object-cover group-hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
          </div>
          <div className="relative h-full group">
            <Image
              src={images[3]}
              alt={`${title} - Photo 4`}
              fill
              className="object-cover group-hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
          </div>
          <div className="relative h-full group">
            <Image
              src={images[4]}
              alt={`${title} - Photo 5`}
              fill
              className="object-cover group-hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
          </div>
        </div>
      </div>

      <Button 
        variant="outline" 
        className="absolute bottom-4 right-4 bg-background/90 hover:bg-background border-border shadow-sm font-semibold rounded-lg"
        onClick={() => setShowAllPhotos(true)}
      >
        <Grid className="mr-2 h-4 w-4" />
        Show all photos
      </Button>
    </div>
  )
}
