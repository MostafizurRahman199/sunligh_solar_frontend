import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { motion } from 'motion/react';

export default function CheckoutSection() {
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

  const [paymentMethod, setPaymentMethod] = useState<'eway_shared' | 'eway_direct'>('eway_shared');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiryMonth: '12',
    expiryYear: '28',
    cvn: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<any | null>(null);
  const [gatewayConfig, setGatewayConfig] = useState<{ mode: string; mockMode: boolean } | null>(null);

  // Dynamic backend API URL from .env
  const backendBase = (
    import.meta.env.VITE_BACKEND_URL ||
    'http://localhost:5000'
  ).replace(/\/$/, '');
  const ewayEndpoint = `${backendBase}/api/payments/eway`;

  // Fetch eWay gateway config status on mount
  useEffect(() => {
    fetch(`${ewayEndpoint}/config`)
      .then((res) => res.json())
      .then((data) => setGatewayConfig(data))
      .catch(() => {
        setGatewayConfig({ mode: 'sandbox', mockMode: true });
      });
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
      expiryMonth: '12',
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
          headers: { 'Content-Type': 'application/json' },
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
            redirectUrl: window.location.origin + '/#/checkout?status=success',
            cancelUrl: window.location.origin + '/#/checkout?status=cancel',
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
          headers: { 'Content-Type': 'application/json' },
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-sm font-semibold mb-4">
            <ShieldCheck size={16} />
            <span>eWay 256-Bit Encrypted Payment Portal</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4 tracking-tight">
            Online <span className="text-gradient">Checkout & Invoice Payment</span>
          </h2>
          <p className="text-lg text-slate-300">
            Pay your deposit or invoice balance directly via Australia's trusted eWay payment gateway.
          </p>

          {/* eWay Gateway Info */}
          {gatewayConfig && (
            <div className="mt-4 inline-flex items-center gap-2 text-xs px-3 py-1 bg-slate-800/90 border border-slate-700 rounded-full text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gateway: eWay Australia ({gatewayConfig.mode.toUpperCase()})</span>
              {gatewayConfig.mockMode && (
                <span className="text-amber-400 font-semibold">• Sandbox Mock Mode</span>
              )}
            </div>
          )}
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
                  <Receipt className="text-brand-orange" size={20} />
                  <span>1. Payment & Invoice Information</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Payment Amount (AUD $) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-brand-orange font-extrabold text-base">
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
                  <Building className="text-brand-orange" size={20} />
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
                    <select
                      value={customer.state}
                      onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                      className="w-full bg-slate-900/80 text-white px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-orange text-sm"
                    >
                      <option value="NSW">NSW</option>
                      <option value="VIC">VIC</option>
                      <option value="QLD">QLD</option>
                      <option value="ACT">ACT</option>
                      <option value="SA">SA</option>
                      <option value="WA">WA</option>
                      <option value="TAS">TAS</option>
                    </select>
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

              {/* Payment Method Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-bold font-heading text-white mb-4 flex items-center gap-2 pb-2 border-b border-slate-700">
                  <CreditCard className="text-brand-orange" size={20} />
                  <span>3. Payment Gateway Method</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setPaymentMethod('eway_shared')}
                    className={`cursor-pointer p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                      paymentMethod === 'eway_shared'
                        ? 'bg-slate-900 border-brand-orange text-white ring-1 ring-brand-orange/50'
                        : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        paymentMethod === 'eway_shared'
                          ? 'border-brand-orange bg-brand-orange text-white'
                          : 'border-slate-600'
                      }`}
                    >
                      {paymentMethod === 'eway_shared' && <Check size={12} />}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">eWay Hosted Payment Page</div>
                      <div className="text-xs text-slate-400">
                        Official eWay Australia secure checkout redirect
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('eway_direct')}
                    className={`cursor-pointer p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                      paymentMethod === 'eway_direct'
                        ? 'bg-slate-900 border-brand-orange text-white ring-1 ring-brand-orange/50'
                        : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        paymentMethod === 'eway_direct'
                          ? 'border-brand-orange bg-brand-orange text-white'
                          : 'border-slate-600'
                      }`}
                    >
                      {paymentMethod === 'eway_direct' && <Check size={12} />}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">Direct Card Entry</div>
                      <div className="text-xs text-slate-400">
                        Process directly using eWay Rapid API
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Card Inputs if selected */}
              {paymentMethod === 'eway_direct' && (
                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-700 mb-8 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === 'eway_direct'}
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      className="w-full bg-slate-800 text-white px-4 py-2.5 rounded-xl border border-slate-600 text-sm"
                      placeholder="Write cardholder name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === 'eway_direct'}
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full bg-slate-800 text-white px-4 py-2.5 rounded-xl border border-slate-600 text-sm font-mono"
                      placeholder="Write credit card number"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Expiry Month
                      </label>
                      <select
                        value={cardDetails.expiryMonth}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiryMonth: e.target.value })}
                        className="w-full bg-slate-800 text-white px-3 py-2 rounded-xl border border-slate-600 text-sm"
                      >
                        {Array.from({ length: 12 }, (_, i) => {
                          const val = (i + 1).toString().padStart(2, '0');
                          return (
                            <option key={val} value={val}>
                              {val}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Expiry Year
                      </label>
                      <select
                        value={cardDetails.expiryYear}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiryYear: e.target.value })}
                        className="w-full bg-slate-800 text-white px-3 py-2 rounded-xl border border-slate-600 text-sm"
                      >
                        {Array.from({ length: 10 }, (_, i) => {
                          const yr = (26 + i).toString();
                          return (
                            <option key={yr} value={yr}>
                              20{yr}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        CVN / CVC *
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        required={paymentMethod === 'eway_direct'}
                        value={cardDetails.cvn}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvn: e.target.value })}
                        className="w-full bg-slate-800 text-white px-3 py-2 rounded-xl border border-slate-600 text-sm font-mono"
                        placeholder="Write CVN"
                      />
                    </div>
                  </div>
                </div>
              )}

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
