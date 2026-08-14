import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

const reviews = [
  {
    name: 'James Wilson',
    suburb: 'Penrith',
    date: '2 weeks ago',
    text: 'Extremely professional team. The installation of our 6.6kW system was seamless, and the site was left spotless. My first bill is already showing massive savings.',
    rating: 5
  },
  {
    name: 'Sarah Jenkins',
    suburb: 'Sutherland Shire',
    date: '1 month ago',
    text: 'Highly recommend Sunlitesolar! They handled all the rebate paperwork for us and explained the Tesla Powerwall app perfectly. True experts.',
    rating: 5
  },
  {
    name: 'David Chen',
    suburb: 'Ryde',
    date: '3 months ago',
    text: 'Got 3 quotes and Sunlite was by far the most transparent. No slimy sales tactics, just honest advice about what my roof needed. System performs exactly as promised.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
           <div className="inline-flex items-center gap-2 mb-6">
               <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" />)}
               </div>
               <span className="text-xl font-bold text-brand-navy">5.0</span>
           </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-navy mb-6">
            Loved by Sydney Homeowners
          </h2>
          <p className="text-lg text-slate-600">
            Don't just take our word for it. Read what local families and businesses have to say about our premium installations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl relative"
            >
              <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-md">
                 <svg aria-label="Google" className="h-8 w-8" viewBox="0 0 512 512">
                   <path fill="#4285f4" d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"></path>
                   <path fill="#34a853" d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z"></path>
                   <path fill="#fbbc02" d="M153 292c-8-25-8-53 0-78l-63-49c-23 46-30 102-8 153z"></path>
                   <path fill="#ea4335" d="M260 51c54 0 108 22 146 58l-52 52C315 123 238 122 178 159c-25 15-43 38-53 64l-62-49C105 106 181 51 260 51z"></path>
                 </svg>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-xl">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy">{review.name}</h4>
                  <div className="text-xs text-slate-400">{review.suburb} • {review.date}</div>
                </div>
              </div>
              
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-slate-600 line-clamp-4">
                "{review.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
