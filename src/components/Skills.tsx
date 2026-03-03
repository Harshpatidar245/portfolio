import Section from './Section';
import { motion } from 'motion/react';
import { Code2, Database, Globe, Server, Smartphone, Terminal } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Globe className="text-indigo-500" />,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Redux"],
    },
    {
      title: "Backend",
      icon: <Server className="text-indigo-500" />,
      skills: ["Node.js", "Express", "Python", "Django", "Go", "GraphQL"],
    },
    {
      title: "Database",
      icon: <Database className="text-indigo-500" />,
      skills: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Prisma", "SQL"],
    },
    {
      title: "DevOps",
      icon: <Terminal className="text-indigo-500" />,
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Git", "Nginx"],
    },
    {
      title: "Mobile",
      icon: <Smartphone className="text-indigo-500" />,
      skills: ["React Native", "Expo", "Flutter", "PWA"],
    },
    {
      title: "Languages",
      icon: <Code2 className="text-indigo-500" />,
      skills: ["JavaScript", "Python", "C++", "Rust", "Java"],
    },
  ];

  return (
    <Section id="skills">
        <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-10 md:mb-16 flex items-center gap-3 md:gap-4">
          <span className="w-10 md:w-12 h-1 bg-indigo-500 rounded-full" />
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-4 md:p-6 bg-white/95 md:bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
                <div className="p-2.5 md:p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-800">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs md:text-sm font-medium rounded-lg border border-slate-200 hover:border-indigo-300 hover:text-indigo-500 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
