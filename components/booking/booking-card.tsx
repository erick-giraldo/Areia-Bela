'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { format, addDays, differenceInDays } from 'date-fns'
import { Calendar, Users, Tag, AlertCircle, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { calculatePrice, validateCoupon } from '@/services/pricing'
import type { Room } from '@/types'

interface BookingCardProps {
  room: Room
  checkIn?: string
  checkOut?: string
  guests?: number
}

export function BookingCard({ room, checkIn: initialCheckIn, checkOut: initialCheckOut, guests: initialGuests }: BookingCardProps) {
  const router = useRouter()
  
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    initialCheckIn ? new Date(initialCheckIn) : addDays(new Date(), 1)
  )
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    initialCheckOut ? new Date(initialCheckOut) : addDays(new Date(), 3)
  )
  const [guests, setGuests] = useState(initialGuests?.toString() || '2')
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0
  
  // Calculate price
  const priceData = checkIn && checkOut && nights > 0
    ? calculatePrice(room.id, format(checkIn, 'yyyy-MM-dd'), format(checkOut, 'yyyy-MM-dd'), couponApplied ? couponCode : undefined)
    : null

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return
    
    const result = validateCoupon(couponCode.toUpperCase(), nights)
    if (result.valid) {
      setCouponApplied(true)
      setCouponError('')
    } else {
      setCouponError(result.error || 'Invalid coupon')
      setCouponApplied(false)
    }
  }

  const handleReserve = () => {
    if (!checkIn || !checkOut) return
    
    setIsLoading(true)
    
    const params = new URLSearchParams({
      roomId: room.id,
      checkIn: format(checkIn, 'yyyy-MM-dd'),
      checkOut: format(checkOut, 'yyyy-MM-dd'),
      guests,
    })
    
    if (couponApplied && couponCode) {
      params.set('coupon', couponCode)
    }
    
    router.push(`/checkout?${params.toString()}`)
  }

  if (!mounted) return null

  return (
    <Card className="shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-border rounded-2xl overflow-hidden sticky top-28">
      <CardContent className="p-6">
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-[22px] font-semibold text-foreground">
            ${room.basePrice}
          </span>
          <span className="text-foreground/80">night</span>
        </div>

        <div className="border border-border rounded-xl overflow-hidden mb-4">
          <div className="flex border-b border-border">
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex-1 p-3 text-left hover:bg-muted/50 transition-colors border-r border-border focus:outline-none">
                  <div className="text-[10px] uppercase font-bold text-foreground">Check-in</div>
                  <div className="text-sm text-foreground/80 mt-0.5 truncate">
                    {checkIn ? format(checkIn, 'M/d/yyyy') : 'Add date'}
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                 <CalendarComponent
                  mode="single"
                  selected={checkIn}
                  onSelect={(date) => {
                    setCheckIn(date)
                    if (date && checkOut && date >= checkOut) {
                      setCheckOut(addDays(date, 1))
                    }
                  }}
                  disabled={{ before: new Date() }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex-1 p-3 text-left hover:bg-muted/50 transition-colors focus:outline-none">
                  <div className="text-[10px] uppercase font-bold text-foreground">Checkout</div>
                  <div className="text-sm text-foreground/80 mt-0.5 truncate">
                    {checkOut ? format(checkOut, 'M/d/yyyy') : 'Add date'}
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                 <CalendarComponent
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={{ before: checkIn || new Date() }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full border-0 focus:ring-0 rounded-none h-auto p-3 hover:bg-muted/50 transition-colors">
               <div className="text-left flex-1">
                 <div className="text-[10px] uppercase font-bold text-foreground">Guests</div>
                 <div className="text-sm text-foreground/80 mt-0.5 truncate">
                    {guests} {guests === '1' ? 'guest' : 'guests'}
                 </div>
               </div>
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n} {n === 1 ? 'Guest' : 'Guests'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleReserve} 
          disabled={!checkIn || !checkOut || nights <= 0 || isLoading}
          className="w-full text-base font-semibold py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl mb-4"
        >
          {isLoading ? 'Processing...' : 'Reserve'}
        </Button>

        <p className="text-center text-sm text-foreground/70 mb-6">You won't be charged yet</p>

        {priceData && nights > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between text-foreground/90 underline decoration-foreground/30">
              <span>${room.basePrice} x {nights} nights</span>
              <span>${priceData.subtotal}</span>
            </div>
            <div className="flex justify-between text-foreground/90 underline decoration-foreground/30">
              <span>Cleaning fee</span>
              <span>${priceData.cleaningFee}</span>
            </div>
            <div className="flex justify-between text-foreground/90 underline decoration-foreground/30">
              <span>Service fee</span>
              <span>${priceData.serviceFee}</span>
            </div>
            {priceData.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Coupon discount</span>
                <span>-${priceData.discount}</span>
              </div>
            )}
            <Separator className="my-4" />
            <div className="flex justify-between text-lg font-semibold text-foreground pt-2">
              <span>Total before taxes</span>
              <span>${priceData.total}</span>
            </div>
          </div>
        )}

        {/* Rare Find Badge */}
        <div className="mt-8 pt-8 border-t border-border flex items-center gap-4">
           <div className="flex flex-col flex-1">
              <span className="font-semibold text-sm">This is a rare find</span>
              <span className="text-xs text-foreground/70">Angelica's place is usually fully booked.</span>
           </div>
           <Award className="h-8 w-8 text-primary/80" />
        </div>
      </CardContent>
    </Card>
  )
}
