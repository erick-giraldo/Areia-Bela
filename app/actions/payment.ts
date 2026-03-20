'use server'

import { createPaymentIntent as stripeCreatePaymentIntent } from '@/services/payment'
import type { BookingDetails } from '@/types'

export async function createPaymentIntentAction(bookingDetails: BookingDetails) {
  try {
    const paymentIntent = await stripeCreatePaymentIntent(bookingDetails)
    return { 
      clientSecret: paymentIntent.clientSecret,
      paymentIntentId: paymentIntent.id,
      error: null 
    }
  } catch (error: any) {
    console.error('Error creating payment intent:', error)
    return { 
      clientSecret: null, 
      paymentIntentId: null,
      error: error.message || 'Failed to initialize payment' 
    }
  }
}
