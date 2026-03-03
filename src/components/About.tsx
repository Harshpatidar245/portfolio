import Section from './Section';
import { motion } from 'motion/react';
import { User, Code, Database, Layout } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: <User size={24} />, label: "Experience", value: "1 Year" },
    { icon: <Code size={24} />, label: "Projects", value: "15+" },
    { icon: <Database size={24} />, label: "Backend", value: "Node/Python" },
    { icon: <Layout size={24} />, label: "Frontend", value: "React/Next" },
  ];

  return (
    <Section id="about">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-indigo-500/10 rounded-2xl blur-xl group-hover:bg-indigo-500/15 transition-all duration-500" />
          <div className="relative bg-white/95 md:bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl p-5 md:p-10 overflow-hidden shadow-lg shadow-slate-200/50">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
              <span className="w-10 md:w-12 h-1 bg-indigo-500 rounded-full" />
              About Me
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 md:mb-8">
              I'm a passionate full-stack developer with a year of professional experience building modern web applications. My journey started with a fascination for how things work on the web, leading me to master both frontend and backend technologies.
            </p>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6 md:mb-10">
              I specialize in creating interactive, high-performance user interfaces using React and Three.js, while ensuring robust and scalable backend systems with Node.js and SQL/NoSQL databases.
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-5">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="p-3 md:p-5 bg-slate-50/80 border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors duration-300"
                >
                  <div className="text-indigo-500 mb-2">{stat.icon}</div>
                  <div className="text-lg md:text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
                  <div className="text-slate-500 text-[10px] md:text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6 md:space-y-8 bg-white/95 md:bg-white/90 backdrop-blur-xl md:backdrop-blur-lg rounded-2xl p-5 md:p-8 md:border md:border-slate-200/60 md:shadow-lg md:shadow-slate-200/40"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800">My Philosophy</h3>
          <p className="text-slate-700 text-sm md:text-lg leading-relaxed">
            I believe that great software is the perfect intersection of aesthetics and functionality. My goal is to build applications that not only look stunning but also provide a seamless, intuitive experience for every user.
          </p>
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                <Code size={18} />
              </div>
              <div>
                <h4 className="text-slate-800 font-semibold mb-1 text-sm md:text-base">Clean Code</h4>
                <p className="text-slate-600 text-xs md:text-sm">Writing maintainable, scalable, and well-documented code is my top priority.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                <Layout size={18} />
              </div>
              <div>
                <h4 className="text-slate-800 font-semibold mb-1 text-sm md:text-base">User-Centric Design</h4>
                <p className="text-slate-600 text-xs md:text-sm">Every pixel matters. I focus on creating interfaces that feel natural and responsive.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
