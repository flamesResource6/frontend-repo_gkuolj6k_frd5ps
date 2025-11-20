import AnimalCard from './AnimalCard'

export default function AnimalGrid({ items, onApply }) {
  if (!items || items.length === 0) return (
    <div className="col-span-full text-center text-slate-500">No animals found. Try adjusting filters.</div>
  )
  return (
    <>
      {items.map(animal => (
        <AnimalCard key={animal.id} animal={animal} onApply={onApply} />
      ))}
    </>
  )
}
