import React, { useState } from 'react';
import { Play, ArrowUpRight, Clock, Video, Eye } from 'lucide-react';
import { Project, ProjectCategory } from '../types';

interface WorkSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const CATEGORIES: ProjectCategory[] = ['All', 'Short-form', 'YouTube', 'Ads', 'Talking Head'];

export const WorkSection: React.FC<WorkSectionProps> = ({ projects, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="work" className="py-24 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              Selected work
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Recent editing styles and portfolio samples.
            </p>
          </div>

          {/* Interactive Filter Controls: Segmented Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#101622] border border-white/10 rounded-xl overflow-x-auto max-w-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-400 text-black shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const isWide = index % 3 === 0;
            const colSpan = isWide ? 'lg:col-span-8' : 'lg:col-span-4';

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`${colSpan} group cursor-pointer rounded-2xl bg-[#0d121b] border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 hover:shadow-2xl hover:shadow-amber-500/5`}
              >
                {/* Media Showcase Window */}
                <div
                  className={`relative w-full rounded-xl overflow-hidden bg-slate-950 border border-white/5 mb-5 ${
                    project.aspectRatio === '9:16' && !isWide ? 'aspect-[4/3]' : 'aspect-video'
                  }`}
                >
                  {/* Visual scene rendering */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#121924] via-[#0d131c] to-[#090d13] flex items-center justify-center p-4">
                    {/* Simulated editing frame */}
                    {project.aspectRatio === '9:16' ? (
                      <div className="w-24 h-40 bg-slate-900 border border-white/20 rounded-xl shadow-lg flex flex-col justify-between p-2 relative overflow-hidden group-hover:scale-105 transition-transform">
                        <span className="text-[8px] font-mono text-amber-400">9:16 VERTICAL</span>
                        <div className="text-center my-auto">
                          <span className="text-[9px] font-bold text-white leading-tight block">
                            {project.clientTag}
                          </span>
                        </div>
                        <span className="text-[8px] font-mono text-slate-500">{project.duration}</span>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 group-hover:scale-[1.02] transition-transform">
                        <span className="text-[11px] font-mono text-amber-400/90 tracking-wider mb-1">
                          {project.clientTag}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-white font-display max-w-xs">
                          {project.title}
                        </h4>
                      </div>
                    )}

                    {/* Hover play prompt */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <div className="w-12 h-12 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-5 h-5 fill-black ml-0.5" />
                      </div>
                    </div>

                    {/* Badgeless subtle duration tag */}
                    <div className="absolute bottom-2.5 right-2.5 text-[10px] font-mono text-slate-300 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
                      {project.duration}
                    </div>
                  </div>
                </div>

                {/* Content Block */}
                <div className="space-y-3">
                  {/* Clean unboxed metadata separator */}
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400/90">
                    <span>{project.clientTag}</span>
                    <span className="text-slate-600">·</span>
                    <span>{project.category}</span>
                  </div>

                  {/* Project Title */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors font-display">
                      {project.title}
                    </h3>
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:border-amber-400/30 transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Exact prompt headline description */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.headline}
                  </p>

                  {/* Minimal unboxed tool list */}
                  <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span>{project.tools[0]}</span>
                    <span className="text-slate-600">·</span>
                    <span>{project.tools[1] || 'Color Grade'}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-500">{project.format}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
