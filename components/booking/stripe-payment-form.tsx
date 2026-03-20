'use client'

import { useState } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'
import { toast } from 'sonner'

interface StripePaymentFormProps {
  amount: number
  onSuccess: (confirmationNumber: string) => void
  isProcessing?: boolean
}

export function StripePaymentForm({ amount, onSuccess }: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL for redirection if needed, but we'll handle success here if possible
        return_url: `${window.location.origin}/confirmation`,
      },
      redirect: 'if_required', // Important for handling success in-place if possible
    })

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.')
      toast.error(error.message || 'Payment failed')
      setIsProcessing(false)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Payment successful!
      const confirmationNumber = `GA${Date.now().toString().slice(-8)}`
      onSuccess(confirmationNumber)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {errorMessage && (
        <div className="text-destructive text-sm font-medium">
          {errorMessage}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? (
          'Procesando...'
        ) : (
          'Solicitar reservación'
        )}
      </Button>
    </form>
  )
}
