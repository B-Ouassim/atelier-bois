import { WHATSAPP_NUMBER } from '../data/products'
export const formatPrice = (v) => Math.round(Number(v) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F') + ' DH'
export const shippingFor = (s) => (s === 0 || s >= 3000 ? 0 : 150)
export const wa = (t) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t)}`
