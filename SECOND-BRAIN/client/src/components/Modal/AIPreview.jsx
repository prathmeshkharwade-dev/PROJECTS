import { TYPE_CONFIG } from '../../utils/theme'

export default function AIPreview({ preview }) {
  const cfg = TYPE_CONFIG[preview.type] || TYPE_CONFIG.article

  return (
    <div
      className="mt-3 p-3.5 rounded-xl animate-slide-up"
      style={{
        background: 'var(--card)',
        border: `1px solid ${cfg.color}30`,
        boxShadow: `0 0 20px ${cfg.color}10`,
      }}
    >
      <div className="flex gap-2 items-start mb-2">
        <span style={{ color: cfg.color }} className="text-sm mt-0.5">{cfg.icon}</span>
        <p className="text-sm font-semibold flex-1 leading-snug"
          style={{ color: 'var(--tx1)' }}>
          {preview.title}
        </p>
      </div>
      <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--tx3)' }}>
        {preview.summary}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {(preview.tags || []).map(t => (
          <span
            key={t}
            className="tag"
            style={{
              background: cfg.color + '15',
              color: cfg.color,
              border: `1px solid ${cfg.color}25`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}