import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Do you install systems outside of Sydney?",
    answer: "Yes, we proudly serve residential and commercial clients within a 300 km radius of the Sydney CBD. This covers the Greater Sydney area, Blue Mountains, Central Coast, and Illawarra regions."
  },
  {
    question: "How much will I really save on my power bill?",
    answer: "Most of our customers see a 20% to 30% reduction in their quarterly energy bills almost immediately. Depending on your system size (e.g., 6.6kW) and daily usage habits, payback periods typically range from 3 to 5 years."
  },
  {
    question: "Are your installers licensed and certified?",
    answer: "Absolutely. All Sunlitesolar installers are fully licensed electricians and Clean Energy Council (CEC) accredited. We strictly adhere to all Australian Standards and NSW compliance requirements."
  },
  {
    question: "Do you handle the government rebates?",
    answer: "Yes, we handle the entire process. We claim the Small-scale Technology Certificates (STCs) on your behalf and apply them as an upfront discount on your quote, saving you the paperwork."
  },
  {
    question: "Can I add a battery to my existing solar system?",
    answer: "In most cases, yes. We can retrofit premium battery storage systems (like Tesla Powerwall) to your existing solar array to help you store excess daytime energy for night-time use."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-3">Questions?</h2>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-brand-navy">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white border ${isOpen ? 'border-brand-orange' : 'border-slate-200'} rounded-2xl overflow-hidden transition-colors duration-300`}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-bold text-brand-navy text-lg pr-8">{faq.question}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'bg-brand-orange/10 text-brand-orange rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
            <p className="text-slate-500">Still have questions? <a href="#contact" className="text-brand-orange font-bold hover:underline">Contact our Sydney team</a></p>
        </div>
      </div>
    </section>
  );
}
