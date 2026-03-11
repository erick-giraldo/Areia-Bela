import Image from 'next/image'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { reviews } from '@/lib/mock-data'

export default function ReviewsPage() {
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }))

  const categories = [
    { name: 'Cleanliness', value: reviews.reduce((sum, r) => sum + r.cleanliness, 0) / reviews.length },
    { name: 'Location', value: reviews.reduce((sum, r) => sum + r.location, 0) / reviews.length },
    { name: 'Service', value: reviews.reduce((sum, r) => sum + r.service, 0) / reviews.length },
    { name: 'Value', value: reviews.reduce((sum, r) => sum + r.value, 0) / reviews.length },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-muted/30 py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
              Testimonials
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Guest Reviews
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Read what our guests have to say about their experience at Grand Azure Resort.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rating Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-semibold text-foreground mb-2">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(averageRating)
                              ? 'fill-primary text-primary'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {reviews.length} reviews
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {ratingCounts.map(({ rating, count, percentage }) => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm text-foreground w-3">{rating}</span>
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <Progress value={percentage} className="flex-1 h-2" />
                        <span className="text-sm text-muted-foreground w-8">{count}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border">
                    <h3 className="font-semibold text-foreground">Rating Categories</h3>
                    {categories.map((category) => (
                      <div key={category.name} className="flex justify-between items-center">
                        <span className="text-foreground">{category.name}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={category.value * 20} className="w-20 h-2" />
                          <span className="text-sm font-medium text-foreground w-8">
                            {category.value.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {review.guestAvatar && (
                        <Image
                          src={review.guestAvatar}
                          alt={review.guestName}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{review.guestName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {review.roomType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} • {review.createdAt}
                            </p>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-primary text-primary'
                                    : 'fill-muted text-muted'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-foreground leading-relaxed">{review.comment}</p>

                        {/* Category Ratings */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
                          <div>
                            <p className="text-xs text-muted-foreground">Cleanliness</p>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-foreground">{review.cleanliness}</span>
                              <Star className="h-3 w-3 fill-primary text-primary" />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Location</p>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-foreground">{review.location}</span>
                              <Star className="h-3 w-3 fill-primary text-primary" />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Service</p>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-foreground">{review.service}</span>
                              <Star className="h-3 w-3 fill-primary text-primary" />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Value</p>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-foreground">{review.value}</span>
                              <Star className="h-3 w-3 fill-primary text-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
