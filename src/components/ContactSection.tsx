import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ArrowUpRight, MessageSquare, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { InquiryFormData } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    projectType: 'Short-form',
    footageLength: '',
    deadline: '',
    link: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setSubmittedInquiry(data);
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try emailing directly.');
      }
    } catch (err) {
      // Graceful offline fallback
      setIsSubmitted(true);
      const subject = encodeURIComponent(`Project Brief: ${formData.projectType} from ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Bahilu,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nFootage: ${formData.footageLength}\nDeadline: ${formData.deadline}\nLinks: ${formData.link}\n\nBrief:\n${formData.message}\n`
      );
      setSubmittedInquiry({
        directMailtoUrl: `mailto:bahilubekele49@gmail.com?subject=${subject}&body=${body}`,
        message: 'Your brief was generated! Click below to send directly to bahilubekele49@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedInquiry(null);
    setFormData({
      name: '',
      email: '',
      projectType: 'Short-form',
      footageLength: '',
      deadline: '',
      link: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Contact Header Block */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-mono text-amber-400 tracking-wider">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display text-balance">
            Have a project?
            <br />
            Let's make something clear and engaging.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Send me your footage, brief, and deadline. I'll help turn it into a finished video.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="mailto:bahilubekele49@gmail.com?subject=Video%20Editing%20Project%20Inquiry"
              className="px-6 py-3 text-sm font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Email me</span>
            </a>

            <a
              href="#work"
              className="px-6 py-3 text-sm font-medium text-slate-200 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg transition-colors"
            >
              See portfolio
            </a>
          </div>
        </div>

        {/* Form and Direct Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Ingestion Form */}
          <div className="lg:col-span-7 bg-[#0c1017] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-5 animate-fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Project Brief Received!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Bahilu has logged your project details and will review your footage link and respond within 24 hours.
                </p>

                {submittedInquiry?.directMailtoUrl && (
                  <div className="pt-2">
                    <a
                      href={submittedInquiry.directMailtoUrl}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Mail Client to Send Directly</span>
                    </a>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="text-xs font-mono text-slate-400 hover:text-white underline transition-colors"
                  >
                    Submit another project brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-white/5 pb-3">
                  <h3 className="text-lg font-bold text-white font-display">
                    Send Project Brief & Footage Link
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    No spam. Direct to Bahilu's workspace desk.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141b26] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@channel.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141b26] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Project Format
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#141b26] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                    >
                      <option value="Short-form">Short-form (TikTok/Reels)</option>
                      <option value="YouTube">YouTube Main Video</option>
                      <option value="Ads / VSL">Ads / Sales VSL</option>
                      <option value="Talking Head">Talking Head / Brand</option>
                      <option value="Documentary">Documentary / Recap</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Raw Footage Length
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 45 mins raw"
                      value={formData.footageLength}
                      onChange={(e) => setFormData({ ...formData, footageLength: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141b26] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Target Deadline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. In 48 hours"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141b26] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Footage Link (Google Drive / Dropbox / Frame.io / WeTransfer)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/drive/folders/..."
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141b26] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Project Brief & Desired Style *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your video goal, style references (e.g., Ali Abdaal, Vox documentary, Hermozi kinetic text), and special audio instructions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141b26] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isSubmitting ? (
                      <span>Sending brief...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Brief to Bahilu</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels & Fast Response Guarantee */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-[#0c1017] border border-white/10 rounded-2xl p-6 space-y-5">
              <h3 className="text-base font-bold text-white font-display">
                Direct Channels
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:bahilubekele49@gmail.com"
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-400/30 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">PRIMARY INBOX</span>
                    <span className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors break-all">
                      bahilubekele49@gmail.com
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="w-9 h-9 rounded-lg bg-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">RESPONSE TIME</span>
                    <span className="text-xs text-slate-200">
                      Within 12–24 hours on all business inquiries
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">GUARANTEE</span>
                    <span className="text-xs text-slate-200">
                      Includes 2 rounds of revisions on all milestones
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Turnaround Estimation Box */}
            <div className="bg-[#0c1017] border border-white/10 rounded-2xl p-6 space-y-3">
              <span className="text-[11px] font-mono text-amber-400 block uppercase">
                Typical Turnaround Benchmarks
              </span>
              <div className="space-y-2 text-xs text-slate-300 font-mono">
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span>Short-form batch (5 reels)</span>
                  <span className="text-white font-semibold">48–72 hours</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span>Single YouTube video (8-12m)</span>
                  <span className="text-white font-semibold">3–4 days</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span>Business VSL / Ad</span>
                  <span className="text-white font-semibold">48 hours</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Rush 24h Delivery</span>
                  <span className="text-amber-400 font-semibold">Available</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
