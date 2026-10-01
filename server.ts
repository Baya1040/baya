import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory submissions store for project inquiries
interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  footageLength?: string;
  deadline?: string;
  link?: string;
  message: string;
  createdAt: string;
}

const inquiries: Inquiry[] = [
  {
    id: 'demo-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@creatorgrowth.co',
    projectType: 'Short-form',
    footageLength: '45 mins raw',
    deadline: 'Within 3 days',
    link: 'https://drive.google.com/drive/folders/demo',
    message: 'Looking for 10 high-hook TikTok / Reels edits for our podcast launch. Clean subtitles and pacing like your Meta sample.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];

// Portfolio Projects data source
const portfolioProjects = [
  {
    id: 'meta-ig-ad',
    title: 'Meta & Instagram Ad',
    category: 'Short-form',
    clientTag: 'META / IG',
    headline: 'Clean social ad edit with captions, pacing and visual emphasis.',
    aspectRatio: '9:16',
    duration: '0:34',
    format: '4K Vertical (1080x1920)',
    tools: ['Adobe Premiere Pro', 'After Effects', 'Sound Sync'],
    stats: { retention: '84% avg watch time', views: '1.2M impressions', ctr: '3.8% CTR' },
    details: 'Crafted dynamic hook in the first 1.8 seconds with punch-in zoom, animated kinetic subtitles, custom SFX risers, and color-graded product pop. Optimized for mobile sound-off viewing with bold typography hierarchy.',
    playbackHighlights: ['Hook optimization (0:00-0:03)', 'Kinetic text pop', 'Audio swell & impact cut', 'CTA punchline']
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
    tools: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Color Grading', 'Sound Design'],
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
    tools: ['Adobe Premiere Pro', 'Motion Graphics', 'Graphic Design'],
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
    tools: ['Adobe Premiere Pro', 'CapCut Pro', 'Captions', 'Sound Sync'],
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
    tools: ['Adobe Premiere Pro', 'Color Grading', 'Speed Ramping'],
    stats: { retention: '65% avg duration', views: '720K views', likes: '45K likes' },
    details: 'Slick studio B-roll speed ramping synced to deep synth beats, split-screen spec comparisons, clean minimalist callout lines, and professional product color-matching.',
    playbackHighlights: ['Speed ramp transition sequence', 'Clean spec overlay HUD', 'Crisp product macros', 'Balanced audio mix']
  }
];

// API: Get portfolio projects
app.get('/api/projects', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'All') {
    const filtered = portfolioProjects.filter(
      p => p.category.toLowerCase() === String(category).toLowerCase()
    );
    return res.json({ success: true, projects: filtered });
  }
  res.json({ success: true, projects: portfolioProjects });
});

// API: Submit project inquiry
app.post('/api/contact', (req, res) => {
  const { name, email, projectType, footageLength, deadline, link, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please provide your name, email, and project details.'
    });
  }

  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    name: String(name).trim(),
    email: String(email).trim(),
    projectType: projectType || 'General Project',
    footageLength: footageLength || 'Not specified',
    deadline: deadline || 'Flexible',
    link: link || '',
    message: String(message).trim(),
    createdAt: new Date().toISOString()
  };

  inquiries.unshift(newInquiry);

  // Return success with direct email link for instant client-side fallback
  const mailtoSubject = encodeURIComponent(`Project Inquiry: ${newInquiry.projectType} from ${newInquiry.name}`);
  const mailtoBody = encodeURIComponent(
    `Hi Bahilu,\n\nName: ${newInquiry.name}\nEmail: ${newInquiry.email}\nProject Type: ${newInquiry.projectType}\nEstimated Footage: ${newInquiry.footageLength}\nTarget Deadline: ${newInquiry.deadline}\nFootage Link: ${newInquiry.link}\n\nProject Brief:\n${newInquiry.message}\n`
  );
  const directMailtoUrl = `mailto:bahilubekele49@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  res.json({
    success: true,
    message: "Thank you for reaching out! Bahilu has received your brief and will respond within 24 hours.",
    inquiry: newInquiry,
    directMailtoUrl
  });
});

// API: Get inquiries (for dashboard preview)
app.get('/api/contact/submissions', (req, res) => {
  res.json({ success: true, submissions: inquiries });
});

// API: Rate & Turnaround quick calculation helper
app.post('/api/estimate', (req, res) => {
  const { projectType, volume, turnaround } = req.body;
  
  let baseTurnaround = '48 hours';
  let suggestedWorkflow = 'Ingest & Assembly -> Rough Cut Review -> Sound/Color Polish -> Final Export';

  if (projectType === 'Short-form') {
    baseTurnaround = turnaround === 'rush' ? '24 hours' : '48 hours';
    suggestedWorkflow = 'Hook selection -> Kinetic typography -> Audio sync & SFX -> 9:16 export';
  } else if (projectType === 'YouTube') {
    baseTurnaround = turnaround === 'rush' ? '2-3 days' : '4-5 days';
    suggestedWorkflow = 'Story cut & A-roll pacing -> B-roll layering -> Title cards -> Color & Loudness pass';
  } else if (projectType === 'VSL' || projectType === 'Ads') {
    baseTurnaround = turnaround === 'rush' ? '24-48 hours' : '3-4 days';
    suggestedWorkflow = 'Conversion structure -> Pattern interrupts -> Lower thirds & kinetic graphics -> Review';
  } else if (projectType === 'Documentary') {
    baseTurnaround = '5-7 days';
    suggestedWorkflow = 'Archival ingestion -> Narrative assembly -> Soundscape design -> Cinema grade';
  }

  res.json({
    success: true,
    estimate: {
      projectType,
      volume: volume || '1 video',
      estimatedTurnaround: baseTurnaround,
      workflow: suggestedWorkflow,
      contactEmail: 'bahilubekele49@gmail.com'
    }
  });
});

// Mount Vite or static build
async function setupServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Bahilu Bekele Portfolio server listening on http://localhost:${PORT}`);
  });
}

setupServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
