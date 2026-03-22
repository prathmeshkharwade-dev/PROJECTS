import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const handleSubmit = async () => {
    setBusy(true); setError(null)
    try {
      const url = isRegister ? '/auth/register' : '/auth/login'
      const { data } = await api.post(url, form)
      localStorage.setItem('token', data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'var(--bg)' }}>

      {/* Decorative blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C6FCD 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
      <div className="fixed bottom-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #E879A0 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

      <div className="w-full max-w-sm animate-slide-up">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl animate-float"
            style={{ background: 'linear-gradient(135deg,#7C6FCD22,#E879A022)', border: '1px solid var(--border)' }}>
            🧠
          </div>
          <div>
            <h1 className="text-base font-bold gradient-text">Second Brain</h1>
            <p className="text-xs" style={{ color: 'var(--tx3)' }}>Your knowledge graph</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 animate-bounce-in" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>

          <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--tx1)' }}>
            {isRegister ? '✨ Create account' : '👋 Welcome back'}
          </h2>

          <div className="space-y-3">
            {isRegister && (
              <input type="text" placeholder="Your name"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl px-3 py-2.5 text-xs outline-none transition-all"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--tx1)' }}
              />
            )}
            <input type="email" placeholder="Email"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl px-3 py-2.5 text-xs outline-none transition-all"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--tx1)' }}
            />
            <input type="password" placeholder="Password"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className="w-full rounded-xl px-3 py-2.5 text-xs outline-none transition-all"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--tx1)' }}
            />
          </div>

          {error && (
            <p className="text-xs mt-3 px-3 py-2 rounded-lg animate-fade-in"
              style={{ color: '#FB7185', background: 'rgba(251,113,133,0.10)', border: '1px solid rgba(251,113,133,0.20)' }}>
              {error}
            </p>
          )}

          <button onClick={handleSubmit} disabled={busy}
            className="glow-btn w-full mt-5 py-2.5 rounded-xl text-xs disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
            {busy ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3 h-3 border-2 rounded-full animate-spin"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                Please wait…
              </span>
            ) : isRegister ? '✨ Create Account' : '→ Sign In'}
          </button>

          <p className="text-center text-xs mt-4" style={{ color: 'var(--tx3)' }}>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button onClick={() => { setIsRegister(!isRegister); setError(null) }}
              className="ml-1 font-semibold gradient-text transition-opacity hover:opacity-80">
              {isRegister ? 'Sign in' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}