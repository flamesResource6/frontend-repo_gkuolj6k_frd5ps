import { Heart } from 'lucide-react'

export default function AnimalCard({ animal, onApply }) {
  const photo = animal.photos?.[0] || 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1200&auto=format&fit=crop'
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition">
      <div className="relative">
        <img src={photo} alt={animal.name} className="w-full h-56 object-cover" />
        {animal.featured && (
          <span className="absolute top-3 left-3 text-xs font-semibold bg-amber-500 text-white px-2 py-1 rounded-full">Featured</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">{animal.name}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 capitalize">{animal.species}</span>
        </div>
        <p className="mt-1 text-sm text-slate-600 line-clamp-2">{animal.breed || 'Adorable friend'} • {animal.age} yr • {animal.size}</p>
        <button onClick={()=>onApply?.(animal)} className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100">
          <Heart className="w-4 h-4" /> Adopt {animal.name}
        </button>
      </div>
    </div>
  )
}
