import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [sp, setSp] = useSearchParams()
  const [sort, setSort] = useState('new')
  const q = sp.get('q') || ''
  const cat = sp.get('cat') || 'all'
  const set = (k, v) => { const n = new URLSearchParams(sp); v && v !== 'all' ? n.set(k, v) : n.delete(k); setSp(n) }
  let list = products.filter((p) => (cat === 'all' || p.category === cat) && `${p.name} ${p.wood}`.toLowerCase().includes(q.toLowerCase()))
  if (sort === 'asc') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price)
  const chip = (on) => `shrink-0 rounded-full border-2 px-5 py-2.5 text-lg font-medium ${on ? 'border-wood bg-wood text-white' : 'border-wood/30 bg-white'}`

  return (
    <div className="wrap py-10">
      <h1 className="h1">Nos produits</h1>
      {q && <p className="mt-2 text-lg">Résultats pour « {q} » <button onClick={() => set('q', '')} className="ml-2 text-wood underline">Effacer</button></p>}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        <button onClick={() => set('cat', 'all')} className={chip(cat === 'all')}>Tous</button>
        {categories.map((c) => <button key={c.id} onClick={() => set('cat', c.id)} className={chip(cat === c.id)}>{c.label}</button>)}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p>{list.length} produit(s)</p>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="input !w-auto">
          <option value="new">Nouveautés</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option>
        </select>
      </div>
      {list.length ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      ) : <p className="mt-12 text-center text-xl">Aucun produit trouvé.</p>}
    </div>
  )
}
