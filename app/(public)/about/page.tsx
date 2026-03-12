import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Waves, Wifi, Coffee, Bike } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { propertyInfo } from '@/lib/mock-data'
import { listingDetail, getAllHosts, listingPhotos } from '@/lib/listing-data'

const amenityHighlights = [
  { icon: Waves, name: 'Piscina climatizada', description: 'Piscina privada con pantalla, calefacción en temporada' },
  { icon: Wifi, name: 'WiFi de alta velocidad', description: '150+ Mbps para teletrabajo y streaming' },
  { icon: Coffee, name: 'Bar de café', description: 'Cafetera Keurig, snacks y zona de relax' },
  { icon: Bike, name: 'Bicicletas', description: '2 bicicletas con candado para explorar la zona' },
]

export default function AboutPage() {
  const hosts = getAllHosts()
  const galleryImages = listingPhotos.slice(0, 6)
  const firstPhoto = listingDetail.photos[0]?.large

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={firstPhoto ?? propertyInfo.images[0]}
            alt="Areia Bela"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative z-10 text-center text-background px-4">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-background/80">
            Sobre nosotros
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            Areia Bela
          </h1>
          <p className="text-lg text-background/90 max-w-2xl mx-auto">
            Casa de vacaciones a 5 min de Madeira Beach. St. Petersburg, Florida.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
                Nuestra historia
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Donde el confort se encuentra con la playa
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {listingDetail.sectionedDescription.summary}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {listingDetail.sectionedDescription.neighborhoodOverview}
              </p>
              <div className="space-y-3">
                {(listingDetail.houseRulesModule?.structuredRules ?? []).map((r) => (
                  <div key={r.text} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={listingDetail.photos[1]?.large ?? propertyInfo.images[1]}
                  alt="Areia Bela - zona exterior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hosts */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
              Anfitriones
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Quién te recibe
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conoce al equipo que hace de Areia Bela un lugar especial.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hosts.map((host) => (
              <Card key={host.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-square max-w-[280px] mx-auto">
                    <Image
                      src={host.pictureLargeUrl ?? host.pictureUrl}
                      alt={host.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground text-lg">{host.name}</h3>
                      {host.isSuperhost && (
                        <Badge variant="secondary" className="text-xs">Superhost</Badge>
                      )}
                    </div>
                    {host.memberSinceFullStr && (
                      <p className="text-sm text-muted-foreground mb-2">{host.memberSinceFullStr}</p>
                    )}
                    {host.about && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                        {host.about}
                      </p>
                    )}
                    {host.languages?.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Idiomas: {host.languages.join(', ')}
                      </p>
                    )}
                    {host.responseTimeWithoutNa && (
                      <p className="text-xs text-primary mt-1">
                        Responde {host.responseTimeWithoutNa}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
              Comodidades
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Lo que ofrece la casa
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cocina equipada, piscina, WiFi, aparcamiento y mucho más.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenityHighlights.map((a) => (
              <Card key={a.name} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <a.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{a.name}</h3>
                  <p className="text-sm text-muted-foreground">{a.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {listingDetail.amenities.slice(0, 16).map((name) => (
              <Badge key={name} variant="outline" className="text-xs">
                {name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
              Galería
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              Conoce la casa
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((photo, index) => (
              <div
                key={photo.id}
                className={`relative rounded-lg overflow-hidden ${
                  index === 0 || index === 3 ? 'aspect-[4/3] md:col-span-2' : 'aspect-square'
                }`}
              >
                <Image
                  src={photo.large}
                  alt={photo.caption ?? `Areia Bela ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            ¿Listo para Areia Bela?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Reserva tu estancia y descubre la mejor base para disfrutar de Madeira Beach y St. Petersburg.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms">
              <Button size="lg" variant="secondary">
                Ver la casa y reservar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Contactar
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
