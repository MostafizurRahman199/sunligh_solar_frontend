import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, Award, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80"
          alt="Modern solar panels on a sunny day"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left mt-10 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8"
          >
            <ShieldCheck size={18} className="text-brand-yellow" />
            <span className="text-white text-sm font-medium tracking-wide">Sydney's Trusted Solar Experts • 100+ Installs</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.1] mb-6"
          >
            Powering Sydney with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-orange">Premium Solar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0"
          >
            Reduce your energy bills by 20% to 30% with licensed NSW experts. 
            High-efficiency solar panels, advanced battery storage, and custom solutions for homes and businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto bg-gradient-brand text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-brand-orange/20"
            >
              Get Your Free Quote
              <ArrowRight size={20} />
            </a>
            <a
              href="#savings"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              Calculate Savings
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-300"
          >
             <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-navy bg-slate-300 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
             </div>
             <div>
               <div className="flex text-brand-yellow">
                 {[1,2,3,4,5].map(i => <Zap key={i} size={14} fill="currentColor" />)}
               </div>
               <p className="mt-1">Trusted by 100+ Sydney locals</p>
             </div>
          </motion.div>
        </div>

        {/* Right Content - Floating Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex flex-1 relative h-[500px]"
        >
           <div className="absolute top-1/4 right-10 bg-white p-6 rounded-2xl shadow-2xl z-20 w-64 translate-x-10 animate-[bounce_5s_infinite]">
              <div className="flex items-center gap-4 mb-3">
                 <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <ShieldCheck size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-800">CEC Approved</h4>
                    <p className="text-xs text-slate-500">Retailer & Installer</p>
                 </div>
              </div>
           </div>
           
           <div className="absolute bottom-1/4 right-32 bg-brand-navy p-6 rounded-2xl shadow-2xl z-20 w-64 border border-white/10 animate-[bounce_6s_infinite_reverse]">
              <div className="flex items-center gap-4 mb-3">
                 <div className="bg-brand-orange/20 p-3 rounded-full text-brand-orange">
                    <Award size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold text-white">25-Year Warranty</h4>
                    <p className="text-xs text-slate-400">Performance Guarantee</p>
                 </div>
              </div>
           </div>

           <div className="absolute top-1/2 left-0 bg-white p-5 rounded-2xl shadow-xl z-10 w-56 animate-[bounce_4s_infinite]">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <CheckCircle2 className="text-brand-blue" size={18} />
                Gov Rebates
              </h4>
              <p className="text-sm text-slate-600">Maximise your STC claims hassle-free.</p>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
