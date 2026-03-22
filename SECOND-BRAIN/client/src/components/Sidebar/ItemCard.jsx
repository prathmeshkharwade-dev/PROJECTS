import { timeAgo } from '../../utils/dateHelpers'
import { TYPE_CONFIG } from '../../utils/theme'

export default function ItemCard({ item, selected, onClick }) {
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.article

  return (
    <div
      onClick={onClick}
      className="mx-2 mb-1 px-3 py-3 rounded-xl cursor-pointer transition-all"
      style={{
        background:  selected ? cfg.color + '12' : 'transparent',
        border:      `1px solid ${selected ? cfg.color + '40' : 'transparent'}`,
        boxShadow:   selected ? `0 4px 15px ${cfg.color}15` : 'none',
        transform:   selected ? 'translateX(2px)' : 'none',
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold"
          style={{ background: cfg.color + '18', color: cfg.color }}
        >
          {cfg.icon} {cfg.label}
        </span>
        <span className="text-[9px]" style={{ color: 'var(--tx3)' }}>
          {timeAgo(item.savedAt || item.createdAt)}
        </span>
      </div>

      {/* Title */}
      <p className="text-[11px] leading-snug mb-2 line-clamp-2"
        style={{ color: selected ? 'var(--tx1)' : 'var(--tx2)' }}>
        {item.title}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {item.tags.slice(0, 3).map(t => (
          <span key={t} className="tag"
            style={{ background: 'var(--card)', color: 'var(--tx3)', border: '1px solid var(--border)' }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}