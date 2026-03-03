import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll } from 'motion/react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

/* ── Helpers ─────────────────────────────────────────── */
const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ── Experience data ─────────────────────────────────── */
const experiences = [
  {
    title: 'Full Stack Developer',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    period: 'Jan 2024 – Present',
    description:
      'Leading development of a high-traffic e-commerce platform. Optimized database queries reducing response times by 40%. Architected micro-services handling 50k+ daily users.',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    color: '#6366f1',
    emoji: '🚀',
  },
  {
    title: 'Frontend Engineer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    period: 'Jun 2023 – Dec 2023',
    description:
      'Built interactive data visualization dashboards with D3.js and React. Implemented design system used across 12 products. Reduced bundle size by 35%.',
    skills: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS'],
    color: '#8b5cf6',
    emoji: '📊',
  },
  {
    title: 'Junior Web Developer',
    company: 'Creative Agency',
    location: 'San Francisco, CA',
    period: 'Jan 2023 – May 2023',
    description:
      'Implemented pixel-perfect responsive interfaces for enterprise clients. Developed custom WordPress themes and plugins. Managed CI/CD pipelines.',
    skills: ['JavaScript', 'HTML/CSS', 'WordPress', 'PHP'],
    color: '#a78bfa',
    emoji: '🎨',
  },
  {
    title: 'Web Development Intern',
    company: 'Digital Labs',
    location: 'Austin, TX',
    period: 'Aug 2022 – Dec 2022',
    description:
      'Built internal tools using React. Wrote unit tests achieving 90% code coverage. Participated in agile sprints and contributed to technical docs.',
    skills: ['React', 'Jest', 'Git', 'Figma'],
    color: '#c4b5fd',
    emoji: '🌱',
  },
];

const N = experiences.length;
const TWO_PI = Math.PI * 2;

