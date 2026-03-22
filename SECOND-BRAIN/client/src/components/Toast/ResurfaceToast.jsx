import { TYPE_CONFIG } from '../../utils/theme'
import { timeAgo } from '../../utils/dateHelpers'
import { useApp } from '../../context/AppContext'

export default function ResurfaceToast({ item, onDismiss }) {
  const { setSelectedId } = useApp()
  const cfg = TYPE_CONFIG[item.type]

  const handleView = () => {
    setSelectedId(item._id || item.id)
    onDismiss()
  }

  return (
    <div
      className="fixed bottom-5 right-5 w-64 rounded-2xl p-4 z-50 animate-slide-up"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: 'linear-gradient(135deg,#7C6FCD,#E879A0)' }} />
          <span className="text-[9px] uppercase tracking-widest font-semibold"
            style={{ color: 'var(--tx3)' }}>Memory Resurface</span>
        </div>
        <button onClick={onDismiss} className="icon-btn w-6 h-6 rounded-lg text-xs">×</button>
      </div>

      {/* Content */}
      <p className="text-[10px] mb-2" style={{ color: 'var(--tx3)' }}>
        {timeAgo(item.savedAt)} you saved:
      </p>
      <div className="flex gap-2 items-start mb-3">
        <span style={{ color: cfg.color }} className="text-xs mt-0.5">{cfg.icon}</span>
        <p
          onClick={handleView}
          className="text-xs flex-1 leading-snug cursor-pointer transition-all line-clamp-2"
          style={{ color: 'var(--tx2)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--tx1)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--tx2)'}
        >
          {item.title}
        </p>
      </div>

      {/* Button */}
      <button
        onClick={handleView}
        className="w-full py-2 rounded-xl text-xs font-semibold transition-all"
        style={{
          background: 'rgba(124,111,205,0.12)',
          color: '#7C6FCD',
          border: '1px solid rgba(124,111,205,0.25)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(124,111,205,0.20)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(124,111,205,0.12)'
          e.currentTarget.style.transform = 'none'
        }}
      >
        View in graph →
      </button>
    </div>
  )
}