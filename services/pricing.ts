import type { Room, SeasonalPricing, BookingDetails, RoomType } from '@/types'
import { rooms, seasonalPricing, coupons } from '@/lib/mock-data'

export interface PriceCalculation {
  nightPrice: number
  nights: number
  subtotal: number
  cleaningFee: number
  serviceFee: number
  taxes: number
  discount: number
  total: number
  pricePerNight: number[]
}

export function calculatePrice(
  roomId: string,
  checkIn: string,
  checkOut: string,
  couponCode?: string
): PriceCalculation {
  const room = rooms.find(r => r.id === roomId)
  if (!room) {
    throw new Error('Room not found')
  }
  
  const startDate = new Date(checkIn)
  const endDate = new Date(checkOut)
  const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  
  if (nights <= 0) {
    throw new Error('Invalid dates')
  }
  
  // Calculate price for each night
  const pricePerNight: number[] = []
  let subtotal = 0
  
  for (let i = 0; i < nights; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(currentDate.getDate() + i)
    
    let nightPrice = room.basePrice
    
    // Check if weekend
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6
    if (isWeekend) {
      nightPrice *= 1.15
    }
    
    // Check seasonal pricing
    seasonalPricing.forEach(season => {
      const seasonStart = new Date(season.startDate)
      const seasonEnd = new Date(season.endDate)
      if (currentDate >= seasonStart && currentDate <= seasonEnd) {
        nightPrice = room.basePrice * season.multiplier
      }
    })
    
    pricePerNight.push(Math.round(nightPrice))
    subtotal += Math.round(nightPrice)
  }
  
  // Calculate average night price
  const nightPrice = Math.round(subtotal / nights)
  
  // Calculate fees
  const cleaningFee = getCleaningFee(room.type)
  const serviceFee = Math.round(subtotal * 0.05) // 5% service fee
  const taxRate = 0.085 // 8.5% tax
  const taxableAmount = subtotal + cleaningFee + serviceFee
  const taxes = Math.round(taxableAmount * taxRate)
  
  // Apply coupon if provided
  let discount = 0
  if (couponCode) {
    const coupon = coupons.find(c => c.code === couponCode && c.active)
    if (coupon) {
      if (coupon.discountType === 'percentage') {
        discount = Math.round(subtotal * (coupon.discountValue / 100))
      } else {
        discount = coupon.discountValue
      }
    }
  }
  
  const total = subtotal + cleaningFee + serviceFee + taxes - discount
  
  return {
    nightPrice,
    nights,
    subtotal,
    cleaningFee,
    serviceFee,
    taxes,
    discount,
    total,
    pricePerNight,
  }
}

function getCleaningFee(roomType: RoomType): number {
  const fees: Record<RoomType, number> = {
    'standard': 25,
    'deluxe': 35,
    'family-suite': 60,
    'luxury-suite': 75,
    'penthouse': 100,
    'casa': 75,
  }
  return fees[roomType] ?? 25
}

export function getSeasonalPricing(): SeasonalPricing[] {
  return seasonalPricing
}

export function getRoomBasePrice(roomId: string): number | undefined {
  const room = rooms.find(r => r.id === roomId)
  return room?.basePrice
}

export function validateCoupon(code: string, nights: number): { valid: boolean; error?: string; discount?: number; type?: string } {
  const coupon = coupons.find(c => c.code === code)
  
  if (!coupon) {
    return { valid: false, error: 'Invalid coupon code' }
  }
  
  if (!coupon.active) {
    return { valid: false, error: 'This coupon is no longer active' }
  }
  
  if (new Date(coupon.expirationDate) < new Date()) {
    return { valid: false, error: 'This coupon has expired' }
  }
  
  if (coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, error: 'This coupon has reached its usage limit' }
  }
  
  if (coupon.minStay && nights < coupon.minStay) {
    return { valid: false, error: `This coupon requires a minimum stay of ${coupon.minStay} nights` }
  }
  
  return {
    valid: true,
    discount: coupon.discountValue,
    type: coupon.discountType,
  }
}
