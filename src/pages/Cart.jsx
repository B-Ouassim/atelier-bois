import { Link } from 'react-router'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice, shippingFor } from '../utils/formatPrice'
import { Pic } from '../components/ProductCard'

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  if (!items.length) return (
    <div className="wrap py-20 text-center"><ShoppingBag size={64} className="mx-auto text-wood" /><h1 className="h1 mt-4">Votre panier est vide</h1><Link to="/produits" className="btn btn-primary mt-6">Découvrir nos produits</Link></div>
  )
  const ship = shippingFor(subtotal)
  return (
    <div className="wrap py-10">
      <h1 className="h1">Mon panier</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {items.map((i) => (
            <li key={i.id} className="flex gap-4 rounded-xl bg-white p-3 shadow-sm sm:p-4">
              <Pic p={{ images: [i.image], name: i.name }} className="size-24 shrink-0 rounded-lg sm:size-32" />
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                <div className="flex justify-between gap-2"><Link to={`/produits/${i.slug}`} className="font-serif text-lg font-semibold leading-snug">{i.name}</Link>
                  <button aria-label="Supprimer" onClick={() => removeItem(i.id)} className="grid size-10 shrink-0 place-items-center text-red-700"><Trash2 size={22} /></button></div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center rounded-lg border-2 border-wood/30">
                    <button aria-label="Moins" onClick={() => updateQuantity(i.id, i.quantity - 1)} className="grid size-11 place-items-center"><Minus size={20} /></button>
                    <span className="w-8 text-center text-lg font-bold">{i.quantity}</span>
                    <button aria-label="Plus" onClick={() => updateQuantity(i.id, i.quantity + 1)} className="grid size-11 place-items-center"><Plus size={20} /></button>
                  </div>
                  <p className="text-xl font-bold text-wood">{formatPrice(i.price * i.quantity)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="h-fit rounded-xl bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl font-semibold">Résumé</h2>
          <div className="mt-4 space-y-3"><p className="flex justify-between"><span>Sous-total</span><b>{formatPrice(subtotal)}</b></p>
            <p className="flex justify-between"><span>Livraison</span><b>{ship ? formatPrice(ship) : 'Gratuite'}</b></p>
            <p className="flex justify-between border-t border-wood/20 pt-3 text-2xl font-bold text-wood"><span>Total</span><span>{formatPrice(subtotal + ship)}</span></p></div>
          <p className="mt-3 text-sm text-wood-dark/70">Livraison gratuite dès 3 000 DH. Paiement à la livraison.</p>
          <Link to="/commande" className="btn btn-primary mt-5 w-full">Commander</Link>
          <Link to="/produits" className="btn mt-2 w-full text-wood underline">Continuer mes achats</Link>
        </aside>
      </div>
    </div>
  )
}
