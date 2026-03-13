import Link from 'next/link'
import { Check, Calendar, MapPin, Phone, Mail, Download, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { propertyInfo } from '@/lib/mock-data'

interface ConfirmationPageProps {
  searchParams: Promise<{
    confirmation?: string
  }>
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const params = await searchParams
  const confirmationNumber = params.confirmation || 'GA12345678'

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container px-4 md:px-6 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-success" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground text-lg">
            Thank you for choosing {propertyInfo.name}
          </p>
        </div>

        {/* Confirmation Details */}
        <Card className="mb-8">
          <CardContent className="p-6 md:p-8">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-1">Confirmation Number</p>
              <p className="text-2xl font-mono font-semibold text-foreground">
                {confirmationNumber}
              </p>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h2 className="font-semibold text-foreground">Booking Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Room</p>
                  <p className="text-foreground font-medium">Deluxe Room</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Guests</p>
                  <p className="text-foreground font-medium">2 Adults</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check-in</p>
                  <p className="text-foreground font-medium">
                    Sat, Mar 15, 2026 at 3:00 PM
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check-out</p>
                  <p className="text-foreground font-medium">
                    Tue, Mar 18, 2026 at 11:00 AM
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between items-center">
                <span className="text-foreground font-semibold">Total Paid</span>
                <span className="text-2xl font-semibold text-foreground">$825</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Info */}
        <Card className="mb-8">
          <CardContent className="p-6 md:p-8">
            <h2 className="font-semibold text-foreground mb-4">Property Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">{propertyInfo.name}</p>
                  <p className="text-muted-foreground">
                    {propertyInfo.address}<br />
                    {propertyInfo.city}, {propertyInfo.country}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <Link 
                  href={`tel:${propertyInfo.phone}`}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {propertyInfo.phone}
                </Link>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <Link 
                  href={`mailto:${propertyInfo.email}`}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {propertyInfo.email}
                </Link>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-muted-foreground">
                  <p>Check-in: {propertyInfo.checkInTime}</p>
                  <p>Check-out: {propertyInfo.checkOutTime}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download Confirmation
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>

        {/* Next Steps */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">What's Next?</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>A confirmation email has been sent to your email address</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>You'll receive a reminder email 3 days before check-in</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Contact us anytime if you have questions or special requests</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button size="lg">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
