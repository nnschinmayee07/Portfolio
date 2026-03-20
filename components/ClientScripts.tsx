'use client'
import { useEffect } from 'react'

export default function ClientScripts() {
  useEffect(() => {
    // PAGE LOADER
    const loader = document.getElementById('pageLoader')
    setTimeout(() => loader?.classList.add('done'), 1300)

    // CUSTOM CURSOR (desktop only)
    const dot = document.createElement('div')
    dot.className = 'cursor-dot'
    const ring = document.createElement('div')
    ring.className = 'cursor-ring'
    document.body.appendChild(dot)
    document.body.appendChild(ring)

    // CURSOR GLOW
    const glow = document.createElement('div')
    glow.className = 'cursor-glow'
    document.body.appendChild(glow)

    let mx = 0, my = 0
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
      glow.style.left = mx + 'px'; glow.style.top = my + 'px'
      // ring follows with slight lag via CSS transition
      ring.style.left = mx + 'px'; ring.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

    // cursor hover effect on interactive elements
    const hoverEls = document.querySelectorAll('a, button, .project-card, .skill-group')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover') })
      el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover') })
    })

    // SCROLL REVEAL with stagger per section
    const reveals = document.querySelectorAll('.reveal')
    reveals.forEach(el => el.classList.add('hidden'))
    const observer = new IntersectionObserver((entries) => {
      // group by parent to stagger siblings
      const parents = new Map<Element, number>()
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const parent = entry.target.parentElement!
        const idx = parents.get(parent) ?? 0
        parents.set(parent, idx + 1)
        setTimeout(() => entry.target.classList.add('visible'), idx * 100)
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.1 })
    reveals.forEach(el => observer.observe(el))

    // ACTIVE NAV HIGHLIGHT
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-links li a')
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.remove('active')
            if (a.getAttribute('href') === `#${entry.target.id}`) a.classList.add('active')
          })
        }
      })
    }, { rootMargin: '-40% 0px -55% 0px' })
    sections.forEach(s => navObserver.observe(s))

    // BACK TO TOP
    const backBtn = document.getElementById('backToTop')
    const onScroll = () => {
      if (window.scrollY > 400) backBtn?.classList.add('visible')
      else backBtn?.classList.remove('visible')
    }
    window.addEventListener('scroll', onScroll)
    backBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))

    // Nav smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector((this as HTMLAnchorElement).getAttribute('href')!)
        if (target) {
          const navH = document.querySelector('nav')!.offsetHeight
          const top = target.getBoundingClientRect().top + window.scrollY - navH
          window.scrollTo({ top, behavior: 'smooth' })
        }
      })
    })

    // PROJECT MODAL
    const backdrop = document.getElementById('projBackdrop')!
    const modalTitle = document.getElementById('modalTitle')!
    const modalDesc = document.getElementById('modalDesc')!
    const modalPreview = document.getElementById('modalPreview')!
    const modalActions = document.getElementById('modalActions')!
    const modalClose = document.getElementById('modalClose')!
    const cards = Array.from(document.querySelectorAll('.project-card')) as HTMLElement[]
    let currentCardIdx = -1

    function openModal(card: HTMLElement) {
      currentCardIdx = cards.indexOf(card)
      const title = card.dataset.title ?? ''
      const desc = card.dataset.desc ?? ''
      const live = card.dataset.live
      const github = card.dataset.github
      const tags = card.dataset.tags ? card.dataset.tags.split(',') : []

      modalTitle.textContent = title
      modalDesc.textContent = desc

      if (live) {
        modalPreview.innerHTML = `<iframe src="${live}" title="${title} preview" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>`
      } else {
        modalPreview.innerHTML = `<div class="no-preview"><span>🔌</span><span>Hardware project — no live preview</span></div>`
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
      currentCardIdx = -1
    }

    cards.forEach(card => card.addEventListener('click', () => openModal(card)))
    modalClose.addEventListener('click', closeModal)
    backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal() })

    // KEYBOARD NAV: ESC closes, arrow keys navigate between projects
    document.addEventListener('keydown', e => {
      if (!backdrop.classList.contains('open')) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight' && currentCardIdx < cards.length - 1) openModal(cards[currentCardIdx + 1])
      if (e.key === 'ArrowLeft' && currentCardIdx > 0) openModal(cards[currentCardIdx - 1])
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      if (document.body.contains(dot)) document.body.removeChild(dot)
      if (document.body.contains(ring)) document.body.removeChild(ring)
      if (document.body.contains(glow)) document.body.removeChild(glow)
    }
  }, [])

  return null
}
