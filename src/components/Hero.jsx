import { PawPrint, Heart, Search } from 'lucide-react'

export default function Hero({ onSearch }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(250,204,21,0.15),transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-700 bg-amber-100 px-3 py-1 rounded-full mb-4">
              <PawPrint className="w-4 h-4" />
              <span className="text-sm font-medium">Warm hearts. Safe homes.</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Animal Home
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-prose">
              Discover, connect with, and adopt animals looking for a second chance. Our mission is to make every match loving, safe, and lasting.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  onChange={(e) => onSearch?.(e.target.value)}
                  type="text"
                  placeholder="Search by name, breed, or keyword..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <a href="#adopt" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-amber-500 text-white font-semibold shadow hover:bg-amber-600 transition">
                <Heart className="w-5 h-5 mr-2" />
                Start Adopting
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1400&auto=format&fit=crop"
              alt="Happy adopted dog"
              className="rounded-3xl shadow-xl border border-slate-200 w-full object-cover h-[360px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-100 text-amber-700"><PawPrint className="w-5 h-5" /></div>
                <div>
                  <p className="text-sm text-slate-500">This week</p>
                  <p className="font-semibold">32 animals found homes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
