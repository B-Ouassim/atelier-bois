import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { Minus, Plus, MessageCircle, Check, Truck, Wallet } from 'lucide-react'
import { products, categories } from '../data/products'
import ProductCard, { Pic } from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { formatPrice, wa } from '../utils/formatPrice'

export default function ProductDetail() {
  const { slug } = useParams()
  const p = products.find((x) => x.slug === slug)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const nav = useNavigate()
  if (!p) return <div className="wrap py-20 text-center"><p className="text-xl">Produit introuvable.</p><Link to="/produits" className="btn btn-primary mt-4">Voir les produits</Link></div>
  const add = () => { addItem(p, qty); setAdded(true); setTimeout(() => setAdded(false), 2000) }
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3)

  return (
    <div className="wrap py-8">
      <p className="mb-4 text-base"><Link to="/produits" className="text-wood underline">Produits</Link> / {categories.find((c) => c.id === p.category)?.label}</p>
      <div className="grid gap-8 md:grid-cols-2">
        <Pic p={p} className="aspect-square w-full rounded-2xl" />
        <div>
          <h1 className="h1">{p.name}</h1>
          <p className="mt-4 flex items-baseline gap-3"><span className="text-4xl font-bold text-wood">{formatPrice(p.price)}</span>{p.oldPrice && <span className="text-xl text-wood-dark/50 line-through">{formatPrice(p.oldPrice)}</span>}</p>
          <p className={`mt-2 font-semibold ${p.inStock ? 'text-green-700' : 'text-wood'}`}>{p.inStock ? '✓ En stock' : 'Fabrication sur commande (2 à 3 semaines)'}</p>
          <p className="mt-5 text-lg leading-relaxed">{p.description}</p>
          <dl className="mt-5 divide-y divide-wood/15 rounded-xl bg-white px-4">
            <div className="flex justify-between py-3"><dt>Bois</dt><dd className="font-semibold">{p.wood}</dd></div>
            <div className="flex justify-between py-3"><dt>Dimensions</dt><dd className="font-semibold">{p.dimensions}</dd></div>
          </dl>
          <div className="mt-6 flex items-center gap-4">
            <span className="text-lg font-semibold">Quantité</span>
            <div className="flex items-center rounded-lg border-2 border-wood/30 bg-white">
              <button aria-label="Moins" onClick={() => setQty(Math.max(1, qty - 1))} className="grid size-12 place-items-center"><Minus /></button>
              <span className="w-10 text-center text-xl font-bold">{qty}</span>
              <button aria-label="Plus" onClick={() => setQty(qty + 1)} className="grid size-12 place-items-center"><Plus /></button>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <button onClick={add} className="btn btn-outline">{added ? <><Check />Ajouté au panier</> : 'Ajouter au panier'}</button>
            <button onClick={() => { addItem(p, qty); nav('/commande') }} className="btn btn-primary">Acheter maintenant</button>
            <a href={wa(`Bonjour, je suis intéressé par : ${p.name} (${formatPrice(p.price)}).`)} target="_blank" rel="noreferrer" className="btn btn-wa"><MessageCircle />Commander par WhatsApp</a>
          </div>
          <div className="mt-6 space-y-2 text-base"><p className="flex gap-2"><Truck size={22} className="text-wood" />Livraison partout au Maroc</p><p className="flex gap-2"><Wallet size={22} className="text-wood" />Paiement à la livraison</p></div>
        </div>
      </div>
      {related.length > 0 && <><h2 className="h1 mb-6 mt-14 !text-3xl">Vous aimerez aussi</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div></>}
    </div>
  )
}
