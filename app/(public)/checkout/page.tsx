'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { format, differenceInDays } from 'date-fns'
import { 
  ChevronLeft, 
  Lock, 
  Star,
  ShieldCheck,
  Calendar,
  Users,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { rooms } from '@/lib/mock-data'
import { calculatePrice } from '@/services/pricing'
import { Elements } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe-client'
import { StripePaymentForm } from '@/components/booking/stripe-payment-form'
import { createPaymentIntentAction } from '@/app/actions/payment'
import type { BookingDetails } from '@/types'
import { listingDetail } from '@/lib/listing-data'
import { cn } from '@/lib/utils'

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
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentPlan, setPaymentPlan] = useState<'full' | 'split'>('full')

  if (!room || !checkIn || !checkOut) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">No se encontraron detalles de la reservación</h1>
        <Button onClick={() => router.push('/')}>Volver al inicio</Button>
      </div>
    )
  }

  const nights = differenceInDays(new Date(checkOut), new Date(checkIn))
  const priceData = calculatePrice(room.id, checkIn, checkOut, couponParam || undefined)

  const initializePayment = async () => {
    if (clientSecret) return
    
    setIsLoading(true)
    const bookingDetails: BookingDetails = {
      roomId: room.id,
      roomName: room.name,
      roomType: room.type,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests,
      adults: guests,
      children: 0,
      nights: nights,
      nightPrice: priceData.nightPrice,
      cleaningFee: priceData.cleaningFee,
      serviceFee: priceData.serviceFee,
      taxes: priceData.taxes,
      totalPrice: priceData.total,
    }

    const result = await createPaymentIntentAction(bookingDetails)
    if (result.clientSecret) {
      setClientSecret(result.clientSecret)
    }
    setIsLoading(false)
  }

  const handlePaymentSuccess = (confirmationNumber: string) => {
    router.push(`/confirmation?confirmation=${confirmationNumber}`)
  }

  // Trigger payment initialization automatically on load for Airbnb-style flow
  useEffect(() => {
    initializePayment()
  }, [])

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-[32px] font-semibold text-foreground tracking-tight">Solicitar reservación</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-24">
        
        {/* Left Column: Form Steps */}
        <div className="space-y-12">
          
          {/* Step 1: Payment Plan */}
          <section className="space-y-6">
             <h2 className="text-[22px] font-semibold">1. Elige cuándo quieres pagar</h2>
             <div className="space-y-4">
                <div 
                  onClick={() => setPaymentPlan('full')}
                  className={cn(
                    "p-6 border rounded-xl cursor-pointer transition-all",
                    paymentPlan === 'full' ? "border-foreground ring-1 ring-foreground" : "border-border hover:border-foreground/50"
                  )}
                >
                  <div className="flex justify-between items-start">
                     <div>
                        <div className="font-semibold text-base">Paga ${priceData.total} ahora</div>
                        <div className="text-sm text-foreground/70 mt-1">Paga el total ahora y todo estará listo.</div>
                     </div>
                     <div className={cn(
                       "h-6 w-6 rounded-full border-2 flex items-center justify-center",
                       paymentPlan === 'full' ? "border-foreground" : "border-muted-foreground"
                     )}>
                       {paymentPlan === 'full' && <div className="h-3 w-3 rounded-full bg-foreground" />}
                     </div>
                  </div>
                </div>

                <div 
                  onClick={() => setPaymentPlan('split')}
                  className={cn(
                    "p-6 border rounded-xl cursor-pointer transition-all opacity-60 grayscale cursor-not-allowed",
                    paymentPlan === 'split' ? "border-foreground ring-1 ring-foreground" : "border-border"
                  )}
                >
                  <div className="flex justify-between items-start">
                     <div>
                        <div className="font-semibold text-base">Paga una parte ahora y otra más adelante</div>
                        <div className="text-sm text-foreground/70 mt-1">${(priceData.total / 2).toFixed(2)} ahora y ${(priceData.total / 2).toFixed(2)} más adelante.</div>
                     </div>
                     <div className="h-6 w-6 rounded-full border-2 border-muted-foreground" />
                  </div>
                </div>
             </div>
          </section>

          <Separator />

          {/* Step 2: Payment Form (Stripe) */}
          <section className="space-y-6">
            <h2 className="text-[22px] font-semibold">2. Agrega una forma de pago</h2>
            <div className="p-0">
              {!clientSecret ? (
                <div className="flex items-center justify-center p-12 border border-dashed rounded-xl bg-muted/20">
                  <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mr-3" />
                  <span className="text-foreground/70">Cargando formulario de pago seguro...</span>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-sm text-foreground/70 mb-4">
                    <Lock className="h-4 w-4" /> Pago 100% seguro y encriptado
                  </div>
                  <Elements 
                    stripe={getStripe()} 
                    options={{ 
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          borderRadius: '12px',
                        }
                      }
                    }}
                  >
                    <StripePaymentForm 
                      amount={priceData.total} 
                      onSuccess={handlePaymentSuccess}
                    />
                  </Elements>
                </div>
              )}
            </div>
          </section>

          <Separator />

          {/* Step 3: Policies & Review */}
          <section className="space-y-6">
            <h2 className="text-[22px] font-semibold">3. Revisa tu solicitud</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Política de cancelación</h3>
                <p className="text-foreground/80 leading-relaxed">
                  <span className="font-semibold text-foreground">Cancelación gratuita.</span> Si cancelas la reservación en un plazo de 24 horas, recibirás un reembolso completo.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Reglas básicas</h3>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  Pedimos a todos los huéspedes que recuerden algunas cosas sencillas sobre lo que hace que un huésped sea genial:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                  <li>Sigue las reglas de la casa.</li>
                  <li>Trata el alojamiento como si fuera tu casa.</li>
                </ul>
              </div>

              <p className="text-xs text-foreground/60 leading-relaxed">
                Al seleccionar el botón que aparece a continuación, aceptas las Reglas de la casa, las Reglas básicas para huéspedes, la Política de cancelación y los Términos de pago.
              </p>
            </div>
          </section>

        </div>

        {/* Right Column: Price Summary Sticky */}
        <div className="relative">
          <div className="sticky top-10 space-y-6">
            <Card className="shadow-none border border-border rounded-2xl overflow-hidden p-6">
              <div className="flex gap-4 mb-6">
                <div className="relative h-24 w-32 rounded-lg overflow-hidden flex-shrink-0">
                  <Image 
                    src={listingDetail.photos[0].large} 
                    alt={listingDetail.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-sm leading-tight mb-1">{listingDetail.name}</h3>
                  <div className="flex items-center gap-1 text-xs">
                     <Star className="h-3 w-3 fill-current" />
                     <span className="font-semibold">4.91</span>
                     <span className="text-foreground/60">(11 evaluaciones)</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs mt-1">
                     <ShieldCheck className="h-3 w-3" />
                     <span className="text-foreground/60">Favorito entre huéspedes</span>
                  </div>
                </div>
              </div>

              <Separator className="mb-6" />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                     <div className="font-semibold text-base">Fechas</div>
                     <div className="text-sm text-foreground/70">{format(new Date(checkIn), 'd')}–{format(new Date(checkOut), 'd MMM de yyyy')}</div>
                  </div>
                  <Button variant="link" className="px-0 font-semibold underline h-auto">Editar</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                     <div className="font-semibold text-base">Participantes</div>
                     <div className="text-sm text-foreground/70">{guests} {guests === 1 ? 'adulto' : 'adultos'}</div>
                  </div>
                  <Button variant="link" className="px-0 font-semibold underline h-auto">Editar</Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-semibold text-[22px] mb-4">Detalles del precio</h3>
                <div className="flex justify-between text-foreground/90">
                  <span className="underline decoration-foreground/30">{nights} noches x ${room.basePrice}</span>
                  <span>${(nights * room.basePrice).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/90">
                  <span className="underline decoration-foreground/30">Tarifa de limpieza</span>
                  <span>${priceData.cleaningFee}</span>
                </div>
                <div className="flex justify-between text-foreground/90">
                  <span className="underline decoration-foreground/30">Tarifa de servicio</span>
                  <span>${priceData.serviceFee}</span>
                </div>
                <div className="flex justify-between text-foreground/90">
                  <span className="underline decoration-foreground/30">Impuestos</span>
                  <span>${priceData.taxes}</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between text-base font-bold text-foreground pt-2">
                  <span>Total (USD)</span>
                  <span>${priceData.total}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted/30 rounded-xl flex items-start gap-3">
                <Info className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <div className="font-semibold text-sm">¡Oportunidad única!</div>
                  <div className="text-xs text-foreground/70">Este lugar suele estar reservado.</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Suspense fallback={<div className="container px-4 text-center">Loading checkout...</div>}>
        <CheckoutForm />
      </Suspense>
    </div>
  )
}
