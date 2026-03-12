import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  explore: [
    { name: 'La casa', href: '/rooms' },
    { name: 'Ofertas', href: '/offers' },
    { name: 'Reseñas', href: '/reviews' },
    { name: 'Sobre nosotros', href: '/about' },
  ],
  support: [
    { name: 'Contacto', href: '/contact' },
    { name: 'Preguntas frecuentes', href: '/faq' },
    { name: 'Privacidad', href: '#' },
    { name: 'Términos', href: '#' },
  ],
}

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/areiabelastpete/' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex flex-col mb-6">
              <span className="font-serif text-2xl font-semibold tracking-tight">
                Areia Bela
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-background/60">
                St. Petersburg, Florida
              </span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6 max-w-sm">
              Casa de vacaciones a 5 min de Madeira Beach. Piscina climatizada, bar de café, 
              cocina equipada y WiFi. Ideal para familias y grupos.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Explorar
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-background/70" />
                <span className="text-sm text-background/70">
                  St. Petersburg, Florida<br />
                  Estados Unidos
                </span>
              </li>
              <li>
                <Link 
                  href="tel:+15551234567"
                  className="flex items-center gap-3 text-sm text-background/70 hover:text-background transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  +1 (555) 987-6543
                </Link>
              </li>
              <li>
                <Link 
                  href="mailto:host@areiabela.com"
                  className="flex items-center gap-3 text-sm text-background/70 hover:text-background transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  host@areiabela.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/50">
              &copy; {new Date().getFullYear()} Areia Bela. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              {footerLinks.support.slice(2).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-background/50 hover:text-background/70 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
