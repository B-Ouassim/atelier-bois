import { Link } from 'react-router'
import { ShoppingBag } from 'lucide-react'
import { formatPrice } from '../utils/formatPrice'
import { useCart } from '../context/CartContext'

const tone = { tables: '#a8743f', chaises: '#7a4a24', etageres: '#b98d5c', decoration: '#946034', 'petits-meubles': '#6b4226' }
const art = {
  tables: <path d="M30 45h140v12H30zM42 57v62M158 57v62M70 57v38M130 57v38" />,
  chaises: <path d="M68 22h64v46H68zM62 68h76v14H62zM68 82v44M132 82v44M82 68v58M118 68v58" />,
  etageres: <path d="M35 18v112M165 18v112M35 50h130v9H35zM35 92h130v9H35z" />,
  decoration: <><rect x="55" y="18" width="90" height="116" rx="45" /><rect x="67" y="30" width="66" height="92" rx="33" /></>,
  'petits-meubles': <path d="M35 35h130v82H35zM35 76h130M88 55h24M88 96h24M45 117v14M155 117v14" />,
}

export function Pic({ p, className = '' }) {
  if (p.images?.[0]) return <img src={p.images[0]} alt={p.name} loading="lazy" className={`object-cover ${className}`} />
  const c = tone[p.category] || '#8b5a2b'
  return (
    <div className={`grid place-items-center ${className}`} style={{ background: `repeating-linear-gradient(95deg,rgba(255,255,255,.06) 0 2px,transparent 2px 9px),radial-gradient(circle at 30% 20%,${c},#3a2212)` }}>
      <svg viewBox="0 0 200 150" className="w-3/5 max-w-[240px] fill-none stroke-cream/90" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{art[p.category] || art.tables}</svg>
    </div>
  )
}

export default function ProductCard({ p }) {
  const { addItem } = useCart()
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-wood/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/produits/${p.slug}`} className="relative block overflow-hidden">
        <Pic p={p} className="aspect-[4/3] w-full transition duration-500 group-hover:scale-105" />
        {!p.inStock && <span className="absolute left-3 top-3 rounded-full bg-wood-dark px-3 py-1 text-sm font-semibold text-cream">Sur commande</span>}
        {p.oldPrice && <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-sm font-bold text-wood-dark">-{Math.round((1 - p.price / p.oldPrice) * 100)}%</span>}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-medium uppercase tracking-wider text-wood">{p.wood}</p>
        <Link to={`/produits/${p.slug}`} className="mt-1 font-serif text-xl font-semibold leading-snug hover:text-wood">{p.name}</Link>
        <p className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-wood">{formatPrice(p.price)}</span>
          {p.oldPrice && <span className="text-base text-wood-dark/45 line-through">{formatPrice(p.oldPrice)}</span>}
        </p>
        <button onClick={() => addItem(p)} className="btn btn-primary mt-auto w-full !mt-5"><ShoppingBag size={20} />Ajouter au panier</button>
      </div>
    </article>
  )
}
