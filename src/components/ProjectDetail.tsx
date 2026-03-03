import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import type { Project } from '../data/projects';

/* ════════════════════════════════════════════════════════
   ProjectDetail – Full-screen overlay for a single project
   ════════════════════════════════════════════════════════ */

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  /* Lock body scroll when overlay is open */
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      // Push state so browser back button closes overlay
      window.history.pushState({ projectOpen: true }, '');
      const onPop = () => onClose();
      window.addEventListener('popstate', onPop);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('popstate', onPop);
      };
    }
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-detail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] bg-[#0b1120] overflow-y-auto"
        >
          {/* ── Sticky header ──────────────────────────── */}
          <div className="sticky top-0 z-10 bg-[#0b1120]/90 backdrop-blur-md border-b border-white/[0.06]">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 py-3.5 md:py-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm md:text-base font-medium group"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Back to Projects
              </button>

              <div className="flex gap-2 md:gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 md:px-5 py-2 rounded-xl bg-white/[0.06] text-slate-300 hover:bg-white/10 hover:text-white transition-all text-xs md:text-sm font-medium flex items-center gap-2 border border-white/[0.06]"
                >
                  <Github size={15} />
                  <span className="hidden sm:inline">Source Code</span>
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 md:px-5 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all text-xs md:text-sm font-medium flex items-center gap-2"
                >
                  <ExternalLink size={15} />
                  <span className="hidden sm:inline">Live Demo</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Content ────────────────────────────────── */}
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-14">
            {/* Title + tags */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 md:mb-5 tracking-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-indigo-500/15 text-indigo-300 rounded-full text-xs md:text-sm font-medium border border-indigo-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl md:rounded-3xl overflow-hidden mb-10 md:mb-14 border border-white/[0.06] shadow-2xl shadow-black/50"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[35vh] md:h-[55vh] object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Description + tech stack grid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-14"
            >
              {/* About */}
              <div className="lg:col-span-2">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                  About the Project
                </h2>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
                  {project.longDescription}
                </p>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech stack sidebar */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Tech Stack
                </h2>
                <div className="space-y-3">
                  {project.tags.map((tag, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                      <span className="text-slate-300 font-medium text-sm md:text-base">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Screenshots gallery placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 md:mt-16"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                More Screenshots
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-lg"
                  >
                    <img
                      src={`${project.image}?v=${n}`}
                      alt={`${project.title} screenshot ${n}`}
                      className="w-full h-48 md:h-64 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 md:mt-20 text-center pb-8"
            >
              <div className="inline-flex gap-3 md:gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-white/[0.06] text-slate-200 hover:bg-white/10 transition-all font-semibold text-sm md:text-base flex items-center gap-2 border border-white/[0.08]"
                >
                  <Github size={18} />
                  View Source
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-all font-semibold text-sm md:text-base flex items-center gap-2"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
