export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Orders & Quotes',
    question: 'How do I request a formal price quotation for my school or institution?',
    answer: 'You can request a quote by clicking the "Get a Quote" or "Inquire Now" button on any product page, filling out our dedicated Custom Orders form, or messaging our institutional desk directly on WhatsApp (+92 300 1234567). Our procurement team will review your specifications, quantities, and delivery location to send a stamped, itemized quotation within 4-12 hours.',
  },
  {
    id: 'faq-2',
    category: 'Orders & Quotes',
    question: 'What is the Minimum Order Quantity (MOQ) for school furniture?',
    answer: 'For standard items such as our Student Desk & Chair sets or School Benches, our standard minimum order is 10 units. For larger items like Teacher Tables, Executive Chairs, or Lockers, MOQs start from 2-4 units. We also provide sample demo units for institutional evaluation prior to large volume manufacturing.',
  },
  {
    id: 'faq-3',
    category: 'Delivery & Shipping',
    question: 'Do you deliver and assemble furniture across all cities in Pakistan?',
    answer: 'Yes! We deliver nationwide across Pakistan including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Sialkot, Gujranwala, Hyderabad, Quetta, and adjacent educational zones. For bulk institutional consignments, our specialized assembly crew installs and levels the furniture directly in your classrooms.',
  },
  {
    id: 'faq-4',
    category: 'Customization',
    question: 'Can we customize desk dimensions, frame colors, or add our school logo?',
    answer: 'Absolutely. We specialize in tailored educational furniture. You can specify exact desktop measurements, adjusted seat heights for specific grade tiers (Kindergarten through College), select custom electrostatic powder-coat frame colors, and have your institutional monogram or crest embossed or silkscreened.',
  },
  {
    id: 'faq-5',
    category: 'Materials & Warranty',
    question: 'What materials are used, and what warranty is provided?',
    answer: 'We utilize cold-rolled commercial CRCA steel tubing (14 to 16 gauge) treated with seven-tank anti-rust phosphating and cured electrostatic powder coating. Tabletops are constructed from E1 grade high-density laminated MDF or solid wood with machine-pressed PVC safety edging. All structural frames carry a 3 to 5-Year commercial warranty against weld failures or manufacturing defects.',
  },
  {
    id: 'faq-6',
    category: 'Billing & Payment',
    question: 'Do you provide official tax invoices with NTN / STRN for institutional accounting?',
    answer: 'Yes. Decent School Furniture is a registered enterprise. All commercial shipments include official Sales Tax Invoices (GST/STRN) and NTN compliance documents required by corporate school networks, boards, NGOs, and government procurement audits.',
  },
  {
    id: 'faq-7',
    category: 'Lead Times',
    question: 'How long does production and delivery take for large school projects?',
    answer: 'Standard inventory batches are dispatched within 3 to 7 working days. Bulk custom manufactured consignments (100 to 1,000+ classroom sets) typically require 10 to 20 working days. We coordinate tightly with your school management to ensure installation before your term or session starts.',
  },
];
