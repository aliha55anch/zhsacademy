/* ============================================================
   PROGRAMME CATALOGUE DATA
   Categories + the 20 programme records. No behaviour.
   ============================================================ */
"use strict";

/* ============================================================
   CATEGORIES
   ============================================================ */
const CATEGORIES = {
    chartered: { label: 'Global Chartered', badge: 'b-accent', icon: 'landmark' },
    tax:       { label: 'Tax & Compliance', badge: 'b-info',    icon: 'scale' },
    applied:   { label: 'Applied Finance', badge: 'b-gold',    icon: 'trending-up' },
    academic:  { label: 'Academic & Exam Prep', badge: 'b-violet', icon: 'graduation-cap' }
};

/* ============================================================
   PROGRAMMES
   ============================================================ */
const COURSES = [
    {
        id: 'acca-foundation', cat: 'chartered',
        title: 'ACCA Foundation &mdash; F1&ndash;F3 &amp; ABV Bridge to Professional Level',
        awardingBody: 'ACCA (London)', badge: 'Entry point', level: 'Foundation',
        duration: '5 months', load: '~9 h / week', schedule: 'Live online &middot; Tue &amp; Thu 18:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 1750, discountedFee: 1450, rating: 4.8, reviews: 612, learners: 3180, cpd: 60,
        summary: 'Close the gap to ACCA professional-level entry with structured coverage of accountant, business and law fundamentals, plus a business-value module that counts towards the practical experience requirement.',
        outcomes: [
            'Apply double-entry principles to prepare and interpret statutory financial statements',
            'Evaluate business ethics and governance under a recognised corporate code',
            'Quantify and communicate the value a project adds to an organisation',
            'Sit F1&ndash;F3 and ABV with a structured revision plan and graded weekly practice'
        ],
        assessment: [
            'Weekly graded objective questions with written feedback from the module lead',
            'Two full mock sittings per paper in the CBE-style question environment',
            'A proctored-style final case simulation in the closing cohort week'
        ],
        modules: [
            { w: 'Weeks 1&ndash;4', h: 9, t: 'Accountant in Business', d: 'The accounting equation, double-entry bookkeeping, the nature and purpose of financial statements, and the business environment.' },
            { w: 'Weeks 5&ndash;9', h: 9, t: 'Introduction to Financial Accounting', d: 'Recording transactions, adjusting entries, non-current assets, working capital, and preparing a full trial balance and income statement.' },
            { w: 'Weeks 10&ndash;14', h: 9, t: 'Business and the Law', d: 'The legal nature of a company, agency and partnership law, contract formation, employment law and commercial regulation.' },
            { w: 'Weeks 15&ndash;18', h: 8, t: 'Business Economics', d: 'Economic decisions, the macroeconomic environment, financial and non-financial performance measurement, and business strategy tools.' },
            { w: 'Weeks 19&ndash;22', h: 8, t: 'Business Value &amp; Managing Technology', d: 'Cost and non-cost accounting concepts, performance measurement, and how technology strategy supports an organisation.' }
        ],
        faculty: 'f1', nextCohort: '2026-10-13', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'acca-applied', cat: 'chartered',
        title: 'ACCA Applied Skills &amp; Strategic Professional Level',
        awardingBody: 'ACCA (London)', badge: 'Most enrolled', level: 'Intermediate',
        duration: '4 months / paper', load: '~11 h / week', schedule: 'Live online &middot; Mon, Wed, Fri 18:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 3200, discountedFee: 2750, rating: 4.9, reviews: 894, learners: 4520, cpd: 120,
        summary: 'Complete exam preparation for the ACCA Strategic Professional and top-up exams: corporate reporting, audit and assurance, taxation, strategic business leadership and integrated case analysis.',
        outcomes: [
            'Draft group financial statements under IFRS and explain recognition and measurement decisions',
            'Plan and execute an assurance engagement and evaluate audit evidence',
            'Apply direct and indirect tax rules to individuals, companies and cross-border transactions',
            'Develop and defend a strategic recommendation in a professional-team case simulation'
        ],
        assessment: [
            'Weekly objective questions plus a written technical essay every fortnight',
            'An integrated case simulation in the final two weeks of the cohort',
            'Three full mock papers per module with examiner-style marking commentary'
        ],
        modules: [
            { w: 'Weeks 1&ndash;6', h: 11, t: 'Corporate Reporting', d: 'IFRS 15 and 16 revenue and lease accounting, deferred tax under IAS 12, and the interpretation of group accounts with complex adjustments.' },
            { w: 'Weeks 7&ndash;12', h: 11, t: 'Audit and Assurance', d: 'Risk assessment, internal control evaluation, evidence gathering, and the use of sampling and data analytics in a modern audit.' },
            { w: 'Weeks 13&ndash;17', h: 10, t: 'Taxation', d: 'Individual and corporation tax computation, capital gains, indirect tax, and an introduction to tax planning and avoidance rules.' },
            { w: 'Weeks 18&ndash;21', h: 10, t: 'Strategic Business Leadership', d: 'Governance, business ethics, technology and information systems, and the organisational and financial levers behind strategy execution.' },
            { w: 'Weeks 22&ndash;24', h: 8, t: 'Integrated Case Simulation', d: 'A full team case requiring a written technical analysis and an executive presentation, marked against the published examiner rubric.' }
        ],
        faculty: 'f2', nextCohort: '2026-10-13', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'cfa-level-1', cat: 'chartered',
        title: 'CFA&reg; Program &mdash; Level I Preparation',
        awardingBody: 'CFA Institute', badge: 'Wall Street standard', level: 'Advanced',
        duration: '5 months', load: '~14 h / week', schedule: 'Live online &middot; Sat &amp; Sun 13:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 4900, discountedFee: 4250, rating: 4.9, reviews: 431, learners: 1740, cpd: 100,
        summary: 'Rigorous Level I coverage for careers in investment banking, asset management, wealth and research, delivered by working charterholders with a curated question bank of more than 3,500 items.',
        outcomes: [
            'Apply ethical and professional standards to real-world dilemmas under exam conditions',
            'Compute and interpret core return, risk and valuation measures across asset classes',
            'Build a repeatable process for multi-topic questions under time pressure',
            'Sit Level I with a realistic mock-score benchmark before the real window'
        ],
        assessment: [
            'A 2,000-item adaptive question bank with instant performance analytics',
            'Twenty-four timed sectional mocks mirroring the real exam structure',
            'Two full 180-minute mock exams with written performance debriefs'
        ],
        modules: [
            { w: 'Weeks 1&ndash;5', h: 14, t: 'Ethics &amp; Professional Standards', d: 'The six parts of the Code and Professional Conduct, with applied GIPS cases and the deviations most often tested.' },
            { w: 'Weeks 6&ndash;9', h: 14, t: 'Quantitative &amp; Economics', d: 'Time value of money, probability and statistics, regression, cash-flow modelling, and monetary and fiscal policy interpretation.' },
            { w: 'Weeks 10&ndash;14', h: 14, t: 'Financial Statement Analysis', d: 'Recasting income statements and balance sheets, working-capital analysis, quality-of-earnings diagnostics and forecasting techniques.' },
            { w: 'Weeks 15&ndash;19', h: 14, t: 'Corporate Issuers &amp; Equity', d: 'Capital raising, dividends and share repurchase, industry and company analysis, and the return decomposition framework.' },
            { w: 'Weeks 20&ndash;22', h: 12, t: 'Fixed Income, Derivatives &amp; Alternatives', d: 'Fixed-income valuation and strategies, the derivatives market, and private equity and real-estate structures.' }
        ],
        faculty: 'f3', nextCohort: '2026-11-07', cohortFormat: 'Live online, weekend UTC slot'
    },
    {
        id: 'cfa-level-2', cat: 'chartered',
        title: 'CFA&reg; Program &mdash; Level II Preparation',
        awardingBody: 'CFA Institute', badge: 'Level II pathway', level: 'Advanced',
        duration: '6 months', load: '~16 h / week', schedule: 'Live online &middot; Sat &amp; Sun 13:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 5900, discountedFee: 5150, rating: 4.9, reviews: 268, learners: 860, cpd: 120,
        summary: 'The analytical core of the CFA charter: valuation frameworks, fixed-income term structures, derivatives, portfolio construction and applied economics, taught by charterholders who still sit the exam alongside you.',
        outcomes: [
            'Value a company, a fixed-income product and a derivative using the approaches the syllabus weights',
            'Read a yield curve, price a bond and explain what drives term structure and credit spreads',
            'Construct and justify a portfolio under explicit risk, cost and constraint assumptions',
            'Sit Level II with a written item-level debrief on every mock you take'
        ],
        assessment: [
            'Item-level mock exams scored against the official item-type weighting',
            'Constructed-response and essay practice with written marking commentary',
            'A full 192-minute mock exam under real time limits before each window'
        ],
        modules: [
            { w: 'Weeks 1&ndash;5', h: 16, t: 'Valuation: Equity &amp; Credit', d: 'Discounted cash flow, market multiples, private-company valuation, and the return-based and spread-based approaches to credit analysis.' },
            { w: 'Weeks 6&ndash;10', h: 16, t: 'Fixed Income', d: 'Term-structure theories, arbitrage-free valuation, yield-curve fitting, and the credit analysis techniques most heavily tested.' },
            { w: 'Weeks 11&ndash;14', h: 16, t: 'Derivatives', d: 'Options pricing and the Greeks, forward and futures contracts, swaps, and the valuation of embedded options.' },
            { w: 'Weeks 15&ndash;19', h: 16, t: 'Portfolio Management &amp; Economics', d: 'Portfolio construction, risk attribution, the efficient frontier and optimal risky portfolios, and applied growth, monetary and fiscal analysis.' },
            { w: 'Weeks 20&ndash;24', h: 15, t: 'Advanced Financial Statement Analysis', d: 'Operating leases, off-balance-sheet vehicles, goodwill and intangibles, and the adjusting items that shift reported performance.' }
        ],
        faculty: 'f3', nextCohort: '2026-12-08', cohortFormat: 'Live online, weekend UTC slot'
    },
    {
        id: 'us-cpa', cat: 'chartered',
        title: 'US CPA Exam Preparation (AICPA)',
        awardingBody: 'AICPA', badge: 'Top international', level: 'Intermediate',
        duration: '6 months', load: '~12 h / week', schedule: 'Live online &middot; Tue &amp; Thu 19:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 5600, discountedFee: 4900, rating: 4.8, reviews: 386, learners: 1610, cpd: 130,
        summary: 'Structured preparation for the four sections of the US CPA exam &mdash; AUD, FAR, REG and one discipline &mdash; with eligibility assessment, TBS drilling and state-board guidance for candidates based outside the United States.',
        outcomes: [
            'Prepare and complete US federal tax returns for individuals and pass-through entities',
            'Apply US GAAP to complex corporate transactions and reconciliations',
            'Execute audit procedures and document a compliant audit under PCAOB and AICPA standards',
            'Accumulate the experience and continuing education needed to support state licensure'
        ],
        assessment: [
            'Daily TBS drills with per-topic accuracy tracking',
            'Eight full section-length simulations including the four-hour audit simulation',
            'An eligibility and state-board workshop with a personalised checklist'
        ],
        modules: [
            { w: 'Weeks 1&ndash;8', h: 12, t: 'FAR &mdash; Accounting &amp; Reporting', d: 'US GAAP versus IFRS reconciliation, revenue recognition, leases, inventory, intangibles and equity transactions.' },
            { w: 'Weeks 9&ndash;15', h: 12, t: 'REG &mdash; Taxation &amp; Regulation', d: 'Federal income tax for individuals and corporations, state and local tax, business law, and professional responsibilities.' },
            { w: 'Weeks 16&ndash;22', h: 12, t: 'AUD &mdash; Audit &amp; Assurance', d: 'Planning the audit, internal control testing, evidence sufficiency, and completing a compliant audit report under PCAOB standards.' },
            { w: 'Weeks 23&ndash;26', h: 12, t: 'Discipline &amp; TBS Technique', d: 'A chosen discipline module plus systematic task-based-simulation practice using a repeatable approach to unfamiliar document sets.' }
        ],
        faculty: 'f4', nextCohort: '2026-11-07', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'cima-cgma', cat: 'chartered',
        title: 'CIMA Chartered Programme &amp; CGMA Strategy',
        awardingBody: 'CIMA / CGMA', badge: 'Dual pathway', level: 'Intermediate',
        duration: '8 months', load: '~10 h / week', schedule: 'Live online &middot; Mon &amp; Wed 17:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 4100, discountedFee: 3550, rating: 4.8, reviews: 358, learners: 1490, cpd: 140,
        summary: 'The CIMA route into management accounting careers, culminating in CGMA strategic management and enterprise performance, with dual accreditation for members through the CIMA-CGMA Alliance.',
        outcomes: [
            'Evaluate management accounting information for pricing, make-or-buy and investment decisions',
            'Build a full three-statement forecast and support a capital investment appraisal',
            'Design and monitor a corporate performance framework using a recognised model',
            'Formulate strategy grounded in competitive analysis and portfolio positioning'
        ],
        assessment: [
            'Structured question practice with cohort benchmarking',
            'Three strategic case simulations reviewed in a live tutor clinic',
            'A revision week with a full CGMA strategy mock and a personal action plan'
        ],
        modules: [
            { w: 'Weeks 1&ndash;9', h: 10, t: 'Management Accounting Fundamentals', d: 'Cost behaviour, absorption and marginal costing, budgeting, and standard costing with variance analysis.' },
            { w: 'Weeks 10&ndash;18', h: 10, t: 'Corporate Financial Management', d: 'Working-capital management, capital budgeting, treasury and financing decisions, and business valuation foundations.' },
            { w: 'Weeks 19&ndash;26', h: 10, t: 'Performance Management', d: 'Transfer pricing, performance measurement frameworks, process improvement and total quality management in a digital operations context.' },
            { w: 'Weeks 27&ndash;34', h: 10, t: 'CGMA Strategic Management', d: 'Enterprise strategy, portfolio and resource deployment, digital business model design, and professional ethics for senior managers.' }
        ],
        faculty: 'f5', nextCohort: '2026-10-20', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'chartered-cma', cat: 'chartered',
        title: 'CMA Certification &mdash; IMA Parts 1 &amp; 2',
        awardingBody: 'IMA', badge: 'Two parts only', level: 'Intermediate',
        duration: '7 months', load: '~10 h / week', schedule: 'Live online &middot; Mon &amp; Wed 18:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 3300, discountedFee: 2800, rating: 4.8, reviews: 302, learners: 1340, cpd: 120,
        summary: 'Both parts of the IMA Certified Management Accountant program, delivering the external reporting, planning, performance and strategic management content employers expect from a CMA.',
        outcomes: [
            'Interpret external financial reporting under US GAAP and IFRS',
            'Plan, budget and control organisational costs',
            'Build a performance scorecard tied directly to strategy',
            'Produce a strategic plan and defend it in the Part 2 essay format'
        ],
        assessment: [
            'Part 1 objective question sets with a full timed mock',
            'Part 2 essay frameworks with one graded sample essay per learner',
            'A full two-part mock weekend before each exam window'
        ],
        modules: [
            { w: 'Weeks 1&ndash;8', h: 10, t: 'Part 1 &mdash; External Reporting', d: 'Financial statements and the recognition, measurement, presentation and disclosure framework, plus reconciling US GAAP with IFRS.' },
            { w: 'Weeks 9&ndash;16', h: 10, t: 'Part 1 &mdash; Planning, Performance &amp; Analytics', d: 'Cost management, process and cost improvement, internal controls, and data-driven performance analysis.' },
            { w: 'Weeks 17&ndash;23', h: 10, t: 'Part 2 &mdash; Corporate Financial Management', d: 'Long-term investment analysis, cost of capital, capital structure, working-capital strategy and corporate restructuring.' },
            { w: 'Weeks 24&ndash;30', h: 10, t: 'Part 2 &mdash; Strategic Management', d: 'Competitive strategy, the balanced scorecard, enterprise risk management, and sustainability in strategic decisions.' }
        ],
        faculty: 'f5', nextCohort: '2026-10-20', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'cia-audit', cat: 'chartered',
        title: 'CIA &mdash; Certified Internal Auditor',
        awardingBody: 'IIA', badge: 'Audit careers', level: 'Intermediate',
        duration: '6 months', load: '~10 h / week', schedule: 'Live online &middot; Wed &amp; Sat 17:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 2900, discountedFee: 2450, rating: 4.8, reviews: 274, learners: 1150, cpd: 110,
        summary: 'Complete preparation for all three CIA exam parts, with worked case material on internal audit standards, governance, risk assessment and the professional practice of auditing inside an organisation.',
        outcomes: [
            'Establish an internal audit function aligned to the IIA Global Standards',
            'Design risk-based audit programmes and evaluate enterprise risk',
            'Write findings and reports that influence management action',
            'Prepare for CIA Part 3 practical experience with documented project narratives'
        ],
        assessment: [
            'End-of-part multiple-choice sets mirroring the real exam weightings',
            'Two full mock exams per part with answer rationales',
            'Part 3 adviser-simulator preparation with a mock experience narrative clinic'
        ],
        modules: [
            { w: 'Weeks 1&ndash;7', h: 10, t: 'Part I &mdash; Internal Audit Fundamentals', d: 'Governance, ethics, the audit framework, risk management, and professional standards.' },
            { w: 'Weeks 8&ndash;14', h: 10, t: 'Part II &mdash; Auditing &amp; Assurance', d: 'Global Standards in practice, audit planning, evidence and quality assurance, and the production of audit results.' },
            { w: 'Weeks 15&ndash;22', h: 10, t: 'Part III &mdash; Internal Audit Practice', d: 'Business-specific audit techniques across financial, IT, operational and compliance domains.' },
            { w: 'Weeks 23&ndash;26', h: 8, t: 'Experience Documentation Clinic', d: 'Structuring the experience narratives required for Part 3, reviewed line by line by a practising CIA.' }
        ],
        faculty: 'f6', nextCohort: '2026-10-20', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'tax-corporate', cat: 'tax',
        title: 'Global Corporate Tax &amp; Transfer Pricing',
        awardingBody: 'ZHS Academy certificate', badge: 'High demand', level: 'Intermediate',
        duration: '7 months', load: '~8 h / week', schedule: 'Live online &middot; Tue &amp; Thu 18:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 3100, discountedFee: 2650, rating: 4.9, reviews: 402, learners: 1980, cpd: 90,
        summary: 'Work through corporate tax administration, tax planning and transfer pricing across a multi-jurisdiction group, with documentation standards aligned to OECD and local authority expectations.',
        outcomes: [
            'Compute corporate income tax under three different national regimes and reconcile the differences',
            'Prepare and defend transfer-pricing documentation to an authority standard',
            'Operate an effective tax rate and deferred-tax analysis in a group context',
            'Assess the tax consequences of cross-border financing and intellectual-property arrangements'
        ],
        assessment: [
            'Comparative computation sets for three jurisdictions',
            'A full transfer-pricing file reviewed against an authority documentation checklist',
            'A capstone tax-structuring recommendation for a simulated group'
        ],
        modules: [
            { w: 'Weeks 1&ndash;5', h: 8, t: 'Comparative Corporate Tax Regimes', d: 'Residence, source, territorial versus worldwide systems, and computing taxable profit under three representative models.' },
            { w: 'Weeks 6&ndash;11', h: 8, t: 'Tax Computation &amp; Losses', d: 'Loss utilisation rules, group relief, capital allowances, and the treatment of deferred tax.' },
            { w: 'Weeks 12&ndash;18', h: 8, t: 'Transfer Pricing Fundamentals', d: 'The arm&rsquo;s-length principle, the OECD methods hierarchy, benchmarking and comparables analysis, and documentation standards.' },
            { w: 'Weeks 19&ndash;24', h: 8, t: 'Advanced TP &amp; Advance Agreements', d: 'Advanced methods, mutual agreements, advance pricing agreements, and disputes and appeals.' },
            { w: 'Weeks 25&ndash;28', h: 7, t: 'International Tax Planning', d: 'Treaty relief, holding structures, the Pillar Two effect on group taxation, and the tax review step in a cross-border deal.' }
        ],
        faculty: 'f7', nextCohort: '2026-10-27', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'intl-tax', cat: 'tax',
        title: 'International Tax &amp; Cross-Border Structuring (ADIT-aligned)',
        awardingBody: 'CIOT (aligned)', badge: 'CIOT aligned', level: 'Advanced',
        duration: '6 months', load: '~8 h / week', schedule: 'Live online &middot; Mon &amp; Wed 18:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 2900, discountedFee: 2450, rating: 4.8, reviews: 219, learners: 940, cpd: 80,
        summary: 'A practical international tax programme covering residence, double-tax treaties, permanent establishment, withholding and cross-border transaction flows, structured as preparation for the ADIT examination.',
        outcomes: [
            'Determine residence and source for an individual, company or transaction',
            'Apply treaty relief and read a double-tax treaty with confidence',
            'Identify permanent-establishment risk in service and distribution models',
            'Draft the international tax section of a cross-border transaction memo'
        ],
        assessment: [
            'Treaty mapping exercises across a series of fact patterns',
            'A permanent-establishment risk assessment written to professional standard',
            'An ADIT-style mock examination with a full paper walkthrough'
        ],
        modules: [
            { w: 'Weeks 1&ndash;6', h: 8, t: 'Residence, Source &amp; Scope', d: 'Conceptual foundations, residence tie-breakers, source rules, and the scope of worldwide versus territorial systems.' },
            { w: 'Weeks 7&ndash;12', h: 8, t: 'Double-Tax Treaties', d: 'Treaty hierarchy, residence tie-breakers, beneficial ownership, limitation-on-benefits and the main income articles.' },
            { w: 'Weeks 13&ndash;18', h: 8, t: 'Withholding &amp; Permanent Establishment', d: 'Withholding on dividends, interest, royalties and services, and PE creation in trading and service models.' },
            { w: 'Weeks 19&ndash;24', h: 8, t: 'Cross-Border Structuring', d: 'Direct and indirect transfers of value, treaty-shopping considerations, and the tax review step in an international acquisition.' }
        ],
        faculty: 'f7', nextCohort: '2026-10-27', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'vat-gst', cat: 'tax',
        title: 'VAT / GST Indirect Tax &amp; E-Invoicing Compliance',
        awardingBody: 'ZHS Academy certificate', badge: 'Deadline driven', level: 'Intermediate',
        duration: '5 months', load: '~7 h / week', schedule: 'Live online &middot; Wed &amp; Fri 17:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 2400, discountedFee: 2050, rating: 4.8, reviews: 337, learners: 1830, cpd: 70,
        summary: 'Operate indirect tax correctly across a business selling in several markets: registration thresholds, place-of-supply rules, input-credit management, e-invoicing mandates and digital reporting.',
        outcomes: [
            'Decide where a supply is made and which regime applies to it',
            'Manage registration, de-registration and voluntary disclosure processes',
            'Operate an e-invoicing or real-time reporting pipeline from capture to submission',
            'Reconcile indirect-tax returns to the general ledger and defend the audit trail'
        ],
        assessment: [
            'Place-of-supply scenario sets across four market regimes',
            'A working e-invoicing configuration project for a multi-market seller',
            'A return preparation and reconciliation exercise with an audit-defence brief'
        ],
        modules: [
            { w: 'Weeks 1&ndash;5', h: 7, t: 'VAT and GST Architecture', d: 'Consumption taxes, place of supply, taxable supplies, exemptions and zero-rating across the major market models.' },
            { w: 'Weeks 6&ndash;9', h: 7, t: 'Registration &amp; Indirect Tax in Practice', d: 'Registration thresholds, voluntary registration, returns, input-credit claims, refunds, and dispute resolution.' },
            { w: 'Weeks 10&ndash;13', h: 7, t: 'Digital Tax &amp; E-Invoicing', d: 'E-invoicing mandates, real-time reporting, document formats, API integration, and the audit trail requirements that follow.' },
            { w: 'Weeks 14&ndash;18', h: 6, t: 'Special Regimes', d: 'Global minimum tax reporting, carbon and payroll taxes, the digital services regime, and indirect tax in cross-border trade.' }
        ],
        faculty: 'f8', nextCohort: '2026-11-03', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'aml-cft', cat: 'tax',
        title: 'AML / CFT &amp; Financial Crime Compliance',
        awardingBody: 'ACAMS-aligned', badge: 'Regulation-led', level: 'Intermediate',
        duration: '6 months', load: '~8 h / week', schedule: 'Live online &middot; Mon &amp; Thu 19:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 3300, discountedFee: 2850, rating: 4.9, reviews: 261, learners: 1220, cpd: 100,
        summary: 'A practitioner AML programme covering the risk framework, customer due diligence, transaction monitoring, sanctions, sanctions evasion, and the investigation and reporting work regulators expect.',
        outcomes: [
            'Build and evidence an enterprise financial-crime risk assessment',
            'Apply customer due diligence and enhanced due diligence to real risk scenarios',
            'Tune transaction-monitoring rules and manage alert triage defensibly',
            'Write an investigation file and a regulator-facing suspicious activity report'
        ],
        assessment: [
            'Case-file simulations containing sanctions and evasion traps',
            'A full transaction-monitoring rule specification with threshold rationale',
            'A mock regulatory examination with a live tutor review panel'
        ],
        modules: [
            { w: 'Weeks 1&ndash;5', h: 8, t: 'Financial Crime Risk Framework', d: 'Money laundering, terrorist financing, predicate offences, typologies, and designing a risk-based control environment.' },
            { w: 'Weeks 6&ndash;11', h: 8, t: 'Customer Due Diligence', d: 'CDD and EDD, beneficial ownership verification, politically exposed persons, and ongoing monitoring.' },
            { w: 'Weeks 12&ndash;17', h: 8, t: 'Transaction Monitoring &amp; Sanctions', d: 'Rule design and tuning, scenario-based monitoring, sanctions screening, and handling sanctions-evasion risk.' },
            { w: 'Weeks 18&ndash;22', h: 8, t: 'Investigation &amp; Reporting', d: 'Alert investigation, case escalation, suspicious activity reporting, tipping-off rules, and the audit trail regulators expect.' },
            { w: 'Weeks 23&ndash;26', h: 7, t: 'Digital Crime &amp; Crypto Risk', d: 'Virtual-asset service provider obligations, on-chain analytics awareness, and emerging fraud typologies.' }
        ],
        faculty: 'f6', nextCohort: '2026-11-03', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'esg-sustainability', cat: 'tax',
        title: 'ESG &amp; Sustainability Reporting (ISSB, IFRS S1/S2, CSRD)',
        awardingBody: 'ISSB / IFRS-aligned', badge: 'Assurance-ready', level: 'Advanced',
        duration: '6 months', load: '~8 h / week', schedule: 'Live online &middot; Wed &amp; Fri 18:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 3000, discountedFee: 2550, rating: 4.8, reviews: 174, learners: 590, cpd: 85,
        summary: 'Turn sustainability into a reporting discipline: materiality assessment, greenhouse-gas accounting, ISSB and ESRS disclosure, and the controls and evidence an assurance provider will demand before signing.',
        outcomes: [
            'Run a double-materiality assessment and defend the entities and topics you put in scope',
            'Calculate Scope 1, 2 and 3 emissions on a stated and defensible acquisition methodology',
            'Draft disclosure that satisfies ISSB, IFRS S1 and S2 alongside the ESRS standards',
            'Assemble the data lineage and controls that make a sustainability statement auditable'
        ],
        assessment: [
            'A materiality assessment document with the stakeholder process documented',
            'A Scope 1&ndash;3 emissions inventory with a defensible methodology note',
            'A mock limited-assurance engagement run against your own sustainability statement'
        ],
        modules: [
            { w: 'Weeks 1&ndash;4', h: 8, t: 'Materiality &amp; Reporting Frameworks', d: 'Double materiality, the ISSB and TCFD frameworks, IFRS S1 and S2, and mapping the ESRS standards onto one consolidated report.' },
            { w: 'Weeks 5&ndash;9', h: 8, t: 'Greenhouse Gas Accounting', d: 'Scopes 1, 2 and 3, emission factors, the GHG Protocol, and the boundary and methodology choices that make figures comparable.' },
            { w: 'Weeks 10&ndash;14', h: 8, t: 'Disclosures, Controls &amp; Data', d: 'Narrative and metrics disclosure, governance and internal controls, data lineage, and the evidence trail an assurance provider expects.' },
            { w: 'Weeks 15&ndash;19', h: 7, t: 'Assurance, Greenwashing &amp; Transition Risk', d: 'Limited and reasonable assurance, the claims regulators challenge first, and financing the physical transition.' }
        ],
        faculty: 'f2', nextCohort: '2026-12-08', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'forensic-audit', cat: 'tax',
        title: 'Forensic Accounting, Fraud Examination &amp; Digital Forensics',
        awardingBody: 'ACFE-aligned', badge: 'CFE pathway', level: 'Advanced',
        duration: '7 months', load: '~9 h / week', schedule: 'Live online &middot; Sat &amp; Sun 10:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 3300, discountedFee: 2850, rating: 4.9, reviews: 158, learners: 470, cpd: 100,
        summary: 'Investigate financial crime properly: fraud-risk assessment, forensic accounting methods, asset tracing, digital evidence, and the expert report that has to survive cross-examination.',
        outcomes: [
            'Assess fraud risk against a recognised framework and design proportionate controls',
            'Reconstruct transactions from incomplete, duplicated or manipulated records',
            'Trace and recover assets across entities, accounts and jurisdictions',
            'Produce litigation-ready expert reports and give defensible oral evidence'
        ],
        assessment: [
            'A full investigation file built from a redacted case record',
            'A digital evidence exercise with a documented chain of custody',
            'A mock expert report and cross-examination clinic with your tutor'
        ],
        modules: [
            { w: 'Weeks 1&ndash;5', h: 9, t: 'Fraud Risk &amp; Investigation Planning', d: 'The fraud triangle, the COSO framework, enterprise fraud-risk assessment, and scoping an investigation so it survives challenge.' },
            { w: 'Weeks 6&ndash;11', h: 9, t: 'Forensic Accounting Methods', d: 'Reconstructing incomplete records, revenue and inventory fraud, expenditure schemes, and the analytical review techniques that surface them.' },
            { w: 'Weeks 12&ndash;16', h: 9, t: 'Asset Tracing &amp; Recovery', d: 'Following funds through layered transfers, offshore structures and trusts, civil recovery, and the reports that support restraint and recovery orders.' },
            { w: 'Weeks 17&ndash;21', h: 8, t: 'Digital Evidence &amp; Data Forensics', d: 'Preserving and collecting electronic evidence, chain of custody, spreadsheet and database analysis, and the disclosure duties that follow.' },
            { w: 'Weeks 22&ndash;25', h: 7, t: 'Litigation Support &amp; Expert Reporting', d: 'Written expert reports, expert opinion, disclosure and privilege, and presenting evidence under cross-examination.' }
        ],
        faculty: 'f6', nextCohort: '2027-01-12', cohortFormat: 'Live online, weekend UTC slot'
    },
    {
        id: 'fin-modeling', cat: 'applied',
        title: 'Financial Modelling, DCF Valuation &amp; the Investment Case',
        awardingBody: 'ZHS Academy certificate', badge: 'Must-have skill', level: 'Intermediate',
        duration: '8 months', load: '~7 h / week', schedule: 'Live online &middot; Sat &amp; Sun 10:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 2200, discountedFee: 1850, rating: 4.9, reviews: 528, learners: 2640, cpd: 60,
        summary: 'Build institutional-grade three-statement models in Excel, then value a business with discounted cash flow and transaction comparables, and present the result to an investment-committee standard.',
        outcomes: [
            'Construct a linked, auditable three-statement model with working-capital and debt schedules',
            'Value a company using DCF with a defensible cost of capital',
            'Build trading and transaction comparables and read implied multiples correctly',
            'Present an investment recommendation with sensitivity and scenario analysis'
        ],
        assessment: [
            'A complete model build reviewed for formula integrity and auditability',
            'A valuation pack with a one-page investment summary',
            'A live model review with your tutor, recorded for the cohort'
        ],
        modules: [
            { w: 'Weeks 1&ndash;6', h: 7, t: 'Model Architecture', d: 'Design standards, historical normalisation, revenue drivers, and avoiding hard-coded values in a live model.' },
            { w: 'Weeks 7&ndash;12', h: 7, t: 'Three-Statement Integration', d: 'Income statement, balance sheet and cash flow fully linked, including circularity handling and a working-capital schedule.' },
            { w: 'Weeks 13&ndash;17', h: 7, t: 'DCF &amp; Cost of Capital', d: 'Unlevered free cash flow, WACC derivation, terminal value approaches, and the mid-year versus year-end convention.' },
            { w: 'Weeks 18&ndash;22', h: 7, t: 'Comparables &amp; Precedents', d: 'Trading and transaction multiples, precedent transactions, and adjusting for growth, margin and capital-intensity differences.' },
            { w: 'Weeks 23&ndash;26', h: 6, t: 'Scenario, Sensitivity &amp; Communication', d: 'Scenario managers, two-way data tables, football-field valuation summaries, and pitching the result to decision-makers.' }
        ],
        faculty: 'f3', nextCohort: '2026-10-17', cohortFormat: 'Live online, weekend UTC slot'
    },
    {
        id: 'fpa-analytics', cat: 'applied',
        title: 'Power BI &amp; FP&amp;A Analytics for Finance Teams',
        awardingBody: 'Microsoft PL-300 aligned', badge: 'Employer wanted', level: 'Intermediate',
        duration: '5 months', load: '~7 h / week', schedule: 'Live online &middot; Tue &amp; Thu 19:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 1600, discountedFee: 1350, rating: 4.8, reviews: 346, learners: 1710, cpd: 55,
        summary: 'Turn the finance function into a data function. Model data in DAX, design decision-useful dashboards, and run the budgeting, forecasting and variance analysis that FP&amp;A teams are measured on.',
        outcomes: [
            'Build a star-schema semantic model with correct relationships and grain',
            'Write practical DAX measures for margin, variance and run-rate analysis',
            'Design a driver-based rolling forecast and update it without rebuilding the model',
            'Present analysis to non-finance stakeholders with clear recommendations'
        ],
        assessment: [
            'A published Power BI report scored against a professional rubric',
            'A rolling-forecast model with a documented driver tree',
            'A five-minute presentation of a real dataset to the cohort'
        ],
        modules: [
            { w: 'Weeks 1&ndash;4', h: 7, t: 'Finance Data Foundations', d: 'The general ledger, chart-of-accounts design, dimensional modelling, and the data-quality problems unique to finance.' },
            { w: 'Weeks 5&ndash;9', h: 7, t: 'Data Modelling with DAX', d: 'Star schemas, measures versus calculated columns, time-intelligence functions, and the semi-additive measures finance needs.' },
            { w: 'Weeks 10&ndash;13', h: 7, t: 'Power BI Report Design', d: 'Data model views, interaction design, report accessibility, and presenting a variance story rather than a dashboard dump.' },
            { w: 'Weeks 14&ndash;18', h: 7, t: 'FP&amp;A Practice: Budgeting &amp; Forecasting', d: 'Driver-based budgets, rolling forecasts, scenario modelling, and variance analysis with action-oriented commentary.' }
        ],
        faculty: 'f9', nextCohort: '2026-11-10', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'ifrs-consolidation', cat: 'applied',
        title: 'IFRS &amp; Group Consolidation Specialist',
        awardingBody: 'ZHS Academy certificate', badge: 'Technical reporting', level: 'Advanced',
        duration: '7 months', load: '~9 h / week', schedule: 'Live online &middot; Tue &amp; Thu 18:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 3400, discountedFee: 2950, rating: 4.9, reviews: 241, learners: 810, cpd: 95,
        summary: 'The judgement-heavy end of financial reporting: build a consolidation from source ledgers through eliminations, non-controlling interests and the disclosure note, then defend each treatment decision in front of an auditor.',
        outcomes: [
            'Consolidate a multi-entity group under IFRS 10, including NCI and the control assessment',
            'Apply IFRS 15 and IFRS 16 to revenue and leases and document the policy judgements',
            'Classify, measure and impair financial instruments under IFRS 9',
            'Translate foreign operations, account for business combinations and test impairment under IAS 36'
        ],
        assessment: [
            'A live consolidation build from trial balances through to primary statements and the equity note',
            'An IFRS 15 five-step analysis and an IFRS 9 classification and impairment write-up',
            'An auditor challenge session on your own treatment decisions, recorded for the cohort'
        ],
        modules: [
            { w: 'Weeks 1&ndash;5', h: 9, t: 'The Consolidation Framework', d: 'Control under IFRS 10, assessing ownership and power, structured entities and investment entities, and building the group perimeter.' },
            { w: 'Weeks 6&ndash;11', h: 9, t: 'Equity, NCI &amp; Eliminations', d: 'Non-controlling interests, intragroup elimination, unrealised profit on intragroup transactions, and preparing the equity note.' },
            { w: 'Weeks 12&ndash;17', h: 9, t: 'Revenue, Leases &amp; Financial Instruments', d: 'IFRS 15 performance obligations and variable consideration, IFRS 16 lessee and lessor accounting, and IFRS 9 classification, impairment and hedging.' },
            { w: 'Weeks 18&ndash;22', h: 9, t: 'Foreign Operations &amp; Combinations', d: 'IAS 21 functional currency and translation, IAS 24 related parties, IFRS 3 acquisition accounting, and goodwill measurement.' },
            { w: 'Weeks 23&ndash;26', h: 8, t: 'Impairment, Tax &amp; Disclosure', d: 'IAS 36 impairment testing and value in use, deferred tax under IAS 12, and the primary-statement and note disclosure framework.' }
        ],
        faculty: 'f2', nextCohort: '2026-11-10', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'frm-risk', cat: 'applied',
        title: 'Financial Risk Manager (FRM) &amp; Enterprise Risk',
        awardingBody: 'GARP (aligned)', badge: 'Quant-led', level: 'Advanced',
        duration: '8 months', load: '~12 h / week', schedule: 'Live online &middot; Mon &amp; Wed 19:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 4200, discountedFee: 3650, rating: 4.9, reviews: 196, learners: 640, cpd: 130,
        summary: 'Both parts of the GARP FRM pathway: the quantitative and probabilistic core in Part I, then market, credit, operational and liquidity risk in Part II, anchored to Basel and the enterprise risk framework.',
        outcomes: [
            'Quantify market risk with VaR and expected shortfall and defend the model assumptions',
            'Measure credit risk using PD, LGD and EAD, and compute expected loss and Basel capital',
            'Build a liquidity and funding framework including stress testing and contingency planning',
            'Design an enterprise risk programme and write a risk committee paper that drives action'
        ],
        assessment: [
            'A quant problem set in Part I register style with full working shown',
            'A Basel capital and expected-loss build for a simulated portfolio',
            'A risk committee pack presented to a tutor panel under time pressure'
        ],
        modules: [
            { w: 'Weeks 1&ndash;6', h: 12, t: 'Quantitative Foundations', d: 'Probability and statistics, distributions, correlation and covariance, linear algebra, and the valuation of derivatives and risk measures.' },
            { w: 'Weeks 7&ndash;12', h: 12, t: 'Instruments &amp; Market Risk', d: 'Risk factors, arbitrage-free pricing, VaR and expected shortfall, backtesting, stress testing, and the Basel market-risk framework.' },
            { w: 'Weeks 13&ndash;19', h: 12, t: 'Credit Risk', d: 'Default probability, loss given default and exposure at default, expected loss, credit scoring and models, diversification and securitisation.' },
            { w: 'Weeks 20&ndash;25', h: 12, t: 'Operational, Liquidity &amp; Enterprise Risk', d: 'Operational risk taxonomies, liquidity risk and asset-liability management, ERM governance, capital and liquidity regulation, and risk-adjusted performance.' }
        ],
        faculty: 'f5', nextCohort: '2026-11-10', cohortFormat: 'Live online, evening UTC slot'
    },
    {
        id: 'university-tuition', cat: 'academic',
        title: 'University Accounting &amp; Finance Tuition (BSc / BBA)',
        awardingBody: 'Assessed tuition, not an award', badge: 'Degree level', level: 'Foundation',
        duration: 'Per semester', load: '~6 h / week', schedule: 'Live online &middot; Mon &amp; Wed 16:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 1400, discountedFee: 1200, rating: 4.7, reviews: 428, learners: 1360, cpd: 30,
        summary: 'A structured companion to a university accounting and finance degree, aligned to the common core syllabus so students follow taught modules with the underlying concepts already in place.',
        outcomes: [
            'Manage a double-entry ledger and prepare basic financial statements unaided',
            'Apply cost and management accounting techniques to a decision problem',
            'Quantify a capital-investment decision using appraisal techniques',
            'Approach assignments and exam questions with a repeatable structure'
        ],
        assessment: [
            'Weekly graded problems drawn from the degree syllabus',
            'Mid-semester and end-semester mock examinations',
            'An assignment workshop ahead of each major submission'
        ],
        modules: [
            { w: 'Weeks 1&ndash;6', h: 6, t: 'Financial Accounting Foundations', d: 'Recording transactions, year-end adjustments, and preparing the primary financial statements.' },
            { w: 'Weeks 7&ndash;12', h: 6, t: 'Cost &amp; Management Accounting', d: 'Cost classification, absorption costing, variance analysis, and decision techniques.' },
            { w: 'Weeks 13&ndash;18', h: 6, t: 'Corporate Finance', d: 'Time value of money, capital budgeting, cost of capital, and capital structure.' },
            { w: 'Weeks 19&ndash;24', h: 6, t: 'Statistics, Business Law &amp; Tax', d: 'Descriptive and inferential statistics, the commercial law core, and the tax basics every finance graduate needs.' }
        ],
        faculty: 'f4', nextCohort: '2026-10-06', cohortFormat: 'Live online, afternoon UTC slot'
    },
    {
        id: 'alevel-accounting', cat: 'academic',
        title: 'CAIE A-Level Accounting &amp; Business (9706 / 9985)',
        awardingBody: 'Cambridge International', badge: 'A* track', level: 'Foundation',
        duration: '6 months', load: '~7 h / week', schedule: 'Live online &middot; Tue &amp; Thu 16:00 UTC',
        format: 'Live online + lesson vault',
        regularFee: 1500, discountedFee: 1300, rating: 4.9, reviews: 392, learners: 1180, cpd: 25,
        summary: 'Specification-complete preparation for A-Level Accounting and Business, built around past-paper technique, examiner-marked question types, and the specific lost-mark patterns candidates repeat.',
        outcomes: [
            'Produce adjustment-free and adjusted trial balances and a full set of statements',
            'Handle partnerships, consignment and manufacturing accounts with confidence',
            'Apply ratios, interpret performance, and write structured case responses',
            'Finish every paper inside the time limit'
        ],
        assessment: [
            'Question-type drills weighted exactly as the specification',
            'A full paper each week with self-marked model answers',
            'Two full mock papers under real time limits with feedback'
        ],
        modules: [
            { w: 'Weeks 1&ndash;5', h: 7, t: 'Accounting Principles &amp; Double Entry', d: 'Ledger mechanics, the cash book, error correction, and the adjustment process.' },
            { w: 'Weeks 6&ndash;11', h: 7, t: 'Financial Statements &amp; Ratios', d: 'Adjustments, published statement formats, ratio analysis, and interpretation for decision-making.' },
            { w: 'Weeks 12&ndash;18', h: 7, t: 'Partnerships, Consignment &amp; Manufacture', d: 'Partnership formation and changes, consignment accounts, and manufacturing cost statements.' },
            { w: 'Weeks 19&ndash;24', h: 7, t: 'Business Subject &amp; Case Technique', d: 'Business objectives, marketing, finance and accounting in context, and the structured case responses examiners reward.' }
        ],
        faculty: 'f4', nextCohort: '2026-10-06', cohortFormat: 'Live online, afternoon UTC slot'
    }
];
