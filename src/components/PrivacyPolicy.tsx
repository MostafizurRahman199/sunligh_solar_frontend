import React from 'react';
import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-8">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none prose-lg">
            <p className="text-slate-500 mb-8">Effective Date: 2 July 2026</p>
            
            <p className="text-slate-600 mb-6">
              Sunlite Solar Pty Ltd (“Sunlite Solar”, “we”, “our” or “us”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, store and protect your personal information when you visit www.sunlitesolar.com.au, request a quotation, purchase our products or services, or otherwise interact with our business.
              We are committed to handling personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
            </p>
            <p className="text-slate-600 mb-6">
              By using our website or engaging our services, you acknowledge that you have read and understood this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">1. Information We Collect</h2>
            <p className="text-slate-600 mb-4">Depending on how you interact with us, we may collect the following information:</p>
            
            <h3 className="text-xl font-bold text-brand-navy mt-6 mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Full name</li>
              <li>Residential or business address</li>
              <li>Email address</li>
              <li>Telephone number</li>
              <li>Company name (where applicable)</li>
              <li>ABN (for business customers)</li>
              <li>Date of installation</li>
              <li>Service history</li>
              <li>Payment information</li>
              <li>Communication records</li>
            </ul>

            <h3 className="text-xl font-bold text-brand-navy mt-6 mb-3">Property Information</h3>
            <p className="text-slate-600 mb-4">To provide accurate quotations and installation services, we may collect:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Property address</li>
              <li>Roof dimensions</li>
              <li>Roof type and condition</li>
              <li>Existing electrical infrastructure</li>
              <li>Electricity consumption</li>
              <li>Electricity retailer information</li>
              <li>Meter details</li>
              <li>Switchboard information</li>
              <li>Photographs of the property</li>
              <li>Satellite or aerial imagery used for system design</li>
            </ul>

            <h3 className="text-xl font-bold text-brand-navy mt-6 mb-3">Technical Information</h3>
            <p className="text-slate-600 mb-4">When you visit our website, we may automatically collect:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Pages viewed</li>
              <li>Time spent on pages</li>
              <li>Referral website</li>
              <li>Website usage statistics</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">2. How We Collect Information</h2>
            <p className="text-slate-600 mb-4">We collect personal information directly from you when you:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Submit an online enquiry</li>
              <li>Request a quotation</li>
              <li>Contact us by phone or email</li>
              <li>Complete our contact form</li>
              <li>Request maintenance or repairs</li>
              <li>Purchase products or services</li>
              <li>Subscribe to newsletters</li>
              <li>Participate in promotions</li>
              <li>Leave customer reviews</li>
            </ul>
            <p className="text-slate-600 mb-4">We may also collect information from:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Your authorised representatives</li>
              <li>Electricity distributors</li>
              <li>Energy retailers</li>
              <li>Government rebate authorities</li>
              <li>Clean Energy Regulator processes where applicable</li>
              <li>Publicly available sources</li>
              <li>Credit reporting agencies (where permitted by law)</li>
              <li>Third-party service providers assisting with installation or administration</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">3. Why We Collect Your Information</h2>
            <p className="text-slate-600 mb-4">We collect your information so we can:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Prepare accurate quotations</li>
              <li>Design suitable solar systems</li>
              <li>Arrange site inspections</li>
              <li>Install solar and battery systems</li>
              <li>Process customer payments</li>
              <li>Manage warranty claims</li>
              <li>Provide maintenance services</li>
              <li>Respond to enquiries</li>
              <li>Communicate throughout your project</li>
              <li>Meet legal and regulatory obligations</li>
              <li>Improve our products and customer service</li>
              <li>Detect fraud or unlawful activity</li>
              <li>Protect our business and customers</li>
            </ul>
            <p className="text-slate-600 mb-6">Where required by law, we will seek your consent before collecting sensitive information.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">4. Website Cookies and Analytics</h2>
            <p className="text-slate-600 mb-4">Our website uses cookies and similar technologies to improve your browsing experience.</p>
            <p className="text-slate-600 mb-4">Cookies help us:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Remember user preferences</li>
              <li>Improve website performance</li>
              <li>Analyse visitor behaviour</li>
              <li>Understand how customers use our website</li>
              <li>Improve website functionality</li>
              <li>Deliver relevant marketing where consent has been provided</li>
            </ul>
            <p className="text-slate-600 mb-4">We may use website analytics tools such as:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Google Analytics</li>
              <li>Google Search Console</li>
              <li>Google Ads conversion tracking</li>
              <li>Meta Pixel (Facebook)</li>
              <li>Other reputable website analytics platforms</li>
            </ul>
            <p className="text-slate-600 mb-6">These services may collect anonymous statistical information regarding website usage. You can disable cookies through your browser settings. However, some features of our website may not function correctly if cookies are disabled.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">5. Marketing Communications</h2>
            <p className="text-slate-600 mb-4">With your consent, we may send information regarding:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>New products</li>
              <li>Solar offers</li>
              <li>Battery promotions</li>
              <li>Energy-saving advice</li>
              <li>Government rebate updates</li>
              <li>Company news</li>
              <li>Maintenance reminders</li>
            </ul>
            <p className="text-slate-600 mb-4">You may unsubscribe from marketing communications at any time by:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Clicking the unsubscribe link in our emails;</li>
              <li>Contacting us directly; or</li>
              <li>Requesting removal from our marketing database.</li>
            </ul>
            <p className="text-slate-600 mb-6">We will process unsubscribe requests as soon as reasonably practicable.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">6. Disclosure of Personal Information</h2>
            <p className="text-slate-600 mb-4">Sunlite Solar may disclose your personal information where reasonably necessary to provide our products and services, including to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Employees and authorised contractors;</li>
              <li>Licensed electricians, installers and subcontractors;</li>
              <li>Network electricity distributors;</li>
              <li>Energy retailers;</li>
              <li>Government agencies administering solar incentive or rebate programs;</li>
              <li>Product manufacturers for warranty registration and claims;</li>
              <li>Finance providers (where you apply for finance);</li>
              <li>Payment processing providers;</li>
              <li>Information technology and cloud service providers;</li>
              <li>Professional advisers, including accountants, auditors and legal advisers; and</li>
              <li>Regulatory authorities where disclosure is required by law.</li>
            </ul>
            <p className="text-slate-600 mb-6">We do not sell, rent or trade your personal information to third parties for their independent marketing purposes.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">7. Overseas Disclosure</h2>
            <p className="text-slate-600 mb-6">Some of our software providers, cloud storage providers or technology partners may store or process information on servers located outside Australia. Where personal information is transferred overseas, we take reasonable steps to ensure that the recipient handles the information in a manner consistent with the Australian Privacy Principles or is otherwise subject to comparable privacy obligations.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">8. Data Security</h2>
            <p className="text-slate-600 mb-4">We take reasonable administrative, technical and physical measures to protect personal information against misuse, interference, loss, unauthorised access, modification or disclosure. These measures may include:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Secure computer systems;</li>
              <li>Password-protected databases;</li>
              <li>Encryption where appropriate;</li>
              <li>Firewall and antivirus protection;</li>
              <li>Access controls for authorised personnel only; and</li>
              <li>Secure document storage and disposal procedures.</li>
            </ul>
            <p className="text-slate-600 mb-6">While we take reasonable precautions, no method of transmitting information over the internet or storing electronic data can be guaranteed to be completely secure. Accordingly, we cannot guarantee absolute security.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">9. Data Retention</h2>
            <p className="text-slate-600 mb-4">We retain personal information only for as long as it is reasonably necessary to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Provide our services;</li>
              <li>Manage warranties;</li>
              <li>Meet taxation, accounting and legal obligations;</li>
              <li>Resolve disputes;</li>
              <li>Enforce our contractual rights; and</li>
              <li>Comply with applicable Australian laws.</li>
            </ul>
            <p className="text-slate-600 mb-6">When personal information is no longer required, we will take reasonable steps to securely destroy or de-identify it unless we are legally required to retain it.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">10. Access to Your Personal Information</h2>
            <p className="text-slate-600 mb-6">You may request access to the personal information we hold about you. Requests should be made in writing using the contact details below. We will respond within a reasonable period and may require proof of identity before providing access. Access may be refused where permitted under the Privacy Act 1988 (Cth), including where disclosure would unreasonably impact the privacy of another person or where legal privilege applies.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">11. Correction of Personal Information</h2>
            <p className="text-slate-600 mb-6">If you believe any personal information we hold is inaccurate, incomplete, out of date or misleading, you may request that we correct it. We will take reasonable steps to investigate your request and, where appropriate, update our records promptly.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">12. Third-Party Websites</h2>
            <p className="text-slate-600 mb-6">Our website may contain links to third-party websites, including manufacturers, government agencies, finance providers or industry organisations. We are not responsible for the privacy practices or content of those external websites. We encourage users to review the privacy policies of any third-party website before providing personal information.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">13. Children’s Privacy</h2>
            <p className="text-slate-600 mb-6">Our website and services are intended for adults. We do not knowingly collect personal information from children under the age of 16 years without appropriate parental or guardian consent. If we become aware that such information has been collected unintentionally, we will take reasonable steps to remove it.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">14. Making a Privacy Complaint</h2>
            <p className="text-slate-600 mb-6">If you believe we have breached your privacy or mishandled your personal information, you may submit a complaint to us in writing. We will acknowledge your complaint, investigate the matter and endeavour to provide a written response within a reasonable timeframe. If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC).</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">15. Changes to this Privacy Policy</h2>
            <p className="text-slate-600 mb-6">We may update this Privacy Policy from time to time to reflect changes in legislation, technology, business practices or our services. The latest version will always be published on our website together with the effective date. Your continued use of our website or services after any update constitutes acceptance of the revised Privacy Policy.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">16. Contact Us</h2>
            <p className="text-slate-600 mb-4">If you have any questions regarding this Privacy Policy or wish to access, update or correct your personal information, please contact us.</p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
              <p className="font-bold text-brand-navy mb-2">Sunlite Solar Pty Ltd</p>
              <p className="text-slate-600"><strong>Website:</strong> www.sunlitesolar.com.au</p>
              <p className="text-slate-600"><strong>Email:</strong> infosls.au@gmail.com</p>
              <p className="text-slate-600"><strong>Phone:</strong> 0498 579 245</p>
              <p className="text-slate-600"><strong>Business Address:</strong> Office 2, 168-176 Haldon St, Lakemba -2195.</p>
            </div>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">Australian Consumer Rights</h2>
            <p className="text-slate-600 mb-6">Nothing in this Privacy Policy limits or excludes any rights or remedies available to consumers under the Privacy Act 1988 (Cth), the Australian Consumer Law, or any other applicable Commonwealth or New South Wales legislation.</p>
            <p className="text-slate-600 mb-6">Sunlite Solar is committed to conducting its business with integrity, transparency and respect for the privacy of every customer.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
