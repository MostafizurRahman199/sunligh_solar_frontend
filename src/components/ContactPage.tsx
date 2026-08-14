import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://formsubmit.co/ajax/fe2a6e867a8d6e879b086edb1383a208', true);
    xhr.setRequestHeader('Accept', 'application/json');
    
    xhr.onload = function() {
      setIsSubmitting(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        form.reset();
      } else {
        console.error('Form submission failed');
      }
    };
    
    xhr.onerror = function() {
      setIsSubmitting(false);
      console.error('Error submitting form');
    };
    
    xhr.send(formData);
  };

  return (
    <div className="pt-32 pb-24 bg-brand-gray relative min-h-screen">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-navy mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-brand">Touch</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Ready to reduce your energy bills? Fill out the form below or contact us directly. Our Sydney-based team is ready to help you transition to solar.
          </p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
          
          {/* Left Info Panel */}
          <div className="bg-brand-navy p-10 lg:p-14 lg:w-5/12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-[80px]" />
             <div className="relative z-10">
               <h3 className="text-3xl font-heading font-bold mb-4">Contact Information</h3>
               <p className="text-slate-300 mb-10">Reach out to our experts for a customized solar assessment and quote.</p>
               
               <div className="space-y-8">
                 <div className="flex items-start gap-4">
                   <div className="bg-white/10 p-3 rounded-xl text-brand-orange">
                     <MapPin size={24} />
                   </div>
                   <div>
                     <h5 className="font-bold text-lg mb-1">Address</h5>
                     <p className="text-slate-300">Office 2, 168-176 Haldon St, Lakemba</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-4">
                   <div className="bg-white/10 p-3 rounded-xl text-brand-orange">
                     <Phone size={24} />
                   </div>
                   <div>
                     <h5 className="font-bold text-lg mb-1">Phone Number</h5>
                     <p className="text-slate-300">0498 579 245<br />Mon-Fri: 8am - 6pm</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-4">
                   <div className="bg-white/10 p-3 rounded-xl text-brand-orange">
                     <Mail size={24} />
                   </div>
                   <div>
                     <h5 className="font-bold text-lg mb-1">Email Address</h5>
                     <p className="text-slate-300">infosls.au@gmail.com</p>
                   </div>
                 </div>
               </div>

               <div className="mt-16 pt-8 border-t border-white/10">
                  <h5 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-400">Accreditations</h5>
                  <div className="flex gap-4">
                     <div className="bg-white/10 px-3 py-2 rounded-md text-xs font-bold border border-white/20">CEC Approved</div>
                     <div className="bg-white/10 px-3 py-2 rounded-md text-xs font-bold border border-white/20">NSW Licensed</div>
                  </div>
               </div>
             </div>
          </div>

          {/* Right Form Panel */}
          <div className="p-10 lg:p-14 lg:w-7/12 bg-white">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-bold text-brand-navy mb-4">Request Sent!</h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out to Sunlitesolar. One of our Sydney solar experts will contact you within 24 hours to discuss your free quote.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_honey" style={{ display: 'none' }} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                  <input required type="text" id="name" name="name" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all" placeholder="John Smith" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                    <input required type="email" id="email" name="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input required type="tel" id="phone" name="phone" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all" placeholder="0498 579 245" />
                  </div>
                </div>

                <div>
                   <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                   <textarea required id="message" name="message" rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all resize-none" placeholder="Tell us more about your energy needs..."></textarea>
                </div>

                <div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-brand text-white font-bold py-4 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending...' : 'Send Message'} {!isSubmitting && <Send size={20} />}
                  </button>
                </div>
                <p className="text-xs text-center text-slate-400">By submitting this form, you agree to our privacy policy. Your information is kept strictly confidential.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
