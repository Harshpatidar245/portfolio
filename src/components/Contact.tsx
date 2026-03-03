import Section from './Section';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react';

export default function Contact() {
  return (
    <Section id="contact">
        <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
              <div className="bg-white/95 md:bg-white/90 backdrop-blur-xl md:backdrop-blur-lg rounded-2xl p-5 md:p-8 md:border md:border-slate-200/60 md:shadow-lg md:shadow-slate-200/40">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
              <span className="w-10 md:w-12 h-1 bg-indigo-500 rounded-full" />
              Get in Touch
            </h2>
            <p className="text-slate-700 text-sm md:text-lg leading-relaxed mb-8 md:mb-12 max-w-md">
              Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
            </p>

            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
              <div className="flex items-center gap-3 md:gap-5 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 group-hover:border-indigo-300 transition-all duration-300 shrink-0">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-0.5">Email</div>
                  <div className="text-slate-700 text-sm md:text-base font-medium truncate">harshpatidar@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-5 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 group-hover:border-indigo-300 transition-all duration-300 shrink-0">
                  <Phone size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-0.5">Phone</div>
                  <div className="text-slate-700 text-sm md:text-base font-medium">+91 98765 43210</div>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-5 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 group-hover:border-indigo-300 transition-all duration-300 shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-0.5">Location</div>
                  <div className="text-slate-700 text-sm md:text-base font-medium">Indore, India</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {[Github, Linkedin, Twitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-300 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-white/95 md:bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl p-5 md:p-10 shadow-lg shadow-slate-200/50"
          >
            <form className="space-y-4 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-600 text-xs md:text-sm font-semibold ml-1">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-all placeholder:text-slate-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 text-xs md:text-sm font-semibold ml-1">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-600 text-xs md:text-sm font-semibold ml-1">Subject</label>
                <input
                  type="text"
                  placeholder="Project Inquiry"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-all placeholder:text-slate-300"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-600 text-xs md:text-sm font-semibold ml-1">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-all resize-none placeholder:text-slate-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3.5 md:py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm md:text-base"
              >
                Send Message <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
