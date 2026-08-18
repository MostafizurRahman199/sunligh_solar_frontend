import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, TrendingDown, PiggyBank } from 'lucide-react';

export default function Savings() {
  return (
    <section id="savings" className="py-24 bg-brand-navy relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1">
            <h2 className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-3">Real ROI</h2>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Cut Your Electricity Bill by 20% to 30% Forever.
            </h3>
            <p className="text-lg text-slate-300 mb-8 max-w-xl">
              Sydney energy prices are rising. By switching to Sunlitesolar, our average residential customer eliminates up to a third of their power bill instantly. Protect yourself against future rate hikes.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-brand-yellow/20 p-3 rounded-lg text-brand-yellow mt-1">
                  <TrendingDown size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Immediate Reduction</h4>
                  <p className="text-slate-400">Start seeing drastically lower bills from your very next quarterly statement.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-brand-blue/20 p-3 rounded-lg text-brand-blue mt-1">
                  <PiggyBank size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Long-Term Wealth</h4>
                  <p className="text-slate-400">A typical 6.6kW system pays for itself in just 3-4 years. Everything after is pure profit.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
               <a href="#contact" className="inline-flex items-center gap-2 text-brand-yellow font-bold hover:underline">
                 Calculate your exact roof potential <ArrowDownRight size={20} />
               </a>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-2xl relative"
            >
              <div className="absolute -top-6 -right-6 bg-gradient-brand text-white font-bold px-6 py-3 rounded-full shadow-lg rotate-3">
                Real Sydney Home
              </div>
              
              <h4 className="text-2xl font-bold text-brand-navy mb-8 text-center text-gradient">Quarterly Bill Comparison</h4>
              
              <div className="space-y-8">
                {/* Before */}
                <div className="relative">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-semibold text-slate-500 uppercase text-sm tracking-widest">Before Solar</span>
                    <span className="text-2xl font-bold text-slate-800">$850</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                    <div className="bg-slate-400 h-4 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                {/* After */}
                <div className="relative">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-semibold text-brand-orange uppercase text-sm tracking-widest">With Sunlite Solar</span>
                    <span className="text-3xl font-bold text-green-500">$180</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-6 overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: '100%' }}
                      whileInView={{ width: '21%' }}
                      transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                      className="bg-green-500 h-6 rounded-full relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </motion.div>
                  </div>
                  <p className="text-right text-sm text-green-600 font-bold mt-2">78% Savings!</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                <p className="text-slate-500 text-sm mb-4">Average savings based on a 6.6kW system in NSW.</p>
                <button 
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full bg-brand-navy text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Get a Custom Estimate
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
