'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      <input
        type="text" placeholder="Your name" required
        value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        style={inputStyle}
      />
      <input
        type="email" placeholder="Your email" required
        value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        style={inputStyle}
      />
      <textarea
        placeholder="Your message" required rows={4}
        value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        style={{ ...inputStyle, resize: 'vertical' }}
      />
      <button type="submit" disabled={status === 'sending'} style={btnStyle}>
        {status === 'sending' ? 'Sending…' : 'Send Message ↗'}
      </button>
      {status === 'sent' && (
        <p style={{ fontSize: '0.82rem', color: '#34d399' }}>Message sent! I'll get back to you soon.</p>
      )}
      {status === 'error' && (
        <p style={{ fontSize: '0.82rem', color: '#f472b6' }}>Something went wrong. Try again.</p>
      )}
    </form>
  )
}

const inputStyle: React.CSSProperties = {
  background: '#1c1c21',
  border: '1px solid #2a2a32',
  borderRadius: '10px',
  padding: '0.75rem 1rem',
  color: '#f0ede8',
  fontSize: '0.88rem',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const btnStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #a78bfa, #f472b6)',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  padding: '0.75rem 1.5rem',
  fontSize: '0.88rem',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'opacity 0.2s',
}
