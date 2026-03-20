
const projects = [
  {
    num: '01', title: 'Sophix',
    desc: 'An Unstop-inspired competitive platform for students. Built from scratch with deep focus on UX — clean flows, intuitive dashboards, and pixel-perfect UI throughout.',
    live: 'https://sophix-git-main-nnschinmayee07-8534s-projects.vercel.app',
    github: 'https://github.com/nnschinmayee07/Sophix',
    tags: ['UI/UX', 'HTML & CSS', 'JavaScript', 'MVP'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Figma', 'Responsive Design'],
  },
  {
    num: '02', title: 'Home Farm Designing Tool',
    desc: 'A software tool for planning and visualizing home farm layouts with a clean, intuitive UI. Design meets agriculture.',
    live: 'https://homefarm-planner.vercel.app',
    github: 'https://github.com/nnschinmayee07/My-home-farm-designer',
    tags: ['Software', 'UI Design', 'Planning', 'HTML'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas API'],
  },
  {
    num: '03', title: 'Dexpress Deployment Software',
    desc: 'Streamlined deployment tool that simplifies getting apps from local to live. Built for developer experience and speed.',
    live: 'https://zignasa-three.vercel.app',
    github: 'https://github.com/nnschinmayee07/Zignasa',
    tags: ['DevOps', 'Tooling', 'Automation'],
    stack: ['Next.js', 'TypeScript', 'Vercel', 'Node.js'],
  },
  {
    num: '04', title: 'Gesture-Controlled Smart Gloves',
    desc: 'Arduino-based gesture detection using flex sensors to convert hand movements into control signals. Hardware meets human-centered design.',
    live: null,
    github: 'https://github.com/nnschinmayee07/Gestures-to-speech',
    tags: ['Arduino', 'IoT', 'Sensors', 'Hardware'],
    stack: ['Arduino', 'C++', 'Flex Sensors', 'Bluetooth'],
  },
]

export default function Home() {
  return (
    <>
      {/* NAV */}
      <nav>
        <span className="nav-logo">Chinmayee ✦</span>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><span className="nav-badge">Open to Internships</span></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-orb orb1" />
        <div className="hero-orb orb2" />
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <div className="hero-dot" />
            <span>UI/UX Designer · Full Stack Developer · CSE Student</span>
          </div>
          <h1 className="hero-name">Naga Sai<br /><span className="grad">Chinmayee</span></h1>
          <p className="hero-role">
            I don&apos;t just write code — <strong>I craft experiences</strong>.<br />
            Building interfaces that feel right, from the first pixel to the last commit.
          </p>
          <div className="scroll-hint">
            <div className="scroll-line" />
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-grid">
          <div className="about-text reveal">
            <span className="section-label">About Me</span>
            <h2 className="section-title">Code that <span className="grad">feels good</span> to use</h2>
            <p>I&apos;m a 2nd-year CSE student at MLR Institute of Technology who got obsessed with one question: <strong>Why does so much software feel bad?</strong> So I started fixing it.</p>
            <p>I build with intuition, taste, and speed. I think in flows before I think in functions. Whether it&apos;s a gesture-controlled glove or a full product platform, I care deeply about how it <em>feels</em> to use.</p>
            <p><strong>UI/UX is my superpower.</strong> Code is how I make it real.</p>
            <div className="vibes">
              {['🎨 Design-first thinking','⚡ Ships fast','🔮 Pixel perfectionist','🛠️ Hardware + Software','🌍 4 languages','🎤 Public speaker'].map(v => (
                <span key={v} className="vibe-tag">{v}</span>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="edu-card tilt-card">
              <div className="edu-year">2024 — 2028</div>
              <h4>MLR Institute of Technology</h4>
              <p>B.Tech — Computer Science Engineering</p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--accent)' }}>Currently in 2nd Year</p>
              <div className="langs">
                {['English','Telugu','Hindi','German'].map(l => <span key={l} className="lang-chip">{l}</span>)}
              </div>
              <div className="edu-buttons">
                <a href="https://drive.google.com/file/d/1iJhqehOTKDP9m-W95ehjBGM9X7Vfy9fP/view?usp=sharing" target="_blank" rel="noopener" className="edu-btn primary">View Resume</a>
                <a href="https://www.linkedin.com/in/naga-sai-chinmayee-neti-8ab1b5345/" target="_blank" rel="noopener" className="edu-btn outline">💼 LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-header reveal">
          <span className="section-label">Skills</span>
          <h2 className="section-title">My <span className="grad">toolkit</span></h2>
        </div>
        <div className="skills-grid">
          {[
            { icon: '🎨', title: 'UI / UX Design', items: [['Interface Design',true],['User Flow Mapping',true],['Wireframing & Prototyping',true],['Responsive Layouts',false],['Micro-interactions',false]] },
            { icon: '🌐', title: 'Full Stack Dev', items: [['HTML & CSS',true],['JavaScript',false],['CSS Animations',false]] },
            { icon: '💻', title: 'Programming', items: [['Python',false],['Java',false],['C',false],['R',false],['SQL',false]] },
            { icon: '🔌', title: 'Hardware & IoT', items: [['Arduino',false],['Raspberry Pi',false],['IoT Systems',false],['AutoDesk / Fusion 360',false]] },
          ].map(g => (
            <div key={g.title} className="skill-group reveal tilt-card">
              <div className="skill-icon">{g.icon}</div>
              <h4>{g.title}</h4>
              <ul className="skill-list">
                {(g.items as [string, boolean][]).map(([item, hi]) => (
                  <li key={item} className={hi ? 'hi' : ''}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-header reveal">
          <span className="section-label">Projects</span>
          <h2 className="section-title">Things I&apos;ve <span className="grad">built</span></h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.05em', marginTop: '-0.8rem' }}>Click any card to explore the project</p>
        </div>
        <div className="projects-grid">
          {projects.map(p => (
            <div
              key={p.num}
              className="project-card reveal tilt-card"
              data-title={p.title}
              data-desc={p.desc}
              data-live={p.live ?? ''}
              data-github={p.github}
              data-tags={p.tags.join(',')}
              data-stack={p.stack.join(',')}
            >
              <div className="project-num">{p.num}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-stack">
                {p.stack.map(s => <span key={s} className="stack-chip">{s}</span>)}
              </div>
              <div className="project-footer">
                <div className="project-tags">
                  {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                </div>
              </div>
              <div className="card-hint">✦ Click to {p.live ? 'preview' : 'view'}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT MODAL */}
      <div className="proj-modal-backdrop" id="projBackdrop">
        <div className="proj-modal" id="projModal">
          <div className="proj-modal-top">
            <div>
              <h3 id="modalTitle" />
              <p id="modalDesc" />
            </div>
            <button className="modal-close" id="modalClose" aria-label="Close">✕</button>
          </div>
          <div className="proj-modal-preview" id="modalPreview" />
          <div className="proj-modal-actions" id="modalActions" />
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-grid">
          <div className="reveal">
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let&apos;s build something <span className="grad">together</span></h2>
            <p className="contact-desc">Looking for internship opportunities where I can contribute, grow, and learn. Drop me a message below or reach out directly.</p>
            <div className="contact-links" style={{ marginTop: '1.5rem' }}>
              <a href="mailto:nnschinmayee07@gmail.com" className="contact-link">
                <span className="icon">✉️</span>
                <div><span className="label">Email</span><span className="value">nnschinmayee07@gmail.com</span></div>
              </a>
              <a href="https://www.linkedin.com/in/naga-sai-chinmayee-neti-8ab1b5345/" target="_blank" rel="noopener" className="contact-link">
                <span className="icon">💼</span>
                <div><span className="label">LinkedIn</span><span className="value">naga-sai-chinmayee-neti</span></div>
              </a>
              <a href="https://github.com/nnschinmayee07" target="_blank" rel="noopener" className="contact-link">
                <span className="icon">🐙</span>
                <div><span className="label">GitHub</span><span className="value">nnschinmayee07</span></div>
              </a>
            </div>
          </div>
    
        </div>
      </section>

      <footer>
        <span>© 2025 Naga Sai Chinmayee Neti</span>
      </footer>

      <button className="back-to-top" id="backToTop" aria-label="Back to top">↑</button>

      {/* AI CHAT AVATAR */}
      <div className="ai-chat-wrap" id="aiChatWrap">
        <div className="ai-widget" id="aiWidget">
          <div className="ai-widget-header">
            <div className="ai-widget-avatar">🤖</div>
            <div>
              <div className="ai-widget-name">Chinmayee&apos;s AI</div>
              <div className="ai-widget-status">● Online</div>
            </div>
            <button className="ai-widget-close" id="aiWidgetClose">✕</button>
          </div>
          <div className="ai-messages" id="aiMessages">
            <div className="ai-msg bot">
              Hey! 👋 I&apos;m Chinmayee&apos;s AI. Ask me anything or pick a quick question below.
            </div>
          </div>
          <div className="ai-quick-btns" id="aiQuickBtns">
            <button className="ai-quick" data-q="skillset">🎨 Skillset</button>
            <button className="ai-quick" data-q="projects">🚀 All Projects</button>
            {projects.map(p => (
              <button key={p.num} className="ai-quick" data-q={`project_${p.num}`}>
                {p.num === '04' ? '🔌' : '💻'} {p.title}
              </button>
            ))}
            <button className="ai-quick" data-q="schedule">📅 Schedule a Meet</button>
            <button className="ai-quick" data-q="contact">📬 Contact Info</button>
            <button className="ai-quick" data-q="message">✉️ Leave a Message</button>
          </div>
        </div>
        {/* bubble */}
        <button className="ai-avatar-btn" id="aiAvatarBtn" aria-label="Chat with Chinmayee's AI">
          <span className="ai-avatar-inner">🤖</span>
          <span className="ai-avatar-ping" />
        </button>
      </div>
    </>
  )
}
