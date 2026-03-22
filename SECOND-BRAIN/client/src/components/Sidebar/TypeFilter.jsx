import { TYPE_CONFIG } from '../../utils/theme'

export default function TypeFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        onClick={() => onChange(null)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
        style={{
          background: !active ? 'linear-gradient(135deg,#7C6FCD,#E879A0)' : 'var(--card)',
          color:      !active ? '#fff' : 'var(--tx3)',
          border:     '1px solid var(--border)',
          boxShadow:  !active ? '0 4px 12px rgba(124,111,205,0.3)' : 'none',
        }}
        onMouseEnter={e => {
          if (!active) return
          e.currentTarget.style.background = 'rgba(124,111,205,0.15)'
          e.currentTarget.style.color = '#7C6FCD'
          e.currentTarget.style.borderColor = 'rgba(124,111,205,0.4)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={e => {
          if (!active) return
          e.currentTarget.style.background = 'var(--card)'
          e.currentTarget.style.color = 'var(--tx3)'
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.transform = 'none'
        }}
      >
        <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        All
      </button>

      {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
        <button
          key={key}
          onClick={() => onChange(active === key ? null : key)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
          style={{
            background:  active === key ? cfg.color + '20' : 'var(--card)',
            color:       active === key ? cfg.color        : 'var(--tx3)',
            border:      `1px solid ${active === key ? cfg.color + '50' : 'var(--border)'}`,
            boxShadow:   active === key ? `0 4px 12px ${cfg.color}25` : 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = cfg.color + '20'
            e.currentTarget.style.color = cfg.color
            e.currentTarget.style.borderColor = cfg.color + '50'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = `0 4px 12px ${cfg.color}25`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background  = active === key ? cfg.color + '20' : 'var(--card)'
            e.currentTarget.style.color       = active === key ? cfg.color        : 'var(--tx3)'
            e.currentTarget.style.borderColor = active === key ? cfg.color + '50' : 'var(--border)'
            e.currentTarget.style.transform   = 'none'
            e.currentTarget.style.boxShadow   = active === key ? `0 4px 12px ${cfg.color}25` : 'none'
          }}
        >
          <span style={{ fontSize: 11 }}>{cfg.icon}</span>
          {cfg.label}
        </button>
      ))}
    </div>
  )
}