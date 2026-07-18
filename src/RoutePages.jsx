import { useState } from 'react'
import { motion } from 'framer-motion'

const programDetails = [
  {
    number: '01',
    name: 'Forge',
    label: 'Strength & conditioning',
    quote: 'For the person who wants to feel unshakeable.',
    copy: 'The backbone of CarryMe. Forge combines barbell fundamentals, loaded carries and athletic conditioning to build useful, repeatable strength.',
    format: ['Movement prep', 'Primary lift', 'Strength accessory', 'Conditioning finish'],
    best: 'New lifters, returners and anyone who wants a serious foundation.',
    times: 'Mon, Wed, Fri & Sat',
  },
  {
    number: '02',
    name: 'Engine',
    label: 'Metabolic performance',
    quote: 'For the person who wants more in the tank.',
    copy: 'Intervals with a purpose: rowers, sleds, kettlebells and bodyweight work sequenced to increase your work capacity without losing form.',
    format: ['Breathwork', 'Skill primer', 'Interval block', 'Reset and recovery'],
    best: 'Athletes, busy professionals and anyone chasing real-world stamina.',
    times: 'Tue, Thu & Sat',
  },
  {
    number: '03',
    name: 'Sculpt',
    label: 'Functional hypertrophy',
    quote: 'For the person who is ready to earn definition.',
    copy: 'Thoughtful volume, stable positions and tempo-driven work. Sculpt gives you the detail work that makes every other session show.',
    format: ['Activation', 'Tempo strength', 'Targeted volume', 'Mobility close'],
    best: 'Members who value shape, posture and long-term muscle quality.',
    times: 'Mon, Wed, Fri',
  },
  {
    number: '04',
    name: 'Carry',
    label: 'Small-group coaching',
    quote: 'For the person who wants the full room behind them.',
    copy: 'A six-person training room, led closely. Your coach owns the plan, adjusts the work and keeps the standard where it belongs.',
    format: ['Coach check-in', 'Custom strength block', 'Guided finisher', 'Progress notes'],
    best: 'Members with a clear goal and a preference for more individual attention.',
    times: 'By appointment',
  },
]

const classesByDay = {
  MON: [['05:30', 'Forge', 'Coach Timi', '12 spaces'], ['07:00', 'Engine', 'Coach Imani', '08 spaces'], ['12:30', 'Sculpt', 'Coach Ese', '10 spaces'], ['17:30', 'Carry', 'Coach Timi', '04 spaces'], ['19:00', 'Forge', 'Coach Imani', '06 spaces']],
  TUE: [['05:30', 'Engine', 'Coach Imani', '10 spaces'], ['07:00', 'Forge', 'Coach Timi', '08 spaces'], ['12:30', 'Sculpt', 'Coach Ese', '10 spaces'], ['17:30', 'Engine', 'Coach Imani', '06 spaces'], ['19:00', 'Carry', 'Coach Timi', '04 spaces']],
  WED: [['05:30', 'Forge', 'Coach Timi', '12 spaces'], ['07:00', 'Sculpt', 'Coach Ese', '09 spaces'], ['12:30', 'Engine', 'Coach Imani', '10 spaces'], ['17:30', 'Carry', 'Coach Timi', '04 spaces'], ['19:00', 'Forge', 'Coach Timi', '06 spaces']],
  THU: [['05:30', 'Engine', 'Coach Imani', '10 spaces'], ['07:00', 'Forge', 'Coach Timi', '08 spaces'], ['12:30', 'Sculpt', 'Coach Ese', '10 spaces'], ['17:30', 'Engine', 'Coach Imani', '06 spaces'], ['19:00', 'Carry', 'Coach Timi', '04 spaces']],
  FRI: [['05:30', 'Forge', 'Coach Timi', '12 spaces'], ['07:00', 'Sculpt', 'Coach Ese', '09 spaces'], ['12:30', 'Engine', 'Coach Imani', '10 spaces'], ['17:30', 'Carry', 'Coach Timi', '04 spaces'], ['19:00', 'Forge', 'Coach Timi', '06 spaces']],
  SAT: [['06:00', 'Forge', 'Coach Timi', '12 spaces'], ['08:00', 'Engine', 'Coach Imani', '08 spaces'], ['10:00', 'Sculpt', 'Coach Ese', '10 spaces'], ['12:00', 'Carry', 'Coach Timi', '04 spaces']],
}

