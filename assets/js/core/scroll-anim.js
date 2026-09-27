/* ============================================================
   SCROLL ANIMATIONS
   Reveal-on-scroll engine, counting statistics, hero parallax and
   the reading-progress bar. Progressive enhancement only:
   reduced motion, or a browser without IntersectionObserver, means
   nothing is tagged at all - so nothing can be left sitting in a
   hidden "from" state.
   ============================================================ */
"use strict";

/* Subtrees that must never be tagged. The course modal is a dialog rather
   than document flow: its panels are re-rendered on every open, so a reveal
   would either replay each time or strand freshly injected nodes in the
   "from" state. The ticker, toast and skip link are chrome, not content, and
   the hero glow layers are parallax surfaces whose transform this file owns
   every frame - animating them here would fight it. */
const REVEAL_SKIP = '#courseModal, #toast, #certPrintSheet, .ticker, .skip-link, .hero-glow';

/* Ordered rule table, first match wins per element.
   `step` staggers siblings; the delay counter resets whenever the parent
   changes, so a multi-column grid cascades across a row instead of pushing
   its last row seconds behind its first. `alt` cycles the variant on its own
   counter, which deliberately does NOT reset per row: a three-up grid would
   otherwise start every row from the same edge and stack two left-handers on
   top of each other. `max` caps the total delay so long lists never crawl.
   `force` opts a rule out of the nested-motion guard below. */
const REVEAL_RULES = [
    /* Hero: a staged entrance on first paint, no scrolling required. */
    { sel: 'main > section:first-of-type h1', anim: 'blur' },
    { sel: 'main > section:first-of-type [data-hero="lead"]', anim: 'rise' },
    { sel: 'main > section:first-of-type form', anim: 'rise' },
    { sel: 'main > section:first-of-type .rounded-full', anim: 'pop' },
    { sel: 'main > section:first-of-type .chip-btn', anim: 'rise', step: 60 },
    { sel: 'main > section:first-of-type dl > div', anim: 'zoom', step: 80 },

    /* Boxes. Ordered ahead of the furniture rules below so a card wins over
       the heading text nested inside it: one animation per box, never a
       container and its contents both moving. `alt` makes neighbours arrive
       from opposite sides, so a row reads as pairs converging rather than a
       block sliding in as one piece. */
    { sel: '#coursesGrid > *', anim: 'left', alt: ['left', 'right'], step: 90 },
    { sel: '#facultyGrid > *', anim: 'left', alt: ['left', 'right'], step: 90 },
    { sel: '#alumniGrid > *', anim: 'left', alt: ['left', 'right'], step: 90 },
    { sel: '#alumni dl > div', anim: 'left', alt: ['left', 'right'], step: 90 },
    { sel: '#faq details', anim: 'left', alt: ['left', 'right'], step: 60 },
    { sel: '#verify .card', anim: 'left' },
    { sel: '#enroll .card', anim: 'right' },

    /* Paired columns converge from opposite edges. These selectors reach the
       two columns themselves, not the grid that wraps them. */
    { sel: '#pathway #pathwayForm', anim: 'left' },
    { sel: '#pathway #pathwayResult > *', anim: 'right' },
    { sel: '#fees > div > div > div:nth-child(1)', anim: 'left' },
    { sel: '#fees > div > div > div:nth-child(2)', anim: 'right' },

    /* Footer columns. */
    { sel: 'footer .grid > div', anim: 'left', alt: ['left', 'right'], step: 80 },
    { sel: 'footer > div > div.pt-6', anim: 'right' },

    /* Section furniture, for whatever is not already inside a box. */
    { sel: 'main section .kicker', anim: 'left' },
    { sel: 'main section h2.hd-1', anim: 'clip' },
    { sel: 'main section p.lead', anim: 'rise' },
    { sel: 'main > section[aria-label] > div > ul', anim: 'draw' },

    /* Catalogue filters, outside the card grid. */
    { sel: '#courses .chip-btn', anim: 'rise', step: 45 },

    /* Panels that only exist once the visitor acts. Declared last and flagged
       `force`: they live inside cards that are themselves tagged, but they
       arrive long after those cards finished animating, so there is no
       compounding motion to avoid - and keeping them out of the earlier rules
       stops them from making their host card look occupied. */
    { sel: '#certResult > *', anim: 'pop', force: true },
    { sel: '#enrollSuccess', anim: 'pop', force: true },
    { sel: '#noCoursesState', anim: 'zoom', force: true },
];

/* Containers whose contents change at runtime, so a rescan has to pick up
   nodes that did not exist on load. Observing these specific hosts rather
   than `document.body` keeps the rescan off the static stat blocks - the
   counter below rewrites their text, and a body-wide observer would wake
   itself up on every animation frame. */
const LIVE_GRIDS = '#coursesGrid, #facultyGrid, #alumniGrid, #pathwayResult, #goalOptions, #levelOptions, #addonOptions, #certResult';

