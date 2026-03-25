import { useState, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import { uploadFile } from '../../services/uploadService'

const ACCEPTED = {
  pdf:   { ext: '.pdf',                    icon: '⬡', color: '#A78BFA', label: 'PDF' },
  image: { ext: '.jpg,.jpeg,.png,.gif,.webp', icon: '◰', color: '#34D399', label: 'Image' },
}

export default function UploadModal({ onClose }) {
  const { addItem }           = useApp()
  const [dragging, setDragging] = useState(false)
  const [file,     setFile]     = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error,    setError]    = useState(null)
  const inputRef = useRef()

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }

  const handleSelect = (e) => {
    const f = e.target.files[0]
    if (f) setFile(f)
  }

  const getFileIcon = (file) => {
    if (!file) return '📄'
    if (file.type.includes('pdf'))   return '⬡'
    if (file.type.includes('image')) return '◰'
    return '📄'
  }

  const getFileColor = (file) => {
    if (!file) return '#7C6FCD'
    if (file.type.includes('pdf'))   return '#A78BFA'
    if (file.type.includes('image')) return '#34D399'
    return '#7C6FCD'
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const item = await uploadFile(file)
      addItem(item)
      onClose()
    } catch (err) {
      setError('Upload failed. Try again.')
    } finally {
      setUploading(false)
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
            <span className="text-sm font-bold gradient-text">Upload File</span>
          </div>
          <button onClick={onClose}
            className="icon-btn w-7 h-7 rounded-lg text-sm">×</button>
        </div>

        {/* Body */}
        <div className="p-5">

          {/* Type badges */}
          <div className="flex gap-2 mb-4">
            {Object.entries(ACCEPTED).map(([type, cfg]) => (
              <div key={type}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: cfg.color + '15', color: cfg.color, border: `1px solid ${cfg.color}30` }}>
                <span>{cfg.icon}</span>
                {cfg.label}
              </div>
            ))}
          </div>

          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
            className="rounded-xl p-8 text-center cursor-pointer transition-all"
            style={{
              border:     `2px dashed ${dragging ? '#7C6FCD' : 'var(--border)'}`,
              background: dragging ? 'rgba(124,111,205,0.08)' : 'var(--card)',
            }}
          >
            {file ? (
              <div className="flex flex-col items-center gap-2">
                <span style={{ fontSize: 32, color: getFileColor(file) }}>
                  {getFileIcon(file)}
                </span>
                <p className="text-sm font-medium" style={{ color: 'var(--tx1)' }}>
                  {file.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--tx3)' }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(124,111,205,0.12)', border: '1px solid rgba(124,111,205,0.25)' }}>
                  <svg width="22" height="22" fill="none" stroke="#7C6FCD" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--tx1)' }}>
                    Drop file here
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--tx3)' }}>
                    PDF ya Image (max 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.gif,.webp"
            onChange={handleSelect}
            className="hidden"
          />

          {error && (
            <p className="text-xs mt-3 px-3 py-2 rounded-lg"
              style={{ color: '#FB7185', background: 'rgba(251,113,133,0.10)', border: '1px solid rgba(251,113,133,0.20)' }}>
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 justify-end px-5 py-4"
          style={{ borderTop: '1px solid var(--border)' }}>
          <button onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-all icon-btn">
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="glow-btn px-4 py-2 rounded-xl text-xs disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 rounded-full animate-spin"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                Uploading…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}