const memberships = [
  { name: 'Foundation', price: 'NGN 35K', note: 'For the self-driven', features: ['Open gym access', '2 coached classes each week', 'Baseline movement assessment', 'Member app scheduling'] },
  { name: 'All In', price: 'NGN 65K', note: 'Our complete standard', featured: true, features: ['Unlimited classes', 'Monthly performance review', 'Recovery zone access', 'Priority booking', 'Member community sessions'] },
  { name: 'Private', price: 'NGN 145K', note: 'Built around you', features: ['8 private sessions', 'Custom monthly programming', 'Nutrition accountability', 'Direct coach access', 'Flexible training times'] },
]

function Arrow() {
  return <span className="arrow-icon" aria-hidden="true">&rarr;</span>
}

function PageHero({ eyebrow, title, italic, copy, action = 'Book an assessment', actionHref = '/membership', image = true, variant = 'experience' }) {
  return (
    <section className={`page-hero page-hero--${variant} ${image ? '' : 'no-image'}`}>
      <div className="page-hero-image" />
      <div className="page-hero-scrim" />
      <div className="page-hero-index" aria-hidden="true">CARRY / 0{['experience', 'programs', 'schedule', 'membership'].indexOf(variant) + 1}</div>
      <div className="page-hero-content">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow page-eyebrow">{eyebrow}</p>
          <h1>{title}<br /><em>{italic}</em></h1>
          <p className="page-hero-copy">{copy}</p>
          <a className="page-action" href={actionHref}>{action} <Arrow /></a>
        </motion.div>
      </div>
      <div className="page-hero-side">Ajah, Lagos <span /></div>
    </section>
  )
}

