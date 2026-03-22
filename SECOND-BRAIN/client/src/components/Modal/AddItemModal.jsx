import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { analyzeContent } from '../../services/aiService'
import { itemService } from '../../services/itemService'
import AIPreview from './AIPreview'

export default function AddItemModal({ onClose }) {
  const { addItem } = useApp()
  const [text,    setText]    = useState('')
  const [busy,    setBusy]    = useState(false)
  const [preview, setPreview] = useState(null)
  const [error,   setError]   = useState(null)

  const handleAnalyze = async () => {
    if (!text.trim() || busy) return
    setBusy(true); setError(null); setPreview(null)
    try {
      const result = await analyzeContent(text)
      setPreview(result)
    } catch {
      setError('AI analysis failed. Try again.')
    } finally {
      setBusy(false)
    }
  }

  const handleSave = async () => {
    if (!preview) return
    try {
      const { data } = await itemService.create({ ...preview, content: text })
      addItem(data)
      onClose()
    } catch {
      setError('Failed to save item.')
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden animate-bounce-in"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full"
              style={{ background: 'linear-gradient(135deg,#7C6FCD,#E879A0)' }} />
            <span className="text-sm font-bold gradient-text">Save to Second Brain</span>
          </div>
          <button onClick={onClose} className="icon-btn w-7 h-7 rounded-lg text-sm">×</button>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-xs mb-2.5" style={{ color: 'var(--tx3)' }}>
            Paste any content — article, tweet, URL, or text:
          </p>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste content here…"
            rows={4}
            className="w-full rounded-xl text-xs p-3 resize-none outline-none transition-all"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--tx1)',
            }}
          />
          {error && (
            <p className="text-xs mt-2 px-3 py-2 rounded-lg animate-fade-in"
              style={{ color: '#FB7185', background: 'rgba(251,113,133,0.10)', border: '1px solid rgba(251,113,133,0.20)' }}>
              {error}
            </p>
          )}
          {preview && <AIPreview preview={preview} />}
        </div>

        {/* Footer */}
        <div className="flex gap-2 justify-end px-5 py-4"
          style={{ borderTop: '1px solid var(--border)' }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-all icon-btn"
          >
            Cancel
          </button>
          {!preview ? (
            <button
              onClick={handleAnalyze}
              disabled={busy || !text.trim()}
              className="glow-btn px-4 py-2 rounded-xl text-xs disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {busy ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 rounded-full animate-spin"
                    style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                  Analyzing…
                </span>
              ) : '✦ Analyze with AI'}
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg,#34D399,#059669)',
                boxShadow: '0 4px 15px rgba(52,211,153,0.3)',
              }}
            >
              Save to Graph →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}