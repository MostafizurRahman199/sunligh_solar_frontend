import React from 'react';
import { Sun } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-white/10 pt-16 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <img src="/logo.jpg" alt="Sunlite Solar" className="h-24 w-auto object-contain rounded-full shadow-lg" />
            </a>
            <p className="text-sm mb-6 max-w-xs">
              Providing premium, high-efficiency solar panel and battery solutions to homes and businesses across Sydney and NSW.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Solutions</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Residential Solar</a></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Commercial Solar</a></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Maintenance & Repairs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company & Portal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#/about" className="hover:text-brand-yellow transition-colors">About Us</a></li>
              <li><a href="#projects" className="hover:text-brand-yellow transition-colors">Our Projects</a></li>
              <li><a href="#checkout" className="hover:text-brand-yellow transition-colors">Pay Online / Checkout</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#/privacy" className="hover:text-brand-yellow transition-colors">Privacy Policy</a></li>
              <li><a href="#/terms" className="hover:text-brand-yellow transition-colors">Terms & Conditions</a></li>
              <li><a href="#/warranty" className="hover:text-brand-yellow transition-colors">Warranty Info</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Sunlite Solar Australia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
