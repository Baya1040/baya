import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenContact: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, activeSection = 'work' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080b10]/90 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Zone 1: Single element brand wordmark */}
        <a
          href="#top"
          className="text-lg md:text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors font-display"
        >
          Bahilu Bekele
        </a>

        {/* Zone 2: Clean text navigation links with subtle underline/opacity hover */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a
            href="#work"
            className="hover:text-white transition-colors relative py-1 hover:border-b-2 hover:border-amber-400"
          >
            Work
          </a>
          <a
            href="#about"
            className="hover:text-white transition-colors relative py-1 hover:border-b-2 hover:border-amber-400"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors relative py-1 hover:border-b-2 hover:border-amber-400"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenContact}
            className="px-4 py-2 text-xs font-semibold text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors inline-flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>Let's work together</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c1017] border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-slate-200">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Work
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
            >
              Let's work together
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
