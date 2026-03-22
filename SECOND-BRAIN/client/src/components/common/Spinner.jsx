export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-8 h-8 rounded-full animate-spin"
          style={{
            border: '2px solid var(--border)',
            borderTopColor: '#7C6FCD',
          }}
        />
        <p className="text-xs" style={{ color: 'var(--tx3)' }}>Loading…</p>
      </div>
    </div>
  )
}