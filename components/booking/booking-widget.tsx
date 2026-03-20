'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { format, addDays, differenceInDays } from 'date-fns'
import { Calendar, Users, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface BookingWidgetProps {
  variant?: 'hero' | 'compact' | 'inline' | 'sidebar'
  className?: string
}

export function BookingWidget({ variant = 'hero', className }: BookingWidgetProps) {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState('2')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const today = new Date()
    setCheckIn(addDays(today, 1))
    setCheckOut(addDays(today, 3))
  }, [])

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0

  const handleSearch = () => {
    const params = new URLSearchParams({
      checkIn: checkIn ? format(checkIn, 'yyyy-MM-dd') : '',
      checkOut: checkOut ? format(checkOut, 'yyyy-MM-dd') : '',
      guests,
    })
    router.push(`/rooms?${params.toString()}`)
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-col w-full', className)}>
        <div className="border border-border rounded-xl overflow-hidden mb-4">
          <div className="flex border-b border-border">
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex-1 p-3 text-left hover:bg-muted/50 transition-colors border-r border-border focus:outline-none">
                  <div className="text-[10px] uppercase font-bold text-foreground">Check-in</div>
                  <div className="text-sm text-foreground/80 mt-0.5 truncate">
                    {mounted && checkIn ? format(checkIn, 'M/d/yyyy') : 'Add date'}
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                 <CalendarComponent
                  mode="single"
                  selected={checkIn}
                  onSelect={(date) => {
                    setCheckIn(date)
                    if (date && checkOut && date >= checkOut) {
                      setCheckOut(addDays(date, 1))
                    }
                  }}
                  disabled={{ before: new Date() }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex-1 p-3 text-left hover:bg-muted/50 transition-colors focus:outline-none">
                  <div className="text-[10px] uppercase font-bold text-foreground">Checkout</div>
                  <div className="text-sm text-foreground/80 mt-0.5 truncate">
                    {mounted && checkOut ? format(checkOut, 'M/d/yyyy') : 'Add date'}
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                 <CalendarComponent
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={{ before: checkIn || new Date() }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full border-0 focus:ring-0 rounded-none h-auto p-3 hover:bg-muted/50 transition-colors">
               <div className="text-left flex-1">
                 <div className="text-[10px] uppercase font-bold text-foreground">Guests</div>
                 <div className="text-sm text-foreground/80 mt-0.5 truncate">
                    {guests} {guests === '1' ? 'guest' : 'guests'}
                 </div>
               </div>
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n} {n === 1 ? 'Guest' : 'Guests'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSearch} className="w-full text-base font-semibold py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
          Reserve
        </Button>
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div className={cn(
        'bg-background border border-border shadow-[0_3px_12px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.08)] rounded-full flex items-center p-2 max-w-3xl mx-auto',
        className
      )}>
        <div className="flex-1 grid grid-cols-3 divide-x divide-border">
          <Popover>
            <PopoverTrigger asChild>
              <button className="px-6 py-3 text-left hover:bg-muted rounded-full transition-colors focus:outline-none group">
                <div className="text-xs font-bold text-foreground">Check in</div>
                <div className="text-sm text-foreground/60 truncate">
                  {mounted && checkIn ? format(checkIn, 'MMM d') : 'Add dates'}
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={{ before: new Date() }}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button className="px-6 py-3 text-left hover:bg-muted rounded-full transition-colors focus:outline-none group">
                <div className="text-xs font-bold text-foreground">Check out</div>
                <div className="text-sm text-foreground/60 truncate">
                  {mounted && checkOut ? format(checkOut, 'MMM d') : 'Add dates'}
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={{ before: checkIn || new Date() }}
              />
            </PopoverContent>
          </Popover>

          <div className="flex items-center">
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="border-0 focus:ring-0 rounded-full h-auto px-6 py-3 hover:bg-muted transition-colors shadow-none">
                <div className="text-left flex-1">
                  <div className="text-xs font-bold text-foreground">Who</div>
                  <div className="text-sm text-foreground/60 truncate">
                    {guests} {parseInt(guests) === 1 ? 'guest' : 'guests'}
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              size="icon" 
              onClick={handleSearch}
              className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground ml-auto mr-1 flex-shrink-0"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
