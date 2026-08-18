import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formDataState, setFormDataState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const backendBase = (
    import.meta.env.VITE_BACKEND_URL ||
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000'
  )
    .replace(/\/api\/?$/, '')
    .replace(/\/$/, '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormDataState({
      ...formDataState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const payload = {
      name: formDataState.name,
      email: formDataState.email,
      phone: formDataState.phone,
      message: formDataState.message,
    };

    try {
      // 1. Post to NestJS backend database
      const response = await fetch(`${backendBase}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit contact message');
      }

      // Also fire AJAX to formsubmit.co in background for email notification if configured
      fetch('https://formsubmit.co/ajax/fe2a6e867a8d6e879b086edb1383a208', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});

      setSubmitted(true);
      setFormDataState({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setErrorMsg(err.message || 'An error occurred while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1/3 sm:h-1/2 bg-brand-navy" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
          {/* Left Info Panel */}
          <div className="bg-brand-navy p-6 sm:p-10 lg:p-14 lg:w-5/12 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-3 sm:mb-4">
                Request a Free Quote
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mb-8 sm:mb-10 leading-relaxed">
                Fill out the form to get a customised solar assessment for your Sydney property.
              </p>

              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="p-2 sm:p-2.5 bg-white/10 rounded-xl text-brand-orange shrink-0">
                    <MapPin size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm sm:text-base">Address</h5>
                    <p className="text-slate-300 text-xs sm:text-sm">Office 2, 168-176 Haldon St, Lakemba</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="p-2 sm:p-2.5 bg-white/10 rounded-xl text-brand-orange shrink-0">
                    <Phone size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm sm:text-base">Call Us Direct</h5>
                    <a href="tel:0498579245" className="text-slate-300 hover:text-brand-orange text-xs sm:text-sm transition-colors block">
                      0498 579 245
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="p-2 sm:p-2.5 bg-white/10 rounded-xl text-brand-orange shrink-0">
                    <Mail size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm sm:text-base">Email</h5>
                    <a href="mailto:infosls.au@gmail.com" className="text-slate-300 hover:text-brand-orange text-xs sm:text-sm transition-colors block break-all">
                      infosls.au@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-14 pt-6 border-t border-white/10 relative z-10">
              <h5 className="font-bold mb-3 text-xs uppercase tracking-wider text-slate-400">
                Accreditations
              </h5>
              <div className="flex flex-wrap gap-2.5 sm:gap-4">
                <div className="bg-white/10 px-3 py-1.5 rounded-lg text-xs font-bold border border-white/20">
                  CEC Approved
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-lg text-xs font-bold border border-white/20">
                  NSW Licensed
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="p-6 sm:p-10 lg:p-14 lg:w-7/12 bg-white flex flex-col justify-center">
            {submitted ? (
              <div className="py-12 sm:py-16 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-brand-navy mb-3">
                  Message Sent Successfully!
                </h3>
                <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
                  Thank you for reaching out. One of our Sydney solar experts will contact you within 24 hours to discuss your quote.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-brand-navy hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-md cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
                    <AlertCircle size={20} className="shrink-0 text-rose-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    value={formDataState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:bg-white transition-all"
                    placeholder="John Smith"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formDataState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:bg-white transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formDataState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:bg-white transition-all"
                      placeholder="0498 579 245"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Message / System Details <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={4}
                    value={formDataState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:bg-white transition-all resize-none"
                    placeholder="Tell us about your roof size, energy bills, or solar requirements..."
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-brand text-white font-bold py-3.5 sm:py-4 rounded-xl hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Free Quote</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] sm:text-xs text-center text-slate-400 leading-relaxed">
                  By submitting this form, you agree to our privacy policy. Your information is kept strictly confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
