export default function Tag({ label, color }) {
  return (
    <span
      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
      style={{
        background: color ? color + '15' : 'rgba(245,166,35,0.10)',
        color:      color || '#F5A623',
      }}
    >
      {label}
    </span>
  )
}