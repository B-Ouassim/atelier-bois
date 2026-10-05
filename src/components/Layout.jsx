import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { Hammer, Search, ShoppingBag, Menu, X, Phone, MapPin, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { WORKSHOP } from '../data/products'
import { wa } from '../utils/formatPrice'

const links = [['/', 'Accueil'], ['/produits', 'Produits'], ['/savoir-faire', 'Notre savoir-faire'], ['/a-propos', 'À propos'], ['/contact', 'Contact']]
const cls = ({ isActive }) => `rounded-md px-3 py-2 text-lg font-medium ${isActive ? 'text-wood underline underline-offset-8' : 'hover:text-wood'}`

export default function Layout() {
  const { count } = useCart()
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [s, setS] = useState(false)
  const [q, setQ] = useState('')
  useEffect(() => { window.scrollTo(0, 0); setOpen(false) }, [pathname])
  const go = (e) => { e.preventDefault(); nav(`/produits?q=${encodeURIComponent(q)}`); setS(false) }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-wood-dark px-3 py-2 text-center text-sm text-cream">Livraison partout au Maroc · Paiement à la livraison · Fabriqué à la main</div>
      <header className="sticky top-0 z-40 border-b border-wood/10 bg-cream/90 shadow-sm backdrop-blur-md">
        <div className="wrap flex h-16 items-center justify-between gap-2 sm:h-20">
          <Link to="/" className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-wood text-cream"><Hammer size={22} /></span><span className="font-serif text-xl font-bold leading-none sm:text-2xl">{WORKSHOP.name}<span className="mt-1 block font-sans text-[10px] font-medium tracking-[0.25em] text-wood">MENUISIER ARTISAN</span></span></Link>
          <nav className="hidden items-center gap-1 lg:flex">{links.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'} className={cls}>{l}</NavLink>)}</nav>
          <div className="flex items-center gap-1">
            <button aria-label="Rechercher" onClick={() => setS(!s)} className="grid size-12 place-items-center rounded-full hover:bg-sand"><Search /></button>
            <Link to="/panier" aria-label="Panier" className="relative grid size-12 place-items-center rounded-full hover:bg-sand">
              <ShoppingBag />
              {count > 0 && <span className="absolute right-0 top-0 grid size-6 place-items-center rounded-full bg-wood text-sm font-bold text-white">{count}</span>}
            </Link>
            <button aria-label="Menu" onClick={() => setOpen(!open)} className="grid size-12 place-items-center rounded-full hover:bg-sand lg:hidden">{open ? <X /> : <Menu />}</button>
          </div>
        </div>
        {s && (
          <form onSubmit={go} className="wrap flex gap-2 pb-4">
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une table, une chaise..." className="input" />
            <button className="btn btn-primary">Chercher</button>
          </form>
        )}
        {open && (
          <nav className="wrap flex flex-col border-t border-wood/15 pb-4 lg:hidden">
            {links.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `border-b border-wood/10 py-4 text-xl ${isActive ? 'font-bold text-wood' : ''}`}>{l}</NavLink>)}
          </nav>
        )}
      </header>

      <motion.main key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex-1">
        <Outlet />
      </motion.main>

      <footer className="grain mt-20 bg-wood-dark text-cream">
        <div className="wrap grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
          <div><h3 className="font-serif text-2xl">{WORKSHOP.name}</h3><p className="mt-3 text-cream/80">Meubles et objets en bois fabriqués à la main au Maroc, avec passion et savoir-faire.</p></div>
          <div className="space-y-2"><h3 className="text-xl font-semibold">Navigation</h3>{links.map(([to, l]) => <Link key={to} to={to} className="block text-cream/80 hover:text-white">{l}</Link>)}</div>
          <div className="space-y-3"><h3 className="text-xl font-semibold">Contact</h3>
            <a href={`tel:${WORKSHOP.phone.replace(/\s/g, '')}`} className="flex items-center gap-2"><Phone size={20} />{WORKSHOP.phone}</a>
            <p className="flex items-center gap-2"><MapPin size={20} />{WORKSHOP.city}, Maroc</p>
            <p className="text-cream/80">Lun – Sam : 9h – 18h</p></div>
        </div>
        <p className="border-t border-white/10 py-5 text-center text-sm text-cream/60">© {new Date().getFullYear()} {WORKSHOP.name}. Tous droits réservés.</p>
      </footer>

      <a href={wa("Bonjour, j'ai une question sur vos produits.")} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="btn btn-wa fixed bottom-4 right-4 z-50 !rounded-full !px-5 shadow-lg">
        <MessageCircle /><span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  )
}
