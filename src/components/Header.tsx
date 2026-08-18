import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, CreditCard, User as UserIcon, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function Header({ isAboutPage = false, isContactPage = false, isSpecialPage = false }: { isAboutPage?: boolean, isContactPage?: boolean, isSpecialPage?: boolean }) {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightNav = isScrolled || isAboutPage || isContactPage || isSpecialPage;

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#/about' },
    { name: 'Services', href: '#services' },
    { name: 'Savings', href: '#savings' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isLightNav ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <img src="/logo.jpg" alt="Sunlite Solar" className="h-16 w-auto object-contain rounded-full shadow-md" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-brand-orange transition-colors ${
                isLightNav ? 'text-slate-700 font-semibold' : 'text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:0498579245" className={`flex items-center gap-1.5 text-sm font-bold hover:text-brand-orange transition-colors ${isLightNav ? 'text-slate-900' : 'text-white'}`}>
            <Phone size={16} className={isLightNav ? 'text-brand-orange' : 'text-white'} />
            <span>0498 579 245</span>
          </a>
          <a
            href="#checkout"
            className="flex items-center gap-1.5 bg-gradient-brand text-white px-4 py-2 rounded-full text-xs font-bold hover:shadow-lg transition-all"
          >
            <CreditCard size={14} />
            <span>Pay Online</span>
          </a>
          {user ? (
            <a
              href={user.role === 'ADMIN' ? '#/admin' : '#/dashboard'}
              className="flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-slate-900 transition-colors shadow-md"
            >
              {user.role === 'ADMIN' ? <ShieldCheck size={14} className="text-amber-400" /> : <UserIcon size={14} />}
              <span>{user.role === 'ADMIN' ? 'Admin' : 'Account'}</span>
            </a>
          ) : (
            <a
              href="#/login"
              className="bg-brand-navy text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-slate-800 transition-colors shadow-md flex items-center gap-1.5"
            >
              <UserIcon size={14} />
              <span>Sign In</span>
            </a>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-brand-navy bg-white rounded-md shadow-sm cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-100 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col p-4 gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-semibold text-slate-800 hover:text-brand-orange py-1.5 px-2 rounded-lg hover:bg-slate-50 border-b border-slate-100/60 last:border-0 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2.5 mt-3 pt-2 border-t border-slate-100">
                <a
                  href="tel:0498579245"
                  className="flex justify-center items-center gap-2 py-2.5 rounded-xl bg-slate-100 text-brand-navy font-bold text-sm hover:bg-slate-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone size={18} className="text-brand-orange" />
                  <span>Call 0498 579 245</span>
                </a>
                <a
                  href="#checkout"
                  className="bg-gradient-brand text-white text-center py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CreditCard size={18} />
                  <span>Pay Online / Checkout</span>
                </a>
                <a
                  href="#contact"
                  className="bg-brand-navy text-white text-center py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-slate-800 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Request a Free Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
