import React from 'react';
import { motion } from 'motion/react';

export default function WarrantyInfo() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-8">Warranty Information</h1>
          <div className="prose prose-slate max-w-none prose-lg">
            <p className="text-slate-500 mb-8">Effective Date: 2 July 2026</p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">Our Commitment</h2>
            <p className="text-slate-600 mb-4">
              At Sunlite Solar Pty Ltd, we are committed to delivering high-quality solar energy solutions using trusted products and professional installation practices. Our systems are designed to provide reliable performance for many years, and we stand behind our workmanship and customer service.
            </p>
            <p className="text-slate-600 mb-6">
              This Warranty Information outlines the warranties that may apply to products and installation services supplied by Sunlite Solar.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">1. Sunlite Solar Workmanship Warranty</h2>
            <p className="text-slate-600 mb-4">
              We provide a 10-Year Workmanship Warranty on the installation of eligible residential, commercial and industrial solar systems unless a different period is stated in your quotation or contract. Our workmanship warranty covers defects that arise from the quality of our installation, including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Incorrect installation of solar panels;</li>
              <li>Faults in mounting systems caused by installation;</li>
              <li>Installation-related wiring defects;</li>
              <li>Water ingress directly resulting from our installation work;</li>
              <li>Installation defects affecting normal operation of the solar system.</li>
            </ul>
            <p className="text-slate-600 mb-6">
              Where a workmanship defect is confirmed during the warranty period, Sunlite Solar will, at its discretion and at no cost to the customer, repair or rectify the defect.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">2. Manufacturer Product Warranties</h2>
            <p className="text-slate-600 mb-4">
              All equipment supplied by Sunlite Solar is covered by the relevant manufacturer’s warranty. Warranty periods vary depending on the manufacturer and product selected. Typical warranty periods may include:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li><strong>Solar Panels:</strong> Product warranty of 10–15 years and performance warranty of up to 30 years.</li>
              <li><strong>Inverters:</strong> Generally, 5–10 years, depending on the manufacturer and any warranty extensions purchased.</li>
              <li><strong>Battery Storage Systems:</strong> Typically, 8+ years or a specified energy throughput, subject to the manufacturer’s terms.</li>
              <li><strong>Mounting Systems and Hardware:</strong> Usually 10–15 years, depending on the supplier.</li>
            </ul>
            <p className="text-slate-600 mb-6">
              Manufacturer warranties are subject to the individual warranty terms issued by the manufacturer.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">3. Solar Panel Performance Warranty</h2>
            <p className="text-slate-600 mb-4">
              Most premium solar panels include a long-term performance warranty. This warranty generally guarantees that the panels will continue producing a minimum percentage of their original rated output after a specified number of years, as determined by the manufacturer.
            </p>
            <p className="text-slate-600 mb-6">
              Normal performance degradation over time is expected and does not necessarily indicate a fault.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">4. What Is Not Covered</h2>
            <p className="text-slate-600 mb-4">Our workmanship warranty does not cover defects or damage resulting from:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Misuse or abuse;</li>
              <li>Accidental damage;</li>
              <li>Unauthorised alterations or repairs;</li>
              <li>Failure to follow operating instructions;</li>
              <li>Failure to maintain the system where maintenance is reasonably required;</li>
              <li>Lightning strikes;</li>
              <li>Floods;</li>
              <li>Bushfires;</li>
              <li>Hail or extreme weather events;</li>
              <li>Power surges originating from the electricity network;</li>
              <li>Animal, bird or pest damage;</li>
              <li>Corrosion caused by environmental conditions;</li>
              <li>General wear and tear; or</li>
              <li>Events beyond our reasonable control.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">5. Customer Responsibilities</h2>
            <p className="text-slate-600 mb-4">To help maintain your warranty, customers should:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Operate the system in accordance with the manufacturer’s instructions;</li>
              <li>Arrange periodic inspections where recommended;</li>
              <li>Keep solar panels reasonably clean where safe to do so;</li>
              <li>Notify Sunlite Solar promptly if a fault is suspected;</li>
              <li>Avoid unauthorised repairs or modifications.</li>
            </ul>
            <p className="text-slate-600 mb-6">
              Failure to meet these responsibilities may affect warranty eligibility where permitted by law.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">6. Making a Warranty Claim</h2>
            <p className="text-slate-600 mb-4">If you believe your system has developed a fault, please contact us as soon as possible. To assist us in processing your claim, please provide:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Your name and contact details;</li>
              <li>Installation address;</li>
              <li>Approximate installation date;</li>
              <li>Description of the issue;</li>
              <li>Photographs, if available;</li>
              <li>Any relevant inverter error codes or monitoring screenshots.</li>
            </ul>
            <p className="text-slate-600 mb-6">
              Our team will assess the information and arrange further inspection or testing where required. If the issue is covered under warranty, we will repair or replace the affected component in accordance with the applicable warranty terms.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">7. Service Call-Outs</h2>
            <p className="text-slate-600 mb-6">
              If a site inspection determines that the reported issue is not covered under warranty, or the fault is unrelated to products or workmanship supplied by Sunlite Solar, reasonable inspection, travel and labour charges may apply. We will advise you of any applicable charges before proceeding.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">8. Product Availability</h2>
            <p className="text-slate-600 mb-6">
              If a product covered by warranty has been discontinued, we may repair the product or replace it with an equivalent or superior product, subject to availability and the manufacturer’s warranty procedures.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">9. Australian Consumer Law</h2>
            <p className="text-slate-600 mb-6">
              Our goods and services come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage. You are also entitled to have goods repaired or replaced if they fail to be of acceptable quality and the failure does not amount to a major failure.
            </p>
            <p className="text-slate-600 mb-6">
              The benefits provided under our workmanship warranty and manufacturer warranties are in addition to your rights under Australian Consumer Law.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">10. Ongoing Support</h2>
            <p className="text-slate-600 mb-4">Our relationship with our customers continues long after installation. We provide ongoing support for:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>System performance enquiries;</li>
              <li>Warranty assistance;</li>
              <li>Maintenance services;</li>
              <li>System inspections;</li>
              <li>Repairs and troubleshooting;</li>
              <li>Upgrades and battery additions;</li>
              <li>Advice on maximising energy savings.</li>
            </ul>
            <p className="text-slate-600 mb-6">
              We are committed to delivering responsive customer service and practical support throughout the life of your solar system.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">Contact Us</h2>
            <p className="text-slate-600 mb-4">For warranty enquiries or technical support, please contact:</p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
              <p className="font-bold text-brand-navy mb-2">Sunlite Solar Pty Ltd</p>
              <p className="text-slate-600"><strong>Website:</strong> www.sunlitesolar.com.au</p>
              <p className="text-slate-600"><strong>Email:</strong> infosls.au@gmail.com</p>
              <p className="text-slate-600"><strong>Phone:</strong> 0498 579 245</p>
              <p className="text-slate-600"><strong>Business Address:</strong> Office 2, 168-176 Haldon St, Lakemba -2195.</p>
              <p className="text-slate-600"><strong>Business Hours:</strong> Monday to Friday, 8:00 am – 5:00 pm (AEST/AEDT), excluding public holidays</p>
            </div>

            <h2 className="text-2xl font-bold text-brand-navy mt-10 mb-4">Disclaimer</h2>
            <p className="text-slate-600 mb-6">
              This Warranty Information provides general guidance regarding the warranties offered by Sunlite Solar. Specific warranty periods and coverage may vary depending on the products supplied, the manufacturer’s terms and the details set out in your quotation, contract or warranty documentation. Nothing in this document excludes, restricts or modifies any rights or remedies available under the Australian Consumer Law or any other applicable legislation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
