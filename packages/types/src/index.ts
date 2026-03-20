/**
 * @hospitality/types
 * Shared TypeScript types for the hospitality platform (web, api, mobile).
 */

// Room Types
export type RoomType = 'standard' | 'deluxe' | 'family-suite' | 'luxury-suite' | 'penthouse' | 'casa'

export interface Room {
  id: string
  type: RoomType
  name: string
  description: string
  capacity: number
  beds: string
  size: number
  amenities: string[]
  images: string[]
  basePrice: number
  inventory: number
}

export interface RoomAvailability {
  roomId: string
  date: string
  available: number
  status: 'available' | 'limited' | 'blocked' | 'sold-out'
  price: number
}

// Reservation Types
export type ReservationStatus = 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out'

export interface Reservation {
  id: string
  guestId: string
  guestName: string
  guestEmail: string
  guestPhone: string
  roomId: string
  roomType: RoomType
  roomName: string
  checkIn: string
  checkOut: string
  guests: number
  adults: number
  children: number
  status: ReservationStatus
  totalPrice: number
  nightPrice: number
  cleaningFee: number
  serviceFee: number
  taxes: number
  specialRequests?: string
  paymentMethod?: string
  channel: 'direct' | 'airbnb' | 'booking' | 'expedia'
  createdAt: string
  updatedAt: string
}

export interface Guest {
  id: string
  name: string
  email: string
  phone: string
  country: string
  avatar?: string
  totalStays: number
  totalSpending: number
  notes?: string
  createdAt: string
  lastStay?: string
}

export interface GuestStay {
  id: string
  guestId: string
  reservationId: string
  roomName: string
  checkIn: string
  checkOut: string
  totalSpent: number
}

export type CleaningStatus = 'clean' | 'dirty' | 'in-progress' | 'inspection'

export interface HousekeepingTask {
  id: string
  roomId: string
  roomNumber: string
  roomType: RoomType
  status: CleaningStatus
  assignedTo?: string
  scheduledDate: string
  completedAt?: string
  notes?: string
  priority: 'low' | 'medium' | 'high'
}

export interface HousekeepingStaff {
  id: string
  name: string
  avatar?: string
  tasksCompleted: number
  tasksAssigned: number
}

export type ChannelStatus = 'connected' | 'syncing' | 'error' | 'disconnected'

export interface Channel {
  id: string
  name: string
  logo: string
  status: ChannelStatus
  lastSync?: string
  reservations: number
  revenue: number
}

export interface ChannelReservation {
  id: string
  channelId: string
  channelName: string
  guestName: string
  roomType: RoomType
  checkIn: string
  checkOut: string
  totalPrice: number
  importedAt: string
  status: 'imported' | 'pending' | 'failed'
}

export type SeasonType = 'low' | 'high' | 'holiday'

export interface SeasonalPricing {
  id: string
  name: string
  type: SeasonType
  startDate: string
  endDate: string
  multiplier: number
}

export interface RoomPricing {
  roomId: string
  basePrice: number
  weekendMultiplier: number
  seasonalPricing: SeasonalPricing[]
}

export type DiscountType = 'percentage' | 'fixed'

export interface Coupon {
  id: string
  code: string
  discountType: DiscountType
  discountValue: number
  expirationDate: string
  usageLimit: number
  usedCount: number
  active: boolean
  minStay?: number
  createdAt: string
}

export type MaintenanceStatus = 'scheduled' | 'in-progress' | 'completed' | 'out-of-service'

export interface MaintenanceTask {
  id: string
  roomId: string
  roomNumber: string
  status: MaintenanceStatus
  description: string
  scheduledDate: string
  completedAt?: string
  assignedTo?: string
  notes?: string
}

export interface DailyStats {
  date: string
  reservations: number
  revenue: number
  occupancyRate: number
  avgNightlyRate: number
  checkIns: number
  checkOuts: number
}

export interface RoomStats {
  roomId: string
  roomName: string
  roomType: RoomType
  totalBookings: number
  totalRevenue: number
  avgStayLength: number
  occupancyRate: number
}

export interface ChannelStats {
  channelId: string
  channelName: string
  reservations: number
  revenue: number
  percentage: number
}

export interface Review {
  id: string
  guestName: string
  guestAvatar?: string
  reservationId: string
  roomType: RoomType
  rating: number
  comment: string
  cleanliness: number
  location: number
  service: number
  value: number
  createdAt: string
}

export interface PropertyInfo {
  name: string
  description: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  website: string
  checkInTime: string
  checkOutTime: string
  amenities: string[]
  policies: string[]
  images: string[]
}

export interface BookingDetails {
  roomId: string
  roomName: string
  roomType: RoomType
  checkIn: string
  checkOut: string
  guests: number
  adults: number
  children: number
  nights: number
  nightPrice: number
  cleaningFee: number
  serviceFee: number
  taxes: number
  totalPrice: number
  couponCode?: string
  discount?: number
}

export interface GuestInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  specialRequests?: string
}

export interface PaymentInfo {
  method: 'stripe'
  sessionId?: string
}

export interface AdminRoom {
  id: string
  roomNumber: string
  name: string
  type: string
  floor: number
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning'
  basePrice: number
  maxOccupancy: number
  size: number
  amenities: string[]
  images: string[]
  description?: string
}

export interface AdminReservation {
  id: string
  confirmationNumber: string
  guestName: string
  guestEmail: string
  roomNumber: string
  checkIn: string
  checkOut: string
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled'
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded'
  totalAmount: number
  channel: string
  createdAt: string
}

export interface AdminGuest {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  avatar?: string
  isVIP: boolean
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum'
  totalStays: number
  totalSpent: number
  lastStay?: string
  createdAt: string
}

export interface Staff {
  id: string
  name: string
  email: string
  role: 'manager' | 'receptionist' | 'housekeeper' | 'maintenance' | 'concierge'
  avatar?: string
  phone?: string
  status: 'active' | 'inactive'
}

export interface AdminHousekeepingTask {
  id: string
  roomNumber: string
  floor: number
  type: 'checkout' | 'stayover' | 'deep' | 'turndown'
  status: 'pending' | 'in-progress' | 'completed' | 'inspected'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  assignedTo?: string
  notes?: string
  createdAt: string
}

export interface AdminChannel {
  id: string
  name: string
  status: 'active' | 'paused' | 'error'
  commission: number
  bookingsThisMonth: number
  revenueThisMonth: number
  lastSync: string
}

export interface AdminCoupon {
  id: string
  code: string
  description: string
  type: 'percentage' | 'fixed'
  value: number
  minBooking?: number
  maxUses?: number
  usedCount: number
  validFrom: string
  validUntil: string
  status: 'active' | 'expired' | 'disabled'
}

export interface PricingRule {
  id: string
  name: string
  type: string
  condition: string
  adjustment: number
  active: boolean
}

export interface AdminMaintenanceTask {
  id: string
  title: string
  description?: string
  location: string
  category: 'plumbing' | 'electrical' | 'hvac' | 'furniture' | 'appliance' | 'structural' | 'other'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  assignedTo?: string
  createdAt: string
  completedAt?: string
}

export interface Property {
  id: string
  name: string
  location: {
    address: string
    city: string
    country: string
  }
  images: string[]
  totalRooms: number
  occupiedRooms: number
  rating: number
  status: 'active' | 'inactive'
}
