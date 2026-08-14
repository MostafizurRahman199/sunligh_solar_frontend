import React from 'react';
import { motion } from 'motion/react';
import { Home, BatteryCharging, Factory, Wrench } from 'lucide-react';

const services = [
  {
    icon: <Home size={32} />,
    title: 'Residential Solar',
    description: 'Custom-designed panel layouts to maximise roof space and slash household energy bills.',
    features: ['Top-tier monocrystalline panels', 'Smart inverter integration', 'Performance monitoring app'],
    color: 'bg-blue-50 text-brand-blue border-blue-100'
  },
  {
    icon: <Factory size={32} />,
    title: 'Commercial Solar',
    description: 'Large-scale solar solutions to reduce operational costs and meet corporate sustainability goals.',
    features: ['Up to 100kW+ systems', 'Tax write-off assistance', 'Minimal downtime install'],
    color: 'bg-orange-50 text-brand-orange border-orange-100'
  },
  {
    icon: <Wrench size={32} />,
    title: 'Maintenance & Support',
    description: 'Comprehensive health checks, panel cleaning, and system repairs across Sydney.',
    features: ['Annual health checks', 'Drone roof inspections', 'Fast repair response'],
    color: 'bg-purple-50 text-purple-600 border-purple-100'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-3">Our Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-brand-navy mb-6">
            Comprehensive Energy Solutions
          </h3>
          <p className="text-lg text-slate-600">
            From suburban homes to massive industrial warehouses, we engineer bespoke solar and battery setups that deliver maximum ROI under the harsh Australian sun.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all group"
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 border ${service.color} group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-brand-navy mb-3">{service.title}</h4>
              <p className="text-slate-600 mb-6 line-clamp-3">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
