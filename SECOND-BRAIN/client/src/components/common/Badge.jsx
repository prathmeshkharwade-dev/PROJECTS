import { TYPE_CONFIG } from '../../utils/theme'

export default function Badge({ type }) {
  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.article
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border"
      style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.color + '33' }}
    >
      <span className="text-[11px]">{cfg.icon}</span>
      {cfg.label}
    </span>
  )
}