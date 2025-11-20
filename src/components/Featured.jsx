import { useEffect, useState } from 'react'
import AnimalCard from './AnimalCard'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Featured({ onApply }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`${API}/animals/featured`).then(r=>r.json()).then(setItems).catch(()=>setItems([]))
  }, [])

  if (items.length === 0) return null

  return (
    <section className="py-12 bg-amber-50/50" id="adopt">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Friends</h2>
            <p className="text-slate-600">A few companions currently looking for a home</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(animal => (
            <AnimalCard key={animal.id} animal={animal} onApply={onApply} />
          ))}
        </div>
      </div>
    </section>
  )
}
