import Link from 'next/link'
import { ArrowRight, Clock, Tag, Gift, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { specialOffers, coupons } from '@/lib/mock-data'

export default function OffersPage() {
  const activeCoupons = coupons.filter(c => c.active)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-muted/30 py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
              Exclusive Deals
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Special Offers
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take advantage of our limited-time offers and enjoy exceptional savings on your luxury stay.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Featured Packages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialOffers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-primary/5 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-foreground">{offer.title}</CardTitle>
                      {offer.discount > 0 && (
                        <Badge className="mt-2 bg-primary">
                          Save {offer.discount}%
                        </Badge>
                      )}
                    </div>
                    <Gift className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    {offer.description}
                  </p>
                  
                  {offer.extras && (
                    <div className="space-y-2 mb-4">
                      {offer.extras.map((extra, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {extra}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Valid until {offer.validUntil}
                    </div>
                    <Link href="/rooms">
                      <Button size="sm">
                        Book Now
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Codes */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Available Promo Codes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCoupons.map((coupon) => (
              <Card key={coupon.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Tag className="h-5 w-5 text-primary" />
                        <code className="text-lg font-mono font-semibold text-foreground bg-muted px-3 py-1 rounded">
                          {coupon.code}
                        </code>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        {coupon.discountType === 'percentage' 
                          ? `${coupon.discountValue}% off your booking`
                          : `$${coupon.discountValue} off your booking`}
                        {coupon.minStay && ` • Min. ${coupon.minStay} night${coupon.minStay > 1 ? 's' : ''}`}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Expires {coupon.expirationDate}
                        </div>
                        <span>
                          {coupon.usageLimit - coupon.usedCount} uses remaining
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-lg font-semibold">
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Don't Miss Out
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Book your stay now and take advantage of these exclusive offers. 
            Limited availability - secure your dates today!
          </p>
          <Link href="/rooms">
            <Button size="lg" variant="secondary">
              Browse Rooms & Book
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