function SectionLead({ number, eyebrow, title, copy }) {
  return (
    <div className="route-section-lead">
      <div className="section-kicker"><span>{number}</span> {eyebrow}</div>
      <div>
        <h2>{title}</h2>
      </div>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function ExperiencePage() {
  const spaces = [
    ['01', 'The strength floor', 'Racks, platforms, kettlebells and free weights—with enough room to move properly.'],
    ['02', 'The engine lane', 'Sleds, rowers and a 16-metre turf track made for hard, honest conditioning.'],
    ['03', 'The reset', 'A considered recovery corner for mobility, soft tissue work and the breath between sessions.'],
    ['04', 'The small room', 'A six-person private coaching space where each member gets seen and corrected.'],
  ]
  const values = [
    ['Show up honest', 'Tell us where you are. We will meet you there and build from it.'],
    ['Do the useful work', 'We train for lives that feel lighter, stronger and more capable outside the gym.'],
    ['Carry each other', 'Hard work does not need to be lonely. Your people notice the reps you almost skip.'],
  ]

  return (
    <main>
      <PageHero variant="experience" eyebrow="01 / The CarryMe experience" title="A room with" italic="standards." copy="An unapologetically serious training space in Ajah, designed to make showing up feel like a decision you are proud of." action="See the training" actionHref="/programs" />
      <section className="route-section chalk-section">
        <SectionLead number="01" eyebrow="Inside CarryMe" title={<>Made for<br /><em>the work.</em></>} copy="Everything has a job here. Nothing is ornamental. The room is built to make good movement inevitable." />
        <div className="space-grid">
          {spaces.map(([number, name, copy]) => <article key={name} className="space-card"><span>{number}</span><h3>{name}</h3><p>{copy}</p></article>)}
        </div>
      </section>
      <section className="route-image-story">
        <div className="story-image" />
        <div className="story-copy">
          <div className="section-kicker light"><span>02</span> More than a membership</div>
          <blockquote>“Leave the room with more than you brought in.”</blockquote>
          <p>You will find coaches who remember your name, a training plan that does not insult your time, and a room that respects the effort it takes to walk through the door.</p>
          <a href="/membership" className="text-link">Find your membership <Arrow /></a>
        </div>
      </section>
      <section className="route-section ink-section">
        <SectionLead number="03" eyebrow="The Carry code" title={<>What holds<br /><em>the room together.</em></>} />
        <div className="value-grid">
          {values.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>
    </main>
  )
}

function ProgramsPage() {
  return (
    <main>
      <PageHero variant="programs" eyebrow="02 / The work" title="Four ways" italic="to show up." copy="You do not need a new identity to train well. You need a clear door in, a good coach, and a programme you will return to." action="View the schedule" actionHref="/schedule" />
      <section className="route-section ink-section program-route">
        <SectionLead number="01" eyebrow="Choose your pressure" title={<>Every session has<br /><em>a reason.</em></>} copy="Start where you are. Your coach will help you choose the room that makes sense now—and the next one when you are ready." />
        <div className="program-route-list">
          {programDetails.map((program) => (
            <motion.article className="program-route-card" key={program.name} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
              <div className="program-route-top"><span>{program.number}</span><small>{program.label}</small></div>
              <h3>{program.name}</h3>
              <p className="program-quote">{program.quote}</p>
              <p>{program.copy}</p>
              <div className="program-detail-row"><span>Best for</span><strong>{program.best}</strong></div>
              <div className="program-detail-row"><span>Training days</span><strong>{program.times}</strong></div>
              <div className="program-format">{program.format.map((item, index) => <span key={item}>0{index + 1} {item}</span>)}</div>
            </motion.article>
          ))}
        </div>
      </section>
      <section className="route-section chalk-section session-flow">
        <SectionLead number="02" eyebrow="The session standard" title={<>An hour that<br /><em>stays with you.</em></>} copy="No wandering. No guesswork. Most CarryMe sessions follow a simple rhythm that leaves you feeling challenged, not depleted." />
        <ol className="flow-list">
          <li><span>01</span><div><h3>Arrive & assess</h3><p>Your coach reads the room, your energy and your movement before the work begins.</p></div></li>
          <li><span>02</span><div><h3>Train the main thing</h3><p>One clear focus. We protect the quality of every set before we chase more.</p></div></li>
          <li><span>03</span><div><h3>Finish with intent</h3><p>The final block gives the session its edge—without ever taking away from tomorrow.</p></div></li>
          <li><span>04</span><div><h3>Leave a note</h3><p>We log what matters so your next session has somewhere real to begin.</p></div></li>
        </ol>
      </section>
    </main>
  )
}

function SchedulePage() {
  const [day, setDay] = useState('MON')
  const days = Object.keys(classesByDay)
  return (
    <main>
      <PageHero variant="schedule" eyebrow="03 / The weekly rhythm" title="The week stays" italic="moving." copy="From first light to after hours, every class gives you a place to put the work. Choose your window and claim it." action="Start with membership" actionHref="/membership" />
      <section className="route-section chalk-section full-schedule">
        <SectionLead number="01" eyebrow="Weekly timetable" title={<>Find your<br /><em>window.</em></>} copy="Book through the CarryMe member app once you are in. Small rooms keep the coaching tight, so classes cap when the floor is full." />
        <div className="schedule-day-tabs" role="tablist" aria-label="Class schedule day">
          {days.map((item) => <button type="button" role="tab" aria-selected={day === item} onClick={() => setDay(item)} key={item}>{item}</button>)}
        </div>
        <motion.div className="full-schedule-table" key={day} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="full-schedule-head"><span>Time</span><span>Class</span><span>Coach</span><span>Availability</span></div>
          {classesByDay[day].map(([time, name, coach, space]) => <a href="/membership" key={`${day}-${time}`} className="full-schedule-row"><time>{time}</time><strong>{name}</strong><span>{coach}</span><small>{space}</small><Arrow /></a>)}
        </motion.div>
      </section>
      <section className="route-section ink-section schedule-notes">
        <SectionLead number="02" eyebrow="Know before you go" title={<>A few good<br /><em>ground rules.</em></>} />
        <div className="notes-grid">
          <article><h3>Be early enough to arrive.</h3><p>Doors open 15 minutes before every coached class. Your warm-up is part of the session, not a suggestion.</p></article>
          <article><h3>New to training?</h3><p>Book a movement assessment first. We will point you toward the right class and modify what needs modifying.</p></article>
          <article><h3>Need more attention?</h3><p>Carry is our six-person coaching room. It is the best place to train around a precise performance, body composition or confidence goal.</p></article>
        </div>
      </section>
    </main>
  )
}

function MembershipPage() {
  const faqs = [
    ['Can I visit before joining?', 'Yes. Start with a complimentary movement assessment and a tour of the space. You will leave knowing which membership makes sense for you.'],
    ['Do I need training experience?', 'No. Foundation and Forge are designed to meet people at the beginning, not make them pretend they are already advanced.'],
    ['Can I pause my membership?', 'Life happens. Speak to the team before your renewal date and we will work out a sensible pause option.'],
    ['What should I bring for my first session?', 'Training clothes, clean indoor shoes, water and a willingness to work. We have the rest.'],
  ]
  return (
    <main>
      <PageHero variant="membership" eyebrow="04 / Membership" title="Invest in your" italic="standard." copy="The point is not to own a membership card. The point is to build a rhythm that changes the way your body and your week feel." action="Speak to the team" actionHref="mailto:hello@carryme.ng?subject=CarryMe%20assessment" />
      <section className="route-section chalk-section membership-route">
        <SectionLead number="01" eyebrow="Choose your room" title={<>The membership<br /><em>is the beginning.</em></>} copy="Every route starts with an assessment. We will talk through your goals, show you the floor and help you take the next step with clarity." />
        <div className="pricing-grid route-pricing">
          {memberships.map((plan, index) => <article className={`price-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>
            {plan.featured && <span className="popular">Most committed</span>}
            <div className="plan-top"><span>0{index + 1}</span><small>{plan.note}</small></div>
            <h3>{plan.name}</h3>
            <div className="price">{plan.price}<span>/ month</span></div>
            <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <a href={`mailto:hello@carryme.ng?subject=CarryMe%20${encodeURIComponent(plan.name)}%20membership`}>Choose {plan.name} <Arrow /></a>
          </article>)}
        </div>
      </section>
      <section className="route-section ink-section join-steps">
        <SectionLead number="02" eyebrow="Your first week" title={<>Make the start<br /><em>feel simple.</em></>} />
        <div className="steps-grid">
          <article><span>01</span><h3>Talk it out</h3><p>Tell us what you want to feel different in three months. We listen before we prescribe.</p></article>
          <article><span>02</span><h3>Move with a coach</h3><p>Your assessment gives us a picture of your movement, capacity and best first step.</p></article>
          <article><span>03</span><h3>Choose your rhythm</h3><p>Leave with a real starting schedule, your app access and a room that is expecting you.</p></article>
        </div>
      </section>
      <section className="route-section chalk-section faq-section">
        <SectionLead number="03" eyebrow="Answers, honestly" title={<>Before you<br /><em>walk in.</em></>} />
        <div className="faq-list">
          {faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>0{index + 1}</span>{question}<Arrow /></summary><p>{answer}</p></details>)}
        </div>
      </section>
    </main>
  )
}

function NotFoundPage() {
  return <main><PageHero variant="experience" eyebrow="CarryMe" title="Wrong" italic="turn." copy="The page you are looking for is not here, but the work still is." action="Return home" actionHref="/" image={false} /></main>
}

export default function RoutePages({ route }) {
  if (route === '/experience') return <ExperiencePage />
  if (route === '/programs') return <ProgramsPage />
  if (route === '/schedule') return <SchedulePage />
  if (route === '/membership') return <MembershipPage />
  return <NotFoundPage />
}
