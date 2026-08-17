import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  DollarSign,
  Users as UsersIcon,
  Receipt,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Clock,
  Search,
  LogOut,
  RotateCcw,
  Phone,
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import Swal from 'sweetalert2';

interface AdminStats {
  totalTransactions: number;
  totalApprovedCount: number;
  totalRevenueAud: string;
  dailyRevenueAud?: string;
  weeklyRevenueAud?: string;
  monthlyRevenueAud?: string;
  yearlyRevenueAud?: string;
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

const themeSwal = Swal.mixin({
  customClass: {
    popup: 'bg-slate-900 border border-slate-700 rounded-3xl text-white shadow-2xl p-6 font-sans',
    title: 'text-xl font-bold font-heading text-white mb-2',
    htmlContainer: 'text-slate-300 text-sm mt-2 mb-4 leading-relaxed',
    confirmButton:
      'bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-md transition-all mx-2 text-sm',
    cancelButton:
      'bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-md transition-all mx-2 text-sm',
  },
  buttonsStyling: false,
  background: '#0f172a',
  color: '#ffffff',
});

export default function AdminPanel() {
  const { user, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'payments' | 'users'>('payments');

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [usersList, setUsersList] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [refundingId, setRefundingId] = useState<string | null>(null);

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

    const formattedAmount = (amount / 100).toFixed(2);
    const result = await themeSwal.fire({
      title: 'Confirm Payment Refund',
      html: `Are you sure you want to refund transaction <b class="text-brand-orange font-mono">#${transactionId}</b> for <b class="text-emerald-400 font-bold">$${formattedAmount} AUD</b>?<br/><span class="text-xs text-slate-400 mt-2 block">This action will communicate directly with eWay Australia to return funds to the customer.</span>`,
      icon: 'warning',
      iconColor: '#f97316',
      showCancelButton: true,
      confirmButtonText: 'Yes, Process Refund',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    setRefundingId(transactionId);

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
      if (!res.ok) throw new Error(data.message || 'Refund processing failed');

      await themeSwal.fire({
        title: 'Refund Successful',
        html: `Transaction <b class="text-brand-orange font-mono">#${transactionId}</b> ($${formattedAmount} AUD) has been successfully refunded via eWay.`,
        icon: 'success',
        iconColor: '#10b981',
      });

      fetchAdminData();
    } catch (err: any) {
      themeSwal.fire({
        title: 'Refund Error',
        text: err.message || 'Failed to complete refund operation.',
        icon: 'error',
        iconColor: '#ef4444',
      });
    } finally {
      setRefundingId(null);
    }
  };

  const filteredPayments = payments.filter((p) => {
    const fullName = `${p.customerFirstName || ''} ${p.customerLastName || ''}`.trim().toLowerCase();
    const userFullName = p.user ? `${p.user.firstName || ''} ${p.user.lastName || ''}`.trim().toLowerCase() : '';
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      !query ||
      fullName.includes(query) ||
      userFullName.includes(query) ||
      p.customerEmail?.toLowerCase().includes(query) ||
      p.customerPhone?.toLowerCase().includes(query) ||
      p.invoiceNumber?.toLowerCase().includes(query) ||
      p.transactionId?.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Reset pagination on search query or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage) || 1;
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      <div className="max-w-7xl mx-auto">
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

        {/* Revenue Breakdown & Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Total Revenue */}
          <div className="bg-slate-800/90 border border-brand-orange/40 rounded-2xl p-5 shadow-xl flex items-center gap-3.5 ring-1 ring-brand-orange/20">
            <div className="w-11 h-11 rounded-xl bg-brand-orange/20 text-brand-orange flex items-center justify-center font-bold shrink-0">
              <DollarSign size={22} />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Total Revenue</div>
              <div className="text-xl font-black text-white">${stats?.totalRevenueAud || '0.00'}</div>
            </div>
          </div>

          {/* Daily Revenue */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
              <TrendingUp size={22} />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Daily Revenue</div>
              <div className="text-xl font-black text-white">${stats?.dailyRevenueAud || '0.00'}</div>
            </div>
          </div>

          {/* Weekly Revenue */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">
              <Calendar size={22} />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Weekly Revenue</div>
              <div className="text-xl font-black text-white">${stats?.weeklyRevenueAud || '0.00'}</div>
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
              <Calendar size={22} />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Monthly Revenue</div>
              <div className="text-xl font-black text-white">${stats?.monthlyRevenueAud || '0.00'}</div>
            </div>
          </div>

          {/* Yearly Revenue */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold shrink-0">
              <Calendar size={22} />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Yearly Revenue</div>
              <div className="text-xl font-black text-white">${stats?.yearlyRevenueAud || '0.00'}</div>
            </div>
          </div>
        </div>

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
              <div className="relative w-full md:w-96">
                <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, phone, email, invoice #, TxID..."
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
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-400 text-xs font-semibold uppercase">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Customer Name</th>
                        <th className="py-3 px-4">Contact Info</th>
                        <th className="py-3 px-4">Invoice #</th>
                        <th className="py-3 px-4">TxID</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {paginatedPayments.map((p) => {
                        const displayName =
                          `${p.customerFirstName || ''} ${p.customerLastName || ''}`.trim() ||
                          (p.user ? `${p.user.firstName} ${p.user.lastName}` : 'Guest Customer');

                        return (
                          <tr key={p.id} className="hover:bg-slate-700/30 transition-colors">
                            <td className="py-3.5 px-4 text-slate-300 font-medium whitespace-nowrap text-xs">
                              {new Date(p.createdAt).toLocaleDateString('en-AU', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-white">
                              <div className="flex items-center gap-1.5">
                                <UserIcon size={14} className="text-brand-orange" />
                                <span>{displayName}</span>
                              </div>
                              {p.user && (
                                <span className="block text-[10px] text-brand-orange font-semibold mt-0.5">
                                  (Registered Member)
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 font-medium text-slate-300">
                              <div className="text-white text-xs">{p.customerEmail}</div>
                              {p.customerPhone && (
                                <div className="text-xs text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                                  <Phone size={11} className="text-brand-orange" />
                                  <span>{p.customerPhone}</span>
                                </div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 font-mono font-semibold text-white text-xs">
                              {p.invoiceNumber}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                              {p.transactionId ? `#${p.transactionId}` : 'N/A'}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
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
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-700 text-xs text-slate-400">
                  <div>
                    Showing <span className="text-white font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="text-white font-bold">{Math.min(currentPage * itemsPerPage, filteredPayments.length)}</span> of{' '}
                    <span className="text-white font-bold">{filteredPayments.length}</span> transactions
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft size={14} />
                      <span>Previous</span>
                    </button>
                    <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-brand-orange font-bold border border-slate-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </>
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
