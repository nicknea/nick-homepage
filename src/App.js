import './App.css'
import Resume from './resume.pdf'
import { Box, Chip, Container, Divider, IconButton, Stack, Typography } from '@mui/material'
import { AutoMode, Casino, GitHub, LinkedIn, MusicNote, WorkHistoryOutlined } from '@mui/icons-material'
import { Analytics } from '@vercel/analytics/react'

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name: 'DJ Tools',
    icon: <MusicNote sx={{ fontSize: 20 }} />,
    tagline: 'Local browser-based suite for downloading, organizing, and building DJ sets.',
    description:
      'A full-stack Python/Flask web app that handles the entire DJ workflow — ' +
      'download tracks from YouTube or SoundCloud, auto-tag genre via Discogs/Last.fm/MusicBrainz, ' +
      'browse and edit your library, build sets with a scoring algorithm (key compatibility, BPM, energy), ' +
      'and export directly to Rekordbox XML or USB. Reads BPM/Key/Energy written by Mixed In Key.',
    highlights: [
      'Rekordbox XML integration with cue point carry-over',
      'Smart set builder: key compat × 0.40 + BPM × 0.30 + genre × 0.20 + energy × 0.10',
      'Auto-tag chain: Discogs → Last.fm → MusicBrainz fallback',
      'Server-Sent Events for live download progress',
      '215 tests covering all routes, metadata parsing, sets CRUD, and XML generation',
    ],
    tech: ['Python', 'Flask', 'JavaScript', 'yt-dlp', 'ID3/mutagen', 'Rekordbox XML'],
    link: 'https://github.com/nicknea',
  },
  {
    name: 'Claude Autopilot',
    icon: <AutoMode sx={{ fontSize: 20 }} />,
    tagline: 'Automatically runs queued Claude Code tasks when your subscription has headroom.',
    description:
      'A background daemon running on a home server that polls the Claude.ai usage API every 2 hours. ' +
      'When both the 5-hour and 7-day utilization windows are below configured thresholds, ' +
      'it picks the next pending task from a queue and fires it off headlessly via Claude Code — ' +
      'maximizing subscription value without manual intervention.',
    highlights: [
      'Polls Claude.ai usage API; respects 5-hour and 7-day rate windows',
      'Runs tasks fully headless via claude --dangerously-skip-permissions',
      'Priority queue with CLI helper (add_task.py) to manage tasks from any machine',
      'Deployed via systemd timer on a home mini PC; outputs and logs persisted to disk',
    ],
    tech: ['Python', 'Claude Code', 'systemd', 'REST API'],
    link: 'https://github.com/nicknea',
  },
  {
    name: 'Board Game Deal Notifier',
    icon: <Casino sx={{ fontSize: 20 }} />,
    tagline: 'Monitors Reddit, BGG, and Bluesky for board game deals and fires email/SMS alerts.',
    description:
      'A Python background service that watches multiple deal sources on a configurable polling interval — ' +
      'r/BoardGameDeals, BoardGameGeek Hot Deals, Bluesky accounts, BGG forum threads, and custom websites. ' +
      'Deduplicates seen items across runs, sends notifications via Gmail and SMS (T-Mobile gateway), ' +
      'and includes an "Oracle" mode that delivers a morning digest of the day\'s deals.',
    highlights: [
      'Multi-source monitoring: Reddit RSS, BGG RSS, Bluesky API, custom site scrapers',
      'State persistence to avoid duplicate alerts across restarts',
      'Daily digest ("Oracle") mode for a morning deal summary',
      'Configurable thresholds, poll interval, and notification targets via YAML',
    ],
    tech: ['Python', 'RSS', 'Bluesky API', 'Gmail API', 'BeautifulSoup'],
    link: 'https://github.com/nicknea',
  },
]

