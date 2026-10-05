import { useState } from 'react'
import { Link } from 'react-router'
import { CheckCircle2, Wallet } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice, shippingFor } from '../utils/formatPrice'

const fields = [['name', 'Nom complet', 'text'], ['phone', 'Téléphone (ex : 0600000000)', 'tel'], ['city', 'Ville', 'text'], ['address', 'Adresse de livraison', 'text']]

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const [f, setF] = useState({ name: '', phone: '', city: '', address: '', notes: '' })
  const [err, setErr] = useState({})
  const [done, setDone] = useState(null)
  const ship = shippingFor(subtotal)

  if (done) return (
    <div className="wrap max-w-xl py-16 text-center"><CheckCircle2 size={72} className="mx-auto text-green-700" />
      <h1 className="h1 mt-4">Merci {done.name.split(' ')[0]} !</h1>
      <p className="mt-3 text-xl">Votre commande <b>{done.id}</b> est enregistrée. Nous vous appelons très vite pour confirmer la livraison.</p>
      <p className="mt-2 text-xl">Total à payer à la livraison : <b className="text-wood">{formatPrice(done.total)}</b></p>
      <Link to="/produits" className="btn btn-primary mt-8">Retour aux produits</Link></div>
  )
  if (!items.length) return <div className="wrap py-20 text-center"><p className="text-xl">Votre panier est vide.</p><Link to="/produits" className="btn btn-primary mt-4">Voir les produits</Link></div>

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (f.name.trim().length < 3) er.name = 'Entrez votre nom complet'
    if (!/^(\+212|0)[5-7]\d{8}$/.test(f.phone.replace(/[\s.-]/g, ''))) er.phone = 'Numéro invalide (ex : 0612345678)'
    if (!f.city.trim()) er.city = 'Entrez votre ville'
    if (f.address.trim().length < 6) er.address = 'Entrez une adresse complète'
    setErr(er)
    if (Object.keys(er).length) return
    const order = { id: 'CMD-' + Date.now().toString().slice(-6), ...f, items, subtotal, shipping: ship, total: subtotal + ship, date: new Date().toISOString() }
    try { localStorage.setItem('orders', JSON.stringify([...JSON.parse(localStorage.getItem('orders') || '[]'), order])) } catch {}
    clearCart()
    setDone(order)
  }

  return (
    <div className="wrap py-10">
      <h1 className="h1">Finaliser la commande</h1>
      <form onSubmit={submit} noValidate className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-5 rounded-xl bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
          {fields.map(([k, l, t]) => (
            <div key={k}><label htmlFor={k} className="mb-1 block font-semibold">{l}</label>
              <input id={k} type={t} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} className="input" />
              {err[k] && <p className="mt-1 text-red-700">{err[k]}</p>}</div>
          ))}
          <div><label htmlFor="notes" className="mb-1 block font-semibold">Remarques (facultatif)</label><textarea id="notes" rows="3" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} className="input" /></div>
          <div className="flex items-center gap-3 rounded-lg bg-sand p-4"><Wallet className="text-wood" /><p><b>Paiement à la livraison</b><br />Vous payez en espèces à la réception.</p></div>
        </div>
        <aside className="h-fit rounded-xl bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl font-semibold">Votre commande</h2>
          <ul className="mt-4 space-y-2">{items.map((i) => <li key={i.id} className="flex justify-between gap-3"><span>{i.quantity} × {i.name}</span><b className="shrink-0">{formatPrice(i.price * i.quantity)}</b></li>)}</ul>
          <p className="mt-4 flex justify-between border-t border-wood/20 pt-3"><span>Livraison</span><b>{ship ? formatPrice(ship) : 'Gratuite'}</b></p>
          <p className="mt-2 flex justify-between text-2xl font-bold text-wood"><span>Total</span><span>{formatPrice(subtotal + ship)}</span></p>
          <button className="btn btn-primary mt-5 w-full">Confirmer la commande</button>
        </aside>
      </form>
    </div>
  )
}
