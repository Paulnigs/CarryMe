import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'
import RoutePages from './RoutePages.jsx'

const navLinks = [
  { label: 'Experience', href: '/experience' },
  { label: 'Programs', href: '/programs' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Membership', href: '/membership' },
]

const programs = [
  {
    id: '01',
    name: 'Forge',
    type: 'Strength & conditioning',
    copy: 'Progressive compound lifting, athletic conditioning and coaching that makes every rep count.',
    meta: '60 min · All levels',
  },
  {
    id: '02',
    name: 'Engine',
    type: 'Metabolic performance',
    copy: 'High-output intervals built to expand your capacity without sacrificing movement quality.',
    meta: '45 min · Intermediate',
  },
  {
    id: '03',
    name: 'Sculpt',
    type: 'Functional hypertrophy',
    copy: 'Precise tempo, purposeful volume and intelligent programming for lasting definition.',
    meta: '55 min · All levels',
  },
  {
    id: '04',
    name: 'Carry',
    type: 'Small-group coaching',
    copy: 'Personal attention. Team energy. A six-person room where standards stay high.',
    meta: '50 min · 6 athletes',
  },
]

const schedule = [
  ['05:30', 'Forge', 'Coach Timi', '12 spots'],
  ['07:00', 'Engine', 'Coach Imani', '08 spots'],
  ['12:30', 'Sculpt', 'Coach Ese', '10 spots'],
  ['17:30', 'Carry', 'Coach Timi', '04 spots'],
  ['19:00', 'Forge', 'Coach Imani', '06 spots'],
]

const memberships = [
  {
    name: 'Foundation',
    price: '₦35K',
    note: 'For the self-driven',
    features: ['Full gym access', '2 coached classes / week', 'Baseline assessment'],
  },
  {
    name: 'All In',
    price: '₦65K',
    note: 'Our complete standard',
    featured: true,
    features: ['Unlimited classes', 'Monthly performance review', 'Recovery zone access', 'Priority booking'],
  },
  {
    name: 'Private',
    price: '₦145K',
    note: 'Built around you',
    features: ['8 private sessions', 'Custom programming', 'Nutrition accountability', 'Direct coach access'],
  },
]

function ArrowIcon({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow-icon">{diagonal ? '↗' : '→'}</span>
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function StrengthCore() {
  const group = useRef()
  const inner = useRef()

  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = time * 0.16 + pointer.x * 0.25
      group.current.rotation.x = Math.sin(time * 0.35) * 0.12 + pointer.y * 0.15
    }
    if (inner.current) inner.current.rotation.z = -time * 0.22
  })

  return (
    <group ref={group} rotation={[0.15, -0.4, 0.05]}>
      <mesh castShadow>
        <torusGeometry args={[1.55, 0.26, 32, 128]} />
        <meshStandardMaterial color="#171513" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh ref={inner}>
        <torusGeometry args={[1.12, 0.025, 12, 128]} />
        <meshStandardMaterial color="#c8783d" emissive="#5c2411" emissiveIntensity={1.2} metalness={0.8} roughness={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.38, 64]} />
        <meshStandardMaterial color="#b36836" metalness={0.86} roughness={0.24} />
      </mesh>
      {[0, 1, 2, 3].map((index) => (
        <mesh key={index} rotation={[0, 0, index * Math.PI / 2]} position={[Math.cos(index * Math.PI / 2) * 1.54, Math.sin(index * Math.PI / 2) * 1.54, 0]}>
          <boxGeometry args={[0.14, 0.44, 0.18]} />
          <meshStandardMaterial color="#c8783d" metalness={0.85} roughness={0.28} />
        </mesh>
      ))}
    </group>
  )
}

