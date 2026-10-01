import React, { useState, useEffect } from 'react';
import { Play, Pause, Scissors, Sliders, Volume2, Mic, Music, Layers, Sparkles } from 'lucide-react';

export const EditingSuiteTimeline: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPos, setPlayheadPos] = useState(38); // percentage 0 - 100
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlayheadPos(prev => (prev >= 98 ? 2 : prev + 0.8));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const markers = [
    { pos: 12, label: '0:03 Hook Punch-In', color: 'bg-amber-400' },
    { pos: 35, label: '0:10 Pattern Interrupt', color: 'bg-cyan-400' },
    { pos: 60, label: '0:18 Kinetic Graphic', color: 'bg-purple-400' },
    { pos: 85, label: '0:25 Retention Loop', color: 'bg-emerald-400' }
  ];

  return (
    <div className="my-16 rounded-2xl bg-[#0a0e16] border border-white/10 p-6 shadow-2xl overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
            <Scissors className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white font-display">
              Inside Bahilu's Edit Suite
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Live multi-track timeline preview · Pacing, sound sync & kinetic graphics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-2 font-mono"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'PAUSE TIMELINE' : 'PLAY TIMELINE'}</span>
          </button>

          <div className="text-xs font-mono text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/20">
            TC 00:01:{(Math.floor(playheadPos * 0.6)).toString().padStart(2, '0')}:18
          </div>
        </div>
      </div>

      {/* Interactive Tracks View */}
      <div className="mt-6 space-y-3 relative select-none">
        
        {/* Playhead vertical line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-30 pointer-events-none transition-all duration-75 flex flex-col items-center"
          style={{ left: `${playheadPos}%` }}
        >
          <div className="w-3 h-3 bg-red-500 transform rotate-45 -mt-1 shadow-md" />
        </div>

        {/* Marker points */}
        <div className="relative h-6 w-full border-b border-white/5 mb-2">
          {markers.map((m, i) => (
            <div
              key={i}
              className="absolute top-0 flex flex-col items-center -translate-x-1/2 cursor-pointer group"
              style={{ left: `${m.pos}%` }}
              onClick={() => setPlayheadPos(m.pos)}
            >
              <div className={`w-2 h-2 rounded-full ${m.color}`} />
              <span className="text-[10px] font-mono text-slate-400 opacity-70 group-hover:opacity-100 whitespace-nowrap mt-1">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Track V3: Kinetic Captions */}
        <div className="flex items-center gap-3">
          <div className="w-24 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 shrink-0">
            <span className="text-amber-400 font-bold">V3</span>
            <span>Captions</span>
          </div>
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPlayheadPos(((e.clientX - rect.left) / rect.width) * 100);
            }}
            className="relative h-8 flex-1 bg-slate-900 rounded-lg overflow-hidden border border-white/5 flex items-center cursor-pointer p-1 gap-1"
          >
            <div className="w-1/4 h-full bg-amber-500/30 rounded border border-amber-500/50 flex items-center px-2 text-[10px] text-amber-200 font-mono truncate">
              Dynamic Hook Text
            </div>
            <div className="w-1/3 h-full bg-amber-500/30 rounded border border-amber-500/50 flex items-center px-2 text-[10px] text-amber-200 font-mono truncate">
              Kinetic Subtitles (Karaoke)
            </div>
            <div className="w-1/5 h-full bg-amber-500/30 rounded border border-amber-500/50 flex items-center px-2 text-[10px] text-amber-200 font-mono truncate">
              CTA Banner
            </div>
          </div>
        </div>

        {/* Track V2: B-Roll & Motion Graphics */}
        <div className="flex items-center gap-3">
          <div className="w-24 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 shrink-0">
            <span className="text-cyan-400 font-bold">V2</span>
            <span>B-Roll Cut</span>
          </div>
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPlayheadPos(((e.clientX - rect.left) / rect.width) * 100);
            }}
            className="relative h-8 flex-1 bg-slate-900 rounded-lg overflow-hidden border border-white/5 flex items-center cursor-pointer p-1 gap-2"
          >
            <div className="w-1/5 h-full bg-cyan-600/30 rounded border border-cyan-500/50 flex items-center px-2 text-[10px] text-cyan-200 font-mono truncate">
              Macro Product 4K
            </div>
            <div className="w-2/5 h-full bg-cyan-600/30 rounded border border-cyan-500/50 flex items-center px-2 text-[10px] text-cyan-200 font-mono truncate">
              Archival Film / Data Graphic
            </div>
            <div className="w-1/4 h-full bg-cyan-600/30 rounded border border-cyan-500/50 flex items-center px-2 text-[10px] text-cyan-200 font-mono truncate">
              Speed Ramp
            </div>
          </div>
        </div>

        {/* Track V1: Main Camera A-Roll */}
        <div className="flex items-center gap-3">
          <div className="w-24 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 shrink-0">
            <span className="text-emerald-400 font-bold">V1</span>
            <span>A-Roll Cam</span>
          </div>
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPlayheadPos(((e.clientX - rect.left) / rect.width) * 100);
            }}
            className="relative h-8 flex-1 bg-slate-900 rounded-lg overflow-hidden border border-white/5 flex items-center cursor-pointer p-1 gap-1"
          >
            <div className="w-full h-full bg-emerald-600/25 rounded border border-emerald-500/40 flex items-center px-2 text-[10px] text-emerald-200 font-mono">
              Primary Talking Head (Jump cuts tightened · filler words removed)
            </div>
          </div>
        </div>

        {/* Track A1: Voice Dialogue */}
        <div className="flex items-center gap-3">
          <div className="w-24 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 shrink-0">
            <span className="text-purple-400 font-bold">A1</span>
            <span>Dialogue</span>
          </div>
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPlayheadPos(((e.clientX - rect.left) / rect.width) * 100);
            }}
            className="relative h-7 flex-1 bg-slate-900 rounded-lg overflow-hidden border border-white/5 flex items-center cursor-pointer p-1"
          >
            {/* Audio Waveform simulation */}
            <div className="w-full h-full flex items-center gap-0.5 px-2 opacity-80">
              {Array.from({ length: 48 }).map((_, idx) => {
                const height = ((Math.sin(idx * 0.4) + 1.2) * 40).toFixed(0);
                return (
                  <div
                    key={idx}
                    className="flex-1 bg-purple-400 rounded-full"
                    style={{ height: `${Math.max(15, Number(height))}%` }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Track A2: SFX & Foley */}
        <div className="flex items-center gap-3">
          <div className="w-24 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 shrink-0">
            <span className="text-orange-400 font-bold">A2</span>
            <span>SFX / Riser</span>
          </div>
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPlayheadPos(((e.clientX - rect.left) / rect.width) * 100);
            }}
            className="relative h-7 flex-1 bg-slate-900 rounded-lg overflow-hidden border border-white/5 flex items-center cursor-pointer p-1 gap-4"
          >
            <div className="w-16 h-full bg-orange-500/30 rounded border border-orange-500/40 text-[9px] font-mono text-orange-200 px-1.5 flex items-center truncate">
              Whoosh.wav
            </div>
            <div className="w-20 h-full bg-orange-500/30 rounded border border-orange-500/40 text-[9px] font-mono text-orange-200 px-1.5 flex items-center truncate">
              Bass_Drop.wav
            </div>
            <div className="w-16 h-full bg-orange-500/30 rounded border border-orange-500/40 text-[9px] font-mono text-orange-200 px-1.5 flex items-center truncate">
              Click_SFX.wav
            </div>
            <div className="w-24 h-full bg-orange-500/30 rounded border border-orange-500/40 text-[9px] font-mono text-orange-200 px-1.5 flex items-center truncate">
              Camera_Shutter.wav
            </div>
          </div>
        </div>

      </div>

      {/* Footer explanation note */}
      <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
        <span>Click anywhere on the timeline to scrub playhead position.</span>
        <span className="font-mono text-slate-500">Every cut is engineered for viewer retention.</span>
      </div>
    </div>
  );
};
