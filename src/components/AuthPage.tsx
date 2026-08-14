import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User as UserIcon, Phone, ShieldCheck, AlertCircle, ArrowRight, Sun, CheckCircle2, Star, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const { login, register, user } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (user) {
    window.location.hash = user.role === 'ADMIN' ? '#/admin' : '#/dashboard';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLoginTab) {
        await login(email, password);
      } else {
        await register(email, password, firstName, lastName, phone);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 lg:py-28 bg-slate-950 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Glow Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="max-w-5xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 backdrop-blur-xl">
        
        {/* LEFT COLUMN: Sign In / Register Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center relative">
          
          {/* Header & Badges */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold mb-3">
              <ShieldCheck size={14} />
              <span>Sunlite Solar Customer & Admin Portal</span>
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-white">
              {isLoginTab ? 'Welcome Back!' : 'Create Your Account'}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {isLoginTab
                ? 'Sign in to access your solar payment records or administration control panel.'
                : 'Register to manage your solar package payments and track your invoice receipts.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-slate-950/80 p-1.5 rounded-2xl mb-6 border border-slate-800">
            <button
              type="button"
              onClick={() => { setIsLoginTab(true); setError(null); }}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isLoginTab
                  ? 'bg-gradient-brand text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsLoginTab(false); setError(null); }}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                !isLoginTab
                  ? 'bg-gradient-brand text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-2.5 text-rose-400 text-xs font-semibold">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginTab && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">First Name *</label>
                  <div className="relative">
                    <UserIcon size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-slate-950/90 text-white pl-10 pr-3.5 py-3 rounded-xl border border-slate-700/80 text-sm focus:border-brand-orange focus:outline-none"
                      placeholder="Write your first name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-slate-950/90 text-white px-3.5 py-3 rounded-xl border border-slate-700/80 text-sm focus:border-brand-orange focus:outline-none"
                    placeholder="Write your last name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/90 text-white pl-10 pr-3.5 py-3 rounded-xl border border-slate-700/80 text-sm focus:border-brand-orange focus:outline-none font-medium"
                  placeholder="Write your email address"
                />
              </div>
            </div>

            {!isLoginTab && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone (Optional)</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950/90 text-white pl-10 pr-3.5 py-3 rounded-xl border border-slate-700/80 text-sm focus:border-brand-orange focus:outline-none"
                    placeholder="Write your phone number"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/90 text-white pl-10 pr-10 py-3 rounded-xl border border-slate-700/80 text-sm focus:border-brand-orange focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400  transition-colors p-0.5 rounded cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-xl font-extrabold font-heading bg-gradient-brand text-white shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Processing...' : isLoginTab ? 'Sign In to Portal' : 'Create Account'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Guest Checkout Quick Link */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            <span>Want to pay an invoice without signing in? </span>
            <a href="#checkout" className="text-brand-orange font-bold hover:underline">
              Pay as Guest
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Sunlite Solar High Quality Visual Panel */}
        <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-8 text-white min-h-[580px] bg-slate-950">
          {/* Background Image with Gradient Overlay */}
          <img
            src="/solar_login_hero.jpg"
            alt="Sunlite Solar Installation"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          <div className="absolute inset-0 bg-brand-navy/30 mix-blend-multiply" />

          {/* Top Brand Pill */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
              <Sun className="text-brand-orange animate-spin-slow" size={18} />
              <span className="font-heading font-extrabold text-xs tracking-wide text-white">SUNLITE SOLAR</span>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full">
              Australia #1 Solar
            </span>
          </div>

          {/* Bottom Floating Glass Card & Badges */}
          <div className="relative z-10 space-y-4">
            {/* Rating Pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-xs text-amber-300 font-semibold">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
              <span>4.9/5 Rating (1,200+ Sydney Homes)</span>
            </div>

            {/* Showcase Glass Card */}
            <div className="bg-slate-900/85 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-2xl space-y-3">
              <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                <span>Powering Australian Homes Cleanly</span>
              </h3>
              
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span>25-Year Performance & Panel Warranty</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span>Integrated eWay Australia Payment Security</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span>Save Up to 75% on Quarterly Energy Bills</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