function ThreeCore() {
  return (
    <div className="three-core" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.3], fov: 38 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={4.5} color="#ffd2a8" />
        <pointLight position={[-3, -2, 2]} intensity={6} color="#8a2e16" />
        <Suspense fallback={null}>
          <StrengthCore />
        </Suspense>
      </Canvas>
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const currentPath = window.location.pathname

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)
  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="/" className="logo" aria-label="CarryMe home">
          <img src="/brand/wordmark.svg" alt="CarryMe" />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => <a className={currentPath === link.href ? 'is-active' : ''} href={link.href} key={link.href}>{link.label}</a>)}
        </nav>
        <a className="nav-cta desktop-cta" href="/membership">Start the work <ArrowIcon /></a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu">
          <span>{open ? 'Close' : 'Menu'}</span>
          <i className={open ? 'active' : ''} />
        </button>
      </header>
      <motion.div
        id="mobile-menu"
        className="mobile-menu"
        initial={false}
        animate={{ clipPath: open ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)', pointerEvents: open ? 'auto' : 'none' }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      >
        {navLinks.map((link, index) => (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={close}
            initial={false}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: open ? 0.18 + index * 0.06 : 0 }}
          >
            <span>0{index + 1}</span>{link.label}
          </motion.a>
        ))}
        <div className="mobile-menu-meta">Ajah, Lagos · Mon–Sat 05:00–22:00</div>
      </motion.div>
    </>
  )
}

function Hero() {
  const { scrollYProgress } = useScroll()
  const imageY = useTransform(scrollYProgress, [0, 0.3], ['0%', '12%'])
  const reduceMotion = useReducedMotion()
  return (
    <section id="top" className="hero">
      <motion.div className="hero-media" style={reduceMotion ? {} : { y: imageY }} />
      <div className="hero-scrim" />
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-content">
        <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
          Ajah's home of hard work <span>Est. 2026</span>
        </motion.p>
        <h1 className="hero-title" aria-label="Earn your strength">
          <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.16, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>Earn your</motion.span>
          <motion.span className="outline" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.26, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>strength.</motion.span>
        </h1>
        <motion.div className="hero-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.8 }}>
          <p>No shortcuts. No spectators.<br />Just the work—and the people who show up for it.</p>
          <a className="circle-link" href="/experience" aria-label="Discover CarryMe">
            <span>Discover</span><ArrowIcon diagonal />
          </a>
        </motion.div>
      </div>
      <div className="hero-side-label">Scroll to begin <span /></div>
    </section>
  )
}

function Manifesto() {
  return (
    <section id="experience" className="manifesto section-pad">
      <div className="section-kicker"><span>01</span> The standard</div>
      <div className="manifesto-grid">
        <Reveal className="manifesto-copy">
          <h2>We don't sell<br />motivation.<br /><em>We build momentum.</em></h2>
        </Reveal>
        <Reveal className="manifesto-side" delay={0.12}>
          <p>CarryMe is a training culture forged in the heart of Ajah—for people who know that confidence is built under pressure, one honest rep at a time.</p>
          <div className="metric-row">
            <div><strong>1:6</strong><span>Coach-to-member ratio</span></div>
            <div><strong>6</strong><span>Days we put in work</span></div>
          </div>
        </Reveal>
      </div>
      <div className="manifesto-core">
        <ThreeCore />
        <div className="core-copy">
          <span>Built different</span>
          <p>Drag with your cursor</p>
        </div>
      </div>
    </section>
  )
}

