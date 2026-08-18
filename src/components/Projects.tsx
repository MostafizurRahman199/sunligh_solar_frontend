import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, X } from 'lucide-react';

const projects = [
  {
    image: '/modern solar power.jpeg',
    title: 'Modern Residential Build',
    location: 'Northern Beaches, NSW',
    system: '8.5kW Solar + Tesla Powerwall'
  },
  {
    image: '/commercial solar power.jpeg',
    title: 'Commercial Warehouse',
    location: 'Parramatta, NSW',
    system: '30kW Industrial System'
  },
  {
    image: '/solar power subburn.jpeg',
    title: 'Suburban Family Home',
    location: 'Hills District, NSW',
    system: '6.6kW High-Efficiency Panels'
  }
];

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 bg-brand-gray relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-3">Our Work</h2>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-brand-navy">
              100+ Successful Installations Across Sydney
            </h3>
          </div>
          <a href="#contact" className="hidden md:inline-flex bg-white border border-slate-200 text-brand-navy font-bold py-3 px-6 rounded-full hover:border-brand-orange hover:text-brand-orange transition-colors">
            View All Projects
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(project.image)}
            >
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6 bg-slate-200">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-brand-yellow font-bold bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm">
                    {project.system}
                  </span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-orange transition-colors">{project.title}</h4>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin size={16} />
                <span className="text-sm font-medium">{project.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
           <a href="#contact" className="inline-flex bg-white border border-slate-200 text-brand-navy font-bold py-3 px-8 rounded-full hover:border-brand-orange hover:text-brand-orange transition-colors w-full justify-center">
             View All Projects
           </a>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-brand-orange transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
