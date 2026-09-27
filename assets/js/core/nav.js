/* ============================================================
   NAVIGATION HELPERS
   Smooth scrolling, print, and the mobile disclosure menu.
   ============================================================ */
"use strict";

/* ============================================================
   NAVIGATION HELPERS
   ============================================================ */
function initTicker() {
    const bar = document.querySelector('[data-ticker]');
    const track = bar && bar.querySelector('[data-ticker-track]');
    if (!bar || !track) return;
    const set = track.firstElementChild;
    if (!set) return;

    if (!set.nextElementSibling) {
        const clone = set.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    }

    /* Measure the set, never the track: once `.ticker--static` hides the clone
       the track collapses to a single set and the test would flip on re-run. */
    const fit = () => {
        const w = set.getBoundingClientRect().width;
        bar.classList.toggle('ticker--static', w * 2 <= bar.clientWidth + 1);
    };

    fit();
    window.addEventListener('load', fit);
    window.addEventListener('resize', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
}

function scrollToId(id) {
    const el = $(id);
    if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}
function scrollToEnroll() { scrollToId('enroll'); }
function focusVerify() { scrollToId('verify'); setTimeout(() => { const f = $('certInput'); if (f) f.focus(); }, 400); }
function printPage() { window.print(); }
function closeMobileMenu() {
    const menu = $('mobileMenu');
    const btn = $('mobileMenuBtn');
    if (menu) menu.hidden = true;
    if (btn) { btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Open navigation menu'); }
}
function toggleMobileMenu() {
    const menu = $('mobileMenu');
    const btn = $('mobileMenuBtn');
    const open = menu.hidden;
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
}
