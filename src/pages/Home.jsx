import { Link } from 'react-router'
import { motion } from 'motion/react'
import { Hammer, Truck, Wallet, Ruler, MessageCircle, ArrowRight, Star, TreePine, ShieldCheck, Heart } from 'lucide-react'
import { products, categories } from '../data/products'
import ProductCard, { Pic } from '../components/ProductCard'
import { wa } from '../utils/formatPrice'

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay }}>{children}</motion.div>
)
const perks = [[Hammer, 'Fait main', 'Fabriqué dans notre atelier'], [Truck, 'Livraison', 'Partout au Maroc'], [Wallet, 'Paiement à la livraison', 'Payez à la réception'], [Ruler, 'Sur mesure', 'Vos dimensions, votre style']]
const steps = [[TreePine, 'Bois sélectionné', 'Cèdre, noyer, chêne et thuya massifs.'], [Hammer, 'Fabrication manuelle', 'Assemblage traditionnel, ponçage soigné.'], [ShieldCheck, 'Finition naturelle', 'Huiles et vernis qui protègent le bois.'], [Heart, 'Livré chez vous', 'Contrôlé puis livré avec soin.']]
const reviews = [['Khadija B.', 'Rabat', 'Table magnifique, très solide. Le menuisier est sérieux et la livraison était à l\'heure.'], ['Youssef M.', 'Casablanca', 'Excellent travail. Il a fait mon étagère sur mesure exactement aux dimensions demandées.'], ['Samira L.', 'Marrakech', 'Le thuya est superbe. Je recommande cet atelier à toute ma famille.']]

export default function Home() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-wood-dark text-cream">
        <div className="absolute -right-24 -top-24 size-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="wrap relative grid items-center gap-12 py-14 md:grid-cols-2 lg:py-24">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow">Artisanat marocain</p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">Le bois, travaillé <span className="text-gold">à la main</span>, pour votre maison</h1>
            <p className="mt-6 max-w-lg text-xl leading-relaxed text-cream/80">Tables, chaises, étagères et décoration en bois massif, fabriquées dans notre atelier avec passion.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/produits" className="btn btn-gold">Voir nos produits<ArrowRight size={20} /></Link>
              <a href={wa('Bonjour, je souhaite un devis.')} target="_blank" rel="noreferrer" className="btn btn-wa"><MessageCircle size={20} />WhatsApp</a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-cream/80"><div className="flex text-gold">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={20} fill="currentColor" />)}</div><span>Clients satisfaits partout au Maroc</span></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative mx-auto h-72 w-full max-w-md sm:h-[26rem]">
            <Pic p={products[0]} className="absolute left-0 top-8 aspect-[4/3] w-3/5 -rotate-6 rounded-2xl shadow-2xl ring-4 ring-cream/10" />
            <Pic p={products[1]} className="absolute right-0 top-0 aspect-square w-[46%] rotate-3 rounded-2xl shadow-2xl ring-4 ring-cream/10" />
            <Pic p={products[2]} className="absolute bottom-0 left-[22%] aspect-[4/3] w-3/5 rotate-2 rounded-2xl shadow-2xl ring-4 ring-cream/10" />
          </motion.div>
        </div>
      </section>

      <section className="wrap -mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {perks.map(([I, t, d], i) => (
          <Reveal key={t} delay={i * 0.07} className="relative rounded-2xl border border-wood/10 bg-white p-4 text-center shadow-lg sm:p-5">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-sand text-wood"><I size={28} /></span>
            <h3 className="mt-3 text-lg font-semibold leading-tight">{t}</h3><p className="mt-1 text-base text-wood-dark/65">{d}</p>
          </Reveal>
        ))}
      </section>

      <section className="wrap pt-20">
        <Reveal className="mb-8 text-center"><p className="eyebrow">Explorer</p><h2 className="h1 mt-2">Nos catégories</h2></Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((c, i) => {
            const rep = products.find((p) => p.category === c.id)
            return (
              <Reveal key={c.id} delay={i * 0.06} className={i === 4 ? 'col-span-2 md:col-span-1' : ''}>
                <Link to={`/produits?cat=${c.id}`} className="group relative block overflow-hidden rounded-2xl">
                  <Pic p={rep} className="aspect-square w-full transition duration-500 group-hover:scale-110" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 text-lg font-semibold text-white">{c.label}</span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="wrap pt-20">
        <Reveal className="mb-8 flex items-end justify-between gap-4"><div><p className="eyebrow">Sélection</p><h2 className="h1 mt-2">Nos coups de cœur</h2></div><Link to="/produits" className="hidden font-semibold text-wood underline underline-offset-4 sm:block">Tout voir</Link></Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.filter((p) => p.featured).map((p, i) => <Reveal key={p.id} delay={i * 0.08}><ProductCard p={p} /></Reveal>)}</div>
        <Link to="/produits" className="btn btn-outline mt-8 w-full sm:hidden">Voir tous les produits</Link>
      </section>

      <section className="mt-20 bg-sand py-16">
        <div className="wrap">
          <Reveal className="mb-10 text-center"><p className="eyebrow !text-wood">Notre savoir-faire</p><h2 className="h1 mt-2">De l'arbre à votre salon</h2></Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([I, t, d], i) => (
              <Reveal key={t} delay={i * 0.08} className="relative rounded-2xl bg-white p-6 shadow-sm">
                <span className="absolute right-5 top-4 font-serif text-5xl font-bold text-wood/10">{i + 1}</span>
                <I className="text-wood" size={34} /><h3 className="mt-4 font-serif text-xl font-semibold">{t}</h3><p className="mt-2 text-wood-dark/75">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pt-20">
        <Reveal className="mb-8 text-center"><p className="eyebrow">Témoignages</p><h2 className="h1 mt-2">Ils nous font confiance</h2></Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map(([n, v, t], i) => (
            <Reveal key={n} delay={i * 0.08} className="rounded-2xl border border-wood/10 bg-white p-6 shadow-sm">
              <div className="flex text-gold">{[0, 1, 2, 3, 4].map((k) => <Star key={k} size={20} fill="currentColor" />)}</div>
              <p className="mt-4 text-lg leading-relaxed">« {t} »</p>
              <p className="mt-4 font-semibold">{n} <span className="font-normal text-wood">· {v}</span></p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap pt-20">
        <Reveal className="grain relative overflow-hidden rounded-3xl bg-wood-dark p-8 text-center text-cream sm:p-14">
          <div className="absolute -left-16 -top-16 size-64 rounded-full bg-gold/15 blur-3xl" />
          <h2 className="relative font-serif text-3xl font-semibold sm:text-4xl">Un projet sur mesure ?</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-cream/80">Dites-nous ce que vous imaginez : dimensions, bois, style. Devis gratuit, réponse rapide.</p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn btn-gold">Demander un devis</Link>
            <a href={wa('Bonjour, je souhaite un meuble sur mesure.')} target="_blank" rel="noreferrer" className="btn btn-wa"><MessageCircle size={20} />WhatsApp</a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
