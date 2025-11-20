import { useEffect, useState } from 'react'
import { Search, MapPin, BookOpen, Users, Calendar, ShoppingCart, BadgeCheck, Plus, Trash2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const hubs = [
  { key: 'beacons', label: 'Academic', icon: BookOpen },
  { key: 'clubs', label: 'Community', icon: Users },
  { key: 'events', label: 'Events', icon: Calendar },
  { key: 'market', label: 'Marketplace', icon: ShoppingCart },
]

function Toolbar({ q, setQ, location, setLocation, subject, setSubject, onRefresh }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center">
      <div className="flex items-center gap-2 flex-1 bg-slate-800/60 border border-white/10 rounded-xl px-3 py-2">
        <Search className="w-4 h-4 text-slate-300" />
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by name or description" className="bg-transparent text-slate-100 placeholder:text-slate-400 text-sm flex-1 outline-none" />
      </div>
      <div className="flex items-center gap-2 bg-slate-800/60 border border-white/10 rounded-xl px-3 py-2">
        <MapPin className="w-4 h-4 text-slate-300" />
        <input value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Location" className="bg-transparent text-slate-100 placeholder:text-slate-400 text-sm outline-none" />
      </div>
      <div className="flex items-center gap-2 bg-slate-800/60 border border-white/10 rounded-xl px-3 py-2">
        <BookOpen className="w-4 h-4 text-slate-300" />
        <input value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Subject" className="bg-transparent text-slate-100 placeholder:text-slate-400 text-sm outline-none" />
      </div>
      <button onClick={onRefresh} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-xl border border-white/10 transition">Refresh</button>
    </div>
  )
}

function CreateBar({ endpoint, onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const create = async () => {
    if (!title) return
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    })
    const data = await res.json()
    setTitle('')
    setDescription('')
    onCreate?.(data)
  }

  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center bg-slate-800/60 border border-white/10 rounded-xl p-3">
      <div className="text-slate-300 text-sm flex items-center gap-2"><Plus className="w-4 h-4"/> Quick add</div>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder={`Title for ${endpoint}`} className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 text-sm flex-1 outline-none" />
      <input value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Short description" className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 text-sm flex-[2] outline-none" />
      <button onClick={create} className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg transition">Add</button>
    </div>
  )
}

function Card({ item, endpoint, onDelete }) {
  const del = async () => {
    await fetch(`${API_BASE}/${endpoint}/${item.id}`, { method: 'DELETE' })
    onDelete?.(item.id)
  }
  return (
    <div className="bg-slate-800/60 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-slate-100">{item.title}</div>
          {item.location && <div className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3"/> {item.location}</div>}
        </div>
        <button onClick={del} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 transition" title="Delete">
          <Trash2 className="w-4 h-4"/>
        </button>
      </div>
      {item.description && <p className="text-sm text-slate-300">{item.description}</p>}
      <div className="text-xs text-slate-500">{new Date(item.created_at || item.start_time || Date.now()).toLocaleString()}</div>
    </div>
  )
}

export default function HubTabs() {
  const [active, setActive] = useState('beacons')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState('')
  const [location, setLocation] = useState('')
  const [subject, setSubject] = useState('')

  const fetchItems = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (q) params.append('q', q)
    if (location) params.append('location', location)
    if (subject) params.append('subject', subject)
    const res = await fetch(`${API_BASE}/${active}?${params.toString()}`)
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(()=>{ fetchItems() }, [active])

  const onCreate = (newItem) => {
    setItems(prev => [newItem, ...prev])
  }

  const onDelete = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <section className="mt-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {hubs.map(h => {
          const Icon = h.icon
          const selected = active === h.key
          return (
            <button key={h.key} onClick={()=>setActive(h.key)} className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${selected ? 'bg-blue-500 text-white border-blue-400' : 'bg-slate-800/60 text-slate-200 border-white/10 hover:bg-slate-800'}`}>
              <Icon className="w-4 h-4"/> {h.label}
            </button>
          )
        })}
      </div>

      <div className="mt-4 space-y-4">
        <Toolbar q={q} setQ={setQ} location={location} setLocation={setLocation} subject={subject} setSubject={setSubject} onRefresh={fetchItems} />
        <CreateBar endpoint={active} onCreate={onCreate} />

        {loading ? (
          <div className="text-slate-300 text-sm">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-slate-400 text-sm">No items yet. Be the first to add one!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => (
              <Card key={item.id} item={item} endpoint={active} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
