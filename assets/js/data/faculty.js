/* ============================================================
   FACULTY DATA
   Practitioner profiles rendered by features/people.js.
   ============================================================ */
"use strict";

/* ============================================================
   FACULTY
   ============================================================ */
const FACULTY = [
    { id: 'f1', name: 'Eleanor Whitcombe', creds: 'FCA (ICAEW), FCCA', role: 'Director of Chartered Programmes', initials: 'EW', tint: 'linear-gradient(140deg,#1e3e62,#0b192c)',
      bio: 'Twenty-four years in audit and assurance, latterly an audit partner in a Big Four network firm leading IFRS and audit technical teams across four countries.',
      tags: ['Audit &amp; assurance', 'Exam technique', 'IFRS'] },
    { id: 'f2', name: 'Daniel Okonkwo', creds: 'FCCA, CGMA', role: 'Head of Financial Reporting', initials: 'DO', tint: 'linear-gradient(140deg,#065f46,#0f172a)',
      bio: 'Former technical director at a mid-tier firm who has taught corporate reporting to more than 3,000 learners and sits on two professional technical committees.',
      tags: ['Corporate reporting', 'IFRS', 'Consolidation'] },
    { id: 'f3', name: 'Marcus Delacroix', creds: 'CFA, CAIA', role: 'Head of Investment &amp; Analytics', initials: 'MD', tint: 'linear-gradient(140deg,#1e3a8a,#0b192c)',
      bio: 'Former senior portfolio manager on a multi-asset strategy, now a research partner. Guides candidates through return decomposition, quant technique and valuation.',
      tags: ['CFA program', 'Valuation', 'Quantitative'] },
    { id: 'f4', name: 'Priya Raghunathan', creds: 'CPA (AICPA), CFE', role: 'Head of US Exam Preparation', initials: 'PR', tint: 'linear-gradient(140deg,#5b21b6,#0b192c)',
      bio: 'Licensed in three US states with a decade of SEC reporting and technical accounting work. Leads US CPA delivery alongside the university tuition track.',
      tags: ['US GAAP', 'Federal tax', 'TBS technique'] },
    { id: 'f5', name: 'Helena Vogt', creds: 'CIMA CGMA, MSc', role: 'Head of Management Accounting', initials: 'HV', tint: 'linear-gradient(140deg,#0e7490,#0b192c)',
      bio: 'Built FP&amp;A functions at three multinational groups, and coaches senior managers through the CGMA strategy exams while working full time.',
      tags: ['FP&amp;A', 'Cost management', 'CGMA strategy'] },
    { id: 'f6', name: 'Tom&aacute;s Rivera', creds: 'CIA, CFE', role: 'Head of Audit &amp; Financial Crime', initials: 'TR', tint: 'linear-gradient(140deg,#9f1239,#0b192c)',
      bio: 'Fifteen years across internal audit and second-line compliance, including a period as a regulator supervisor. Specialises in financial-crime risk assessments.',
      tags: ['Internal audit', 'AML / CFT', 'Sanctions'] },
    { id: 'f7', name: 'Sof&iacute;a Marchetti', creds: 'ADIT (CIOT), TEP', role: 'Head of International Tax', initials: 'SM', tint: 'linear-gradient(140deg,#a16207,#0b192c)',
      bio: 'Fifteen years in international tax with a Big Four global mobility practice, now advising on group structuring and transfer pricing for mid-market multinationals.',
      tags: ['International tax', 'Transfer pricing', 'Treaties'] },
    { id: 'f8', name: 'Amara Nwosu', creds: 'CFAB (ICAEW), FCCA', role: 'Head of Indirect Tax &amp; Practice', initials: 'AN', tint: 'linear-gradient(140deg,#15803d,#0b192c)',
      bio: 'Ran indirect tax operations for a pan-European retailer, then built an independent bookkeeping practice. Teaches the mechanics and the commercial reality.',
      tags: ['VAT / GST', 'E-invoicing', 'Advisory'] },
    { id: 'f9', name: 'Julian Beck', creds: 'CIMA, PL-300', role: 'Head of Systems &amp; Analytics', initials: 'JB', tint: 'linear-gradient(140deg,#334155,#0b192c)',
      bio: 'Finance systems lead for two enterprise ERP rollouts, now focused on Power BI and FP&amp;A modelling in the tools finance teams actually get handed.',
      tags: ['SAP FI / CO', 'Power BI', 'FP&amp;A'] }
];
