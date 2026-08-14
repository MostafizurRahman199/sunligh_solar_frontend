import React from 'react';
import { motion } from 'motion/react';
import { Sun, ShieldCheck, Award, MapPin } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 pb-24 bg-white relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-navy mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-brand">Sunlitesolar</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            At Sunlitesolar, we believe in powering a brighter, cleaner future for Sydney and beyond. With more than 100 successful solar and battery projects completed, we've built a reputation for delivering reliable energy solutions that save money, reduce carbon footprints, and add long-term value to homes and businesses.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Our Story */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-gray p-8 md:p-10 rounded-3xl border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-brand-yellow/20 p-3 rounded-xl text-brand-orange">
                <Sun size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-navy">Our Story</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              Founded in Sydney, Sunlitesolar was created with a simple mission: to make renewable energy accessible, affordable, and compliant with the highest standards. We proudly serve customers within a 300 km radius of Sydney CBD, helping families and businesses take control of their energy needs.
            </p>
          </motion.div>

          {/* Our Expertise */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-gray p-8 md:p-10 rounded-3xl border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-brand-blue/10 p-3 rounded-xl text-brand-blue">
                <Award size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-navy">Our Expertise</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              Our team is made up of certified and licensed professionals who bring years of experience in solar panel installation, battery storage systems, and energy optimization. Every project is handled with precision, ensuring that your system is not only efficient but also fully compliant with Australian Standards and NSW regulations.
            </p>
          </motion.div>

          {/* Commitment to Quality */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-navy p-8 md:p-10 rounded-3xl text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/10 p-3 rounded-xl text-brand-yellow">
                  <ShieldCheck size={28} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-heading">Commitment to Quality & Compliance</h2>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">
                We understand that trust is everything when it comes to energy solutions. That's why we prioritize strict compliance, safety, and transparency in every installation. From initial consultation to final handover, our customers can rest assured that their investment is protected and future-ready.
              </p>
            </div>
          </motion.div>

          {/* Our Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-gray p-8 md:p-10 rounded-3xl border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-xl text-green-600">
                <MapPin size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-navy">Our Mission</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              We are committed to helping Sydney transition to sustainable energy by combining local expertise, proven experience, and innovative technology. Our goal is to empower communities with energy independence while contributing to a cleaner environment for generations to come.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
