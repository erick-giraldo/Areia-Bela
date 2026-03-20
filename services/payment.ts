import type { BookingDetails, PaymentInfo } from '@/types'
import { stripe } from '@/lib/stripe'

export interface PaymentIntent {
  id: string
  clientSecret: string | null
  amount: number
  currency: string
  status: string
}

export async function createPaymentIntent(
  bookingDetails: BookingDetails
): Promise<PaymentIntent> {
  // Use Stripe API to create a payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(bookingDetails.totalPrice * 100), // Convert to cents
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      roomId: bookingDetails.roomId,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      guests: bookingDetails.guests.toString(),
    },
  })
  
  return {
    id: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    status: paymentIntent.status,
  }
}

export async function processBookingPayment(
  paymentIntentId: string,
  paymentInfo: PaymentInfo
): Promise<{ success: boolean; error?: string }> {
  // In a typical Stripe Elements flow, this is handled on the client-side.
  // This server-side function can be used for server-side confirmation if needed.
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentInfo.paymentMethodId,
    })
    
    if (paymentIntent.status === 'succeeded') {
      return { success: true }
    } else {
      return { 
        success: false, 
        error: `Payment failed with status: ${paymentIntent.status}` 
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Payment processing error.',
    }
  }
}

export async function refundPayment(
  paymentIntentId: string,
  amount?: number
): Promise<{ success: boolean; refundId?: string; error?: string }> {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    })
    
    return {
      success: true,
      refundId: refund.id,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Refund processing error.',
    }
  }
}

export async function getPaymentMethods(): Promise<string[]> {
  // Available payment methods in Stripe
  return ['card', 'apple_pay', 'google_pay', 'link']
}
