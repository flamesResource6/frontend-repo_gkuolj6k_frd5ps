import { useState } from 'react'
import { X } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AdoptionFlow({ animal, onClose }) {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`${API}/applications`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, animal_id: animal?.id })
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-semibold">Adopt {animal?.name}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-5 h-5"/></button>
        </div>
        {status === 'success' ? (
          <div className="p-6 text-center">
            <p className="text-lg font-semibold text-emerald-700">Application received!</p>
            <p className="text-slate-600 mt-1">Our team will reach out shortly.</p>
            <button onClick={onClose} className="mt-6 px-4 py-2 rounded-xl bg-amber-500 text-white">Close</button>
          </div>
        ) : (
        <form onSubmit={submit} className="p-6 grid gap-3">
          <input required value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})} className="px-4 py-3 rounded-xl border" placeholder="Full name" />
          <input required type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="px-4 py-3 rounded-xl border" placeholder="Email" />
          <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="px-4 py-3 rounded-xl border" placeholder="Phone (optional)" />
          <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="px-4 py-3 rounded-xl border" placeholder="Tell us a bit about your home" rows={4} />
          <button disabled={status==='loading'} className="mt-2 px-4 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600">
            {status==='loading' ? 'Submitting...' : `Apply to adopt ${animal?.name}`}
          </button>
        </form>)}
      </div>
    </div>
  )
}
