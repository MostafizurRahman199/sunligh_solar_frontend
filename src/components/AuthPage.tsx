import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User as UserIcon, Phone, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const { login, register, user } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleFillAdmin = () => {
    setIsLoginTab(true);
    setEmail('admin@sunlitesolar.com.au');
    setPassword('AdminSunlite2026!');
  };

  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/20 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold mb-3">
            <ShieldCheck size={14} />
            <span>Secure Customer & Admin Portal</span>
          </div>
          <h2 className="text-3xl font-extrabold font-heading text-white">
            {isLoginTab ? 'Sign In to Account' : 'Create Account'}
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Access your solar payment history or administrator dashboard
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl mb-6 border border-slate-700">
          <button
            type="button"
            onClick={() => { setIsLoginTab(true); setError(null); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              isLoginTab ? 'bg-brand-orange text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLoginTab(false); setError(null); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              !isLoginTab ? 'bg-brand-orange text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Admin Quick Fill Badge */}
        <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs">
          <span className="text-amber-300 font-medium">Test Admin Login Available</span>
          <button
            type="button"
            onClick={handleFillAdmin}
            className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 px-2.5 py-1 rounded-lg font-bold transition-all border border-amber-400/40"
          >
            Auto-fill Admin
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2 text-rose-400 text-xs">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginTab && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">First Name *</label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-slate-900/90 text-white pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 text-sm focus:border-brand-orange focus:outline-none"
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
                  className="w-full bg-slate-900/90 text-white px-3 py-2.5 rounded-xl border border-slate-700 text-sm focus:border-brand-orange focus:outline-none"
                  placeholder="Write your last name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/90 text-white pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 text-sm focus:border-brand-orange focus:outline-none"
                placeholder="Write your email address"
              />
            </div>
          </div>

          {!isLoginTab && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone (Optional)</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900/90 text-white pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 text-sm focus:border-brand-orange focus:outline-none"
                  placeholder="Write your phone number"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password *</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/90 text-white pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 text-sm focus:border-brand-orange focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl font-bold font-heading bg-gradient-brand text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isLoginTab ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
