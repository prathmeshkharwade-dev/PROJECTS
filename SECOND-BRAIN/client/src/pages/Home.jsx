import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Sidebar from '../components/Sidebar/Sidebar'
import GraphCanvas from '../components/Graph/GraphCanvas'
import GraphLegend from '../components/Graph/GraphLegend'
import ExportButton from '../components/Graph/ExportButton'
import DetailPanel from '../components/Detail/DetailPanel'
import AddItemModal from '../components/Modal/AddItemModal'
import ResurfaceToast from '../components/Toast/ResurfaceToast'
import MobileNav from '../components/common/MobileNav'
import Spinner from '../components/common/Spinner'

export default function Home() {
  const navigate = useNavigate()
  const { filteredItems, selectedId, setSelectedId, loading, items, query, setQuery } = useApp()
  const [showModal,    setShowModal]    = useState(false)
  const [toastItem,    setToastItem]    = useState(null)
  const [dark,         setDark]         = useState(true)
  const [sidebarOpen,  setSidebarOpen]  = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark)
  }, [dark])

  useEffect(() => {
    if (!items.length) return
    const timer = setTimeout(() => {
      const oldest = [...items].sort((a, b) =>
        new Date(a.savedAt || a.createdAt) - new Date(b.savedAt || b.createdAt)
      )[0]
      if (oldest) setToastItem(oldest)
    }, 4000)
    return () => clearTimeout(timer)
  }, [items.length])

  return (
    <div className="flex flex-col h-screen overflow-hidden animate-fade-in"
      style={{ background: 'var(--bg)' }}>

      {/* ── Topbar ── */}
      <header className="h-14 flex items-center gap-3 px-4 shrink-0 surface">

        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden icon-btn w-9 h-9 rounded-xl"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg animate-float"
            style={{ background: 'linear-gradient(135deg,#7C6FCD22,#E879A022)', border: '1px solid var(--border)' }}>
            🧠
          </div>
          <span className="text-sm font-bold gradient-text">Second Brain</span>
          <div className="hidden md:block w-px h-4 mx-1" style={{ background: 'var(--border)' }} />
          <span className="hidden md:block text-xs" style={{ color: 'var(--tx3)' }}>{items.length} nodes</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: 'var(--tx3)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-xl pl-9 pr-4 py-2 text-xs outline-none transition-all"
            style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--tx1)' }}
          />
        </div>

        {/* Desktop right buttons */}
        <div className="hidden md:flex ml-auto items-center gap-2">
          <button onClick={() => navigate('/profile')}
            className="icon-btn flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </button>

          <button onClick={() => setDark(!dark)}
            className="icon-btn flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium">
            {dark ? (
              <>
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                Light
              </>
            ) : (
              <>
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Dark
              </>
            )}
          </button>

          <button onClick={() => setShowModal(true)}
            className="glow-btn flex items-center gap-2 px-4 py-2 rounded-xl text-xs">
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            New Item
          </button>
        </div>

        {/* Mobile theme toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="md:hidden icon-btn w-9 h-9 rounded-xl ml-auto"
        >
          {dark ? (
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </header>

      {/* ── Main ── */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 animate-fade-in"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar — desktop always visible, mobile drawer */}
        <div
          className={`
            md:relative md:translate-x-0 md:flex
            fixed inset-y-0 left-0 z-50 flex flex-col
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          style={{ width: 256 }}
        >
          <Sidebar />
        </div>

        {/* Graph area */}
        <main className="flex-1 relative overflow-hidden">
          {loading ? <Spinner /> : (
            <GraphCanvas
              items={filteredItems}
              selectedId={selectedId}
              onSelect={(id) => {
                setSelectedId(id)
                setSidebarOpen(false)
              }}
              dark={dark}
            />
          )}
          <GraphLegend />
          <ExportButton />
          <div
            className="hidden md:block absolute bottom-4 right-4 rounded-xl px-3 py-1.5 text-[10px]"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--tx3)' }}
          >
            Scroll zoom · Drag pan · Click node
          </div>
        </main>

        {/* Detail panel — full screen on mobile */}
        {selectedId && (
          <div className="md:relative fixed inset-0 z-40 md:inset-auto md:z-auto animate-slide-in">
            <DetailPanel onClose={() => setSelectedId(null)} />
          </div>
        )}
      </div>

      {/* Mobile bottom nav */}
      <MobileNav
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onNewItem={() => setShowModal(true)}
      />

      {showModal && <AddItemModal onClose={() => setShowModal(false)} />}
      {toastItem && <ResurfaceToast item={toastItem} onDismiss={() => setToastItem(null)} />}
    </div>
  )
}