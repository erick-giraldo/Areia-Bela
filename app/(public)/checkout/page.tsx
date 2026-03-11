'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { format, differenceInDays } from 'date-fns'
import { 
  ChevronLeft, 
  CreditCard, 
  Lock, 
  Calendar, 
  Users,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { rooms } from '@/lib/mock-data'
import { calculatePrice } from '@/services/pricing'

const paymentMethods = [
  { id: 'credit-card', name: 'Credit Card', icon: '/payments/card.svg' },
  { id: 'apple-pay', name: 'Apple Pay', icon: '/payments/apple-pay.svg' },
  { id: 'google-pay', name: 'Google Pay', icon: '/payments/google-pay.svg' },
  { id: 'paypal', name: 'PayPal', icon: '/payments/paypal.svg' },
]

export default function CheckoutPage() {
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
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'United States',
    specialRequests: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  })

  if (!room || !checkIn || !checkOut) {
    return (
      <div className="container px-4 md:px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">Invalid Booking</h1>
        <p className="text-muted-foreground mb-6">
          Please select a room and dates to continue with your booking.
        </p>
        <Link href="/rooms">
          <Button>Browse Rooms</Button>
        </Link>
      </div>
    )
  }

  const nights = differenceInDays(new Date(checkOut), new Date(checkIn))
  const priceData = calculatePrice(room.id, checkIn, checkOut, couponParam || undefined)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate confirmation number
    const confirmationNumber = `GA${Date.now().toString().slice(-8)}`
    
    router.push(`/confirmation?confirmation=${confirmationNumber}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container px-4 md:px-6">
        {/* Back Button */}
        <Link 
          href={`/rooms/${room.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Room
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

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                  >
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === method.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={method.id} className="sr-only" />
                        <span className="text-sm font-medium">{method.name}</span>
                      </label>
                    ))}
                  </RadioGroup>

                  {paymentMethod === 'credit-card' && (
                    <div className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          name="cardholderName"
                          placeholder="Name on card"
                          value={formData.cardholderName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod !== 'credit-card' && (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>You will be redirected to {paymentMethods.find(m => m.id === paymentMethod)?.name} to complete your payment.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Processing Payment...'
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Pay ${priceData.total} & Confirm Booking
                  </>
                )}
              </Button>
              
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
    </div>
  )
}