const PARALLAX_SPEEDS = [0.16, -0.1];

let revealObs = null;
let gridObs = null;
let reduceQuery = null;
let progressFill = null;
const counted = new WeakSet();
let scanQueued = false;
let frameQueued = false;

/* Cached so the per-frame scroll handler reads a property instead of
   re-querying the media query sixty times a second. */
function revealsAllowed() {
    if (typeof window.IntersectionObserver !== 'function') return false;
    return !(reduceQuery || window.matchMedia('(prefers-reduced-motion: reduce)')).matches;
}

/* ============================================================
   REVEAL ENGINE
   ============================================================ */

/* Live track count of a grid parent, read once per parent rather than
   hard-coded, so the cascade is correct at every breakpoint: a 3-up grid
   should wave across a row, not delay its last row by seconds. Returns 0
   for non-grid parents, where a single-column cascade down the list is
   what you want anyway. */
function columnCount(el) {
    if (!el || el.nodeType !== 1) return 0;
    const tpl = window.getComputedStyle(el).gridTemplateColumns;
    if (!tpl || tpl === 'none') return 0;
    return tpl.split(' ').filter(Boolean).length;
}

/* `tagNew` false is the relayout pass: it refreshes only the stagger delays,
   leaving already-observed elements alone, so a window resize re-times the
   cascade without restarting animations that have already played. */
function applyRule(rule, tagNew) {
    let nodes;
    try { nodes = document.querySelectorAll(rule.sel); } catch (e) { return; }

    let lastParent = null;
    let cols = 0;
    let index = 0;
    /* Variant cycle, independent of the per-row delay counter. */
    let altIndex = 0;

    for (const el of nodes) {
        const parent = el.parentElement;
        if (parent !== lastParent) { lastParent = parent; cols = columnCount(parent); index = 0; }
        if (cols > 0 && index > 0 && index % cols === 0) index = 0;

        const blocked = !!el.closest(REVEAL_SKIP);
        const known = !!el.dataset.anim;

        /* An element that already has an animated box above it, or already
           owns an animated box below it, must stay still. Two transforms on
           one subtree compound into a lurch, and the table order decides
           which of the pair wins - so the check runs in both directions to
           stay correct however the rules are arranged. A `force`-tagged
           descendant is exempt: those are late panels, and the host card is
           long settled by the time they appear. */
        const insideBox = !known && !!parent && !!parent.closest('[data-anim]');
        const ownsBox = !known && !!el.querySelector('[data-anim]:not([data-anim-force])');
        const nested = !rule.force && (insideBox || ownsBox);

        if (!known && !blocked && !nested) {
            el.dataset.anim = rule.alt ? rule.alt[altIndex % rule.alt.length] : rule.anim;
            if (rule.force) el.dataset.animForce = '1';
            if (tagNew) revealObs.observe(el);
        }
        if (rule.step && !blocked && !nested && (known || tagNew)) {
            el.style.setProperty('--d', Math.min(index * rule.step, rule.max || 360) + 'ms');
        }
        if (!blocked && !nested) {
            index++;
            altIndex++;
        }
    }
}

function applyReveals() {
    if (!revealsAllowed()) return;
    REVEAL_RULES.forEach((rule) => applyRule(rule, true));
}

function relayoutDelays() {
    if (!revealsAllowed()) return;
    REVEAL_RULES.forEach((rule) => applyRule(rule, false));
}

function queueScan() {
    if (scanQueued) return;
    scanQueued = true;
    requestAnimationFrame(() => { scanQueued = false; applyReveals(); });
}

function onReveal(entries) {
    for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        el.classList.add('is-in');
        countWithin(el);
        /* Guarded: a preference change can teardown the observer between the
           intersection being queued and this callback running. */
        if (revealObs) revealObs.unobserve(el);
    }
}

/* ============================================================
   COUNTING STATISTICS
   ============================================================ */

/* Fires the count on a statistic the moment its container is revealed, so
   the number ticks up while the card is still settling into place. */
function countWithin(scope) {
    const targets = scope.tagName === 'DD' && scope.classList.contains('num')
        ? [scope]
        : Array.prototype.slice.call(scope.querySelectorAll('dd.num'));
    targets.forEach(countUp);
}

/* Rewrites only the leading text node, so a statistic written as
   `7.4 <span>months</span>` keeps its styled unit span. The Fee Planner's
   total is deliberately excluded: it is a live figure the learner is
   reading, not a headline stat, and it recalculates on every interaction. */
