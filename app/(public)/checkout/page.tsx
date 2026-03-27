'use client'

import { Suspense } from 'react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { format, differenceInDays } from 'date-fns'
import { 
  ChevronLeft, 
  Lock, 
  Calendar, 
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { rooms } from '@/lib/mock-data'
import { calculatePrice } from '@/services/pricing'
import { createCheckoutSession } from '@/services/payment'

function CheckoutForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const roomId = searchParams.get('roomId')
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  const guestsParam = searchParams.get('guests')
  const couponParam = searchParams.get('coupon')
  
  const room = rooms.find(r => r.id === roomId)
  const guests = guestsParam ? parseInt(guestsParam) : 2
  
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'United States',
    specialRequests: '',
  })

  if (!room || !checkIn || !checkOut) {
    return (
      <div className="container px-4 md:px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">Invalid Booking</h1>
        <p className="text-muted-foreground mb-6">
          Please select a room and dates to continue with your booking.
        </p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    )
  }

  const nights = differenceInDays(new Date(checkOut), new Date(checkIn))
  const priceData = calculatePrice(room.id, checkIn, checkOut, couponParam || undefined)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Create Stripe Checkout Session
      const session = await createCheckoutSession({
        roomId: room.id,
        roomName: room.name,
        roomType: room.type,
        checkIn,
        checkOut,
        guests,
        adults: guests,
        children: 0,
        nights,
        nightPrice: priceData.nightPrice,
        cleaningFee: priceData.cleaningFee,
        serviceFee: priceData.serviceFee,
        taxes: priceData.taxes,
        totalPrice: priceData.total,
      })

      // Redirect to Stripe Checkout URL
      window.location.href = session.url
    } catch (error) {
      console.error('Checkout error:', error)
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container px-4 md:px-6">
      {/* Back Button */}
      <Link 
        href={`/?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Home
      </Link>

      <h1 className="font-serif text-3xl font-semibold text-foreground mb-8">
        Complete Your Booking
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Guest Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Any special requests or notes for your stay..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted and processed securely by Stripe. We do not store your full card details.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-medium shadow-lg hover:shadow-xl transition-all" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Redirecting to Stripe...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Book & Pay with Stripe
                  </>
                )}
              </Button>
            </div>
            
            <p className="text-center text-sm text-muted-foreground">
              By completing this booking, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="flex gap-4 mb-6">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{room.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {room.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-2 w-2 rounded-full bg-primary" />
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-foreground">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {format(new Date(checkIn), 'EEE, MMM d')} - {format(new Date(checkOut), 'EEE, MMM d, yyyy')}
                    </p>
                    <p className="text-muted-foreground">{nights} {nights === 1 ? 'night' : 'nights'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <p>{guests} {guests === 1 ? 'guest' : 'guests'}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-foreground">
                  <span>${priceData.nightPrice} x {nights} nights</span>
                  <span>${priceData.subtotal}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Cleaning fee</span>
                  <span>${priceData.cleaningFee}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Service fee</span>
                  <span>${priceData.serviceFee}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Taxes</span>
                  <span>${priceData.taxes}</span>
                </div>
                {priceData.discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-${priceData.discount}</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-semibold text-foreground">
                <span>Total</span>
                <span>${priceData.total}</span>
              </div>

              {/* Security Note */}
              <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
                <Lock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <p>Your payment is secured with 256-bit SSL encryption. We never store your full card details.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <Suspense fallback={<div className="container px-4 text-center">Loading checkout...</div>}>
        <CheckoutForm />
      </Suspense>
    </div>
  )
}
