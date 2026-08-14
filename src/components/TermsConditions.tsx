import React from 'react';
import { motion } from 'motion/react';

export default function TermsConditions() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-8">Terms & Conditions</h1>
          <div className="prose prose-slate max-w-none prose-lg">
            <p className="text-slate-500 mb-8">Effective Date: 2 July 2026</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 mb-6">
              These Terms & Conditions govern your access to and use of the Sunlite Solar website and the products and services supplied by Sunlite Solar Pty Ltd (“Sunlite Solar”, “we”, “our”, or “us”). By accessing our website, requesting a quotation, accepting a proposal, or engaging our services, you agree to be bound by these Terms & Conditions. If you do not agree, you should not use our website or engage our services.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">2. Our Services</h2>
            <p className="text-slate-600 mb-4">Sunlite Solar provides a range of renewable energy solutions, including but not limited to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Residential solar power systems</li>
              <li>Commercial solar power systems</li>
              <li>Industrial solar solutions</li>
              <li>Battery storage systems</li>
              <li>Solar maintenance and servicing</li>
              <li>Solar repairs and fault diagnosis</li>
              <li>System upgrades and replacements</li>
              <li>EV charger installation (where offered)</li>
              <li>Energy efficiency advice and related services</li>
            </ul>
            <p className="text-slate-600 mb-6">The availability of services may vary depending on your location, site conditions, regulatory approvals and product availability.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">3. Quotations</h2>
            <p className="text-slate-600 mb-4">All quotations provided by Sunlite Solar are:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Free unless otherwise stated;</li>
              <li>Based on the information available at the time;</li>
              <li>Subject to a site inspection where required;</li>
              <li>Valid for the period stated in the quotation.</li>
            </ul>
            <p className="text-slate-600 mb-6">A quotation does not create a binding agreement until it has been accepted by both parties. If site conditions differ from the information initially provided, we may revise the quotation before work commences.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">4. Pricing</h2>
            <p className="text-slate-600 mb-4">Unless otherwise stated:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Prices are quoted in Australian Dollars (AUD).</li>
              <li>Prices include GST where applicable.</li>
              <li>Prices may change before acceptance due to supplier pricing, exchange rate movements, regulatory changes or product availability.</li>
            </ul>
            <p className="text-slate-600 mb-6">Where additional work becomes necessary due to unforeseen site conditions, we will discuss the additional cost with you before proceeding wherever reasonably practicable.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">5. Deposits and Payment</h2>
            <p className="text-slate-600 mb-4">A deposit may be required before work is scheduled. The balance of the contract price is generally payable:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>On completion of installation;</li>
              <li>Prior to system commissioning, where agreed; or</li>
              <li>In accordance with the payment schedule stated in the quotation or contract.</li>
            </ul>
            <p className="text-slate-600 mb-6">Late payments may attract interest and reasonable debt recovery costs where permitted by law. Ownership of supplied goods remains with Sunlite Solar until payment has been received in full.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">6. Customer Responsibilities</h2>
            <p className="text-slate-600 mb-4">The customer agrees to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Provide accurate information regarding the property;</li>
              <li>Ensure safe access to the installation site;</li>
              <li>Obtain landlord approval where required;</li>
              <li>Notify us of any known electrical or structural issues;</li>
              <li>Ensure pets and children are kept clear of the work area;</li>
              <li>Provide access to electricity and water where reasonably required during installation.</li>
            </ul>
            <p className="text-slate-600 mb-6">Delays caused by the customer may result in additional charges where reasonable.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">7. Installation</h2>
            <p className="text-slate-600 mb-4">Installation dates are estimates only. While we make every reasonable effort to meet scheduled dates, installation may be delayed due to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Weather conditions;</li>
              <li>Safety concerns;</li>
              <li>Supply chain disruptions;</li>
              <li>Network approvals;</li>
              <li>Government requirements;</li>
              <li>Unforeseen site conditions; or</li>
              <li>Circumstances beyond our reasonable control.</li>
            </ul>
            <p className="text-slate-600 mb-6">Such delays do not automatically entitle the customer to compensation unless required by law.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">8. Grid Connection</h2>
            <p className="text-slate-600 mb-6">Grid connection approval is subject to the requirements of the relevant electricity distributor and applicable regulations. Sunlite Solar will assist with the required documentation where included in your quotation; however, approval and connection timeframes are determined by the relevant authorities and are outside our control.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">9. Government Rebates and STCs</h2>
            <p className="text-slate-600 mb-4">Where applicable, the quoted price may include the benefit of Small-scale Technology Certificates (STCs) or other available government incentives. The customer agrees to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Assign eligible STCs to Sunlite Solar where required;</li>
              <li>Provide information reasonably necessary to process rebate applications; and</li>
              <li>Cooperate with any documentation required by law.</li>
            </ul>
            <p className="text-slate-600 mb-6">Government rebate programs may change without notice. Sunlite Solar cannot guarantee the future availability or value of any incentive.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">10. Variations</h2>
            <p className="text-slate-600 mb-4">If additional work is requested by the customer or becomes necessary due to site conditions, a variation may be issued. Any variation may affect:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Contract price;</li>
              <li>Installation timeframe;</li>
              <li>Equipment supplied; or</li>
              <li>Project scope.</li>
            </ul>
            <p className="text-slate-600 mb-6">Where practicable, variations will be agreed in writing before the additional work proceeds.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">11. Cancellations</h2>
            <p className="text-slate-600 mb-4">A customer may request cancellation of an accepted quotation before installation commences. If Sunlite Solar has already incurred reasonable costs, including but not limited to equipment purchases, engineering work, permit applications, administration or scheduling expenses, those costs may be deducted from any refund where permitted by law.</p>
            <p className="text-slate-600 mb-6">Where installation has already commenced, cancellation will be subject to the terms of the signed quotation or contract and the customer’s rights under Australian Consumer Law.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">12. Product Availability and Substitutions</h2>
            <p className="text-slate-600 mb-6">We aim to supply the products specified in your quotation. However, if a product becomes unavailable due to circumstances beyond our control, we may substitute it with a product of equal or higher quality and comparable specifications. Where a substitution would materially affect the agreed system, we will discuss the proposed change with you before installation.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">13. Warranties</h2>
            <p className="text-slate-600 mb-4">Products supplied by Sunlite Solar are covered by the applicable manufacturer’s warranty. In addition, Sunlite Solar provides a workmanship warranty for installation services for the period stated in your quotation or warranty documentation.</p>
            <p className="text-slate-600 mb-4">Warranty claims do not apply where damage results from:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Misuse or neglect;</li>
              <li>Unauthorised repairs or modifications;</li>
              <li>Natural disasters such as floods, bushfires or lightning;</li>
              <li>Animal or pest damage;</li>
              <li>Failure to maintain the system in accordance with the manufacturer’s recommendations; or</li>
              <li>Any circumstance outside our reasonable control.</li>
            </ul>
            <p className="text-slate-600 mb-6">Nothing in these Terms limits your rights under the Australian Consumer Law.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">14. Australian Consumer Law</h2>
            <p className="text-slate-600 mb-4">Our goods and services come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>A replacement or refund for a major failure;</li>
              <li>Compensation for any other reasonably foreseeable loss or damage; and</li>
              <li>Repair or replacement where goods fail to be of acceptable quality and the failure does not amount to a major failure.</li>
            </ul>
            <p className="text-slate-600 mb-6">These statutory rights are in addition to any manufacturer’s warranty or workmanship warranty provided by Sunlite Solar.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">15. Limitation of Liability</h2>
            <p className="text-slate-600 mb-4">To the maximum extent permitted by law, Sunlite Solar is not liable for:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Indirect or consequential loss;</li>
              <li>Loss of profits;</li>
              <li>Loss of business opportunity;</li>
              <li>Loss of revenue;</li>
              <li>Loss of data; or</li>
              <li>Any delay caused by events beyond our reasonable control.</li>
            </ul>
            <p className="text-slate-600 mb-6">Where liability cannot legally be excluded, our liability is limited to the remedies available under the Australian Consumer Law.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">16. Website Use</h2>
            <p className="text-slate-600 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Use this website for unlawful purposes;</li>
              <li>Attempt to gain unauthorised access to our systems;</li>
              <li>Upload malicious software or code;</li>
              <li>Interfere with the operation or security of the website;</li>
              <li>Copy or reproduce website content without our written permission.</li>
            </ul>
            <p className="text-slate-600 mb-6">We may suspend or terminate access to our website where misuse is detected.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">17. Intellectual Property</h2>
            <p className="text-slate-600 mb-6">Unless otherwise stated, all content on this website, including text, logos, graphics, photographs, designs, videos and other materials, remains the property of Sunlite Solar or its licensors. No part of this website may be copied, reproduced, distributed or used for commercial purposes without our prior written consent.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">18. Force Majeure</h2>
            <p className="text-slate-600 mb-4">Sunlite Solar will not be responsible for delays or failure to perform our obligations where caused by events beyond our reasonable control, including but not limited to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Extreme weather;</li>
              <li>Bushfires;</li>
              <li>Floods;</li>
              <li>Pandemics;</li>
              <li>Industrial disputes;</li>
              <li>Government actions;</li>
              <li>Supply chain disruptions;</li>
              <li>Utility outages; or</li>
              <li>Other unforeseen events.</li>
            </ul>
            <p className="text-slate-600 mb-6">We will make reasonable efforts to minimise the impact of such events and resume performance as soon as practicable.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">19. Dispute Resolution</h2>
            <p className="text-slate-600 mb-6">If a dispute arises, both parties agree to first attempt to resolve the matter through good faith discussions. If the dispute cannot be resolved, either party may seek mediation or pursue any legal remedies available under Australian law. Nothing in this clause prevents either party from seeking urgent legal relief where appropriate.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">20. Governing Law</h2>
            <p className="text-slate-600 mb-6">These Terms & Conditions are governed by the laws of the State of New South Wales and the Commonwealth of Australia. Any legal proceedings arising from these Terms shall be subject to the jurisdiction of the courts of New South Wales.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">21. Changes to These Terms</h2>
            <p className="text-slate-600 mb-6">Sunlite Solar may update these Terms & Conditions from time to time. The latest version will be published on our website and will take effect from the date of publication.</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">22. Contact Us</h2>
            <p className="text-slate-600 mb-4">If you have any questions regarding these Terms & Conditions, please contact us.</p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
              <p className="font-bold text-brand-navy mb-2">Sunlite Solar Pty Ltd</p>
              <p className="text-slate-600"><strong>Website:</strong> www.sunlitesolar.com.au</p>
              <p className="text-slate-600"><strong>Email:</strong> infosls.au@gmail.com</p>
              <p className="text-slate-600"><strong>Phone:</strong> 0498 579 245</p>
              <p className="text-slate-600"><strong>Business Address:</strong> Office 2, 168-176 Haldon St, Lakemba -2195.</p>
            </div>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">General</h2>
            <p className="text-slate-600 mb-6">If any provision of these Terms & Conditions is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect. These Terms constitute the entire agreement relating to the use of our website and, together with any accepted quotation or written contract, govern the supply of our products and services.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
