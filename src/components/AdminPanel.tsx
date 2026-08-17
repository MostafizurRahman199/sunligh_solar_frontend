import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, DollarSign, Users as UsersIcon, Receipt, CheckCircle2, XCircle, RefreshCw, Clock, Search, LogOut, RotateCcw } from 'lucide-react';

interface AdminStats {
  totalTransactions: number;
  totalApprovedCount: number;
  totalRevenueAud: string;
}

interface PaymentRecord {
  id: string;
  transactionId: string;
  accessCode: string;
  amount: number;
  currency: string;
  status: 'APPROVED' | 'PENDING' | 'DECLINED' | 'REFUNDED';
  invoiceNumber: string;
  invoiceDescription: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: string;
  createdAt: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface UserRecord {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'CUSTOMER';
  createdAt: string;
}

export default function AdminPanel() {
  const { user, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'payments' | 'users'>('payments');

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [usersList, setUsersList] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const [refundingId, setRefundingId] = useState<string | null>(null);
  const [refundMessage, setRefundMessage] = useState<string | null>(null);

  const backendBase = (
    import.meta.env.VITE_BACKEND_URL ||
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000'
  )
    .replace(/\/api\/?$/, '')
    .replace(/\/$/, '');

  const fetchAdminData = () => {
    if (!token) return;
    setLoading(true);

    // Fetch payments & stats
    fetch(`${backendBase}/api/payments/eway/admin/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
        if (Array.isArray(data.payments)) setPayments(data.payments);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

    // Fetch users
    fetch(`${backendBase}/api/auth/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsersList(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAdminData();
  }, [token]);

  const handleRefund = async (transactionId: string, amount: number) => {
    if (!token || !transactionId) return;
    if (!window.confirm(`Are you sure you want to refund transaction #${transactionId} for $${(amount / 100).toFixed(2)} AUD?`)) return;

    setRefundingId(transactionId);
    setRefundMessage(null);

    try {
      const res = await fetch(`${backendBase}/api/payments/eway/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          transactionId,
          amount,
          reason: 'Admin initiated refund from control panel',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Refund failed');

      setRefundMessage(`Refund successful for transaction #${transactionId}`);
      fetchAdminData();
    } catch (err: any) {
      setRefundMessage(`Refund Error: ${err.message}`);
    } finally {
      setRefundingId(null);
    }
  };

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.invoiceNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.transactionId?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen py-32 bg-slate-900 text-white text-center px-4">
        <div className="max-w-md mx-auto bg-slate-800 p-8 rounded-3xl border border-slate-700">
          <ShieldCheck className="text-rose-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold font-heading mb-2">Access Restricted</h2>
          <p className="text-slate-400 text-sm mb-6">
            Administrator privileges are required to view this panel.
          </p>
          <a
            href="#/login"
            className="inline-block px-6 py-3 rounded-full bg-brand-orange text-white font-bold text-sm"
          >
            Sign in as Administrator
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Bar */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange rounded-2xl flex items-center justify-center font-bold text-xl">
              <ShieldCheck size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-white">
                  Sunlite Admin Control Panel
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-orange text-white text-xs font-bold uppercase">
                  Admin Mode
                </span>
              </div>
              <p className="text-slate-400 text-sm">Logged in as {user.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-all flex items-center gap-2 border border-slate-600 cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <DollarSign size={24} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase">Total Revenue (AUD)</div>
              <div className="text-2xl font-extrabold text-white">${stats?.totalRevenueAud || '0.00'}</div>
            </div>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <Receipt size={24} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase">Successful Payments</div>
              <div className="text-2xl font-extrabold text-white">
                {stats?.totalApprovedCount || 0} / {stats?.totalTransactions || 0}
              </div>
            </div>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <UsersIcon size={24} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase">Registered Users</div>
              <div className="text-2xl font-extrabold text-white">{usersList.length} Users</div>
            </div>
          </div>
        </div>

        {/* Refund Status Alert */}
        {refundMessage && (
          <div className="mb-6 p-4 bg-brand-orange/10 border border-brand-orange/30 rounded-2xl text-brand-orange text-sm font-semibold">
            {refundMessage}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-slate-700 mb-6 pb-2">
          <button
            onClick={() => setActiveTab('payments')}
            className={`pb-2 px-4 font-bold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === 'payments'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            All Payments ({payments.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-2 px-4 font-bold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Users & Roles ({usersList.length})
          </button>
        </div>

        {/* TAB 1: ALL PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by email, invoice #, TxID..."
                  className="w-full bg-slate-900/90 text-white pl-10 pr-4 py-2 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs text-slate-400 font-semibold">Filter Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-900/90 text-white px-3 py-2 rounded-xl border border-slate-700 text-xs font-semibold focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="APPROVED">Success / Paid</option>
                  <option value="PENDING">Pending</option>
                  <option value="DECLINED">Declined</option>
                  <option value="REFUNDED">Refunded</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-400">Loading payments...</div>
            ) : filteredPayments.length === 0 ? (
              <div className="py-12 text-center text-slate-400">No transactions found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 text-xs font-semibold uppercase">
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Customer Email</th>
                      <th className="py-3 px-4">Invoice #</th>
                      <th className="py-3 px-4">TxID</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {filteredPayments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="py-3.5 px-4 text-slate-300 font-medium">
                          {new Date(p.createdAt).toLocaleDateString('en-AU', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-white">
                          {p.customerEmail}
                          {p.user && (
                            <span className="block text-[10px] text-brand-orange font-semibold">
                              (Registered Customer)
                            </span>
                          )}
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
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                              <CheckCircle2 size={12} /> Success / Paid
                            </span>
                          ) : p.status === 'REFUNDED' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold">
                              <RefreshCw size={12} /> Refunded
                            </span>
                          ) : p.status === 'DECLINED' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold">
                              <XCircle size={12} /> Declined
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold">
                              <Clock size={12} /> Pending
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          {p.status === 'APPROVED' && p.transactionId && (
                            <button
                              onClick={() => handleRefund(p.transactionId, p.amount)}
                              disabled={refundingId === p.transactionId}
                              className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-semibold text-xs transition-all border border-rose-500/40 flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw size={12} />
                              <span>Refund</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: USERS & ROLES */}
        {activeTab === 'users' && (
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <h2 className="text-xl font-bold font-heading text-white mb-6">Registered System Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 text-xs font-semibold uppercase">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email Address</th>
                    <th className="py-3 px-4">System Role</th>
                    <th className="py-3 px-4">Registered Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{u.email}</td>
                      <td className="py-3.5 px-4">
                        {u.role === 'ADMIN' ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-brand-orange text-white text-xs font-extrabold uppercase">
                            Admin
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-300 text-xs font-semibold uppercase">
                            Customer
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-xs">
                        {new Date(u.createdAt).toLocaleDateString('en-AU', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
