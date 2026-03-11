import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  explore: [
    { name: 'Our Rooms', href: '/rooms' },
    { name: 'Special Offers', href: '/offers' },
    { name: 'Guest Reviews', href: '/reviews' },
    { name: 'About Us', href: '/about' },
  ],
  services: [
    { name: 'Spa & Wellness', href: '/about#amenities' },
    { name: 'Fine Dining', href: '/about#amenities' },
    { name: 'Private Beach', href: '/about#amenities' },
    { name: 'Concierge', href: '/contact' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex flex-col mb-6">
              <span className="font-serif text-2xl font-semibold tracking-tight">
                Grand Azure
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-background/60">
                Resort & Spa
              </span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6 max-w-sm">
              Experience luxury at its finest. Our beachfront resort offers world-class 
              amenities, stunning ocean views, and impeccable service.
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
              Explore
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

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
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
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-background/70" />
                <span className="text-sm text-background/70">
                  123 Ocean Boulevard<br />
                  Miami Beach, FL 33139
                </span>
              </li>
              <li>
                <Link 
                  href="tel:+15551234567"
                  className="flex items-center gap-3 text-sm text-background/70 hover:text-background transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  +1 (555) 123-4567
                </Link>
              </li>
              <li>
                <Link 
                  href="mailto:reservations@grandazure.com"
                  className="flex items-center gap-3 text-sm text-background/70 hover:text-background transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  reservations@grandazure.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/50">
              &copy; {new Date().getFullYear()} Grand Azure Resort. All rights reserved.
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
