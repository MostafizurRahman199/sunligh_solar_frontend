import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Savings from './components/Savings';
import Projects from './components/Projects';
import CheckoutSection from './components/CheckoutSection';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StickyWidgets from './components/StickyWidgets';
import About from './components/About';
import ContactPage from './components/ContactPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import WarrantyInfo from './components/WarrantyInfo';

import { AuthProvider } from './context/AuthContext';
import AuthPage from './components/AuthPage';
import CustomerDashboard from './components/CustomerDashboard';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash;
      setCurrentRoute(newHash);
      if (['#/about', '#/contact', '#/privacy', '#/terms', '#/warranty', '#/login', '#/dashboard', '#/admin', '', '#'].includes(newHash)) {
         window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAboutPage = currentRoute === '#/about';
  const isContactPage = currentRoute === '#/contact';
  const isPrivacyPage = currentRoute === '#/privacy';
  const isTermsPage = currentRoute === '#/terms';
  const isWarrantyPage = currentRoute === '#/warranty';
  const isLoginPage = currentRoute === '#/login';
  const isDashboardPage = currentRoute === '#/dashboard';
  const isAdminPage = currentRoute === '#/admin';

  const isSpecialPage = isAboutPage || isContactPage || isPrivacyPage || isTermsPage || isWarrantyPage || isLoginPage || isDashboardPage || isAdminPage;

  useEffect(() => {
    if (!isSpecialPage && currentRoute && currentRoute.startsWith('#') && currentRoute !== '#' && currentRoute !== '#/') {
      const id = currentRoute.replace('#', '').replace('/', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 0);
      }
    }
  }, [isSpecialPage, currentRoute]);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-brand-gray selection:bg-brand-orange selection:text-white">
        <Header isAboutPage={isSpecialPage} />
        <main>
          {isLoginPage ? (
            <AuthPage />
          ) : isDashboardPage ? (
            <CustomerDashboard />
          ) : isAdminPage ? (
            <AdminPanel />
          ) : isAboutPage ? (
            <About />
          ) : isContactPage ? (
            <ContactPage />
          ) : isPrivacyPage ? (
            <PrivacyPolicy />
          ) : isTermsPage ? (
            <TermsConditions />
          ) : isWarrantyPage ? (
            <WarrantyInfo />
          ) : (
            <>
              <Hero />
              <Services />
              <Savings />
              <Projects />
              <CheckoutSection />
              <Testimonials />
              <FAQ />
              <Contact />
            </>
          )}
        </main>
        <Footer />
        {!isSpecialPage && <StickyWidgets />}
      </div>
    </AuthProvider>
  );
}
