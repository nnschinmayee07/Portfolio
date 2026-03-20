'use client'
import { useEffect } from 'react'

export default function ClientScripts() {
  useEffect(() => {
    // HERO MAGNETIC NAME
    const heroName = document.querySelector('.hero-name') as HTMLElement
    if (heroName) {
      heroName.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = heroName.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) / rect.width * 18
        const dy = (e.clientY - cy) / rect.height * 10
        heroName.style.transform = `translate(${dx}px, ${dy}px)`
      })
      heroName.addEventListener('mouseleave', () => {
        heroName.style.transform = 'translate(0,0)'
      })
    }

    // HERO ROLE — wrap each word for hover effect (text nodes only, skip HTML tags)
    const heroRole = document.querySelector('.hero-role') as HTMLElement
    if (heroRole) {
      const wrapTextNodes = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || ''
          if (text.trim()) {
            const span = document.createElement('span')
            span.innerHTML = text.replace(/(\S+)/g, '<span class="word">$1</span>')
            node.parentNode?.replaceChild(span, node)
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          Array.from(node.childNodes).forEach(wrapTextNodes)
        }
      }
      Array.from(heroRole.childNodes).forEach(wrapTextNodes)
    }

    // HERO PARTICLES
    const hero = document.getElementById('hero')
    if (hero) {
      const hColors = ['rgba(167,139,250,0.5)','rgba(244,114,182,0.4)','rgba(251,146,60,0.3)','rgba(52,211,153,0.3)']
      for (let i = 0; i < 18; i++) {
        const p = document.createElement('div')
        p.className = 'hero-particle'
        const size = Math.random() * 4 + 2
        p.style.cssText = `
          width:${size}px; height:${size}px;
          left:${Math.random() * 100}%;
          top:${30 + Math.random() * 60}%;
          background:${hColors[Math.floor(Math.random()*hColors.length)]};
          animation-duration:${4 + Math.random() * 5}s;
          animation-delay:${Math.random() * 4}s;
          filter:blur(${Math.random() > 0.6 ? 1 : 0}px);
        `
        hero.appendChild(p)
      }
    }

    // 3D TILT on cards — desktop only
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (!isTouchDevice) {
      document.querySelectorAll('.tilt-card').forEach(el => {
      const card = el as HTMLElement
      // inject shine layer
      const shine = document.createElement('div')
      shine.className = 'tilt-shine'
      card.appendChild(shine)

      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        const rotY = ((x - cx) / cx) * 10
        const rotX = -((y - cy) / cy) * 10
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08) 0%, transparent 65%)`
      })
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
      })
    })
    } // end isTouchDevice check

    // PAGE LOADER + PARTICLES
    const loader = document.getElementById('pageLoader')
    const particleContainer = document.getElementById('loaderParticles')
    const loaderStatus = document.getElementById('loaderStatus')

    // cycling words while loading
    const words = ['Designing...', 'Building...', 'Crafting...', 'Shipping...', 'Almost there...']
    let wordIdx = 0
    const wordInterval = setInterval(() => {
      if (!loaderStatus) return
      loaderStatus.classList.add('swap')
      setTimeout(() => {
        wordIdx = (wordIdx + 1) % words.length
        loaderStatus.textContent = words[wordIdx]
        loaderStatus.classList.remove('swap')
      }, 260)
    }, 380)
    if (particleContainer) {
      const colors = ['#a78bfa','#f472b6','#fb923c','#34d399','#60a5fa']
      for (let i = 0; i < 28; i++) {
        const p = document.createElement('div')
        p.className = 'loader-particle'
        const size = Math.random() * 6 + 3
        p.style.cssText = `
          width:${size}px; height:${size}px;
          left:${Math.random() * 100}%;
          bottom:${Math.random() * 20}%;
          background:${colors[Math.floor(Math.random()*colors.length)]};
          animation-duration:${2.5 + Math.random() * 3}s;
          animation-delay:${Math.random() * 1.5}s;
          filter: blur(${Math.random() > 0.5 ? 1 : 0}px);
        `
        particleContainer.appendChild(p)
      }
    }
    setTimeout(() => {
      clearInterval(wordInterval)
      loader?.classList.add('done')
    }, 1800)

    // CUSTOM CURSOR — desktop/mouse only
    const isMouseDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let dot: HTMLDivElement | null = null
    let ring: HTMLDivElement | null = null
    let glow: HTMLDivElement | null = null

    const onMove = (e: MouseEvent) => {
      if (!dot || !ring || !glow) return
      dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'
      ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px'
      glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'
    }

    if (isMouseDevice) {
      dot = document.createElement('div'); dot.className = 'cursor-dot'
      ring = document.createElement('div'); ring.className = 'cursor-ring'
      glow = document.createElement('div'); glow.className = 'cursor-glow'
      document.body.appendChild(dot)
      document.body.appendChild(ring)
      document.body.appendChild(glow)
      document.addEventListener('mousemove', onMove)

      // cursor hover effect on interactive elements
      const hoverEls = document.querySelectorAll('a, button, .project-card, .skill-group')
      hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => { dot!.classList.add('hover'); ring!.classList.add('hover') })
        el.addEventListener('mouseleave', () => { dot!.classList.remove('hover'); ring!.classList.remove('hover') })
      })
    }

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
      if (window.scrollY > 300) backBtn?.classList.add('visible')
      else backBtn?.classList.remove('visible')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    function scrollToTop() {
      const start = window.scrollY
      const duration = 500
      const startTime = performance.now()
      const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t
      function step(now: number) {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        window.scrollTo(0, start * (1 - ease(progress)))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    backBtn?.addEventListener('click', scrollToTop)
    backBtn?.addEventListener('touchend', (e) => { e.preventDefault(); scrollToTop() })

    // Nav smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function (this: HTMLAnchorElement, e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href')!)
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

    // AI CHAT WIDGET
    const avatarBtn = document.getElementById('aiAvatarBtn')
    const widget = document.getElementById('aiWidget')
    const widgetClose = document.getElementById('aiWidgetClose')
    const messagesEl = document.getElementById('aiMessages')
    const quickBtns = document.querySelectorAll('.ai-quick')

    // Schedule flow state
    type ScheduleStep = 'idle' | 'name' | 'date' | 'time' | 'reason'
    let scheduleStep: ScheduleStep = 'idle'
    const scheduleData: { name?: string; date?: string; time?: string; reason?: string } = {}

    const replies: Record<string, string> = {
      skillset: `I specialise in UI/UX Design, Full Stack Dev (HTML, CSS, JS), Python, Java, C, and Hardware/IoT with Arduino & Raspberry Pi. Design-first, always. 🎨`,
      projects: `Here's what I've built:\n• Sophix — competitive platform for students\n• Home Farm Tool — layout planning UI\n• Dexpress — deployment software\n• Gesture Smart Gloves — Arduino + flex sensors\n\nClick any project card to explore! 🚀`,
      project_01: `Sophix is an Unstop-inspired competitive platform for students — built from scratch with deep focus on UX, clean flows, and pixel-perfect UI.\n\n🛠 Stack: HTML · CSS · JavaScript · Figma · Responsive Design\n\n🔗 <a href="https://sophix-git-main-nnschinmayee07-8534s-projects.vercel.app" target="_blank">Live Site</a> · <a href="https://github.com/nnschinmayee07/Sophix" target="_blank">GitHub</a>`,
      project_02: `Home Farm Designing Tool — a software tool for planning and visualizing home farm layouts with a clean, intuitive UI.\n\n🛠 Stack: HTML · CSS · JavaScript · Canvas API\n\n🔗 <a href="https://homefarm-planner.vercel.app" target="_blank">Live Site</a> · <a href="https://github.com/nnschinmayee07/My-home-farm-designer" target="_blank">GitHub</a>`,
      project_03: `Dexpress — a streamlined deployment tool that simplifies getting apps from local to live. Built for developer experience and speed.\n\n🛠 Stack: Next.js · TypeScript · Vercel · Node.js\n\n🔗 <a href="https://zignasa-three.vercel.app" target="_blank">Live Site</a> · <a href="https://github.com/nnschinmayee07/Zignasa" target="_blank">GitHub</a>`,
      project_04: `Gesture-Controlled Smart Gloves — Arduino-based gesture detection using flex sensors to convert hand movements into control signals.\n\n🛠 Stack: Arduino · C++ · Flex Sensors · Bluetooth\n\n🐙 <a href="https://github.com/nnschinmayee07/Gestures-to-speech" target="_blank">GitHub Repo</a> (no live demo — it's hardware!)`,
      contact: `Here's how to reach me:\n✉️ nnschinmayee07@gmail.com\n💼 <a href="https://www.linkedin.com/in/naga-sai-chinmayee-neti-8ab1b5345/" target="_blank">LinkedIn</a>\n🐙 <a href="https://github.com/nnschinmayee07" target="_blank">GitHub</a>`,
      message: `You can drop me a message directly at ✉️ <a href="mailto:nnschinmayee07@gmail.com">nnschinmayee07@gmail.com</a> — I reply within 24 hours! 💬`,
    }

    const questionLabels: Record<string, string> = {
      skillset: '🎨 Skillset',
      projects: '🚀 All Projects',
      project_01: '💻 Sophix',
      project_02: '💻 Home Farm Designing Tool',
      project_03: '💻 Dexpress Deployment Software',
      project_04: '🔌 Gesture-Controlled Smart Gloves',
      schedule: '📅 Schedule a Meet',
      contact: '📬 Contact Info',
      message: '✉️ Leave a Message',
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
      typing.className = 'ai-typing'
      typing.innerHTML = '<span></span><span></span><span></span>'
      messagesEl.appendChild(typing)
      messagesEl.scrollTop = messagesEl.scrollHeight
      setTimeout(() => {
        typing.remove()
        addMsg(text, 'bot')
        cb?.()
      }, 900)
    }

    function showInput(placeholder: string, onSubmit: (val: string) => void) {
      if (!messagesEl) return
      const wrap = document.createElement('div')
      wrap.className = 'ai-input-wrap'
      wrap.innerHTML = `<input class="ai-input" placeholder="${placeholder}" /><button class="ai-send">→</button>`
      messagesEl.appendChild(wrap)
      messagesEl.scrollTop = messagesEl.scrollHeight
      const input = wrap.querySelector('.ai-input') as HTMLInputElement
      const btn = wrap.querySelector('.ai-send') as HTMLButtonElement
      input.focus()
      const submit = () => {
        const val = input.value.trim()
        if (!val) return
        wrap.remove()
        addMsg(val, 'user')
        onSubmit(val)
      }
      btn.addEventListener('click', submit)
      input.addEventListener('keydown', e => { if (e.key === 'Enter') submit() })
    }

    function buildCalendarLink() {
      const { name, date, time, reason } = scheduleData
      // date: YYYYMMDD, time: HH:MM → start = YYYYMMDDTHHmm00, end = +1hr
      const [y, m, d] = (date ?? '').split('-')
      const [hh, mm] = (time ?? '00:00').split(':')
      const pad = (n: string) => n.padStart(2, '0')
      const start = `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`
      const endH = String(Number(hh) + 1).padStart(2, '0')
      const end = `${y}${pad(m)}${pad(d)}T${endH}${pad(mm)}00`
      const title = encodeURIComponent(`Meet with ${name} — ${reason}`)
      const details = encodeURIComponent(`Requested via Chinmayee's portfolio.\nReason: ${reason}`)
      return `https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${start}/${end}&details=${details}&add=nnschinmayee07@gmail.com`
    }

    function startScheduleFlow() {
      scheduleStep = 'name'
      showTypingThenReply(`Sure! Let's set it up. 📅\n\nWhat's your name?`, () => {
        showInput('Your name...', (name) => {
          scheduleData.name = name
          scheduleStep = 'date'
          showTypingThenReply(`Nice to meet you, ${name}! 👋\n\nWhat date works for you?`, () => {
            showInput('YYYY-MM-DD', (date) => {
              scheduleData.date = date
              scheduleStep = 'time'
              showTypingThenReply(`Got it — ${date}. What time? (IST)`, () => {
                showInput('HH:MM (e.g. 10:00)', (time) => {
                  scheduleData.time = time
                  scheduleStep = 'reason'
                  showTypingThenReply(`Almost done! What's the reason for the meet?`, () => {
                    showInput('e.g. Internship discussion...', (reason) => {
                      scheduleData.reason = reason
                      scheduleStep = 'idle'
                      const link = buildCalendarLink()
                      showTypingThenReply(
                        `All set! 🎉 Here's your calendar invite:\n\n<a href="${link}" target="_blank" rel="noopener" style="color:var(--accent3);font-weight:600;">📅 Open Google Calendar →</a>\n\nClick to confirm the event. Chinmayee will get a notification!`
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

    avatarBtn?.addEventListener('click', () => widget?.classList.toggle('open'))
    widgetClose?.addEventListener('click', () => widget?.classList.remove('open'))

    quickBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const q = (btn as HTMLElement).dataset.q!
        if (q === 'schedule') {
          addMsg(questionLabels[q], 'user')
          startScheduleFlow()
          return
        }
        addMsg(questionLabels[q], 'user')
        showTypingThenReply(replies[q])
      })
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      if (dot && document.body.contains(dot)) document.body.removeChild(dot)
      if (ring && document.body.contains(ring)) document.body.removeChild(ring)
      if (glow && document.body.contains(glow)) document.body.removeChild(glow)
    }
  }, [])

  return null
}
