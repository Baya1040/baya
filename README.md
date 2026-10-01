# Bahilu Bekele — Video Editor Portfolio

> Full-stack portfolio website for Bahilu Bekele, Video Editor & Storyteller based in Addis Ababa, Ethiopia.

---

## 📽️ Overview

This portfolio showcases professional video editing work across:
- **Short-form & Social Ads**: High-retention hooks and kinetic captions for TikTok, Instagram Reels, and Meta Ads.
- **YouTube & Documentaries**: Long-form narrative pacing, dual-interview tracks, and archival synchronization.
- **Business VSLs**: Talking-head sales videos engineered with pattern interrupts and problem-solution b-roll.
- **Creator Personal Brands**: Polished cuts, dialogue de-noising, and color grading.

---

## ✨ Features

- **Full-Stack Architecture**: Express.js REST API with backend routes (`/api/projects`, `/api/contact`, `/api/estimate`) mounted with Vite in development and serving static build in production.
- **Interactive Showreel Player**: Custom video playback simulator with Log-to-Rec.709 color grade toggle, interactive timeline scrubbing, captions toggle, and audio waveform.
- **Interactive Multi-Track NLE Timeline**: Premiere Pro / DaVinci-inspired live timeline simulator showing V1–V3 video tracks and A1–A2 audio tracks with scrubbable playhead.
- **Dynamic Work Filtering**: Category filter across All, Short-form, YouTube, Ads, and Talking Head.
- **Case Study Modal**: Before/After grading comparison slider ("Raw Flat Log" vs "Color Graded Master"), pacing breakdowns, and verified retention statistics.
- **Project Brief Ingestion Form**: Interactive quote and client brief submission with instant feedback and direct mailto link to `bahilubekele49@gmail.com`.
- **Responsive & Accessible**: Strict 3-zone header contract, zero-pill discipline, semantic typography pairing (`Syne` + `Plus Jakarta Sans` + `JetBrains Mono`).

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/your-username/bahilu-bekele-portfolio.git
cd bahilu-bekele-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```text
├── server.ts              # Full-stack Express server (APIs & static serving)
├── index.html             # HTML entry with font preconnects & SEO tags
├── metadata.json          # Applet metadata
├── package.json           # Dependencies and build scripts
├── src/
│   ├── main.tsx           # React entry point
│   ├── App.tsx            # Main application layout & state
│   ├── index.css          # Tailwind CSS configuration & filmic utilities
│   ├── types/
│   │   └── index.ts       # TypeScript interfaces
│   └── components/
│       ├── Header.tsx     # 3-Zone contract navigation bar
│       ├── Hero.tsx       # Hero with reel launcher & proof metrics
│       ├── ShowreelModal.tsx # Interactive showreel video player modal
│       ├── WorkSection.tsx# Filterable portfolio showcase grid
│       ├── ProjectModal.tsx # Before/after grade slider & project details
│       ├── EditingSuiteTimeline.tsx # Multi-track NLE timeline simulator
│       ├── AboutSection.tsx # Bio, skills breakdown & 4-step workflow
│       ├── ContactSection.tsx # Brief submission form & direct contacts
│       └── Footer.tsx     # Clean footer with copyright & back-to-top
└── vite.config.ts         # Vite bundler config
```

---

## 📬 Contact & Inquiries

- **Editor**: Bahilu Bekele
- **Location**: Addis Ababa, Ethiopia (UTC+3)
- **Email**: [bahilubekele49@gmail.com](mailto:bahilubekele49@gmail.com)

---

## 📄 License

MIT License © 2026 Bahilu Bekele.
