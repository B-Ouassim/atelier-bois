import { Link } from 'react-router'
import { Hammer, TreePine, ShieldCheck, Heart } from 'lucide-react'
import { WORKSHOP } from '../data/products'

const Page = ({ title, intro, children }) => (
  <div className="wrap max-w-4xl py-12"><h1 className="h1">{title}</h1><p className="mt-4 text-xl leading-relaxed">{intro}</p>{children}
    <Link to="/contact" className="btn btn-primary mt-10">Nous contacter</Link></div>
)
const Card = ({ icon: I, t, d }) => <div className="rounded-xl bg-white p-6 shadow-sm"><I className="text-wood" size={36} /><h3 className="mt-3 font-serif text-xl font-semibold">{t}</h3><p className="mt-2">{d}</p></div>

export const Savoir = () => (
  <Page title="Notre savoir-faire" intro="Du choix du bois à la finition, chaque étape est réalisée à la main dans notre atelier.">
    <div className="mt-8 grid gap-5 sm:grid-cols-2">
      <Card icon={TreePine} t="1. Le choix du bois" d="Cèdre, noyer, chêne, thuya : nous sélectionnons un bois massif, sec et de qualité." />
      <Card icon={Hammer} t="2. La fabrication" d="Découpe, assemblage traditionnel et ponçage soigné pour une pièce solide." />
      <Card icon={ShieldCheck} t="3. La finition" d="Huiles et vernis naturels qui protègent le bois et révèlent ses veinures." />
      <Card icon={Heart} t="4. Le contrôle" d="Chaque meuble est vérifié avant la livraison. Votre satisfaction compte." />
    </div>
  </Page>
)

export const About = () => (
  <Page title="À propos" intro={`${WORKSHOP.name} est un atelier de menuiserie situé à ${WORKSHOP.city}. Nous fabriquons des meubles et objets en bois avec passion, dans le respect de la tradition marocaine.`}>
    <div className="mt-8 space-y-4 text-lg leading-relaxed">
      <p>Après des années de travail pour des clients locaux, nous ouvrons notre boutique en ligne pour proposer nos créations partout au Maroc.</p>
      <p>Notre promesse est simple : du bois de qualité, un travail soigné, un prix juste et un service direct avec l'artisan.</p>
    </div>
  </Page>
)