const EXPERIENCE = [
  {
    company: 'BDO USA',
    role: 'Senior Software Engineer',
    period: 'Mar 2025 – Present',
    location: 'Houston, TX (Remote)',
    bullets: [
      'Build and deliver custom enterprise web apps for clients using C#/.NET, Angular, and Azure.',
      'Architect CI/CD pipelines and cloud infrastructure provisioning per engagement.',
      'Collaborate with stakeholders to scope and deliver project milestones.',
    ],
  },
  {
    company: 'Ovice',
    role: 'Software Engineer — UI/UX',
    period: 'Nov 2022 – Aug 2024',
    location: 'Japan (Remote)',
    bullets: [
      'Shipped UI/UX features for a virtual workplace platform serving 50,000+ daily active users.',
      'Built REST and WebSocket APIs in Elixir for real-time front-end features.',
      'Mentored a junior engineer; established team code-review standards.',
    ],
  },
  {
    company: 'Koalafi',
    role: 'Full Stack Engineer',
    period: 'Sep 2021 – Oct 2022',
    location: 'Richmond, VA (Remote)',
    bullets: [
      'Maintained a .NET MVC platform for thousands of retail point-of-sale locations.',
      'Decomposed a monolith into event-driven microservices with Golang and AWS Step Functions.',
      'Provisioned infrastructure with Terraform and AWS.',
    ],
  },
  {
    company: 'ExxonMobil',
    role: 'Software Engineer → Application Architect',
    period: 'May 2016 – Sep 2021',
    location: 'Spring, TX',
    bullets: [
      'Led architecture for planning software responsible for $20B+ in annual revenue.',
      'Built web applications in Angular, React, .NET Core, and Entity Framework.',
      'Delivered global training for 100+ users across 30+ countries.',
      'Cut on-call burden from 8 hrs/day to 1 hr via Python automation.',
    ],
  },
]

const SKILLS = [
  ['JavaScript', 'TypeScript', 'React', 'Angular', 'Node.js'],
  ['Python', 'Elixir', 'Golang', 'C#/.NET'],
  ['PostgreSQL', 'SQL Server'],
  ['AWS', 'Azure', 'Terraform', 'CI/CD'],
]

// ─── Theme tokens ─────────────────────────────────────────────────────────────

const BG      = '#0f172a'
const SURFACE = '#1e293b'
const BORDER  = '#334155'
const P       = '#f1f5f9'    // primary text
const S       = '#94a3b8'    // secondary text
const ACCENT  = '#60a5fa'    // blue accent
const ACCENT2 = '#818cf8'    // indigo accent

// ─── Small components ────────────────────────────────────────────────────────

function Tag({ label }) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        bgcolor: 'rgba(96,165,250,0.1)',
        color: ACCENT,
        border: '1px solid rgba(96,165,250,0.25)',
        fontSize: '0.7rem',
        height: 22,
        '& .MuiChip-label': { px: 1 },
      }}
    />
  )
}

function SectionHeading({ children }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="overline"
        sx={{ color: ACCENT, letterSpacing: 3, fontSize: '0.7rem', fontWeight: 700 }}
      >
        {children}
      </Typography>
      <Divider sx={{ borderColor: BORDER, mt: 0.5 }} />
    </Box>
  )
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        pb: 8,
      }}
    >
      <Typography
        sx={{ color: ACCENT, fontFamily: 'monospace', fontSize: '0.95rem', mb: 2 }}
      >
        Hi, I'm
      </Typography>

      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '3rem', md: '5rem' },
          fontWeight: 800,
          color: P,
          lineHeight: 1.05,
          letterSpacing: '-1.5px',
          mb: 1,
        }}
      >
        Nick Anderson.
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2rem', md: '3.5rem' },
          fontWeight: 700,
          color: S,
          lineHeight: 1.1,
          letterSpacing: '-0.5px',
          mb: 3,
        }}
      >
        I build things for the web.
      </Typography>

      <Typography
        sx={{
          color: S,
          fontSize: '1.05rem',
          maxWidth: 520,
          lineHeight: 1.7,
          mb: 5,
        }}
      >
        Senior software engineer with 9+ years of experience shipping full-stack applications
        across fintech, enterprise, and SaaS. Based in Houston, TX. Currently at{' '}
        <Box component="span" sx={{ color: P }}>BDO USA</Box>.
      </Typography>

      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Box
          component="a"
          href={Resume}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 3,
            py: 1.25,
            bgcolor: ACCENT,
            color: '#0f172a',
            borderRadius: 1,
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none',
            transition: 'opacity 0.15s',
            '&:hover': { opacity: 0.85 },
          }}
        >
          <WorkHistoryOutlined sx={{ fontSize: 18 }} />
          Resume
        </Box>

        <Box
          component="a"
          href="https://github.com/nicknea"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 3,
            py: 1.25,
            border: `1px solid ${BORDER}`,
            color: P,
            borderRadius: 1,
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
            transition: 'border-color 0.15s',
            '&:hover': { borderColor: ACCENT },
          }}
        >
          <GitHub sx={{ fontSize: 18 }} />
          GitHub
        </Box>

        <Box
          component="a"
          href="https://linkedin.com/in/nicknea"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 3,
            py: 1.25,
            border: `1px solid ${BORDER}`,
            color: P,
            borderRadius: 1,
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
            transition: 'border-color 0.15s',
            '&:hover': { borderColor: ACCENT },
          }}
        >
          <LinkedIn sx={{ fontSize: 18 }} />
          LinkedIn
        </Box>
      </Stack>
    </Box>
  )
}

