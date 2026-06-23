'use client'
import { useEffect } from 'react'

export default function ClientScripts() {
  useEffect(() => {
    // ── CUSTOM CURSOR (desktop/mouse only) ──────────────────────────
    const isMouseDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let dot: HTMLDivElement | null = null
    let ring: HTMLDivElement | null = null

    const onMove = (e: MouseEvent) => {
      if (!dot || !ring) return
      dot.style.left  = e.clientX + 'px'; dot.style.top  = e.clientY + 'px'
      ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px'
    }

    if (isMouseDevice) {
      dot  = document.createElement('div'); dot.className  = 'cursor-dot'
      ring = document.createElement('div'); ring.className = 'cursor-ring'
      document.body.appendChild(dot)
      document.body.appendChild(ring)
      document.addEventListener('mousemove', onMove)

      document.querySelectorAll('a, button, .project-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
          ring!.style.width  = '44px'
          ring!.style.height = '44px'
          ring!.style.borderColor = 'rgba(214,40,40,0.5)'
        })
        el.addEventListener('mouseleave', () => {
          ring!.style.width  = '28px'
          ring!.style.height = '28px'
          ring!.style.borderColor = 'rgba(14,14,14,0.35)'
        })
      })
    }

    // ── SCROLL REVEAL ───────────────────────────────────────────────
    const reveals = document.querySelectorAll('.reveal')
    reveals.forEach(el => (el as HTMLElement).setAttribute('data-hidden', '1'))
    const observer = new IntersectionObserver((entries) => {
      const parents = new Map<Element, number>()
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const parent = entry.target.parentElement!
        const idx = parents.get(parent) ?? 0
        parents.set(parent, idx + 1)
        // Stagger: 110ms between siblings — feels more deliberate than 90ms
        setTimeout(() => (entry.target as HTMLElement).removeAttribute('data-hidden'), idx * 110)
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12 })
    reveals.forEach(el => observer.observe(el))

    // ── SECTION HEADING PARALLAX ────────────────────────────────────
    // Subtle upward drift on section headings as you scroll past them.
    // Keeps CPU cost minimal — only runs on elements in view.
    const parallaxEls = document.querySelectorAll(
      '.about-headline, .skills-title, .projects-title, .experience-title, .contact-headline'
    )
    const onParallax = () => {
      parallaxEls.forEach(el => {
        const rect = (el as HTMLElement).getBoundingClientRect()
        const vh   = window.innerHeight
        // Only apply when element is within ±1 viewport of center
        if (rect.bottom < -vh || rect.top > 2 * vh) return
        const progress = (vh - rect.top) / (vh + rect.height)
        const y = (progress - 0.5) * -30   // ±15px range — subtle
        ;(el as HTMLElement).style.transform = `translateY(${y}px)`
      })
    }
    window.addEventListener('scroll', onParallax, { passive: true })

    // ── SECTION ENTRANCE BORDER WIPE ────────────────────────────────
    // Sections get a class 'section-entered' when they cross the viewport midpoint.
    // CSS uses this to trigger a left-border wipe animation.
    const sectionEls = document.querySelectorAll('#about, #skills, #projects, #experience, #contact')
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-entered')
          sectionObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.05 })
    sectionEls.forEach(el => sectionObserver.observe(el))

    // ── EXPERIENCE CARDS — fly up on scroll, staggered ─────────────
    const expItems = document.querySelectorAll('.exp-timeline-item')
    const expObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const idx = Array.from(expItems).indexOf(entry.target as Element)
        setTimeout(() => {
          (entry.target as HTMLElement).classList.add('flushed')
        }, idx * 160)
        expObserver.unobserve(entry.target)
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })
    expItems.forEach(el => expObserver.observe(el))

    // ── WORK CARDS — no JS needed, CSS handles reveal ──────────────

    // ── BACK TO TOP ─────────────────────────────────────────────────
    const backBtn = document.getElementById('backToTop')
    const onScroll = () => {
      if (window.scrollY > 300) backBtn?.classList.add('visible')
      else backBtn?.classList.remove('visible')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // ── SMOOTH SCROLL (anchor links) ────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function (this: HTMLAnchorElement, e) {
        const href = this.getAttribute('href')!
        if (href === '#') return
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 72
          window.scrollTo({ top, behavior: 'smooth' })
        }
      })
    })

    // ── PROJECT MODAL ───────────────────────────────────────────────
    const backdrop   = document.getElementById('projBackdrop')!
    const modalTitle   = document.getElementById('modalTitle')!
    const modalDesc    = document.getElementById('modalDesc')!
    const modalPreview = document.getElementById('modalPreview')!
    const modalActions = document.getElementById('modalActions')!
    const modalClose   = document.getElementById('modalClose')!
    const cards = Array.from(document.querySelectorAll('.project-item')) as HTMLElement[]
    let currentCardIdx = -1

    function openModal(card: HTMLElement) {
      currentCardIdx = cards.indexOf(card)
      const title  = card.dataset.title  ?? ''
      const desc   = card.dataset.desc   ?? ''
      const live   = card.dataset.live
      const github = card.dataset.github
      const tags   = card.dataset.tags ? card.dataset.tags.split(',') : []

      modalTitle.textContent = title
      modalDesc.textContent  = desc

      if (live) {
        modalPreview.innerHTML = `<iframe src="${live}" title="${title} preview" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms"></iframe><div class="preview-overlay"></div>`
      } else {
        modalPreview.innerHTML = `<div class="no-preview"><span>No Live Preview</span><span>Hardware Project</span></div>`
      }

      let html = ''
      if (live)   html += `<a class="modal-btn primary" href="${live}"   target="_blank" rel="noopener">↗ Visit Live</a>`
      if (github) html += `<a class="modal-btn ghost"   href="${github}" target="_blank" rel="noopener">GitHub Repo</a>`
      if (tags.length) {
        html += `<div class="modal-tags">${tags.map(t => `<span style="font-size:0.6rem;font-family:var(--font-mono);letter-spacing:0.1em;text-transform:uppercase;color:var(--red);padding:0.2rem 0.5rem;border:1px solid rgba(214,40,40,0.2)">${t.trim()}</span>`).join('')}</div>`
      }
      modalActions.innerHTML = html

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

    document.addEventListener('keydown', e => {
      if (!backdrop.classList.contains('open')) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight' && currentCardIdx < cards.length - 1) openModal(cards[currentCardIdx + 1])
      if (e.key === 'ArrowLeft'  && currentCardIdx > 0) openModal(cards[currentCardIdx - 1])
    })

    // ── AI CHAT WIDGET ──────────────────────────────────────────────
    const avatarBtn  = document.getElementById('aiAvatarBtn')
    const widget     = document.getElementById('aiWidget')
    const widgetClose = document.getElementById('aiWidgetClose')
    const messagesEl = document.getElementById('aiMessages')
    const quickBtns  = document.querySelectorAll('.ai-quick')

    type ScheduleStep = 'idle' | 'name' | 'date' | 'time' | 'reason'
    let scheduleStep: ScheduleStep = 'idle'
    const scheduleData: { name?: string; date?: string; time?: string; reason?: string } = {}

    const replies: Record<string, string> = {
      skillset: `I specialise in UI/UX Design, Full Stack Dev (HTML, CSS, JS, React), Python, Java, C, and Hardware/IoT with Arduino & Raspberry Pi. Design-first, always.`,
      projects: `Here's what I've built:\n• Sophix — competitive platform for students\n• Home Farm Tool — layout planning UI\n• Dexpress — deployment software\n• Gesture Smart Gloves — Arduino + flex sensors\n\nClick any project card to explore!`,
      project_01: `Sophix is an Unstop-inspired competitive platform for students — built with deep focus on UX, clean flows, and pixel-perfect UI.\n\nStack: HTML · CSS · JavaScript · Figma\n\n<a href="https://sophix-git-main-nnschinmayee07-8534s-projects.vercel.app" target="_blank" style="color:var(--red)">↗ Live Site</a> · <a href="https://github.com/nnschinmayee07/Sophix" target="_blank" style="color:var(--red)">GitHub</a>`,
      project_02: `Home Farm Designing Tool — planning and visualizing home farm layouts with a clean, intuitive UI.\n\nStack: HTML · CSS · JavaScript · Canvas API\n\n<a href="https://homefarm-planner.vercel.app" target="_blank" style="color:var(--red)">↗ Live Site</a> · <a href="https://github.com/nnschinmayee07/My-home-farm-designer" target="_blank" style="color:var(--red)">GitHub</a>`,
      project_03: `Dexpress — a streamlined deployment tool that simplifies getting apps from local to live. DX-first from the ground up.\n\nStack: Next.js · TypeScript · Vercel\n\n<a href="https://zignasa-three.vercel.app" target="_blank" style="color:var(--red)">↗ Live Site</a> · <a href="https://github.com/nnschinmayee07/Zignasa" target="_blank" style="color:var(--red)">GitHub</a>`,
      project_04: `Gesture-Controlled Smart Gloves — Arduino-based gesture detection using flex sensors to convert hand movements into control signals.\n\nStack: Arduino · C++ · Flex Sensors\n\n<a href="https://github.com/nnschinmayee07/Gestures-to-speech" target="_blank" style="color:var(--red)">GitHub Repo</a> (hardware — no live demo)`,
      contact: `Here's how to reach me:\nEmail: nnschinmayee07@gmail.com\n<a href="https://www.linkedin.com/in/naga-sai-chinmayee-neti-8ab1b5345/" target="_blank" style="color:var(--red)">LinkedIn</a> · <a href="https://github.com/nnschinmayee07" target="_blank" style="color:var(--red)">GitHub</a>`,
      message: `Drop me a message at <a href="mailto:nnschinmayee07@gmail.com" style="color:var(--red)">nnschinmayee07@gmail.com</a> — I reply within 24 hours!`,
    }

    const questionLabels: Record<string, string> = {
      skillset: 'Skillset', projects: 'All Projects',
      project_01: 'Sophix', project_02: 'Home Farm Tool',
      project_03: 'Dexpress', project_04: 'Smart Gloves',
      schedule: 'Schedule a Meet', contact: 'Contact Info', message: 'Leave a Message',
    }

    function addMsg(text: string, type: 'bot' | 'user') {
      if (!messagesEl) return
      const div = document.createElement('div')
      div.className = `ai-msg ${type}`
      div.innerHTML = text.replace(/\n/g, '<br>')
      messagesEl.appendChild(div)
      messagesEl.scrollTop = messagesEl.scrollHeight
    }

    function showTypingThenReply(text: string, cb?: () => void) {
      if (!messagesEl) return
      const typing = document.createElement('div')
      typing.className = 'ai-msg bot'
      typing.textContent = '···'
      typing.style.opacity = '0.4'
      messagesEl.appendChild(typing)
      messagesEl.scrollTop = messagesEl.scrollHeight
      setTimeout(() => { typing.remove(); addMsg(text, 'bot'); cb?.() }, 800)
    }

    function showInput(placeholder: string, onSubmit: (val: string) => void) {
      if (!messagesEl) return
      const wrap = document.createElement('div')
      wrap.className = 'ai-input-row'
      wrap.innerHTML = `<input class="ai-input" placeholder="${placeholder}" /><button class="ai-send">→</button>`
      messagesEl.appendChild(wrap)
      messagesEl.scrollTop = messagesEl.scrollHeight
      const input = wrap.querySelector('.ai-input') as HTMLInputElement
      const btn   = wrap.querySelector('.ai-send')  as HTMLButtonElement
      input.focus()
      const submit = () => {
        const val = input.value.trim(); if (!val) return
        wrap.remove(); addMsg(val, 'user'); onSubmit(val)
      }
      btn.addEventListener('click', submit)
      input.addEventListener('keydown', e => { if (e.key === 'Enter') submit() })
    }

    function buildCalendarLink() {
      const { name, date, time, reason } = scheduleData
      const [y, m, d] = (date ?? '').split('-')
      const [hh, mm] = (time ?? '00:00').split(':')
      const pad = (n: string) => n.padStart(2, '0')
      const start = `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`
      const endH  = String(Number(hh) + 1).padStart(2, '0')
      const end   = `${y}${pad(m)}${pad(d)}T${endH}${pad(mm)}00`
      const title   = encodeURIComponent(`Meet with ${name} — ${reason}`)
      const details = encodeURIComponent(`Requested via Chinmayee's portfolio.\nReason: ${reason}`)
      return `https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${start}/${end}&details=${details}&add=nnschinmayee07@gmail.com`
    }

    function startScheduleFlow() {
      scheduleStep = 'name'
      showTypingThenReply(`Let's set up a meeting! What's your name?`, () => {
        showInput('Your name...', name => {
          scheduleData.name = name; scheduleStep = 'date'
          showTypingThenReply(`Nice to meet you, ${name}! What date works for you? (YYYY-MM-DD)`, () => {
            showInput('YYYY-MM-DD', date => {
              scheduleData.date = date; scheduleStep = 'time'
              showTypingThenReply(`${date} — what time? (IST, HH:MM)`, () => {
                showInput('HH:MM e.g. 10:00', time => {
                  scheduleData.time = time; scheduleStep = 'reason'
                  showTypingThenReply(`Almost done — what's the purpose of the meeting?`, () => {
                    showInput('e.g. Internship discussion...', reason => {
                      scheduleData.reason = reason; scheduleStep = 'idle'
                      const link = buildCalendarLink()
                      showTypingThenReply(
                        `All set! Here's your calendar invite:\n\n<a href="${link}" target="_blank" rel="noopener" style="color:var(--red);font-weight:500;">↗ Open Google Calendar</a>\n\nChinmayee will get a notification!`
                      )
                    })
                  })
                })
              })
            })
          })
        })
      })
    }

    avatarBtn?.addEventListener('click',  () => widget?.classList.toggle('open'))
    widgetClose?.addEventListener('click', () => widget?.classList.remove('open'))

    quickBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const q = (btn as HTMLElement).dataset.q!
        addMsg(questionLabels[q] ?? q, 'user')
        if (q === 'schedule') { startScheduleFlow(); return }
        showTypingThenReply(replies[q] ?? `I don't have info on that yet!`)
      })
    })

    // ── CLEANUP ─────────────────────────────────────────────────────
    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', onParallax)
      if (dot  && document.body.contains(dot))  document.body.removeChild(dot)
      if (ring && document.body.contains(ring)) document.body.removeChild(ring)
    }
  }, [])

  return null
}