/* ════════════════════════════════════════════════════════
   Experience – 3D Orbit Carousel
   Cards sit on a rotating 3D ring that spins on scroll.
   Front card is big & focused, others recede with depth.
   ════════════════════════════════════════════════════════ */

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ── Viewport ─────────────────────────────────────── */
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setVw(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  const mob = vw < 768;

  /* ── Scroll ───────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const [sv, setSv] = useState(0);
  useEffect(() => {
    const u = scrollYProgress.on('change', (v: number) => setSv(v));
    return u;
  }, [scrollYProgress]);

  /* ── Atmosphere dots ──────────────────────────────── */
  const dots = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        x: `${(i * 41.3 + 7) % 100}%`,
        y: `${(i * 27.7 + 3) % 100}%`,
        s: 1 + (i % 3),
        o: 0.04 + (i % 5) * 0.02,
      })),
    [],
  );

  /* ── Section fade / reveal ────────────────────────── */
  const enterT = clamp((sv - 0.15) * 8);         // title & scene fade-in
  const exitT = clamp((sv - 0.82) * 8);           // fade-out near end

  /* ── Carousel rotation ────────────────────────────── 
     Map scroll range [0.20 … 0.80] → full rotations.
     We rotate enough so every card visits the front once,
     plus a little extra for a satisfying overshoot.       */
  const rotRange = clamp((sv - 0.20) / 0.60);
  const totalRotation = rotRange * (TWO_PI + Math.PI * 0.3); // ~1.15 full turns

  /* ── Orbit radius (responsive) ────────────────────── */
  const R = mob ? Math.max(140, vw * 0.38) : Math.min(280, vw * 0.18);

  /* ── Figure out which card is currently "front" ───── */
  const activeIdx = (() => {
    let best = 0;
    let bestZ = -Infinity;
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * TWO_PI + totalRotation;
      const cz = Math.cos(angle);
      if (cz > bestZ) { bestZ = cz; best = i; }
    }
    return best;
  })();

  return (
    <div
      ref={sectionRef}
      id="experience"
      className="relative"
      style={{ height: '220vh' }}
    >
      {/* ── Dark background ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#070d1b]" />
        <div
          className="absolute top-0 left-0 right-0 z-1"
          style={{
            height: '50vh',
            background: 'linear-gradient(to bottom, #f5f5f4 0%, #070d1b 50%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 z-1"
          style={{
            height: '120px',
            background: 'linear-gradient(to top, #0b1120 0%, #070d1b 100%)',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '60vw', height: '60vh', left: '20vw', top: '25%',
            background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {dots.map((d, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-indigo-300 pointer-events-none"
            style={{ width: d.s, height: d.s, left: d.x, top: d.y, opacity: d.o }}
          />
        ))}
      </div>

      {/* ── Sticky viewport ───────────────────────────── */}
      <div
        className="sticky top-0 h-screen overflow-hidden z-2"
        style={{ opacity: enterT * (1 - exitT) }}
      >
        {/* Title */}
        <div
          className="absolute top-20 md:top-24 left-0 right-0 text-center z-20 px-4"
          style={{ opacity: enterT }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3 md:gap-4">
            <span className="w-8 md:w-12 h-1 bg-indigo-500 rounded-full" />
            Experience
          </h2>
          <p className="text-slate-500 text-xs md:text-sm">
            Scroll to spin the carousel
          </p>
        </div>

        {/* ── 3D Carousel ─────────────────────────────── */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            perspective: mob ? '900px' : '1200px',
            perspectiveOrigin: '50% 50%',
            paddingTop: '60px',
          }}
        >
          <div
            className="relative"
            style={{
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
            }}
          >
            {experiences.map((exp, i) => {
              const angle = (i / N) * TWO_PI + totalRotation;
              const cx = Math.sin(angle);
              const cz = Math.cos(angle);
              const cy = Math.sin(angle * 0.5) * 0.15; // gentle vertical bob

              // Position on ellipse orbit
              const x = cx * R * (mob ? 1 : 1.1);
              const z = cz * R;
              const y = cy * R * 0.5;

              // Scale: front cards bigger, back cards smaller
              const depthNorm = (cz + 1) / 2; // 0 (back) → 1 (front)
              const sc = lerp(0.55, 1.15, depthNorm);

              // Opacity: back cards dimmer
              const opacity = lerp(0.15, 1, depthNorm * depthNorm);

              // Card rotates to face outward from the ring
              const faceAngle = -angle * (180 / Math.PI);

              // Z-index from depth
              const zIdx = Math.round(depthNorm * 100);

              // Center point for orbit (responsive)
              const centerX = vw * 0.5;
              const centerY = 0;

              return (
                <div
                  key={i}
                  className="absolute group"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: mob ? `${Math.min(260, vw * 0.65)}px` : '280px',
                    marginLeft: mob ? `${-Math.min(130, vw * 0.325)}px` : '-140px',
                    marginTop: mob ? '-180px' : '-190px',
                    height: mob ? `${Math.min(380, vw * 0.9)}px` : '380px',
                    transform: [
                      `translate3d(${x + centerX - vw / 2}px, ${y + centerY}px, ${z}px)`,
                      `rotateY(${faceAngle}deg)`,
                      `scale(${sc})`,
                    ].join(' '),
                    transformStyle: 'preserve-3d',
                    zIndex: zIdx,
                    opacity,
                    transition: 'opacity 0.15s ease-out',
                    pointerEvents: depthNorm > 0.5 ? 'auto' : 'none',
                  }}
                >
                  <div
                    className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border backdrop-blur-sm relative"
                    style={{
                      borderColor: i === activeIdx ? `${exp.color}40` : 'rgba(255,255,255,0.06)',
                      background: 'linear-gradient(145deg, rgba(12,17,35,0.95) 0%, rgba(18,22,50,0.90) 100%)',
                      boxShadow: i === activeIdx
                        ? `0 30px 80px -15px rgba(0,0,0,0.7), 0 0 50px -10px ${exp.color}20, inset 0 1px 0 rgba(255,255,255,0.05)`
                        : `0 20px 50px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)`,
                      transition: 'border-color 0.4s, box-shadow 0.4s',
                    }}
                  >
                    {/* Top colour accent */}
                    <div
                      className="h-1"
                      style={{
                        background: `linear-gradient(to right, ${exp.color}, ${exp.color}30)`,
                        opacity: depthNorm > 0.6 ? 1 : 0.4,
                      }}
                    />

                    {/* Emoji + company header */}
                    <div className="px-5 pt-5 md:px-6 md:pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl md:text-4xl">{exp.emoji}</span>
                        <div
                          className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center"
                          style={{
                            background: `${exp.color}15`,
                            border: `1px solid ${exp.color}25`,
                          }}
                        >
                          <Briefcase size={mob ? 14 : 16} style={{ color: exp.color }} />
                        </div>
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-white mb-1 leading-tight">
                        {exp.title}
                      </h3>
                      <p className="font-semibold text-sm mb-1" style={{ color: exp.color }}>
                        {exp.company}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin size={10} /> {exp.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={10} /> {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="px-5 md:px-6">
                      <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3">
                        {exp.description}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((skill, si) => (
                          <span
                            key={si}
                            className="px-2 py-0.5 text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded"
                            style={{
                              background: `${exp.color}10`,
                              border: `1px solid ${exp.color}18`,
                              color: `${exp.color}aa`,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Subtle inner glow for active card */}
                    <div
                      className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(ellipse at 30% 20%, ${exp.color}08 0%, transparent 60%)`,
                        opacity: i === activeIdx ? 1 : 0,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Dots indicator ──────────────────────────── */}
        <div
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20"
          style={{ opacity: enterT }}
        >
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-400"
              style={{
                width: i === activeIdx ? 24 : 8,
                height: 8,
                background: i === activeIdx ? exp.color : 'rgba(100,116,139,0.3)',
                boxShadow: i === activeIdx ? `0 0 10px ${exp.color}50` : 'none',
              }}
            />
          ))}
        </div>

        {/* ── Scroll hint ────────────────────────────── */}
        <div
          className="absolute top-[calc(50%+260px)] md:top-auto md:bottom-10 right-4 md:right-10 z-20 flex items-center gap-2 select-none"
          style={{ opacity: clamp(1 - (sv - 0.08) * 6) }}
        >
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            className="text-slate-500 text-xs font-mono tracking-wider"
          >
            SCROLL ↓
          </motion.div>
        </div>
      </div>
    </div>
  );
}
