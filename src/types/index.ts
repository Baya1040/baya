export type ProjectCategory = 'All' | 'Short-form' | 'YouTube' | 'Ads' | 'Talking Head';

export interface Project {
  id: string;
  title: string;
  category: string;
  clientTag: string;
  headline: string;
  aspectRatio: '9:16' | '16:9';
  duration: string;
  format: string;
  tools: string[];
  stats: Record<string, string>;
  details: string;
  playbackHighlights: string[];
  accentColor?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  projectType: string;
  footageLength: string;
  deadline: string;
  link: string;
  message: string;
}
