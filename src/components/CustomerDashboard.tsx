import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Clock, XCircle, RefreshCw, User, Receipt, LogOut, ArrowRight } from 'lucide-react';

interface PaymentItem {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: 'APPROVED' | 'PENDING' | 'DECLINED' | 'REFUNDED';
  invoiceNumber: string;
  invoiceDescription: string;
  paymentMethod: string;
  createdAt: string;
}

export default function CustomerDashboard() {
  const { user, token, logout } = useAuth();
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const backendBase = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '');

  useEffect(() => {
    if (token) {
      fetch(`${backendBase}/api/payments/eway/my-history`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setPayments(data);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [token]);

  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header card */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange rounded-2xl flex items-center justify-center font-bold text-xl">
              <User size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-white">
                Welcome, {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-slate-400 text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#checkout"
              className="px-5 py-2.5 rounded-xl bg-gradient-brand text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Make New Payment</span>
              <ArrowRight size={16} />
            </a>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-all flex items-center gap-2 border border-slate-600"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* History Table Card */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
            <Receipt className="text-brand-orange" size={24} />
            <h2 className="text-xl font-bold font-heading text-white">
              My Payment History
            </h2>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400">Loading payment history...</div>
          ) : payments.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-lg font-semibold mb-2">No payments recorded yet.</p>
              <p className="text-xs">Any payments made while logged into your account will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 text-xs font-semibold uppercase">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">TxID</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="py-3.5 px-4 text-slate-300 font-medium">
                        {new Date(p.createdAt).toLocaleDateString('en-AU', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-white">
                        {p.invoiceNumber}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                        {p.transactionId ? `#${p.transactionId}` : 'N/A'}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        ${(p.amount / 100).toFixed(2)} AUD
                      </td>
                      <td className="py-3.5 px-4">
                        {p.status === 'APPROVED' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                            <CheckCircle2 size={14} />
                            Success / Paid
                          </span>
                        ) : p.status === 'REFUNDED' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold">
                            <RefreshCw size={14} />
                            Refunded
                          </span>
                        ) : p.status === 'DECLINED' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold">
                            <XCircle size={14} />
                            Declined
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold">
                            <Clock size={14} />
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
