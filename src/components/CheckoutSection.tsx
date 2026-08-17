import React, { useState, useEffect, useRef } from 'react';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertCircle,
  Loader2,
  Check,
  Receipt,
  Building,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

interface SelectOption {
  value: string;
  label: string;
}

// Custom Theme-Consistent Smooth Dropdown Select Component
function SmoothSelect({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  className = '',
}: {
  value: string;
  onChange: (val: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-slate-900/90 hover:bg-slate-900 text-white px-4 py-2.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-between gap-2 cursor-pointer outline-none ${
          isOpen ? 'border-brand-orange ring-2 ring-brand-orange/30 shadow-lg shadow-brand-orange/10' : 'border-slate-700 hover:border-slate-600'
        }`}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown
          size={16}
          className={`text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-brand-orange' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-60 overflow-y-auto custom-scrollbar bg-slate-900/95 border border-slate-700/90 rounded-2xl shadow-2xl backdrop-blur-xl p-1.5 space-y-0.5"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-orange/20 text-brand-orange border border-brand-orange/30 font-bold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check size={14} className="text-brand-orange" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CheckoutSection() {
  const { user, token } = useAuth();
  const [amountInput, setAmountInput] = useState<string>('');
  const [invoiceNumberInput, setInvoiceNumberInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('Solar System Payment');

  // Customer details state
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    suburb: '',
    state: 'NSW',
    postcode: '',
  });

  // Auto fill customer details from logged in user if empty
  useEffect(() => {
    if (user) {
      setCustomer((prev) => ({
        ...prev,
        firstName: prev.firstName || user.firstName || '',
        lastName: prev.lastName || user.lastName || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  const [paymentMethod, setPaymentMethod] = useState<'eway_shared' | 'eway_direct'>('eway_shared');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiryMonth: '02',
    expiryYear: '28',
    cvn: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<any | null>(null);
  const [gatewayConfig, setGatewayConfig] = useState<{ mode: string; mockMode: boolean } | null>(null);

  // Dynamic options for dropdowns
  const stateOptions: SelectOption[] = [
    { value: 'NSW', label: 'NSW - New South Wales' },
    { value: 'VIC', label: 'VIC - Victoria' },
    { value: 'QLD', label: 'QLD - Queensland' },
    { value: 'ACT', label: 'ACT - Australian Capital Territory' },
    { value: 'SA', label: 'SA - South Australia' },
    { value: 'WA', label: 'WA - Western Australia' },
    { value: 'TAS', label: 'TAS - Tasmania' },
    { value: 'NT', label: 'NT - Northern Territory' },
  ];

  const expiryMonthOptions: SelectOption[] = Array.from({ length: 12 }, (_, i) => {
    const val = (i + 1).toString().padStart(2, '0');
    const monthNames = [
      '01 - January',
      '02 - February',
      '03 - March',
      '04 - April',
      '05 - May',
      '06 - June',
      '07 - July',
      '08 - August',
      '09 - September',
      '10 - October',
      '11 - November',
      '12 - December',
    ];
    return {
      value: val,
      label: monthNames[i],
    };
  });

  // Dynamic 100-year range for Expiry Year (Current year up to 2126+)
  const currentFullYear = new Date().getFullYear();
  const expiryYearOptions: SelectOption[] = Array.from({ length: 100 }, (_, i) => {
    const fullYr = currentFullYear + i;
    const shortYr = fullYr.toString().slice(-2);
    return {
      value: shortYr,
      label: `${fullYr}`,
    };
  });

  // Dynamic backend API URL from .env
  const backendBase = (
    import.meta.env.VITE_BACKEND_URL ||
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000'
  )
    .replace(/\/api\/?$/, '')
    .replace(/\/$/, '');
  const ewayEndpoint = `${backendBase}/api/payments/eway`;

  // Handle return redirect from eWay with AccessCode in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const accessCode = searchParams.get('AccessCode') || searchParams.get('accessCode');
    if (accessCode) {
      setLoading(true);
      fetch(`${ewayEndpoint}/complete/${accessCode}`)
        .then((res) => res.json())
        .then((data) => {
          setPaymentSuccess(data);
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(() => setErrorMessage('Failed to complete eWay payment verification.'))
        .finally(() => setLoading(false));
    }
  }, [ewayEndpoint]);

  const resetForm = () => {
    setAmountInput('');
    setInvoiceNumberInput('');
    setDescriptionInput('Solar System Payment');
    setCustomer({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      street: '',
      suburb: '',
      state: 'NSW',
      postcode: '',
    });
    setCardDetails({
      name: '',
      number: '',
      expiryMonth: '02',
      expiryYear: '28',
      cvn: '',
    });
    setErrorMessage(null);
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const parsedAmount = parseFloat(amountInput);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('Please enter a valid payment amount greater than $0 AUD.');
      setLoading(false);
      return;
    }

    const calculatedAmountInCents = Math.round(parsedAmount * 100);

    try {
      const backendUrl = ewayEndpoint;

      if (paymentMethod === 'eway_shared') {
        // eWay Hosted Page Flow (Access Code)
        const res = await fetch(`${backendUrl}/create-access-code`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            amount: calculatedAmountInCents,
            currencyCode: 'AUD',
            invoiceNumber: invoiceNumberInput || `SUN-${Date.now().toString().slice(-6)}`,
            invoiceDescription: descriptionInput || 'Sunlite Solar Payment',
            customer: {
              firstName: customer.firstName,
              lastName: customer.lastName,
              email: customer.email,
              phone: customer.phone,
              street: customer.street,
              city: customer.suburb,
              state: customer.state,
              postalCode: customer.postcode,
              country: 'AU',
            },
            redirectUrl: window.location.origin,
            cancelUrl: window.location.origin,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to initiate eWay session.');
        }

        if (data.AccessCode) {
          if (data.AccessCode.startsWith('MOCK-')) {
            // Verify mock immediately
            const completeRes = await fetch(`${backendUrl}/complete/${data.AccessCode}`);
            const completeData = await completeRes.json();
            resetForm();
            setPaymentSuccess(completeData);
          } else if (data.FormUrl) {
            // Redirect to live/sandbox eWay shared payment page
            resetForm();
            window.location.href = data.FormUrl;
          }
        }
      } else {
        // Direct Card Payment
        const res = await fetch(`${backendUrl}/direct`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            amount: calculatedAmountInCents,
            currencyCode: 'AUD',
            invoiceNumber: invoiceNumberInput || `SUN-${Date.now().toString().slice(-6)}`,
            customer: {
              firstName: customer.firstName,
              lastName: customer.lastName,
              email: customer.email,
              phone: customer.phone,
              street: customer.street,
              city: customer.suburb,
              state: customer.state,
              postalCode: customer.postcode,
              country: 'AU',
            },
            cardDetails: {
              name: cardDetails.name || `${customer.firstName} ${customer.lastName}`,
              number: cardDetails.number.replace(/\s+/g, ''),
              expiryMonth: cardDetails.expiryMonth,
              expiryYear: cardDetails.expiryYear,
              cvn: cardDetails.cvn,
            },
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Payment processing failed.');
        }

        resetForm();
        setPaymentSuccess(data);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during payment processing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="checkout" className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Solar Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-4">
            <ShieldCheck size={18} className="text-brand-yellow" />
            <span>eWay 256-Bit Encrypted Payment Portal</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4 tracking-tight">
            Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-orange">Checkout & Invoice Payment</span>
          </h2>
          <p className="text-lg text-slate-300">
            Pay your deposit or invoice balance directly via Australia's trusted eWay payment gateway.
          </p>
        </div>

        {/* Payment Form Container */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md">
          {paymentSuccess ? (
            /* Success Receipt Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/40">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-bold font-heading text-white mb-2">
                Payment Successful!
              </h3>
              <p className="text-slate-300 mb-6">
                Your payment to <strong className="text-white">Sunlite Solar Australia</strong> has been processed successfully.
              </p>

              <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 max-w-md mx-auto text-left text-sm mb-8 space-y-3">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Transaction ID:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    #{paymentSuccess.transactionId}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Invoice Number:</span>
                  <span className="text-white font-medium">{paymentSuccess.invoiceNumber}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Amount Paid:</span>
                  <span className="text-white font-bold">
                    ${(paymentSuccess.amount / 100).toFixed(2)} AUD
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Gateway Status:</span>
                  <span className="text-emerald-400 font-semibold">
                    {paymentSuccess.responseMessage || 'Approved'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setPaymentSuccess(null);
                  resetForm();
                }}
                className="bg-gradient-brand text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                Make Another Payment
              </button>
            </motion.div>
          ) : (
            /* Direct Checkout Form */
            <form onSubmit={handleProcessPayment}>
              {/* Payment Details Section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold font-heading text-white mb-4 flex items-center gap-2 pb-2 border-b border-slate-700">
                  <Receipt className="text-brand-yellow" size={20} />
                  <span>1. Payment & Invoice Information</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Payment Amount (AUD $) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-brand-yellow font-extrabold text-base">
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="1"
                        required
                        value={amountInput}
                        onChange={(e) => setAmountInput(e.target.value)}
                        className="w-full bg-slate-900/90 text-white pl-9 pr-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:border-brand-orange font-bold text-base"
                        placeholder="Write payment amount"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Invoice / Deposit Ref # (Optional)
                    </label>
                    <input
                      type="text"
                      value={invoiceNumberInput}
                      onChange={(e) => setInvoiceNumberInput(e.target.value)}
                      className="w-full bg-slate-900/90 text-white px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-orange text-sm font-medium"
                      placeholder="Write your invoice reference number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Payment Description
                    </label>
                    <input
                      type="text"
                      value={descriptionInput}
                      onChange={(e) => setDescriptionInput(e.target.value)}
                      className="w-full bg-slate-900/90 text-white px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-orange text-sm"
                      placeholder="Write payment description"
                    />
                  </div>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="mb-8">
                <h3 className="text-lg font-bold font-heading text-white mb-4 flex items-center gap-2 pb-2 border-b border-slate-700">
                  <Building className="text-brand-yellow" size={20} />
                  <span>2. Customer Details</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.firstName}
                      onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                      className="w-full bg-slate-900/80 text-white px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-orange text-sm"
                      placeholder="Write your first name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.lastName}
                      onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                      className="w-full bg-slate-900/80 text-white px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-orange text-sm"
                      placeholder="Write your last name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address (For eWay Receipt) *
                    </label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full bg-slate-900/80 text-white px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-orange text-sm"
                      placeholder="Write your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full bg-slate-900/80 text-white px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-orange text-sm"
                      placeholder="Write your phone number"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={customer.street}
                      onChange={(e) => setCustomer({ ...customer, street: e.target.value })}
                      className="w-full bg-slate-900/80 text-white px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-orange text-sm"
                      placeholder="Write your street address"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Suburb</label>
                    <input
                      type="text"
                      value={customer.suburb}
                      onChange={(e) => setCustomer({ ...customer, suburb: e.target.value })}
                      className="w-full bg-slate-900/80 text-white px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-orange text-sm"
                      placeholder="Write your suburb"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">State</label>
                    <SmoothSelect
                      value={customer.state}
                      onChange={(val) => setCustomer({ ...customer, state: val })}
                      options={stateOptions}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Postcode</label>
                    <input
                      type="text"
                      value={customer.postcode}
                      onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
                      className="w-full bg-slate-900/80 text-white px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-orange text-sm"
                      placeholder="Write your postcode"
                    />
                  </div>
                </div>
              </div>

            
              {/* Error Display */}
              {errorMessage && (
                <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-400 text-sm">
                  <AlertCircle size={20} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-bold font-heading text-lg bg-gradient-brand text-white shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    <span>Connecting to eWay Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    <span>
                      Pay {amountInput ? `$${amountInput} AUD` : 'Now'} via eWay
                    </span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  256-Bit SSL Protection
                </span>
                <span>•</span>
                <span>Powered by eWay Payments Australia</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
