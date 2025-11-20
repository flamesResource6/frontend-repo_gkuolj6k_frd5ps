import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Filters from './components/Filters'
import Featured from './components/Featured'
import AdoptionFlow from './components/AdoptionFlow'
import DonateVolunteer from './components/DonateVolunteer'
import { ExploreSection, InfoSection, StoriesSection, CTASection } from './components/Sections'
import { PawPrint } from 'lucide-react'

function App() {
  const [query, setQuery] = useState('')
  const [species, setSpecies] = useState('')
  const [size, setSize] = useState('')
  const [age, setAge] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(()=>{
    const t = setTimeout(()=>setQuery(query), 200)
    return ()=>clearTimeout(t)
  },[query])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="p-2 rounded-lg bg-amber-100 text-amber-700"><PawPrint className="w-5 h-5"/></span>
            Animal Home
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#adopt" className="hover:text-slate-900">Adopt</a>
            <a href="#donate" className="hover:text-slate-900">Donate</a>
            <a href="#stories" className="hover:text-slate-900">Stories</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero onSearch={setQuery} />
        <div className="max-w-7xl mx-auto px-6 -mt-6">
          <div className="rounded-2xl bg-white border p-4 shadow-sm">
            <Filters species={species} setSpecies={setSpecies} size={size} setSize={setSize} age={age} setAge={setAge} />
          </div>
        </div>

        <Featured onApply={setSelected} />

        <ExploreSection query={query} species={species} size={size} age={age} onApply={setSelected} />

        <InfoSection />
        <DonateVolunteer />
        <StoriesSection />
        <CTASection />
      </main>

      <footer className="py-10 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Animal Home. Compassion in action.
      </footer>

      {selected && <AdoptionFlow animal={selected} onClose={()=>setSelected(null)} />}
    </div>
  )
}

export default App
