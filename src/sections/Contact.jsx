import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Linkedin, 
  Github, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please write a message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Frontend validation & simulation
    // To connect to a real email backend, simply replace this timeout with:
    // fetch("https://formspree.io/f/YOUR_FORM_ID", { method: "POST", body: ... })
    // OR use EmailJS / Resend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/50 dark:bg-slate-900/50 light:bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 border border-indigo-500/20 mb-3">
            <MessageSquare className="w-3.5 h-3.5" /> Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900">
            Let's Work Together
          </h2>
          <p className="mt-3 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base">
            Have a project, opportunity or collaboration in mind? Feel free to get in touch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Contact Details & Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl space-y-6">
              <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">
                Connect Directly
              </h3>
              <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                I am actively seeking software developer opportunities. Whether you have a question, job opening, or exciting project, my inbox is open!
              </p>

              <div className="space-y-4 pt-2">
                {/* Email Item */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Email</p>
                    <p className="text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 truncate">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                {/* LinkedIn Item */}
                <a
                  href={personalInfo.linkedin}
                  target={personalInfo.linkedin !== '#' ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">LinkedIn</p>
                    <p className="text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 truncate">
                      linkedin.com/in/rahulmore
                    </p>
                  </div>
                </a>

                {/* GitHub Item */}
                <a
                  href={personalInfo.github}
                  target={personalInfo.github !== '#' ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">GitHub</p>
                    <p className="text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 truncate">
                      github.com/rahulmore
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mb-6">
                Fill out the form below and I'll respond as soon as possible.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                  <div>
                    <p className="font-semibold">Message Sent Successfully!</p>
                    <p className="text-xs text-emerald-300/90 mt-0.5">
                      Thank you for reaching out, Rahul will review your message promptly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 border ${
                      errors.name ? 'border-rose-500' : 'border-slate-700 dark:border-slate-700 light:border-slate-300'
                    } text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm`}
                  />
                  {errors.name && (
                    <p className="flex items-center gap-1 text-xs text-rose-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                    Your Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 border ${
                      errors.email ? 'border-rose-500' : 'border-slate-700 dark:border-slate-700 light:border-slate-300'
                    } text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm`}
                  />
                  {errors.email && (
                    <p className="flex items-center gap-1 text-xs text-rose-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                    Your Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, team opportunity, or question..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 border ${
                      errors.message ? 'border-rose-500' : 'border-slate-700 dark:border-slate-700 light:border-slate-300'
                    } text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none`}
                  ></textarea>
                  {errors.message && (
                    <p className="flex items-center gap-1 text-xs text-rose-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Validating & Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
