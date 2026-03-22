import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { TYPE_CONFIG } from '../../utils/theme'
import { timeAgo } from '../../utils/dateHelpers'
import { itemService } from '../../services/itemService'
import RelatedItems from './RelatedItems'
import Notes from './Notes'

export default function DetailPanel({ onClose }) {
  const { items, selectedId, setSelectedId, removeItem } = useApp()
  const [deleting, setDeleting] = useState(false)
  const [editing,  setEditing]  = useState(false)
  const [editData, setEditData] = useState(null)
  const [saving,   setSaving]   = useState(false)

  const item = items.find(i => (i._id || i.id) === selectedId)
  if (!item) return null
  const cfg = TYPE_CONFIG[item.type]

  const handleClose = () => {
    setSelectedId(null)
    if (onClose) onClose()
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this item?')) return
    setDeleting(true)
    try {
      await itemService.remove(item._id || item.id)
      removeItem(item._id || item.id)
      handleClose()
    } catch { setDeleting(false) }
  }

  const handleEdit = () => {
    setEditData({
      title:   item.title,
      summary: item.summary,
      tags:    item.tags.join(', '),
    })
    setEditing(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const updated = {
        title:   editData.title,
        summary: editData.summary,
        tags:    editData.tags.split(',').map(t => t.trim()).filter(Boolean),
      }
      const { data } = await itemService.update(item._id || item.id, updated)
      item.title   = data.title
      item.summary = data.summary
      item.tags    = data.tags
      setEditing(false)
    } catch {}
    setSaving(false)
  }

  return (
    <aside
      className="w-full md:w-72 h-full flex flex-col overflow-y-auto shrink-0 animate-slide-in"
      style={{ background: 'var(--surface)', borderLeft: '1px solid var(--border)' }}
    >
      {/* Mobile back button */}
      <div
        className="md:hidden flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <button
          onClick={handleClose}
          className="icon-btn flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <span className="text-xs font-semibold" style={{ color: 'var(--tx1)' }}>Item Detail</span>
      </div>

      {/* Header */}
      <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex justify-between items-center mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
            style={{ background: cfg.color + '15', color: cfg.color, boxShadow: `0 0 12px ${cfg.color}20` }}
          >
            {cfg.icon} {cfg.label}
          </span>

          <div className="flex items-center gap-1">
            <button onClick={handleEdit}
              className="icon-btn flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button onClick={handleDelete} disabled={deleting}
              className="icon-btn flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium"
              style={{ color: '#FB7185' }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {deleting ? '…' : 'Delete'}
            </button>
            <button onClick={handleClose}
              className="hidden md:flex icon-btn w-7 h-7 rounded-lg text-sm items-center justify-center">
              ×
            </button>
          </div>
        </div>

        {editing ? (
          <div className="space-y-2 animate-fade-in">
            <input
              value={editData.title}
              onChange={e => setEditData({ ...editData, title: e.target.value })}
              className="w-full rounded-lg px-2.5 py-1.5 text-xs outline-none"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--tx1)' }}
              placeholder="Title"
            />
            <textarea
              value={editData.summary}
              onChange={e => setEditData({ ...editData, summary: e.target.value })}
              rows={3}
              className="w-full rounded-lg px-2.5 py-1.5 text-xs outline-none resize-none"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--tx1)' }}
              placeholder="Summary"
            />
            <input
              value={editData.tags}
              onChange={e => setEditData({ ...editData, tags: e.target.value })}
              className="w-full rounded-lg px-2.5 py-1.5 text-xs outline-none"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--tx1)' }}
              placeholder="Tags (comma separated)"
            />
            <div className="flex gap-2 pt-1">
              <button onClick={() => setEditing(false)}
                className="flex-1 py-1.5 rounded-lg text-xs icon-btn">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-white glow-btn disabled:opacity-40">
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-sm font-semibold leading-snug mb-2"
              style={{ color: 'var(--tx1)' }}>{item.title}</h2>
            <p className="text-xs leading-relaxed"
              style={{ color: 'var(--tx3)' }}>{item.summary}</p>
          </>
        )}
      </div>

      {/* Tags */}
      {!editing && (
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <p className="text-[9px] uppercase tracking-widest font-semibold mb-2.5"
            style={{ color: 'var(--tx3)' }}>Tags</p>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map(t => (
              <span key={t} className="tag"
                style={{ background: cfg.color + '12', color: cfg.color, border: `1px solid ${cfg.color}25` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {!editing && <Notes item={item} />}
      {!editing && <RelatedItems itemId={item._id || item.id} />}

      <div className="mt-auto p-4" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-[10px]" style={{ color: 'var(--tx3)' }}>
          Saved {timeAgo(item.savedAt || item.createdAt)}
        </p>
      </div>
    </aside>
  )
}