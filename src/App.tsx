import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShowreelModal } from './components/ShowreelModal';
import { WorkSection } from './components/WorkSection';
import { ProjectModal } from './components/ProjectModal';
import { EditingSuiteTimeline } from './components/EditingSuiteTimeline';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Project } from './types';

// Default initial projects dataset matching Bahilu's brief
const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'meta-ig-ad',
    title: 'Meta & Instagram Ad',
    category: 'Short-form',
    clientTag: 'META / IG',
    headline: 'Clean social ad edit with captions, pacing and visual emphasis.',
    aspectRatio: '9:16',
    duration: '0:34',
    format: '4K Vertical (1080x1920)',
    tools: ['Adobe Premiere Pro', 'After Effects', 'Sound Sync', 'Captions'],
    stats: { retention: '84% avg watch time', views: '1.2M impressions', ctr: '3.8% CTR' },
    details: 'Crafted dynamic hook in the first 1.8 seconds with punch-in zoom, animated kinetic subtitles, custom SFX risers, and color-graded product pop. Optimized for mobile sound-off viewing with bold typography hierarchy.',
    playbackHighlights: ['Hook punch-in (0:00-0:03)', 'Kinetic text pop & karaoke highlight', 'Audio swell & impact cut', 'Punchy call-to-action transition']
  },
  {
    id: 'documentary-recap',
    title: 'Documentary & Recap',
    category: 'YouTube',
    clientTag: 'DOCUMENTARY',
    headline: 'Story-driven editing that keeps narration and visuals synchronized.',
    aspectRatio: '16:9',
    duration: '14:20',
    format: '4K Cinema (3840x2160)',
    tools: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Basic Color Grading', 'Sound Sync'],
    stats: { retention: '58% 10-min retention', views: '480K views', pacing: 'Dynamic A/B cut rhythm' },
    details: 'Long-form narrative pacing with deliberate rhythmic cuts, immersive ambient soundscapes, archival photo camera-mapping, and filmic LUT grading. Balanced intense narrative arcs with resting ambient breathers.',
    playbackHighlights: ['Atmospheric cold open', 'Historical photo 2.5D parallax', 'Interleaved dual interview track', 'Emotional string crescendo']
  },
  {
    id: 'business-vsl',
    title: 'Business VSL',
    category: 'Ads',
    clientTag: 'VSL',
    headline: 'Talking-head sales video with typography, pacing and supporting B-roll.',
    aspectRatio: '16:9',
    duration: '3:45',
    format: '1080p Widescreen',
    tools: ['Adobe Premiere Pro', 'Graphic Design', 'Captions', 'Sound Sync'],
    stats: { retention: '72% completion', conversion: '+34% booked calls', pacing: 'High-conversion cadence' },
    details: 'Structured specifically for customer conversion. Eliminated all dead air and conversational filler words, layered unobtrusive data graphics, subtle background motion, and timely problem-solution B-roll inserts.',
    playbackHighlights: ['Pattern-interrupt title card', 'Screen recording UI zooms', 'Clean customer testimonial quote', 'Urgency timer transition']
  },
  {
    id: 'personal-brand-video',
    title: 'Personal Brand Video',
    category: 'Talking Head',
    clientTag: 'TALKING HEAD',
    headline: 'Simple, polished edits for creators and personal brands.',
    aspectRatio: '16:9',
    duration: '8:12',
    format: '4K Creator Quality',
    tools: ['Adobe Premiere Pro', 'Sound Sync', 'Captions', 'Basic Color Grading'],
    stats: { retention: '62% retention', subscribers: '+14K net gain', feedback: 'Top tier creator workflow' },
    details: 'Polished creator aesthetic with crisp voice isolation, room tone leveling, subtle camera angle switches to emphasize key insights, and minimalist modern lower thirds.',
    playbackHighlights: ['Studio microphone sound isolation', 'Subtle jump cut masking', 'Visual thesis recap slides', 'Smooth subscribe bumper']
  },
  {
    id: 'viral-tiktok-hook',
    title: 'High-Retention TikTok Reel',
    category: 'Short-form',
    clientTag: 'TIKTOK VIRAL',
    headline: 'Fast-paced storytelling with word-by-word synced captions.',
    aspectRatio: '9:16',
    duration: '0:58',
    format: 'Vertical HD',
    tools: ['Adobe Premiere Pro', 'Short-form Editing', 'Captions', 'Sound Sync'],
    stats: { retention: '92% watch time', views: '3.4M views', shares: '28K shares' },
    details: 'Engineered for viral retention with instant visual stimulus every 1.5 seconds, sound effects layered under key nouns, emoji popups, and seamless loop back to the start.',
    playbackHighlights: ['Seamless infinite loop cut', 'Micro sound effects (whoosh, pop)', 'Highlighted keyword karaoke', 'Zoom in/out framing']
  },
  {
    id: 'tech-review-youtube',
    title: 'Tech Hardware Showcase',
    category: 'YouTube',
    clientTag: 'TECH REVIEW',
    headline: 'Cinematic hardware macros with fluid speed ramps and clean typography.',
    aspectRatio: '16:9',
    duration: '11:05',
    format: '4K Ultra HD',
    tools: ['Adobe Premiere Pro', 'Basic Color Grading', 'Graphic Design'],
    stats: { retention: '65% avg duration', views: '720K views', likes: '45K likes' },
    details: 'Slick studio B-roll speed ramping synced to deep synth beats, split-screen spec comparisons, clean minimalist callout lines, and professional product color-matching.',
    playbackHighlights: ['Speed ramp transition sequence', 'Clean spec overlay HUD', 'Crisp product macros', 'Balanced audio mix']
  }
];

export default function App() {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showreelOpen, setShowreelOpen] = useState(false);

  // Try fetching backend projects from Express API
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
      })
      .catch(() => {
        // Use default projects on standalone mode
      });
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080b10] text-[#f0f3f6] relative selection:bg-amber-400 selection:text-black">
      {/* Background subtle noise and gradient field */}
      <div className="fixed inset-0 pointer-events-none film-grain z-0 opacity-40" />

      {/* Top Header Navigation */}
      <Header onOpenContact={scrollToContact} />

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onOpenShowreel={() => setShowreelOpen(true)}
          onOpenContact={scrollToContact}
        />

        {/* Selected Work Portfolio Grid */}
        <WorkSection
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Multi-Track Premiere Editing Suite Simulator */}
        <section className="max-w-6xl mx-auto px-6">
          <EditingSuiteTimeline />
        </section>

        {/* About Bahilu, Skills & Editing Process */}
        <AboutSection onOpenContact={scrollToContact} />

        {/* Project Brief Submission & Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Showreel Video Player Modal */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        onOpenContact={scrollToContact}
      />

      {/* Project Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={scrollToContact}
      />
    </div>
  );
}