function Projects() {
  return (
    <Box sx={{ mb: 12 }}>
      <SectionHeading>Projects</SectionHeading>
      <Stack spacing={3}>
        {PROJECTS.map((p) => (
          <Box
            key={p.name}
            sx={{
              bgcolor: SURFACE,
              border: `1px solid ${BORDER}`,
              borderRadius: 2,
              p: { xs: 3, md: 4 },
              transition: 'border-color 0.2s',
              '&:hover': { borderColor: ACCENT },
            }}
          >
            {/* Header row */}
            <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
              <Box sx={{ color: ACCENT }}>{p.icon}</Box>
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: P }}>
                {p.name}
              </Typography>
            </Stack>

            <Typography sx={{ color: S, fontSize: '0.92rem', mb: 2, fontStyle: 'italic' }}>
              {p.tagline}
            </Typography>

            <Typography sx={{ color: S, fontSize: '0.88rem', lineHeight: 1.7, mb: 2.5 }}>
              {p.description}
            </Typography>

            {/* Highlights */}
            <Box
              component="ul"
              sx={{ m: 0, pl: 2.5, mb: 2.5, '& li': { color: S, fontSize: '0.85rem', mb: 0.5, lineHeight: 1.6 } }}
            >
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </Box>

            {/* Tech tags */}
            <Stack direction="row" flexWrap="wrap" gap={0.75}>
              {p.tech.map((t) => <Tag key={t} label={t} />)}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

function Experience() {
  return (
    <Box sx={{ mb: 12 }}>
      <SectionHeading>Experience</SectionHeading>
      <Stack spacing={0}>
        {EXPERIENCE.map((job, i) => (
          <Box
            key={job.company}
            sx={{
              display: 'flex',
              gap: { xs: 2, md: 4 },
              pb: i < EXPERIENCE.length - 1 ? 5 : 0,
            }}
          >
            {/* Timeline line */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.5 }}>
              <Box
                sx={{
                  width: 10, height: 10, borderRadius: '50%',
                  bgcolor: ACCENT, flexShrink: 0,
                  boxShadow: `0 0 0 3px rgba(96,165,250,0.2)`,
                }}
              />
              {i < EXPERIENCE.length - 1 && (
                <Box sx={{ width: 1, flexGrow: 1, bgcolor: BORDER, mt: 0.75 }} />
              )}
            </Box>

            {/* Content */}
            <Box sx={{ pb: 1 }}>
              <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: P, lineHeight: 1.2 }}>
                {job.company}
              </Typography>
              <Typography sx={{ fontSize: '0.88rem', color: ACCENT2, mb: 0.25 }}>
                {job.role}
              </Typography>
              <Typography sx={{ fontSize: '0.78rem', color: S, mb: 1.5 }}>
                {job.period} · {job.location}
              </Typography>
              <Box
                component="ul"
                sx={{
                  m: 0, pl: 2,
                  '& li': { color: S, fontSize: '0.85rem', mb: 0.4, lineHeight: 1.6 },
                }}
              >
                {job.bullets.map((b) => <li key={b}>{b}</li>)}
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

function Skills() {
  return (
    <Box sx={{ mb: 12 }}>
      <SectionHeading>Skills</SectionHeading>
      <Stack spacing={1.5}>
        {SKILLS.map((row, i) => (
          <Stack key={i} direction="row" flexWrap="wrap" gap={1}>
            {row.map((s) => (
              <Box
                key={s}
                sx={{
                  px: 2, py: 0.6,
                  bgcolor: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 1,
                  color: P,
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
              >
                {s}
              </Box>
            ))}
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: `1px solid ${BORDER}`,
        py: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Typography sx={{ color: S, fontSize: '0.8rem' }}>
        Nick Anderson · Houston, TX · nicknea@gmail.com
      </Typography>
      <Stack direction="row" spacing={1}>
        <IconButton
          component="a"
          href="https://github.com/nicknea"
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          sx={{ color: S, '&:hover': { color: P } }}
        >
          <GitHub sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          component="a"
          href="https://linkedin.com/in/nicknea"
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          sx={{ color: S, '&:hover': { color: P } }}
        >
          <LinkedIn sx={{ fontSize: 18 }} />
        </IconButton>
      </Stack>
    </Box>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <Box sx={{ bgcolor: BG, minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ px: { xs: 3, md: 4 } }}>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Footer />
      </Container>
      <Analytics />
    </Box>
  )
}

export default App
