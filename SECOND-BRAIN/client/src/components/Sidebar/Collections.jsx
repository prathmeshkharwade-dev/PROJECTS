import { useState, useEffect } from 'react'
import { collectionService } from '../../services/collectionService'
import { useApp } from '../../context/AppContext'

const COLORS = ['#7C6FCD', '#E879A0', '#38BDF8', '#34D399', '#FB7185', '#FBBF24', '#A78BFA']
const ICONS  = ['📁', '🧠', '🔬', '💡', '🎯', '📚', '🚀', '⚡', '🎨', '🔥']

export default function Collections() {
  const { selectedId } = useApp()
  const [collections, setCollections] = useState([])
  const [showForm,    setShowForm]    = useState(false)
  const [activeCol,   setActiveCol]   = useState(null)
  const [form,        setForm]        = useState({ name: '', color: '#7C6FCD', icon: '📁' })
  const [loading,     setLoading]     = useState(false)

  useEffect(() => { fetchCollections() }, [])

  const fetchCollections = async () => {
    try {
      const { data } = await collectionService.getAll()
      setCollections(data)
    } catch {}
  }

  const handleCreate = async () => {
    if (!form.name.trim()) return
    setLoading(true)
    try {
      const { data } = await collectionService.create(form)
      setCollections(prev => [data, ...prev])
      setForm({ name: '', color: '#7C6FCD', icon: '📁' })
      setShowForm(false)
    } catch {}
    setLoading(false)
  }

  const handleAddItem = async (colId) => {
    if (!selectedId) return alert('Pehle graph mein koi item select karo!')
    try {
      await collectionService.addItem(colId, selectedId)
      fetchCollections()
    } catch {}
  }

  const handleDelete = async (id) => {
    try {
      await collectionService.remove(id)
      setCollections(prev => prev.filter(c => c._id !== id))
      if (activeCol === id) setActiveCol(null)
    } catch {}
  }

  return (
    <div className="px-3 py-3" style={{ borderTop: '1px solid var(--border)' }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            style={{ color: 'var(--tx3)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
          </svg>
          <p className="text-[9px] uppercase tracking-widest font-semibold"
            style={{ color: 'var(--tx3)' }}>Collections</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="icon-btn flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold"
        >
          <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          New
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="mb-3 p-3 rounded-xl animate-fade-in"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Collection name…"
            className="w-full rounded-lg px-2.5 py-1.5 text-xs outline-none mb-2"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--tx1)' }}
          />
          <div className="flex gap-1.5 mb-2">
            {COLORS.map(c => (
              <button key={c} onClick={() => setForm({ ...form, color: c })}
                className="w-5 h-5 rounded-full transition-all"
                style={{
                  background: c,
                  transform:  form.color === c ? 'scale(1.3)' : 'scale(1)',
                  boxShadow:  form.color === c ? `0 0 8px ${c}` : 'none',
                }} />
            ))}
          </div>
          <div className="flex gap-1 mb-3 flex-wrap">
            {ICONS.map(i => (
              <button key={i} onClick={() => setForm({ ...form, icon: i })}
                className="w-6 h-6 rounded-md text-xs flex items-center justify-center transition-all"
                style={{
                  background: form.icon === i ? form.color + '30' : 'var(--surface)',
                  border:     `1px solid ${form.icon === i ? form.color : 'var(--border)'}`,
                }}>
                {i}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)}
              className="flex-1 py-1.5 rounded-lg text-[10px] icon-btn">
              Cancel
            </button>
            <button onClick={handleCreate} disabled={loading}
              className="flex-1 py-1.5 rounded-lg text-[10px] font-semibold text-white glow-btn disabled:opacity-40">
              {loading ? '…' : 'Create'}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-0.5">
        {collections.length === 0 ? (
          <p className="text-[10px] py-1" style={{ color: 'var(--tx3)' }}>No collections yet</p>
        ) : (
          collections.map(col => (
            <div key={col._id}>
              <div
                onClick={() => setActiveCol(activeCol === col._id ? null : col._id)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all"
                style={{ background: activeCol === col._id ? col.color + '15' : 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = col.color + '10'}
                onMouseLeave={e => e.currentTarget.style.background = activeCol === col._id ? col.color + '15' : 'transparent'}
              >
                <span className="text-sm">{col.icon}</span>
                <span className="text-[11px] flex-1 font-medium" style={{ color: 'var(--tx2)' }}>{col.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ background: col.color + '20', color: col.color }}>
                  {col.items.length}
                </span>
                <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: 'var(--tx3)', transform: activeCol === col._id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {activeCol === col._id && (
                <div className="ml-3 mt-1 mb-2 space-y-1 animate-fade-in">
                  <button
                    onClick={() => handleAddItem(col._id)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all"
                    style={{ color: col.color, background: col.color + '10', border: `1px dashed ${col.color}40` }}
                  >
                    <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    Add selected item
                  </button>
                  <button
                    onClick={() => handleDelete(col._id)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all"
                    style={{ color: '#FB7185', background: 'rgba(251,113,133,0.08)' }}
                  >
                    <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete collection
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}