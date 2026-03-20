'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, User, Globe, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookingWidget } from '@/components/booking/booking-widget'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background border-b border-border py-4" : "bg-background py-6"
    )}>
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 text-primary">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            className="h-8 w-8 fill-current"
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.393 3.405-6.701 3.405-3.48 0-6.357-2.416-6.357-6.478 0-1.591.562-3.323 1.633-5.109l.333-.53c1.011-1.583 5.303-8.417 8.072-12.911l.533-1.025C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.053.539-2.987 1.993l-.508.969c-2.724 4.417-7.005 11.235-8.01 12.811l-.333.53c-.94 1.563-1.405 3.003-1.405 4.219 0 2.856 1.932 4.478 4.357 4.478 1.765 0 3.682-1.03 5.481-2.859l.272-.28.172-.179h.011l.172.179.272.28c1.799 1.83 3.716 2.859 5.481 2.859 2.425 0 4.357-1.622 4.357-4.478 0-1.216-.465-2.656-1.405-4.219l-.333-.53c-1.005-1.576-5.286-8.394-8.01-12.811l-.508-.969C18.053 3.539 17.239 3 16 3zm0 10.5c2.11 0 3.75 1.47 3.75 3.5s-1.64 3.5-3.75 3.5-3.75-1.47-3.75-3.5 1.64-3.5 3.75-3.5zm0 2c-1.01 0-1.75.72-1.75 1.5s.74 1.5 1.75 1.5 1.75-.72 1.75-1.5-.74-1.5-1.75-1.5z"></path>
          </svg>
          <span className="text-xl font-bold tracking-tight hidden md:block">areiabela</span>
        </Link>

        {/* Center: Search Pill (Only visible on scroll or specific pages) */}
        <div className="hidden md:block">
           <div className="flex items-center gap-4 px-4 py-2 border border-border rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer">
              <span className="text-sm font-semibold px-4">Anywhere</span>
              <div className="h-6 w-px bg-border" />
              <span className="text-sm font-semibold px-4">Any week</span>
              <div className="h-6 w-px bg-border" />
              <span className="text-sm text-foreground/60 px-4">Add guests</span>
              <div className="bg-primary p-2 rounded-full text-primary-foreground">
                <Search className="h-3 w-3 stroke-[4px]" />
              </div>
           </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden lg:flex rounded-full font-semibold text-sm">
            Areia Bela your home
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full">
            <Globe className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 border border-border p-1.5 rounded-full hover:shadow-md transition-all cursor-pointer bg-background ml-2">
            <Menu className="h-4 w-4 ml-2" />
            <div className="bg-muted-foreground/20 rounded-full p-1">
              <User className="h-5 w-5 fill-muted-foreground/40 text-muted-foreground/40" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

import { cn } from '@/lib/utils'
