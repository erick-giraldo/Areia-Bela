'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { format, addDays, differenceInDays } from 'date-fns'
import { Calendar, Users, Tag, AlertCircle } from 'lucide-react'
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

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0
  
  // Calculate price
  const priceData = checkIn && checkOut && nights > 0
    ? calculatePrice(room.id, format(checkIn, 'yyyy-MM-dd'), format(checkOut, 'yyyy-MM-dd'), couponApplied ? couponCode : undefined)
    : null

  // Limited availability warning
  const availableRooms = Math.floor(Math.random() * 3) + 1 // Simulated
  const showLimitedWarning = availableRooms <= 2

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

  return (
    <Card className="shadow-lg border-border">
      <CardHeader className="pb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-foreground">
            ${room.basePrice}
          </span>
          <span className="text-muted-foreground">/ night</span>
        </div>
        {showLimitedWarning && (
          <div className="flex items-center gap-2 text-sm text-destructive mt-2">
            <AlertCircle className="h-4 w-4" />
            <span>Only {availableRooms} {availableRooms === 1 ? 'room' : 'rooms'} left for your dates!</span>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Check-in
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !checkIn && 'text-muted-foreground'
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, 'MMM d') : 'Select'}
                </Button>
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
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Check-out
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !checkOut && 'text-muted-foreground'
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, 'MMM d') : 'Select'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
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
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Guests
          </Label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: room.capacity }, (_, i) => i + 1).map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n} {n === 1 ? 'Guest' : 'Guests'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Coupon Code */}
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Coupon Code
          </Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter code"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase())
                  setCouponApplied(false)
                  setCouponError('')
                }}
                className="pl-9"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim() || couponApplied}
            >
              {couponApplied ? 'Applied' : 'Apply'}
            </Button>
          </div>
          {couponError && (
            <p className="text-sm text-destructive">{couponError}</p>
          )}
          {couponApplied && (
            <p className="text-sm text-success">Coupon applied successfully!</p>
          )}
        </div>

        {/* Reserve Button */}
        <Button 
          className="w-full h-12 text-base" 
          onClick={handleReserve}
          disabled={!checkIn || !checkOut || nights <= 0 || isLoading}
        >
          {isLoading ? 'Processing...' : 'Reserve Now'}
        </Button>
        
        <p className="text-center text-sm text-muted-foreground">
          You won't be charged yet
        </p>

        {/* Price Breakdown */}
        {priceData && (
          <>
            <Separator />
            
            <div className="space-y-3">
              <div className="flex justify-between text-foreground">
                <span>${priceData.nightPrice} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
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
              
              <Separator />
              
              <div className="flex justify-between text-lg font-semibold text-foreground">
                <span>Total</span>
                <span>${priceData.total}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
