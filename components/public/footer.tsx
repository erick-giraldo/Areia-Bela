import Link from 'next/link'
import { Globe, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#F7F7F7] border-t border-border py-12">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-border">
          <div>
            <h3 className="font-semibold text-sm mb-4">Asistencia</h3>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li><Link href="#" className="hover:underline">Centro de ayuda</Link></li>
              <li><Link href="#" className="hover:underline">AirCover</Link></li>
              <li><Link href="#" className="hover:underline">Antidiscriminación</Link></li>
              <li><Link href="#" className="hover:underline">Apoyo a personas con discapacidad</Link></li>
              <li><Link href="#" className="hover:underline">Opciones de cancelación</Link></li>
              <li><Link href="#" className="hover:underline">Problemas en el vecindario</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4">Modo anfitrión</h3>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li><Link href="#" className="hover:underline">Pon tu espacio en Airbnb</Link></li>
              <li><Link href="#" className="hover:underline">AirCover para anfitriones</Link></li>
              <li><Link href="#" className="hover:underline">Recursos para anfitriones</Link></li>
              <li><Link href="#" className="hover:underline">Foro de la comunidad</Link></li>
              <li><Link href="#" className="hover:underline">Anfitrión responsable</Link></li>
              <li><Link href="#" className="hover:underline">Súmate a un alojamiento gratuito</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4">Airbnb</h3>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li><Link href="#" className="hover:underline">Sala de prensa</Link></li>
              <li><Link href="#" className="hover:underline">Funciones nuevas</Link></li>
              <li><Link href="#" className="hover:underline">Carreras</Link></li>
              <li><Link href="#" className="hover:underline">Inversionistas</Link></li>
              <li><Link href="#" className="hover:underline">Alojamientos en Airbnb.org</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/80">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1">
            <span>© {new Date().getFullYear()} areiabela, Inc.</span>
            <span>·</span>
            <Link href="#" className="hover:underline">Privacidad</Link>
            <span>·</span>
            <Link href="#" className="hover:underline">Términos</Link>
            <span>·</span>
            <Link href="#" className="hover:underline">Mapa del sitio</Link>
            <span>·</span>
            <Link href="#" className="hover:underline">Datos de la empresa</Link>
          </div>
          
          <div className="flex items-center gap-6 font-semibold">
            <div className="flex items-center gap-2 cursor-pointer hover:underline">
              <Globe className="h-4 w-4" />
              <span>Español (ES)</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:underline">
              <span>$</span>
              <span>USD</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="#" aria-label="Facebook"><Facebook className="h-4 w-4 fill-current" /></Link>
              <Link href="#" aria-label="Twitter"><Twitter className="h-4 w-4 fill-current" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
