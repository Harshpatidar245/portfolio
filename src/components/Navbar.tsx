import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl py-3 border-b border-slate-200 shadow-sm' 
          : 'bg-white/70 backdrop-blur-md py-4 md:py-6 border-b border-slate-100 md:bg-transparent md:backdrop-blur-none md:border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center">
        <motion.a
          href="#hero"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300 text-xs md:text-sm tracking-tight">
            H
          </div>
          <span className="hidden sm:inline bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Harsh Patidar</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-slate-500 hover:text-indigo-500 font-medium transition-colors text-sm uppercase tracking-widest"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-slate-700 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden absolute left-0 right-0 top-full bg-white backdrop-blur-2xl border-b border-slate-200 overflow-hidden shadow-lg z-50"
          >
            <div className="px-6 py-8 flex flex-col gap-5 items-center">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-slate-700 hover:text-indigo-500 transition-colors tracking-wide"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="w-full h-px bg-slate-100 my-2" />
              <div className="flex gap-8">
                <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors p-2">
                  <Github size={24} />
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors p-2">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
