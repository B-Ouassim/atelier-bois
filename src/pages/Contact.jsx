import { useState } from 'react'
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import { WORKSHOP } from '../data/products'
import { wa } from '../utils/formatPrice'

export default function Contact() {
  const [f, setF] = useState({ name: '', phone: '', type: 'Demande de devis', msg: '' })
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (!f.name.trim() || !f.msg.trim()) return
    try { localStorage.setItem('contacts', JSON.stringify([...JSON.parse(localStorage.getItem('contacts') || '[]'), { ...f, date: new Date().toISOString() }])) } catch {}
    setSent(true)
    window.open(wa(`${f.type}\nNom : ${f.name}\nTél : ${f.phone}\n\n${f.msg}`), '_blank')
  }
  const info = [[Phone, 'Téléphone', WORKSHOP.phone], [MapPin, 'Atelier', `${WORKSHOP.city}, Maroc`], [Clock, 'Horaires', 'Lundi – Samedi : 9h – 18h']]
  return (
    <div className="wrap py-12">
      <h1 className="h1">Contact</h1>
      <p className="mt-3 text-xl">Une question ? Un projet sur mesure ? Écrivez-nous, nous répondons rapidement.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {info.map(([I, t, d]) => <div key={t} className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm"><I className="text-wood" size={32} /><div><p className="text-sm text-wood">{t}</p><p className="text-lg font-semibold">{d}</p></div></div>)}
          <a href={wa("Bonjour, j'ai une question.")} target="_blank" rel="noreferrer" className="btn btn-wa w-full"><MessageCircle />Discuter sur WhatsApp</a>
          <a href={`tel:${WORKSHOP.phone.replace(/\s/g, '')}`} className="btn btn-outline w-full"><Phone />Appeler l'atelier</a>
        </div>
        <form onSubmit={submit} className="space-y-4 rounded-xl bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-serif text-2xl font-semibold">Demander un devis</h2>
          <select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })} className="input"><option>Demande de devis</option><option>Produit sur mesure</option><option>Question</option></select>
          <input required placeholder="Nom complet" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="input" />
          <input type="tel" placeholder="Téléphone" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className="input" />
          <textarea required rows="5" placeholder="Décrivez votre projet (type de meuble, dimensions, bois...)" value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} className="input" />
          <button className="btn btn-primary w-full">Envoyer</button>
          {sent && <p className="font-semibold text-green-700">✓ Message préparé. Il s'envoie via WhatsApp.</p>}
        </form>
      </div>
    </div>
  )
}
