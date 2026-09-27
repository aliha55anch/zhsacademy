/* ============================================================
   PATHWAY BUILDER CONFIGURATION
   Goals, levels, hours factors, add-ons and intake dates.
   ============================================================ */
"use strict";

/* ============================================================
   PATHWAY BUILDER CONFIG
   ============================================================ */
const PATHWAY_GOALS = [
    { id: 'chartered', title: 'Earn a chartered qualification', blurb: 'The full professional route, foundation through to membership.', steps: ['acca-foundation', 'acca-applied', 'cima-cgma'], months: 24, boost: true },
    { id: 'cpa', title: 'Sit the US CPA exam', blurb: 'Eligibility, four exam sections, then audit and assurance depth.', steps: ['acca-foundation', 'us-cpa', 'cia-audit'], months: 17, boost: true },
    { id: 'compliance', title: 'Become a tax &amp; compliance specialist', blurb: 'Direct tax, indirect tax and financial crime in one coherent track.', steps: ['tax-corporate', 'intl-tax', 'vat-gst', 'aml-cft'], months: 13, boost: false },
    { id: 'switch', title: 'Switch careers into finance', blurb: 'From any background to employable finance, fastest route.', steps: ['fin-modeling', 'fpa-analytics'], months: 7, boost: true },
    { id: 'risk', title: 'Move into investment &amp; risk', blurb: 'The markets charter, then quant risk management behind it.', steps: ['cfa-level-1', 'cfa-level-2', 'frm-risk'], months: 19, boost: true },
    { id: 'reporting', title: 'Deepen technical reporting', blurb: 'For qualified accountants moving into reporting leadership.', steps: ['acca-applied', 'ifrs-consolidation', 'esg-sustainability'], months: 13, boost: false }
];

const LEVELS = [
    { id: 'foundation',    label: 'New to finance',   sub: 'No accounting background', monthsFactor: 1.25 },
    { id: 'intermediate', label: 'Some experience',  sub: 'Books or a finance degree', monthsFactor: 1.0 },
    { id: 'advanced',     label: 'Qualified already', sub: 'ACCA, CPA or CMA part-way', monthsFactor: 0.85 }
];

const HOURS_FACTOR = { '5': 1.6, '10': 1.0, '20': 0.7 };

const ADDONS = [
    { id: 'vault',     label: 'Lesson vault &amp; lifetime replay', price: 120 },
    { id: 'mocks',     label: 'Full mock pack + tutor grading', price: 180 },
    { id: 'tutor',     label: '1:1 tutor clinics, six sessions',  price: 360 },
    { id: 'credential', label: 'Digital credential + verification', price: 45 }
];

const INTAKES = [
    { date: '2026-10-06', label: '6 October 2026' },
    { date: '2026-10-13', label: '13 October 2026' },
    { date: '2026-10-20', label: '20 October 2026' },
    { date: '2026-11-03', label: '3 November 2026' },
    { date: '2026-11-10', label: '10 November 2026' },
    { date: '2026-12-08', label: '8 December 2026' },
    { date: '2027-01-12', label: '12 January 2027' },
    { date: '2027-03-09', label: '9 March 2027' }
];
