import { useState } from 'react'
import { Gift, Users } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function DonateVolunteer() {
  const [donation, setDonation] = useState({ full_name: '', email: '', amount: '', message: '' })
  const [vol, setVol] = useState({ full_name: '', email: '', interests: '', availability: '', message: '' })
  const [status, setStatus] = useState({ donate:'idle', vol:'idle' })

  const donate = async (e) => {
    e.preventDefault()
    setStatus(s=>({...s, donate:'loading'}))
    try {
      const res = await fetch(`${API}/donations`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...donation, amount: parseFloat(donation.amount||'0') }) })
      if(!res.ok) throw new Error('Failed')
      setStatus(s=>({...s, donate:'success'}))
      setDonation({ full_name:'', email:'', amount:'', message:'' })
    } catch {
      setStatus(s=>({...s, donate:'error'}))
    }
  }

  const volunteer = async (e) => {
    e.preventDefault()
    setStatus(s=>({...s, vol:'loading'}))
    try {
      const res = await fetch(`${API}/volunteers`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...vol, interests: vol.interests.split(',').map(s=>s.trim()).filter(Boolean) }) })
      if(!res.ok) throw new Error('Failed')
      setStatus(s=>({...s, vol:'success'}))
      setVol({ full_name:'', email:'', interests:'', availability:'', message:'' })
    } catch {
      setStatus(s=>({...s, vol:'error'}))
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl border">
          <div className="flex items-center gap-2"><Gift className="w-6 h-6 text-amber-600" /><h3 className="font-semibold text-slate-900">Make a donation</h3></div>
          <p className="text-sm text-slate-600 mt-1">Support medical care, food, and rescue logistics. Thank you for your kindness.</p>
          <form onSubmit={donate} className="mt-4 grid gap-3">
            <input required value={donation.full_name} onChange={e=>setDonation({...donation, full_name:e.target.value})} className="px-4 py-3 rounded-xl border" placeholder="Full name" />
            <input type="email" value={donation.email} onChange={e=>setDonation({...donation, email:e.target.value})} className="px-4 py-3 rounded-xl border" placeholder="Email (optional)" />
            <input required type="number" min="1" step="1" value={donation.amount} onChange={e=>setDonation({...donation, amount:e.target.value})} className="px-4 py-3 rounded-xl border" placeholder="Amount (USD)" />
            <textarea value={donation.message} onChange={e=>setDonation({...donation, message:e.target.value})} className="px-4 py-3 rounded-xl border" rows={3} placeholder="Message (optional)" />
            <button className="px-4 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600" disabled={status.donate==='loading'}>
              {status.donate==='loading' ? 'Submitting...' : 'Donate'}
            </button>
            {status.donate==='success' && <p className="text-emerald-600 text-sm">Thank you for your pledge! We'll send details to your email.</p>}
            {status.donate==='error' && <p className="text-rose-600 text-sm">Something went wrong. Please try again.</p>}
          </form>
        </div>

        <div className="p-6 rounded-2xl border">
          <div className="flex items-center gap-2"><Users className="w-6 h-6 text-amber-600" /><h3 className="font-semibold text-slate-900">Volunteer with us</h3></div>
          <p className="text-sm text-slate-600 mt-1">Transport, fostering, events—every hand helps. Share your interests and availability.</p>
          <form onSubmit={volunteer} className="mt-4 grid gap-3">
            <input required value={vol.full_name} onChange={e=>setVol({...vol, full_name:e.target.value})} className="px-4 py-3 rounded-xl border" placeholder="Full name" />
            <input required type="email" value={vol.email} onChange={e=>setVol({...vol, email:e.target.value})} className="px-4 py-3 rounded-xl border" placeholder="Email" />
            <input value={vol.interests} onChange={e=>setVol({...vol, interests:e.target.value})} className="px-4 py-3 rounded-xl border" placeholder="Interests (comma separated)" />
            <input value={vol.availability} onChange={e=>setVol({...vol, availability:e.target.value})} className="px-4 py-3 rounded-xl border" placeholder="Availability" />
            <textarea value={vol.message} onChange={e=>setVol({...vol, message:e.target.value})} className="px-4 py-3 rounded-xl border" rows={3} placeholder="Message (optional)" />
            <button className="px-4 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800" disabled={status.vol==='loading'}>
              {status.vol==='loading' ? 'Submitting...' : 'Submit'}
            </button>
            {status.vol==='success' && <p className="text-emerald-600 text-sm">Thanks for reaching out—we'll be in touch soon!</p>}
            {status.vol==='error' && <p className="text-rose-600 text-sm">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
