import { motion } from 'motion/react';
import Section from './Section';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <Section id="hero" className="items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white/95 md:bg-white/80 backdrop-blur-xl md:backdrop-blur-lg rounded-3xl p-6 md:p-12 md:shadow-xl md:shadow-slate-200/40 md:border md:border-slate-200/60"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-indigo-600 font-mono text-sm md:text-lg mb-4 tracking-widest uppercase font-semibold"
        >
          Full Stack Developer
        </motion.h2>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight"
        >
          Harsh Patidar
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-slate-700 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-2"
        >
          Crafting high-performance web applications with a focus on interactive user experiences and robust backend architecture.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4"
        >
          <a
            href="#projects"
            className="px-6 md:px-8 py-3 md:py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-sm md:text-base"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 md:px-8 py-3 md:py-4 border border-slate-300 hover:border-indigo-400 text-slate-600 hover:text-indigo-500 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-sm md:text-base"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
      >
        <ArrowDown size={28} />
      </motion.div>
    </Section>
  );
}
