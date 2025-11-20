export default function Filters({ species, setSpecies, size, setSize, age, setAge }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <select value={species} onChange={(e)=>setSpecies(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
        <option value="">All types</option>
        <option value="dog">Dogs</option>
        <option value="cat">Cats</option>
        <option value="rabbit">Rabbits</option>
        <option value="bird">Birds</option>
        <option value="other">Other</option>
      </select>
      <select value={size} onChange={(e)=>setSize(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
        <option value="">All sizes</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="xlarge">XL</option>
      </select>
      <select value={age} onChange={(e)=>setAge(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
        <option value="">Any age</option>
        <option value="0-1">Puppy/Kitten (0-1)</option>
        <option value="1-3">Young (1-3)</option>
        <option value="3-7">Adult (3-7)</option>
        <option value=">7">Senior (7+)</option>
      </select>
    </div>
  )
}
