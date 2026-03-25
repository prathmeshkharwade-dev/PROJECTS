import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getLinks } from '../utils/graphHelpers'
import { TYPE_CONFIG } from '../utils/theme'
import api from '../services/api'

export default function Profile() {
  const navigate  = useNavigate()
  const { items } = useApp()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const { data } = await api.get('/auth/me')
        setUser(data)
      } catch {
        navigate('/login')
      }
    }
    fetchMe()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  // 🔥 YAHAN FIX KIYA HAI: Fallback for empty items 🔥
  const safeItems  = items || []
  const links      = getLinks(safeItems)
  const totalTags  = [...new Set(safeItems.flatMap(i => i?.tags || []))].length
  const typeStats  = Object.entries(TYPE_CONFIG).map(([type, cfg]) => ({
    ...cfg,
    count: safeItems.filter(i => i?.type === type).length,
  }))

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'var(--bg)' }}>

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-5 left-5 icon-btn px-3 py-2 rounded-xl text-xs font-medium gap-2 flex items-center"
      >
        ← Back
      </button>

      <div className="w-full max-w-md space-y-4 animate-slide-up">

        {/* Profile Card */}
        <div className="rounded-2xl p-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#7C6FCD,#E879A0)' }}>
              {initials}
            </div>
            <div>
              <h2 className="text-base font-bold" style={{ color: 'var(--tx1)' }}>
                {user?.name || '...'}
              </h2>
              <p className="text-xs" style={{ color: 'var(--tx3)' }}>
                {user?.email || '...'}
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-semibold"
                style={{ background: 'rgba(124,111,205,0.15)', color: '#7C6FCD' }}>
                Knowledge Explorer
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Items',       value: safeItems.length,  color: '#7C6FCD' },
              { label: 'Connections', value: links.length,  color: '#E879A0' },
              { label: 'Unique Tags', value: totalTags,     color: '#38BDF8' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 text-center"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[9px]" style={{ color: 'var(--tx3)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Type breakdown */}
          <div className="mb-6">
            <p className="text-[9px] uppercase tracking-widest font-semibold mb-3"
              style={{ color: 'var(--tx3)' }}>Content Breakdown</p>
            <div className="space-y-2">
              {typeStats.map(t => (
                <div key={t.label} className="flex items-center gap-3">
                  <span className="text-xs w-4" style={{ color: t.color }}>{t.icon}</span>
                  <span className="text-xs flex-1" style={{ color: 'var(--tx2)' }}>{t.label}</span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'var(--card)' }}>
                    <div className="h-full rounded-full transition-all"
                      style={{
                        width: safeItems.length ? `${(t.count / safeItems.length) * 100}%` : '0%',
                        background: t.color,
                      }} />
                  </div>
                  <span className="text-xs w-4 text-right" style={{ color: 'var(--tx3)' }}>{t.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full py-2.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: 'rgba(251,113,133,0.10)',
              color: '#FB7185',
              border: '1px solid rgba(251,113,133,0.20)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(251,113,133,0.20)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(251,113,133,0.10)'}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  )
}