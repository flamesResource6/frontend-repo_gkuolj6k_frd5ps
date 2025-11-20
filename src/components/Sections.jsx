import { useEffect, useState } from 'react'
import { HandHeart, Gift, Users, CheckCircle2 } from 'lucide-react'
import AnimalGrid from './AnimalGrid'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function ExploreSection({ query, species, size, age, onApply }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (species) params.set('species', species)
    if (size) params.set('size', size)
    if (age) {
      const [min, max] = age.includes('>') ? [7, null] : age.split('-')
      if (min) params.set('age_min', min)
      if (max) params.set('age_max', max)
    }
    setLoading(true)
    fetch(`${API}/animals?${params.toString()}`, { signal: controller.signal })
      .then(r=>r.json()).then(setItems).catch(()=>setItems([])).finally(()=>setLoading(false))
    return () => controller.abort()
  }, [query, species, size, age])

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Find your companion</h2>
            <p className="text-slate-600">Use search and filters to explore adoptable animals</p>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-slate-500">Loading animals...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimalGrid items={items} onApply={onApply} />
          </div>
        )}
      </div>
    </section>
  )
}

export function InfoSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border bg-amber-50/50">
          <HandHeart className="w-6 h-6 text-amber-600" />
          <h3 className="mt-3 font-semibold text-slate-900">Adoption</h3>
          <p className="text-slate-600 text-sm mt-1">Learn about our process, fees, and how we make sure every match is a good fit for both you and the animal.</p>
        </div>
        <div className="p-6 rounded-2xl border">
          <Gift className="w-6 h-6 text-amber-600" />
          <h3 className="mt-3 font-semibold text-slate-900">Donations</h3>
          <p className="text-slate-600 text-sm mt-1">Your gift funds medical care, food, and rescue operations. Every contribution makes a real difference.</p>
        </div>
        <div className="p-6 rounded-2xl border bg-amber-50/50">
          <Users className="w-6 h-6 text-amber-600" />
          <h3 className="mt-3 font-semibold text-slate-900">Volunteer</h3>
          <p className="text-slate-600 text-sm mt-1">From foster care to transport, there are many ways to help. Join our community of animal advocates.</p>
        </div>
      </div>
    </section>
  )
}

export function StoriesSection() {
  const [stories, setStories] = useState([])
  useEffect(()=>{ fetch(`${API}/stories`).then(r=>r.json()).then(setStories).catch(()=>setStories([])) },[])
  if (stories.length===0) return null
  return (
    <section className="py-16 bg-amber-50/40" id="stories">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-900">Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {stories.map(s => (
            <article key={s.id} className="bg-white rounded-2xl border overflow-hidden">
              {s.image_url && <img src={s.image_url} alt={s.title} className="w-full h-40 object-cover" />}
              <div className="p-4">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-slate-600 mt-1 line-clamp-3">{s.content}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="py-16" id="donate">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
        <h2 className="mt-4 text-2xl font-bold text-slate-900">Ready to make a lifelong friend?</h2>
        <p className="text-slate-600 mt-2">Start by exploring our featured pets, or reach out to our team for guidance—we're here to help.</p>
        <a href="#adopt" className="inline-block mt-6 px-5 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600">Browse animals</a>
      </div>
    </section>
  )
}
