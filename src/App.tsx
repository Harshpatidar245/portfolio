import { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ThreeScene from './components/ThreeScene';
import ProjectDetail from './components/ProjectDetail';
import type { Project } from './data/projects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="text-slate-700 selection:bg-indigo-500/20 selection:text-indigo-700 min-h-screen font-sans antialiased">
      {/* Scroll-driven 3D Background */}
      <ThreeScene />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10" style={{ isolation: 'isolate' }}>
        <Hero />
        <About />
        <Experience />
        <Projects onSelectProject={handleSelectProject} />
        <Skills />
        <Contact />
      </main>

      {/* Project Detail Overlay */}
      <ProjectDetail project={selectedProject} onClose={handleCloseProject} />

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200 py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="flex items-center gap-2 text-lg md:text-xl font-bold text-slate-800">
            <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center text-white text-sm">
              HP
            </div>
            Harsh Patidar
          </div>
          <p className="text-slate-400 text-xs md:text-sm">
            © {new Date().getFullYear()} Harsh Patidar. All rights reserved.
          </p>
          <div className="flex gap-4 md:gap-6">
            <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors text-xs md:text-sm font-medium">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors text-xs md:text-sm font-medium">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
