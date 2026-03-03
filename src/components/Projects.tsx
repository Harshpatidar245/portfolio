import { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { projects, type Project } from '../data/projects';

/* ── Easing helper ──────────────────────────────────── */
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ════════════════════════════════════════════════════════
   Projects – 3D scroll-driven card fan (peachweb style)
   ════════════════════════════════════════════════════════ */

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ── Track viewport width for responsive scaling ─── */
  const [vw, setVw] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Scroll progress for this section ─────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const [scrollVal, setScrollVal] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v: number) => setScrollVal(v));
    return unsub;
  }, [scrollYProgress]);

  /* ── Animation phases derived from scroll ─────────── */
  const titleOpacity = Math.max(0, Math.min(1, (scrollVal - 0.08) * 8));
  const fanRaw = Math.max(0, Math.min(1, (scrollVal - 0.12) / 0.35));
  const fan = easeInOutCubic(fanRaw);

  const mob = vw < 768;

  /* ── Responsive multiplier ────────────────────────── */
  const scale = Math.min(1, vw / 1400);

  const total = projects.length;

  /* ── Stars / dots for atmosphere ──────────────────── */
  const stars = Array.from({ length: 50 }, (_, i) => ({
    left: `${(i * 37.77 + 5) % 100}%`,
    top: `${(i * 23.45 + 8) % 100}%`,
    size: 1 + (i % 3),
    opacity: 0.08 + (i % 5) * 0.04,
  }));

  return (
    <div
      ref={sectionRef}
      id="projects"
      className="relative"
      style={{ height: '280vh' }}
    >
      {/* ── Dark background with gradient transitions ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0b1120]" />
        {/* Top gradient : blend from Experience dark */}
        <div
          className="absolute top-0 left-0 right-0 z-1"
          style={{
            height: '120px',
            background:
              'linear-gradient(to bottom, #070d1b 0%, #0b1120 100%)',
          }}
        />
        {/* Bottom gradient : dark → site-light */}
        <div
          className="absolute bottom-0 left-0 right-0 z-1"
          style={{
            height: '350px',
            background:
              'linear-gradient(to top, #f5f5f4 0%, #f5f5f4 8%, #0b1120 100%)',
          }}
        />
        {/* Subtle glow behind cards */}
        <div
          className="absolute z-0"
          style={{
            width: '60vw',
            height: '60vh',
            left: '20vw',
            top: '20%',
            background:
              'radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Star dots */}
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              width: s.size,
              height: s.size,
              left: s.left,
              top: s.top,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* ── Sticky viewport container ─────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center z-2">
        {/* Section title */}
        <div
          className="absolute top-14 md:top-20 left-0 right-0 text-center z-20 px-4"
          style={{ opacity: titleOpacity }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3 md:gap-4">
            <span className="w-8 md:w-12 h-1 bg-indigo-500 rounded-full" />
            Featured Projects
          </h2>
          <p className="text-slate-400 text-sm md:text-lg">
            Click any card to explore the project
          </p>
        </div>

        {/* ── 3D card fan ─────────────────────────────── */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{
            perspective: mob ? '1200px' : '1800px',
            perspectiveOrigin: mob ? '50% 60%' : '25% 65%',
            height: '68vh',
            marginTop: '4vh',
          }}
        >
          {projects.map((project, i) => {
            const norm = total > 1 ? i / (total - 1) : 0; // 0 … 1

            /* ── Per-card 3D transforms (left-to-right fan) ── */
            // Horizontal: start stacked left, fan out across viewport
            const startX = mob ? -20 * scale : -40 * scale;
            const spreadScale = mob ? 120 : 195;
            const endX = (i - (total - 1) / 2) * (spreadScale * scale);
            const spreadX = startX + (endX - startX) * fan;

            // Vertical arc: leftmost cards lower, rightmost higher
            const arcY = (1 - norm) * ((mob ? 120 : 180) * scale) * fan;

            // Depth: leftmost cards closer, rightmost further
            const depthZ = -(1 - norm) * ((mob ? 150 : 220) * scale) * fan;

            // Rotation: each card slightly rotated around Y
            const rotateY = (norm - 0.3) * (mob ? 20 : 28) * fan;

            // Forward tilt for perspective depth
            const tiltX = 12 * fan;

            // Slight Z rotation (counter-clockwise tilt for left cards)
            const tiltZ = (norm - 0.5) * -4 * fan;

            // Z-index: rightmost cards on top (closer to viewer camera perspective)
            const zIdx = i + 1;
            const cardOpacity = Math.max(0.55, 0.7 + norm * 0.3 * fan);

            return (
              <div
                key={project.id}
                className="absolute cursor-pointer group"
                onClick={() => onSelectProject(project)}
                style={{
                  width: mob ? `clamp(140px, ${vw * 0.38}px, 220px)` : `clamp(170px, ${22 * scale}vw, 300px)`,
                  height: mob ? `clamp(200px, ${vw * 0.55}px, 320px)` : `clamp(245px, ${33 * scale}vw, 430px)`,
                  transform: [
                    `translateX(${spreadX}px)`,
                    `translateY(${arcY}px)`,
                    `translateZ(${depthZ}px)`,
                    `rotateY(${rotateY}deg)`,
                    `rotateX(${tiltX}deg)`,
                    `rotateZ(${tiltZ}deg)`,
                  ].join(' '),
                  transformStyle: 'preserve-3d',
                  zIndex: zIdx,
                  opacity: cardOpacity,
                }}
              >
                {/* Card face */}
                <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/8 shadow-2xl shadow-black/70 group-hover:border-indigo-400/50 group-hover:shadow-indigo-500/25 transition-all duration-300 bg-slate-900 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Card info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-xs md:text-base font-bold mb-0.5 md:mb-1 drop-shadow-lg">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-[9px] md:text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-snug">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 md:gap-1.5 mt-1 md:mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.tags.slice(0, 3).map((tag, ti) => (
                        <span
                          key={ti}
                          className="px-1.5 md:px-2 py-0.5 text-[7px] md:text-[10px] bg-indigo-500/30 text-indigo-300 rounded font-semibold tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Ring highlight */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl ring-1 ring-inset ring-white/4 group-hover:ring-indigo-400/30 transition-all duration-500 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll hint at bottom (fades out as fan opens) */}
        <div
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 text-slate-500 text-xs md:text-sm flex flex-col items-center gap-1.5 select-none"
          style={{ opacity: Math.max(0, 1 - fan * 4) }}
        >
          <span className="tracking-widest uppercase font-medium">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeInOut',
            }}
            className="text-indigo-400"
          >
            ↓
          </motion.div>
        </div>
      </div>
    </div>
  );
}