function Programs() {
  return (
    <section id="programs" className="programs section-pad">
      <div className="section-head">
        <div className="section-kicker light"><span>02</span> The work</div>
        <Reveal><h2>Choose your<br /><em>pressure.</em></h2></Reveal>
        <p>Every program has a purpose. Every session moves the needle.</p>
      </div>
      <div className="program-list">
        {programs.map((program) => (
          <motion.article className="program-card" key={program.id} initial="rest" whileHover="hover" animate="rest">
            <div className="program-id">{program.id}</div>
            <div className="program-title">
              <span>{program.type}</span>
              <h3>{program.name}</h3>
            </div>
            <p>{program.copy}</p>
            <div className="program-meta">{program.meta}</div>
            <motion.div className="program-arrow" variants={{ rest: { x: 0 }, hover: { x: 8 } }}><ArrowIcon diagonal /></motion.div>
            <motion.div className="program-fill" variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} />
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function Marquee() {
  const text = 'GRIT OVER GLORY  ·  EARN EVERY REP  ·  AJAH BUILT  ·  '
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}>
        <span>{text}</span><span>{text}</span><span>{text}</span><span>{text}</span>
      </motion.div>
    </div>
  )
}

function Schedule() {
  const [activeDay, setActiveDay] = useState('MON')
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  return (
    <section id="schedule" className="schedule section-pad">
      <div className="schedule-intro">
        <div className="section-kicker"><span>03</span> This week</div>
        <Reveal><h2>Your time.<br /><em>Your move.</em></h2></Reveal>
        <p>Classes run from first light to after hours. Book before the room fills.</p>
      </div>
      <div className="schedule-board">
        <div className="days" role="tablist" aria-label="Schedule day">
          {days.map((day) => <button key={day} role="tab" aria-selected={activeDay === day} onClick={() => setActiveDay(day)}>{day}</button>)}
        </div>
        <motion.div key={activeDay} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="class-rows">
          {schedule.map(([time, name, coach, spots], index) => (
            <a className="class-row" href="/membership" key={`${activeDay}-${time}`}>
              <span className="class-time">{time}</span>
              <strong>{name}</strong>
              <span>{coach}</span>
              <small className={index === 3 ? 'low' : ''}>{spots}</small>
              <ArrowIcon />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Culture() {
  return (
    <section className="culture">
      <div className="culture-image" />
      <div className="culture-panel">
        <div className="section-kicker light"><span>04</span> Carry each other</div>
        <Reveal>
          <blockquote>“The bar gets heavy. You don't have to carry it alone.”</blockquote>
        </Reveal>
        <p>A good gym changes your body. A great one changes the standard you hold yourself to—and gives you a crew that won't let it slip.</p>
        <div className="culture-stamp"><img src="/brand/mark.svg" alt="" /><span>Ajah · Lagos<br />For the work</span></div>
      </div>
    </section>
  )
}

function Membership() {
  return (
    <section id="membership" className="membership section-pad">
      <div className="section-head membership-head">
        <div className="section-kicker"><span>05</span> Membership</div>
        <Reveal><h2>Invest in your<br /><em>standard.</em></h2></Reveal>
        <p>Start with a complimentary movement assessment. No hard sell. Just a clear plan.</p>
      </div>
      <div className="pricing-grid">
        {memberships.map((plan, index) => (
          <div key={plan.name}>
            <article className={`price-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <span className="popular">Most committed</span>}
              <div className="plan-top"><span>0{index + 1}</span><small>{plan.note}</small></div>
              <h3>{plan.name}</h3>
              <div className="price">{plan.price}<span>/ month</span></div>
              <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <a href="mailto:hello@carryme.ng?subject=CarryMe membership">Choose {plan.name} <ArrowIcon /></a>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-kicker">Ready when you are.</div>
        <h2>Come carry<br /><em>the weight.</em></h2>
        <a className="footer-cta" href="https://wa.me/2348000000000" target="_blank" rel="noreferrer">Book your first session <ArrowIcon diagonal /></a>
      </div>
      <div className="footer-details">
        <div><span>Find us</span><p>Admiralty Way extension<br />Ajah, Lagos</p></div>
        <div><span>Training hours</span><p>Mon–Fri · 05:00–22:00<br />Saturday · 06:00–20:00</p></div>
        <div><span>Talk to us</span><p>hello@carryme.ng<br />+234 800 CARRY ME</p></div>
        <div className="socials"><span>Follow</span><a href="#top">Instagram ↗</a><a href="#top">TikTok ↗</a></div>
      </div>
      <div className="footer-base">
        <img src="/brand/wordmark.svg" alt="CarryMe" />
        <span>© 2026 CarryMe Fitness Ltd.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}

export default function App() {
  const route = window.location.pathname
  useEffect(() => {
    const pageTitle = {
      '/experience': 'Experience CarryMe — Ajah, Lagos',
      '/programs': 'Training Programs — CarryMe',
      '/schedule': 'Class Schedule — CarryMe',
      '/membership': 'Membership — CarryMe',
    }[route]
    document.title = pageTitle || 'CarryMe — Earn Your Strength'
  }, [route])

  if (route !== '/') {
    return (
      <>
        <Header />
        <RoutePages route={route} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Marquee />
        <Programs />
        <Schedule />
        <Culture />
        <Membership />
      </main>
      <Footer />
    </>
  )
}
