import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-[#070a0f] py-12 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <span className="font-bold text-white text-sm font-display tracking-tight">
            Bahilu Bekele
          </span>
          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
          <span>© 2026 Bahilu Bekele</span>
          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
          <span className="font-mono text-slate-400">Addis Ababa, Ethiopia</span>
        </div>

        {/* Center: Clean Nav links */}
        <div className="flex items-center gap-6 font-medium text-slate-300">
          <a href="#work" className="hover:text-amber-400 transition-colors">
            Work
          </a>
          <a href="#about" className="hover:text-amber-400 transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">
            Contact
          </a>
          <a
            href="mailto:bahilubekele49@gmail.com"
            className="hover:text-amber-400 transition-colors"
          >
            bahilubekele49@gmail.com
          </a>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-amber-400/30 text-slate-300 hover:text-white transition-all flex items-center gap-2"
          aria-label="Back to top"
        >
          <span className="text-[11px] font-mono">BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
};
