import { useState } from 'react'
import { itemService } from '../../services/itemService'

export default function Notes({ item }) {
  const [note,      setNote]      = useState(item.notes     || '')
  const [highlight, setHighlight] = useState(item.highlight || '')
  const [saving,    setSaving]    = useState(false)
  const [saved,     setSaved]     = useState(false)
  const [tab,       setTab]       = useState('note')

  const handleSave = async () => {
    setSaving(true)
    try {
      await itemService.update(item._id || item.id, { notes: note, highlight })
      item.notes     = note
      item.highlight = highlight
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {}
    setSaving(false)
  }

  return (
    <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            style={{ color: 'var(--tx3)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <p className="text-[9px] uppercase tracking-widest font-semibold"
            style={{ color: 'var(--tx3)' }}>Notes & Highlights</p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: 'var(--card)' }}>
          <button
            onClick={() => setTab('note')}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold transition-all"
            style={{
              background: tab === 'note' ? 'var(--surface)' : 'transparent',
              color:      tab === 'note' ? '#7C6FCD'        : 'var(--tx3)',
            }}
          >
            <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Note
          </button>
          <button
            onClick={() => setTab('highlight')}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold transition-all"
            style={{
              background: tab === 'highlight' ? 'var(--surface)' : 'transparent',
              color:      tab === 'highlight' ? '#FBBF24'        : 'var(--tx3)',
            }}
          >
            <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Highlight
          </button>
        </div>
      </div>

      {/* Note textarea */}
      {tab === 'note' && (
        <div className="animate-fade-in">
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Write your thoughts, insights, or reminders…"
            rows={4}
            className="w-full rounded-xl text-xs p-3 resize-none outline-none transition-all mb-2"
            style={{
              background:  'var(--card)',
              border:      '1px solid var(--border)',
              color:       'var(--tx1)',
              lineHeight:  1.6,
            }}
          />
        </div>
      )}

      {/* Highlight textarea */}
      {tab === 'highlight' && (
        <div className="animate-fade-in">
          <textarea
            value={highlight}
            onChange={e => setHighlight(e.target.value)}
            placeholder="Paste the most important quote or section here…"
            rows={4}
            className="w-full rounded-xl text-xs p-3 resize-none outline-none transition-all mb-2"
            style={{
              background:  'rgba(251,191,36,0.06)',
              border:      '1px solid rgba(251,191,36,0.20)',
              borderLeft:  '3px solid #FBBF24',
              color:       'var(--tx1)',
              lineHeight:  1.6,
            }}
          />
        </div>
      )}

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
        style={{
          background: saved ? 'rgba(52,211,153,0.15)' : 'rgba(124,111,205,0.12)',
          color:      saved ? '#34D399'                : '#7C6FCD',
          border:     `1px solid ${saved ? 'rgba(52,211,153,0.25)' : 'rgba(124,111,205,0.25)'}`,
        }}
      >
        {saving ? (
          <>
            <span className="w-3 h-3 border-2 rounded-full animate-spin"
              style={{ borderColor: 'rgba(124,111,205,0.3)', borderTopColor: '#7C6FCD' }} />
            Saving…
          </>
        ) : saved ? (
          <>
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Saved!
          </>
        ) : (
          <>
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save
          </>
        )}
      </button>
    </div>
  )
}