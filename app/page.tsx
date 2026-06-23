
const projects = [
  {
    num: '01', title: 'Sophix',
    desc: 'An Unstop-inspired competitive platform for students. Built from first principles — clean flows, intuitive dashboards, pixel-perfect UI throughout.',
    live: 'https://sophix-git-main-nnschinmayee07-8534s-projects.vercel.app',
    github: 'https://github.com/nnschinmayee07/Sophix',
    tags: ['UI/UX', 'HTML & CSS', 'JavaScript', 'Figma'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    side: 'left',
  },
  {
    num: '02', title: 'Home Farm Designing Tool',
    desc: 'Planning and visualizing home farm layouts. Design meets spatial thinking — where agriculture becomes an interface problem.',
    live: 'https://homefarm-planner.vercel.app',
    github: 'https://github.com/nnschinmayee07/My-home-farm-designer',
    tags: ['Software', 'UI Design', 'Canvas API'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas API'],
    side: 'right',
  },
  {
    num: '03', title: 'Dexpress Deployment',
    desc: 'Streamlined deployment tool built for developer experience. DX-first from first principles — getting apps from local to live without friction.',
    live: 'https://zignasa-three.vercel.app',
    github: 'https://github.com/nnschinmayee07/Zignasa',
    tags: ['Next.js', 'TypeScript', 'DevOps'],
    stack: ['Next.js', 'TypeScript', 'Vercel'],
    side: 'left',
  },
  {
    num: '04', title: 'Gesture-Controlled Gloves',
    desc: 'Arduino-based gesture detection using flex sensors. Where hardware meets human-centered thinking — the body as input device.',
    live: null,
    github: 'https://github.com/nnschinmayee07/Gestures-to-speech',
    tags: ['Arduino', 'C++', 'IoT'],
    stack: ['Arduino', 'C++', 'Flex Sensors'],
    side: 'right',
  },
]

import Hero from '@/components/Hero'
import WorkScroll from '@/components/WorkScroll'
import ExperienceStack from '@/components/ExperienceStack'

export default function Home() {
  return (
    <>
      {/* ── CHAPTER 01 · HERO ── */}
      <Hero />

      {/* ── CHAPTER 02 · ABOUT — cream ── */}
      <section id="about">
        {/* Crop marks at top edge (hero → about transition) */}
        <div className="crop-mark-tl" aria-hidden="true" />
        <div className="crop-mark-tr" aria-hidden="true" />

        {/* Environmental number */}
        <div className="env-number env-number-light" aria-hidden="true"
          style={{ top: '-0.1em', right: 'var(--gutter)' }}>
          02
        </div>

        <div className="about-inner">
          {/* Left — story */}
          <div>
            <span className="chapter-label">CHAPTER 02 · PERSPECTIVE</span>
            <h2 className="about-headline reveal">
              STARTED IN CODE.<br />FELL FOR DESIGN.
            </h2>

            <em className="about-italic-accent reveal">
              &ldquo;I think in flows before I think in functions.&rdquo;
            </em>

            <div className="about-body reveal">
              <p>
                I began in technology and development. Over time I became drawn to something
                harder to name — the quality of how things feel to use. That pull led me to
                graphic design, visual communication, and the kind of creative work that lives
                at the edge of two disciplines.
              </p>
              <p>
                I am not a specialist. I am someone who sees both sides of the screen.
              </p>
            </div>

            <div className="about-tags reveal">
              {['Design-first', 'Ships fast', 'Pixel-perfect', '4 languages', 'Public speaker'].map(v => (
                <span key={v} className="about-tag">{v}</span>
              ))}
            </div>
          </div>

          {/* Right — education timeline */}
          <div className="reveal">
            <span className="chapter-label" style={{ color: 'var(--ink-dim)' }}>EDUCATION · TIMELINE</span>
            <div className="edu-timeline">

              <div className="edu-timeline-item">
                <div className="edu-timeline-dot edu-timeline-dot-current" />
                <div className="edu-timeline-content">
                  <div className="edu-year">2024 — Present</div>
                  <h4>MLR Institute of Technology</h4>
                  <p>B.Tech — Computer Science Engineering</p>
                  <p style={{ marginTop: '0.2rem', fontSize: '0.78rem' }}>2nd year · Hyderabad</p>
                  <div className="langs">
                    {['English', 'Telugu', 'Hindi', 'German'].map(l =>
                      <span key={l} className="lang-chip">{l}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="edu-timeline-item">
                <div className="edu-timeline-dot" />
                <div className="edu-timeline-content">
                  <div className="edu-year">2022 — 2024</div>
                  <h4>Ignite Junior College</h4>
                  <p>MPC Stream — Mathematics, Physics, Chemistry</p>
                </div>
              </div>

              <div className="edu-timeline-item">
                <div className="edu-timeline-dot" />
                <div className="edu-timeline-content">
                  <div className="edu-year">Until 2022</div>
                  <h4>Matrusri DAV Public School</h4>
                  <p>Secondary School Certificate</p>
                </div>
              </div>

            </div>

            <div className="edu-buttons">
              <a href="https://drive.google.com/file/d/1iJhqehOTKDP9m-W95ehjBGM9X7Vfy9fP/view?usp=sharing"
                target="_blank" rel="noopener" className="edu-btn primary">
                View Resume
              </a>
              <a href="https://www.linkedin.com/in/naga-sai-chinmayee-neti-8ab1b5345/"
                target="_blank" rel="noopener" className="edu-btn outline">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 03 · TOOLKIT — dark ── */}
      <section id="skills">
        <div className="env-number env-number-dark" aria-hidden="true"
          style={{ top: '-0.05em', right: 'var(--gutter)' }}>
          03
        </div>

        <div className="skills-header">
          <span className="chapter-label" style={{ color: 'rgba(242,237,230,0.35)' }}>
            SKILL INVENTORY / REV 04
          </span>
          <h2 className="skills-title reveal">TOOLKIT</h2>
        </div>

        {/* Specimen rows — each category is a horizontal type band */}
        <div className="skills-specimen">
          {[
            {
              label: 'Graphic Design',
              index: '01',
              // [text, scale] — scale 1=hero, 2=large, 3=mid, 4=small, 5=mono
              skills: [
                ['Visual Identity', 1],
                ['Typography', 2],
                ['Layout', 3],
                ['Illustration', 3],
                ['Brand Systems', 2],
                ['Color Theory', 4],
              ] as [string, number][],
            },
            {
              label: 'Frontend Dev',
              index: '02',
              skills: [
                ['React', 1],
                ['Next.js', 2],
                ['TypeScript', 3],
                ['HTML & CSS', 2],
                ['JavaScript', 3],
                ['Framer Motion', 4],
              ] as [string, number][],
            },
            {
              label: 'Design Systems',
              index: '03',
              skills: [
                ['Figma', 1],
                ['Components', 2],
                ['Prototyping', 3],
                ['Design Tokens', 2],
                ['Accessibility', 3],
                ['Style Guides', 4],
              ] as [string, number][],
            },
            {
              label: 'User Experience',
              index: '04',
              skills: [
                ['User Flows', 1],
                ['Wireframing', 2],
                ['Micro-interactions', 3],
                ['Usability Testing', 2],
                ['Info Architecture', 4],
              ] as [string, number][],
            },
          ].map((cat) => (
            <div key={cat.label} className="skills-specimen-row">
              {/* Left label column */}
              <div className="skills-specimen-label" aria-hidden="true">
                <span className="skills-specimen-index">{cat.index}</span>
                <span className="skills-specimen-cat">{cat.label}</span>
              </div>
              {/* Skills as variable-scale type */}
              <div className="skills-specimen-band" role="list" aria-label={cat.label}>
                {cat.skills.map(([skill, scale]) => (
                  <span
                    key={skill}
                    className={`skills-specimen-word skills-specimen-s${scale}`}
                    role="listitem"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHAPTER 04 · SELECTED WORK — gallery ── */}
      <section id="projects" style={{ padding: 0, overflow: 'visible', background: 'var(--ink)' }}>
        {/* Chapter label — above the gallery stage */}
        <div style={{
          padding: 'clamp(3.5rem, 7vh, 5.5rem) var(--gutter) 0',
          background: 'var(--ink)',
          position: 'relative',
          zIndex: 2,
        }}>
          <span className="chapter-label" style={{ color: 'rgba(242,237,230,0.25)' }}>CHAPTER 04 · PROOF</span>
          <h2 className="projects-title reveal" style={{ color: 'var(--cream)' }}>SELECTED WORK</h2>
        </div>

        <WorkScroll />
      </section>

      {/* PROJECT MODAL — kept for compatibility */}
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

      {/* ── CHAPTER 05 · EXPERIENCE — scroll stack ── */}
      <section id="experience">
        <div className="experience-header">
          <span className="chapter-label">CHAPTER 05 · CREDIBILITY</span>
          <h2 className="experience-title reveal">EXPERIENCE</h2>
        </div>
        <ExperienceStack />
      </section>

      {/* ── CHAPTER 06 · CONTACT — dark ── */}
      <section id="contact">
        {/* Registration mark — top-left */}
        <div className="reg-mark" aria-hidden="true"
          style={{ top: '2.5rem', left: 'var(--gutter)' }} />

        <div className="contact-watermark" aria-hidden="true">NNSC</div>

        <div className="contact-inner">
          <span className="chapter-label" style={{ color: 'rgba(242,237,230,0.35)' }}>
            CHAPTER 06 · CONTACT
          </span>

          <h2 className="contact-headline reveal">
            <span>LET&apos;S WORK</span>
            <span className="contact-headline-red">TOGETHER</span>
          </h2>

          <div className="contact-avail">
            <span className="contact-avail-dot" aria-hidden="true" />
            <span className="contact-avail-text">Open to internships · 2025</span>
          </div>

          <a href="mailto:nnschinmayee07@gmail.com" className="contact-email reveal">
            nnschinmayee07@gmail.com →
          </a>

          <div className="contact-socials">
            <a href="https://www.linkedin.com/in/naga-sai-chinmayee-neti-8ab1b5345/"
              target="_blank" rel="noopener" className="contact-social-link">
              LinkedIn ↗
            </a>
            <a href="https://github.com/nnschinmayee07"
              target="_blank" rel="noopener" className="contact-social-link">
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER — dark epilogue ── */}
      <footer>
        <div className="footer-top">
          <div className="footer-name">Naga Sai<br />Chinmayee Neti</div>
          <ul className="footer-links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Toolkit</a></li>
            <li><a href="#projects">Work</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="https://github.com/nnschinmayee07" target="_blank" rel="noopener">GitHub</a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 Naga Sai Chinmayee Neti</span>
          <span className="footer-copy">MLR Institute of Technology · Hyderabad</span>
        </div>
      </footer>

      <a href="#hero" className="back-to-top" id="backToTop" aria-label="Back to top">↑</a>

      {/* AI CHAT WIDGET */}
      <div className="ai-chat-wrap" id="aiChatWrap">
        <div className="ai-widget" id="aiWidget">
          <div className="ai-widget-header">
            <div className="ai-widget-avatar">✦</div>
            <div>
              <div className="ai-widget-name">Chinmayee&apos;s AI</div>
              <div className="ai-widget-status">● Online</div>
            </div>
            <button className="ai-widget-close" id="aiWidgetClose">✕</button>
          </div>
          <div className="ai-messages" id="aiMessages">
            <div className="ai-msg bot">
              Hey! I&apos;m Chinmayee&apos;s AI assistant. Ask me anything or pick a topic below.
            </div>
          </div>
          <div className="ai-quick-btns" id="aiQuickBtns">
            <button className="ai-quick" data-q="skillset">Skillset</button>
            <button className="ai-quick" data-q="projects">Projects</button>
            {projects.map(p => (
              <button key={p.num} className="ai-quick" data-q={`project_${p.num}`}>
                {p.title}
              </button>
            ))}
            <button className="ai-quick" data-q="schedule">Schedule a Meet</button>
            <button className="ai-quick" data-q="contact">Contact Info</button>
            <button className="ai-quick" data-q="message">Leave a Message</button>
          </div>
        </div>
        <button className="ai-avatar-btn" id="aiAvatarBtn" aria-label="Chat with Chinmayee's AI">
          <span className="ai-avatar-inner">✦</span>
          <span className="ai-avatar-ping" />
        </button>
      </div>
    </>
  )
}
