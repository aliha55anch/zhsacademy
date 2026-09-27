/* ============================================================
   WIRING & INIT
   Single entry point. All feature modules load before this file.
   ============================================================ */
"use strict";

/* ============================================================
   WIRING & INIT
   ============================================================ */
function wireEvents() {
    $('themeToggle').addEventListener('click', toggleTheme);
    $('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('[data-close-menu]').forEach((a) => a.addEventListener('click', closeMobileMenu));

    document.querySelectorAll('[data-cat]').forEach((btn) => btn.addEventListener('click', () => {
        catalog.cat = btn.dataset.cat;
        persist('catalog', { cat: catalog.cat, query: catalog.query });
        setCategory(catalog.cat);
    }));
    document.getElementById('courseFilterSearch').addEventListener('input', (e) => {
        catalog.query = e.target.value;
        persist('catalog', { cat: catalog.cat, query: catalog.query });
        renderCourses();
    });
    $('heroSearchInput').addEventListener('input', (e) => {
        catalog.query = e.target.value;
        persist('catalog', { cat: catalog.cat, query: catalog.query });
    });

    document.querySelectorAll('[data-plan]').forEach((btn) => btn.addEventListener('click', () => setFeePlan(btn.dataset.plan)));
    $('addonOptions').addEventListener('change', (e) => {
        const box = e.target.closest('[data-addon]');
        if (!box) return;
        feeState.addons[box.dataset.addon] = box.checked;
        calculateFee();
    });

    $('pathwayForm').addEventListener('submit', (e) => { e.preventDefault(); buildPathway(); });
    $('enrollForm').addEventListener('submit', handleEnrollmentSubmit);

    $('courseModal').addEventListener('click', (e) => { if (e.target === $('courseModal')) closeCourseModal(); });

    document.addEventListener('keydown', (e) => {
        trapModalFocus(e);
        if (e.key === 'Escape') {
            if (!$('courseModal').hidden) closeCourseModal();
            if (!$('mobileMenu').hidden) closeMobileMenu();
        }
    });
}

function init() {
    initTheme();
    initTicker();
    $('footerYear').textContent = new Date().getFullYear();

    populateFeeSelects();
    renderPathwayOptions();
    restorePathwayInputs();

    const saved = store('catalog', null);
    if (saved) { catalog.cat = saved.cat || 'all'; syncSearchInputs(saved.query); }
    setCategory(catalog.cat);

    renderFaculty();
    renderAlumni();
    renderPathway();
    refreshIntakes();
    calculateFee();
    wireEvents();
    initScrollAnimations();
    icons();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
