import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sliders, Check, Sparkles } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(14);
  const [duration] = useState(75); // 1:15 showreel
  const [isMuted, setIsMuted] = useState(false);
  const [colorGradeActive, setColorGradeActive] = useState(true);
  const [captionsActive, setCaptionsActive] = useState(true);
  const [currentChapter, setCurrentChapter] = useState('Short-form Hooks & Kinetic Text');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Simulated playback timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= duration) return 0;
        const next = prev + 1;
        if (next < 25) {
          setCurrentChapter('Short-form Hooks & Kinetic Text');
        } else if (next < 50) {
          setCurrentChapter('YouTube Documentary & Narrative Pacing');
        } else if (next < 65) {
          setCurrentChapter('High-Conversion Business VSL');
        } else {
          setCurrentChapter('Personal Brand & Creator Polish');
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, duration]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `00:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / duration) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#0b0f17] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d131e]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <div>
              <h3 className="text-sm font-semibold text-white font-display">
                Bahilu Bekele · Reel 2026
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Now Editing: {currentChapter}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setColorGradeActive(!colorGradeActive)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                colorGradeActive
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'bg-white/5 text-slate-400 border border-white/10'
              }`}
              title="Toggle Log / Filmic LUT"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{colorGradeActive ? 'Grade: Active LUT' : 'Grade: Flat Log'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Simulation Screen */}
        <div className="relative bg-black aspect-video w-full flex items-center justify-center overflow-hidden select-none">
          {/* Animated visual representation of video scenes */}
          <div
            className={`w-full h-full relative transition-all duration-700 ${
              colorGradeActive ? 'contrast-110 saturate-110' : 'contrast-75 brightness-110 grayscale-[35%]'
            }`}
          >
            {/* Dynamic scene canvas based on currentChapter */}
            {currentTime < 25 ? (
              // Scene 1: Short-form TikTok / Meta Ads
              <div className="w-full h-full bg-gradient-to-tr from-purple-950 via-slate-900 to-amber-950 flex flex-col items-center justify-center p-8 relative">
                <div className="w-52 h-[340px] rounded-2xl border-2 border-white/20 bg-slate-900 shadow-2xl relative overflow-hidden flex flex-col justify-end p-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20 text-[10px] font-mono text-amber-400 bg-black/60 px-2 py-0.5 rounded">
                    9:16 VERTICAL AD
                  </div>
                  
                  {/* Kinetic Subtitles Mockup */}
                  <div className="relative z-20 space-y-1 mb-6 text-center">
                    <span className="inline-block bg-amber-400 text-black font-black text-sm px-2 py-0.5 uppercase tracking-wide rounded transform -rotate-1">
                      STOP SCROLLING
                    </span>
                    <p className="text-white text-xs font-bold leading-tight">
                      This one edit scaled our conversions by 3.8x
                    </p>
                  </div>
                  <div className="relative z-20 flex items-center justify-between text-[10px] text-slate-300">
                    <span>@creatorgrowth</span>
                    <span>1.2M views</span>
                  </div>
                </div>
              </div>
            ) : currentTime < 50 ? (
              // Scene 2: YouTube Documentary
              <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-slate-900 to-sky-950 flex flex-col items-center justify-center relative p-8">
                <div className="max-w-2xl text-center space-y-4">
                  <div className="text-xs font-mono text-emerald-400 tracking-wider">
                    DOCUMENTARY & RECAP · CINEMATIC 4K
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    "The story began in the highlands of Addis..."
                  </h2>
                  <p className="text-slate-300 text-sm max-w-lg mx-auto">
                    Synchronized archival film scans, Foley sound effects, and paced interviews.
                  </p>
                  {/* Subtle letterbox bars */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-black" />
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-black" />
                </div>
              </div>
            ) : currentTime < 65 ? (
              // Scene 3: Business VSL
              <div className="w-full h-full bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center relative p-8">
                <div className="w-full max-w-xl bg-slate-900/90 border border-white/10 rounded-xl p-6 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="text-cyan-400">EXECUTIVE VSL EDIT</span>
                    <span>TALKING-HEAD B-ROLL</span>
                  </div>
                  <div className="h-24 rounded-lg bg-slate-800/80 p-4 border border-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                      +$
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">
                        High-Retention Conversion Cadence
                      </div>
                      <div className="text-slate-400 text-xs mt-0.5">
                        Trimming dead silence · Lower thirds · Pattern interrupts
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Scene 4: Personal Brand Creator
              <div className="w-full h-full bg-gradient-to-tr from-slate-900 via-amber-950/40 to-slate-900 flex flex-col items-center justify-center relative p-8">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 mx-auto rounded-full bg-slate-800 border-2 border-amber-400/80 flex items-center justify-center text-amber-400 text-xl font-bold shadow-lg">
                    BB
                  </div>
                  <div className="text-white font-semibold text-lg font-display">
                    Personal Brand Polish
                  </div>
                  <p className="text-slate-400 text-xs max-w-md mx-auto">
                    Clean cuts, audio sweetening, and engaging visuals built for community loyalty.
                  </p>
                </div>
              </div>
            )}

            {/* Captions Overlay */}
            {captionsActive && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/75 backdrop-blur-sm rounded-lg text-xs font-semibold text-white text-center shadow-lg border border-white/10 pointer-events-none">
                [Audio Sync & Sound Design] · Pacing matched to story beats
              </div>
            )}

            {/* Center Play Overlay when paused */}
            {!isPlaying && (
              <div
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-black ml-1" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Scrubber and Controls Bar */}
        <div className="px-6 py-4 bg-[#0d131e] border-t border-white/10 space-y-3">
          
          {/* Progress Timeline Scrubber */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              setCurrentTime(Math.floor(pos * duration));
            }}
            className="relative h-2 bg-slate-800 hover:h-3 rounded-full cursor-pointer transition-all group overflow-hidden"
          >
            <div
              className="h-full bg-amber-400 rounded-full relative"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Chapter split markers */}
            <div className="absolute top-0 bottom-0 left-[33%] w-0.5 bg-white/30" title="Doc Chapter" />
            <div className="absolute top-0 bottom-0 left-[66%] w-0.5 bg-white/30" title="VSL Chapter" />
          </div>

          {/* Button Controls Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-white hover:text-amber-400 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <div className="text-xs font-mono text-slate-300">
                <span>{formatTime(currentTime)}</span>
                <span className="text-slate-600 mx-1.5">/</span>
                <span className="text-slate-500">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Action Tools */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCaptionsActive(!captionsActive)}
                className={`text-xs px-2.5 py-1 rounded font-mono border transition-colors ${
                  captionsActive
                    ? 'border-amber-400/40 text-amber-300 bg-amber-400/10'
                    : 'border-white/10 text-slate-400'
                }`}
              >
                CC {captionsActive ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="px-4 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors font-sans"
              >
                Hire Bahilu For Your Project
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
