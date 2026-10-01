import React, { useState } from 'react';
import { Check, Sparkles, Sliders, Clock, Video, Cpu, ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenContact: () => void;
}

const SKILLS = [
  { name: 'Adobe Premiere Pro', description: 'Multi-cam synchronization, timeline organization & high-speed shortcuts' },
  { name: 'Short-form Editing', description: '9:16 vertical hook optimization for TikTok, Instagram Reels & YouTube Shorts' },
  { name: 'YouTube Editing', description: 'Retention curves, chapters, narrative pacing & visual re-engagement' },
  { name: 'Talking Head', description: 'Eliminating filler words, tight jump cut masking & professional presentation' },
  { name: 'Captions', description: 'High-visibility kinetic typography, karaoke word-tracking & auto-transcription cleanup' },
  { name: 'Basic Color Grading', description: 'Log-to-Rec.709 balancing, contrast curves, skin-tone preservation & creative LUTs' },
  { name: 'Sound Sync', description: 'Multi-source dual-audio alignment, background hiss removal & room tone leveling' },
  { name: 'Graphic Design', description: 'Lower thirds, custom title cards, callout arrows, motion UI & clean thumbnails' },
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Footage Ingest & Brief',
    description: 'You share your Google Drive, Dropbox, or Frame.io link along with brand references, target audience, and deadline.'
  },
  {
    step: '02',
    title: 'Story Assembly & Rough Cut',
    description: 'I remove pauses and fluff, assemble the narrative spine, and lock in the pacing before adding heavy graphics.'
  },
  {
    step: '03',
    title: 'Motion, SFX & Color Polish',
    description: 'Layering kinetic captions, curated B-roll, whoosh/click sound effects, volume ducking, and color grade.'
  },
  {
    step: '04',
    title: 'Revision & Final 4K Export',
    description: 'We review together, make targeted revisions, and deliver master high-bitrate files ready for instant upload.'
  }
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <section id="about" className="py-24 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Split Grid: Editorial Bio & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Core Headline & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono text-amber-400 tracking-wider">
              ABOUT BAHILU
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display leading-tight text-balance">
              Simple editing.
              <br />
              Clear storytelling.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              I'm Bahilu, a video editor who helps creators and businesses turn raw footage into clear, engaging content. I focus on understanding the client's vision, making thoughtful revisions, and delivering clean edits on time.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Based in Addis Ababa, I collaborate remotely with creators, agencies, and founders worldwide across time zones. Whether you have 2 hours of raw vlog footage or a high-stakes commercial brief, my goal is to make the editing process stress-free and reliable.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="px-5 py-2.5 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <span>Discuss Your Next Video</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Highlight Box / Values */}
          <div className="lg:col-span-6 bg-[#0c1017] border border-white/10 rounded-2xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-white font-display">
              The 3 Pillars of Every Bahilu Edit
            </h3>

            <div className="space-y-4">
              <div className="border-l-2 border-amber-400 pl-4 space-y-1">
                <h4 className="text-sm font-semibold text-white">01. Story Over Gimmicks</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fast cuts don't save a confusing message. Visuals and pacing are always designed to amplify your core point, not distract from it.
                </p>
              </div>

              <div className="border-l-2 border-cyan-400 pl-4 space-y-1">
                <h4 className="text-sm font-semibold text-white">02. Sound is 50% of the Experience</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Crisp dialogue, subtle foley, and perfectly balanced background audio so your viewers stay immersed with headphones or on mobile speakers.
                </p>
              </div>

              <div className="border-l-2 border-emerald-400 pl-4 space-y-1">
                <h4 className="text-sm font-semibold text-white">03. Fast, Reliable Turnaround</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Clear communication, proactive milestone updates, and prompt delivery within 24 to 48 hours for short-form content.
                </p>
              </div>
            </div>

            {/* Location & Time Zone Trust Box */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>LOCATION: ADDIS ABABA (UTC+3)</span>
              <span>GLOBAL REMOTE READY</span>
            </div>
          </div>

        </div>

        {/* Core Skills & Tools: Zero-Pill Discipline */}
        {/* Anti-AI Slop Rule: No static rounded pills or colorful capsule badges! */}
        <div className="mt-16 space-y-8">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white font-display">
              Core Skills & Capabilities
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Disciplined toolset focused on clean production value and fast execution
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILLS.map((skill, idx) => {
              const isSelected = selectedSkill === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#151c27] border-amber-400/50'
                      : 'bg-[#0d121b] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-amber-400">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">EXPERT</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Seamless 4-Step Editing Process */}
        <div className="mt-24 space-y-8">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white font-display">
              How We Work Together
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              A straightforward 4-step workflow from raw files to final export
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-xl bg-[#0c1017] border border-white/5 relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-bold font-mono text-amber-400/80 block mb-3">
                    {step.step}.
                  </span>
                  <h4 className="text-sm font-semibold text-white font-display">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
