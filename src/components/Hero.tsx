import React, { useState } from 'react';
import { Play, ArrowDown, Sparkles, Film, Clock, Eye } from 'lucide-react';

interface HeroProps {
  onOpenShowreel: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenShowreel, onOpenContact }) => {
  const [isPlayingPreview, setIsPlayingPreview] = useState(true);

  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background cinematic radial lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-amber-500/10 via-emerald-500/5 to-transparent blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Typographic Hierarchy & Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed metadata separator */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide text-amber-400/90">
              <span>Video Editor</span>
              <span className="text-slate-500">·</span>
              <span>Addis Ababa</span>
            </div>

            {/* Primary Headline with balance */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display leading-[1.08] text-balance">
              I turn raw footage into videos people want to watch.
            </h1>

            {/* Subtitle / Bio summary */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              Video editing for YouTube, TikTok, short-form ads, talking-head content, documentaries and social media. Clean cuts, strong pacing and visuals that support the story.
            </p>

            {/* CTAs and Reel Trigger */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="px-6 py-3 text-sm font-medium text-white bg-slate-800/80 border border-slate-700/80 hover:bg-slate-750 hover:border-slate-600 rounded-lg transition-all inline-flex items-center gap-2 shadow-sm"
              >
                <span>View my work</span>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </a>

              <button
                onClick={onOpenContact}
                className="px-6 py-3 text-sm font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-sm active:scale-95"
              >
                Let's work together
              </button>

              {/* Showreel quick launcher button */}
              <button
                onClick={onOpenShowreel}
                aria-label="Play Showreel"
                className="group flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-400/40 transition-all text-xs font-medium text-slate-300 hover:text-white"
              >
                <span className="w-7 h-7 rounded-full bg-amber-400 text-black flex items-center justify-center transition-transform group-hover:scale-110">
                  <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                </span>
                <span className="font-mono text-slate-300">Showreel 2026</span>
              </button>
            </div>

            {/* Quiet proof metrics directly adjacent */}
            <div className="pt-6 border-t border-white/5 flex items-center gap-8 text-xs text-slate-400 font-mono">
              <div>
                <span className="text-white text-base font-semibold block font-sans">150+</span>
                <span>Videos Delivered</span>
              </div>
              <div className="w-px h-6 bg-white/10" aria-hidden="true" />
              <div>
                <span className="text-white text-base font-semibold block font-sans">5M+</span>
                <span>Organic Views</span>
              </div>
              <div className="w-px h-6 bg-white/10" aria-hidden="true" />
              <div>
                <span className="text-white text-base font-semibold block font-sans">24–48h</span>
                <span>Turnaround Time</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Cinematic Reel Framing Card */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-2xl bg-[#0f141e] border border-white/10 p-2 shadow-2xl overflow-hidden">
              
              {/* Top frame bar */}
              <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 font-mono border-b border-white/5 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" />
                  <span className="text-white font-medium">REC · SHOWREEL_CUT_v4</span>
                </div>
                <span>4K · 24fps · Pro</span>
              </div>

              {/* Main Interactive Screen / Video Preview Canvas */}
              <div
                onClick={onOpenShowreel}
                className="relative aspect-video rounded-xl bg-slate-950 overflow-hidden cursor-pointer group-hover:border-amber-400/30 transition-all border border-transparent"
              >
                {/* Visual styling representation of editing footage */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#131b26] to-[#0a0f17]">
                  {/* Subtle video track graphic layers */}
                  <div className="absolute inset-0 opacity-40 mix-blend-screen">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="reelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#reelGrad)" />
                      {/* Grid cross lines */}
                      <line x1="33%" y1="0" x2="33%" y2="100%" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                      <line x1="66%" y1="0" x2="66%" y2="100%" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                      <line x1="0" y1="33%" x2="100%" y2="33%" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                      <line x1="0" y1="66%" x2="100%" y2="66%" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                    </svg>
                  </div>

                  {/* Center artistic mock shot */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-amber-400/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3">
                      <Play className="w-6 h-6 fill-black ml-1" />
                    </div>
                    <p className="text-white font-medium text-sm tracking-wide">
                      Watch Bahilu's 2026 Showreel
                    </p>
                    <span className="text-slate-400 text-xs mt-1 font-mono">
                      01:15 · YouTube, TikTok & Commercials
                    </span>
                  </div>

                  {/* On-screen timecode & HUD metadata */}
                  <div className="absolute bottom-3 left-3 text-[11px] font-mono text-slate-300 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                    TC 00:00:28:14
                  </div>
                  <div className="absolute bottom-3 right-3 text-[11px] font-mono text-amber-400 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                    Click to Play ▶
                  </div>
                </div>
              </div>

              {/* Bottom timeline scrubber simulation */}
              <div className="mt-2.5 px-2 pb-1 space-y-1.5">
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-2/5 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>V1: CUTS & PACING</span>
                  <span>A1: DUAL AUDIO MIX</span>
                  <span>LUT: CINEMA 709</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
