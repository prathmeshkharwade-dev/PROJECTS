import { TYPE_CONFIG } from '../../utils/theme'
import { useApp } from '../../context/AppContext'
import { getLinks } from '../../utils/graphHelpers'

export default function RelatedItems({ itemId }) {
  const { items, setSelectedId } = useApp()
  const links = getLinks(items)

  const related = links
    .filter(l => l.source === itemId || l.target === itemId)
    .sort((a, b) => b.strength - a.strength)
    .map(l => ({
      item: items.find(i => (i._id || i.id) === (l.source === itemId ? l.target : l.source)),
      shared: l.shared,
    }))
    .filter(r => r.item)

  if (!related.length) return null

  return (
    <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
      <p className="text-[9px] uppercase tracking-widest font-semibold mb-3"
        style={{ color: 'var(--tx3)' }}>
        Connected · {related.length}
      </p>
      <div className="space-y-2">
        {related.map(({ item, shared }) => {
          const cfg = TYPE_CONFIG[item.type]
          return (
            <div
              key={item._id || item.id}
              onClick={() => setSelectedId(item._id || item.id)}
              className="p-2.5 rounded-xl cursor-pointer transition-all"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = cfg.color + '50'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'none'
              }}
            >
              <div className="flex gap-2 items-start mb-1.5">
                <span style={{ color: cfg.color }} className="text-xs mt-0.5">{cfg.icon}</span>
                <span className="text-[11px] leading-snug flex-1 line-clamp-2"
                  style={{ color: 'var(--tx2)' }}>
                  {item.title}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {shared.map(s => (
                  <span key={s} className="tag"
                    style={{ background: 'var(--surface)', color: 'var(--tx3)', border: '1px solid var(--border)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}