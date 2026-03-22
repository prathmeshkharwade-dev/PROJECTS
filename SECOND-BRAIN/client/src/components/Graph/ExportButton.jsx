import { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function ExportButton() {
  const { items } = useApp()
  const [open,   setOpen]   = useState(false)
  const [copied, setCopied] = useState(false)

  const handleExportJSON = () => {
    const data = JSON.stringify(items, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = 'second-brain-export.json'
    a.click()
    URL.revokeObjectURL(url)
    setOpen(false)
  }

  const handleExportPNG = () => {
    const svg = document.querySelector('svg')
    if (!svg) return
    const canvas  = document.createElement('canvas')
    const bbox    = svg.getBoundingClientRect()
    canvas.width  = bbox.width
    canvas.height = bbox.height
    const ctx     = canvas.getContext('2d')
    const svgData = new XMLSerializer().serializeToString(svg)
    const img     = new Image()
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url     = URL.createObjectURL(svgBlob)
    img.onload = () => {
      ctx.fillStyle = '#12121A'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      const a    = document.createElement('a')
      a.download = 'second-brain-graph.png'
      a.href     = canvas.toDataURL('image/png')
      a.click()
    }
    img.src = url
    setOpen(false)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => { setCopied(false); setOpen(false) }, 2000)
  }

  const buttons = [
    {
      label:  'Export JSON',
      color:  '#38BDF8',
      action: handleExportJSON,
      icon: (
        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
    },
    {
      label:  'Export PNG',
      color:  '#A78BFA',
      action: handleExportPNG,
      icon: (
        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label:  copied ? 'Copied!' : 'Copy Link',
      color:  '#34D399',
      action: handleCopyLink,
      icon: copied ? (
        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={() => setOpen(!open)}
        className="icon-btn flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium"
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>

      {open && (
        <div
          className="absolute top-12 right-0 w-44 rounded-xl overflow-hidden animate-slide-up"
          style={{
            background:  'var(--surface)',
            border:      '1px solid var(--border)',
            boxShadow:   '0 8px 30px rgba(0,0,0,0.3)',
          }}
        >
          {buttons.map(btn => (
            <button
              key={btn.label}
              onClick={btn.action}
              className="w-full flex items-center gap-3 px-4 py-3 text-xs transition-all"
              style={{ color: 'var(--tx2)' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = btn.color + '15'
                e.currentTarget.style.color = btn.color
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--tx2)'
              }}
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}