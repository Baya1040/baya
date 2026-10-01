import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Sliders, CheckCircle2, ArrowRight, Film, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'grade'>('overview');
  const [sliderPos, setSliderPos] = useState(50);
  const [isSimulatingPlayback, setIsSimulatingPlayback] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0c1017] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0f141e]">
          <div>
            {/* Clean unboxed metadata separator */}
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span>{project.clientTag}</span>
              <span className="text-slate-600">·</span>
              <span>{project.category}</span>
              <span className="text-slate-600">·</span>
              <span>{project.format}</span>
            </div>
            <h2 className="text-xl font-bold text-white font-display mt-0.5">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Visual Display Frame / Interactive Player Simulation */}
          <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-white/10">
            {project.aspectRatio === '9:16' ? (
              // 9:16 Vertical Card Layout
              <div className="h-[360px] sm:h-[400px] w-full flex items-center justify-center bg-gradient-to-b from-[#141b26] to-[#0a0f16] p-4 relative">
                <div className="h-full w-56 bg-slate-900 border-2 border-white/15 rounded-2xl overflow-hidden relative shadow-2xl flex flex-col justify-between p-4">
                  <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                    <span>9:16 SHORT-FORM</span>
                    <span>{project.duration}</span>
                  </div>

                  {/* Simulated kinetic text */}
                  <div className="space-y-2 text-center my-auto">
                    <span className="inline-block bg-amber-400 text-black px-2 py-0.5 text-xs font-black uppercase rounded tracking-wider shadow">
                      HIGH RETENTION
                    </span>
                    <p className="text-white text-xs font-bold leading-tight">
                      {project.headline}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>CUT: SYNC SFX</span>
                    <span>1080x1920</span>
                  </div>
                </div>
              </div>
            ) : (
              // 16:9 Widescreen Cinema Layout
              <div className="aspect-video w-full bg-gradient-to-br from-slate-900 via-[#101824] to-[#070b10] flex flex-col items-center justify-center p-8 relative">
                <div className="max-w-lg text-center space-y-3">
                  <div className="text-xs font-mono text-amber-400 tracking-wider">
                    {project.clientTag} · {project.format}
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.headline}
                  </p>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-400 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>TIMELINE EDITING PASS: COMPLETE</span>
                  </div>
                  <span>{project.duration}</span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Tabs */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Overview & Brief
            </button>
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'breakdown'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Editing Breakdown
            </button>
            <button
              onClick={() => setActiveTab('grade')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'grade'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Color & Audio Master
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-white font-display mb-1.5">
                  The Editorial Challenge & Approach
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.details}
                </p>
              </div>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {Object.entries(project.stats).map(([label, value]) => (
                  <div key={label} className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">
                      {label}
                    </span>
                    <span className="text-base font-bold text-white font-mono mt-0.5 block">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tools Used */}
              <div>
                <span className="text-xs font-medium text-slate-400 block mb-2 font-mono">
                  SUITE & WORKFLOW:
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-slate-300 font-mono">
                  {project.tools.map((tool, idx) => (
                    <span key={tool} className="flex items-center gap-2">
                      <span className="text-amber-400/80">#</span>
                      <span>{tool}</span>
                      {idx < project.tools.length - 1 && <span className="text-slate-600">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white font-display">
                Key Pacing & Scene Highlights
              </h4>
              <div className="space-y-2.5">
                {project.playbackHighlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-amber-400 font-mono text-xs font-bold mt-0.5">
                      0{i + 1}.
                    </span>
                    <div className="text-xs text-slate-200 leading-relaxed font-sans">
                      {hl}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'grade' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>BEFORE (FLAT LOG FOOTAGE)</span>
                <span>AFTER (COLOR GRADE & SOUND DESIGN)</span>
              </div>

              {/* Interactive Before & After Slider Simulator */}
              <div className="relative h-44 rounded-xl overflow-hidden border border-white/10 select-none">
                {/* Before (left background) */}
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center grayscale-[60%] brightness-90">
                  <div className="text-center p-4">
                    <span className="text-slate-400 text-xs font-mono block">RAW LOG CAMERA INGEST</span>
                    <span className="text-slate-500 text-xs">Uncorrected luminance · Flat curve · Raw boom audio</span>
                  </div>
                </div>

                {/* After (right overlay with slider clip) */}
                <div
                  className="absolute inset-y-0 right-0 bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 flex items-center justify-center border-l-2 border-amber-400 shadow-2xl"
                  style={{ width: `${100 - sliderPos}%` }}
                >
                  <div className="text-center p-4">
                    <span className="text-amber-400 text-xs font-mono block">POLISHED MASTER CUT</span>
                    <span className="text-slate-300 text-xs">Rich contrast · Color balance · SFX & dialogue mix</span>
                  </div>
                </div>
              </div>

              {/* Slider Controller */}
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <span className="text-xs font-mono text-slate-400 w-12 text-right">
                  {sliderPos}%
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-[#0f141e] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-mono">
            Ready to get similar results for your channel or brand?
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-5 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <span>Work with Bahilu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
