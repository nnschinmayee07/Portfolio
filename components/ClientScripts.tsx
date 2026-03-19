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
          <iframe src="${live}" title="${title} preview" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
          <div class="preview-overlay"></div>`
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
