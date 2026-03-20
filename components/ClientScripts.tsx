'use client'
import { useEffect } from 'react'

export default function ClientScripts() {
  useEffect(() => {
    // Cursor glow
    const glow = document.createElement('div')
    glow.className = 'cursor-glow'
    document.body.appendChild(glow)
    const onMove = (e: MouseEvent) => {
      glow.style.left = e.clientX + 'px'
      glow.style.top = e.clientY + 'px'
    }
    document.addEventListener('mousemove', onMove)

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal')
    reveals.forEach(el => el.classList.add('hidden'))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    reveals.forEach(el => observer.observe(el))

    // Project modal
    const backdrop = document.getElementById('projBackdrop')!
    const modalTitle = document.getElementById('modalTitle')!
    const modalDesc = document.getElementById('modalDesc')!
    const modalPreview = document.getElementById('modalPreview')!
    const modalActions = document.getElementById('modalActions')!
    const modalClose = document.getElementById('modalClose')!

    function openModal(card: HTMLElement) {
      const title = card.dataset.title ?? ''
      const desc = card.dataset.desc ?? ''
      const live = card.dataset.live
      const github = card.dataset.github
      const tags = card.dataset.tags ? card.dataset.tags.split(',') : []

      modalTitle.textContent = title
      modalDesc.textContent = desc

      if (live) {
        modalPreview.innerHTML = `
          <div class="browser-mockup">
            <div class="browser-bar">
              <div class="browser-dots">
                <span></span><span></span><span></span>
              </div>
              <div class="browser-url">${live}</div>
            </div>
            <div class="browser-body">
              <div class="browser-glow"></div>
              <div class="browser-body-inner">
                <a class="browser-visit-btn" href="${live}" target="_blank" rel="noopener">↗ Open Live Site</a>
                <span class="browser-tagline">Opens in a new tab</span>
              </div>
            </div>
          </div>`
      } else {
        modalPreview.innerHTML = `
          <div class="no-preview">
            <span>🔌</span>
            <span>Hardware project — no live preview</span>
          </div>`
      }

      let actionsHTML = ''
      if (live) actionsHTML += `<a class="modal-btn primary" href="${live}" target="_blank" rel="noopener">↗ Visit Live Site</a>`
      if (github) actionsHTML += `<a class="modal-btn ghost" href="${github}" target="_blank" rel="noopener">🐙 GitHub Repo</a>`
      if (!live && !github) actionsHTML += `<span style="font-size:0.82rem;color:var(--muted)">No links available</span>`
      if (tags.length) {
        actionsHTML += `<div class="modal-tags">${tags.map(t => `<span class="project-tag">${t.trim()}</span>`).join('')}</div>`
      }
      modalActions.innerHTML = actionsHTML

      backdrop.classList.add('open')
      document.body.style.overflow = 'hidden'
    }

    function closeModal() {
      backdrop.classList.remove('open')
      document.body.style.overflow = ''
      setTimeout(() => { modalPreview.innerHTML = '' }, 400)
    }

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => openModal(card as HTMLElement))
    })
    modalClose.addEventListener('click', closeModal)
    backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal() })
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.body.removeChild(glow)
    }
  }, [])

  return null
}