function countUp(el) {
    if (!revealsAllowed() || counted.has(el) || el.closest('#fees')) return;
    counted.add(el);

    const node = el.firstChild;
    if (!node || node.nodeType !== 3) return;

    const raw = node.nodeValue;
    const m = /^([^\d]*)(\d[\d,]*(?:\.\d+)?)([\s\S]*)$/.exec(raw);
    if (!m) return;

    const target = parseFloat(m[2].replace(/,/g, ''));
    /* `1:1`, dates and fractions are labels, not quantities. */
    if (!isFinite(target) || target === 0 || /[:/]/.test(m[2] + m[3])) return;

    const pre = m[1];
    const rest = m[3];
    const decimals = (m[2].split('.')[1] || '').length;
    const grouped = m[2].indexOf(',') > -1;
    const duration = 1150;
    const start = performance.now();

    const step = (now) => {
        /* Clamped: `now` is a rAF timestamp while `start` came from
           performance.now(), and the two are not guaranteed to share an
           ordering. Without the floor a mismatched pair renders a negative
           statistic for one frame. */
        const p = Math.min(Math.max((now - start) / duration, 0), 1);
        const eased = 1 - Math.pow(1 - p, 3);
        let value = (target * eased).toFixed(decimals);
        if (grouped) {
            value = Number(value).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        }
        node.nodeValue = pre + value + rest;
        if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

/* ============================================================
   PARALLAX + READING PROGRESS
   ============================================================ */

function applyParallax() {
    if (!revealsAllowed()) return;
    const layers = document.querySelectorAll('main > section:first-of-type .blur-3xl');
    Array.prototype.forEach.call(layers, (el, i) => {
        el.dataset.parallax = String(PARALLAX_SPEEDS[i % PARALLAX_SPEEDS.length]);
    });
}

/* One rAF-batched frame for every scroll-driven effect on the page, so a
   trackpad storm still costs a single write pass. */
function onScrollFrame() {
    frameQueued = false;
    const y = window.pageYOffset || document.documentElement.scrollTop || 0;
    const doc = document.documentElement;
    const range = (doc.scrollHeight - window.innerHeight) || 1;
    const p = Math.min(Math.max(y / range, 0), 1);

    if (progressFill) progressFill.style.transform = 'scaleX(' + p.toFixed(4) + ')';

    /* Cheap guard: the hero layers can only be seen near the top, so stop
       writing to them once the hero is well out of view. */
    if (revealsAllowed() && y < window.innerHeight * 1.5) {
        const layers = document.querySelectorAll('[data-parallax]');
        Array.prototype.forEach.call(layers, (el) => {
            const speed = parseFloat(el.dataset.parallax) || 0;
            el.style.transform = 'translate3d(0,' + (-(y * speed)).toFixed(2) + 'px,0)';
        });
    }
}

function onScroll() {
    if (frameQueued) return;
    frameQueued = true;
    requestAnimationFrame(onScrollFrame);
}

/* Resize can change a grid's column count, which changes where the cascade
   should restart. Debounced: a drag-resize fires a burst of these. */
let relayoutTimer = 0;
function onResize() {
    onScroll();
    clearTimeout(relayoutTimer);
    relayoutTimer = setTimeout(relayoutDelays, 150);
}

/* ============================================================
   TEARDOWN
   ============================================================ */

/* Runs when the visitor flips the OS reduced-motion switch mid-session, so
   the page neither keeps animating against their new preference nor leaves
   half-tagged nodes frozen in the "from" state. */
function teardown() {
    if (revealObs) { revealObs.disconnect(); revealObs = null; }
    if (gridObs) { gridObs.disconnect(); gridObs = null; }
    clearTimeout(relayoutTimer);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    document.documentElement.classList.remove('js-reveal');

    Array.prototype.forEach.call(document.querySelectorAll('[data-anim], [data-parallax]'), (el) => {
        el.removeAttribute('data-anim');
        el.removeAttribute('data-anim-force');
        el.removeAttribute('data-parallax');
        el.style.removeProperty('--d');
        el.style.transform = '';
    });
    if (progressFill) progressFill.style.transform = '';
    frameQueued = false;
}

let prefBound = false;

function initScrollAnimations() {
    progressFill = document.querySelector('[data-progress-bar]');
    reduceQuery = reduceQuery || window.matchMedia('(prefers-reduced-motion: reduce)');

    /* Bind the preference listener once, outside the re-init path, so a
       toggle back and forth cannot stack duplicate handlers. */
    if (!prefBound) {
        prefBound = true;
        const onPrefChange = () => { initScrollAnimations(); };
        if (reduceQuery.addEventListener) reduceQuery.addEventListener('change', onPrefChange);
        else if (reduceQuery.addListener) reduceQuery.addListener(onPrefChange);
    }

    teardown();
    if (!revealsAllowed()) return;

    document.documentElement.classList.add('js-reveal');

    revealObs = new IntersectionObserver(onReveal, {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.05
    });

    applyReveals();
    applyParallax();
    onScrollFrame();

    /* A MutationObserver, not the IntersectionObserver above: the grids are
       re-rendered wholesale by the catalogue filters and the fee planner, and
       only a childList observer can see nodes that did not exist on load. */
    gridObs = new MutationObserver(queueScan);
    Array.prototype.forEach.call(document.querySelectorAll(LIVE_GRIDS), (grid) => {
        gridObs.observe(grid, { childList: true });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
}
