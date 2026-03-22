import { TYPE_CONFIG } from '../../utils/theme'

export default function GraphLegend() {
  return (
    <div
      className="absolute bottom-4 left-4 flex gap-4 rounded-xl px-4 py-2.5 animate-slide-up"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
        <div key={type} className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }}
          />
          <span className="text-[10px]" style={{ color: 'var(--tx3)' }}>
            {cfg.label}
          </span>
        </div>
      ))}
    </div>
  )
}