import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function StickyWidgets() {
  const [showWidgets, setShowWidgets] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero
      setShowWidgets(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showWidgets && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4"
        >
          {/* WhatsApp / Chat Button */}
          <a
            href="https://wa.me/61498579245"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer relative group"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={28} />
            <div className="absolute right-full mr-4 bg-white text-slate-800 text-sm font-bold px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Chat with us
            </div>
            {/* Ping animation indicator */}
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </span>
          </a>

          {/* Mobile Bottom Sticky CTA (Hidden on md and up) */}
          <a
            href="#contact"
            className="md:hidden bg-brand-navy text-white font-bold py-3 px-6 rounded-full shadow-2xl border border-white/20 flex items-center gap-2"
          >
            Get Free Quote
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
