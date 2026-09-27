/* ============================================================
   PROGRAMME DETAIL MODAL
   Renders the five detail panels, focus trap and pathway toggle.
   ============================================================ */
"use strict";

/* ============================================================
   COURSE DETAIL MODAL
   ============================================================ */
let modalCourseId = null;
let lastFocused = null;

function moduleList(c) {
    return '<ol class="space-y-3">' + c.modules.map((m, i) =>
        '<li class="flex gap-3">' +
            '<span class="num text-xs shrink-0 w-7 h-7 rounded-lg flex items-center justify-center" style="background:var(--c-accent-soft); color:var(--c-accent); border:1px solid var(--c-accent-line)">' + (i + 1) + '</span>' +
            '<span>' +
                '<span class="block font-semibold text-[.82rem]">' + m.t + '</span>' +
                '<span class="block text-[.72rem] muted mt-0.5 leading-relaxed">' + m.d + '</span>' +
                '<span class="inline-flex gap-2 mt-1.5">' +
                    '<span class="chip !text-[.62rem]">' + m.w + '</span>' +
                    '<span class="chip !text-[.62rem]">' + m.h + ' guided hours</span>' +
                '</span>' +
            '</span>' +
        '</li>'
    ).join('') + '</ol>';
}

function bulletList(title, items, icon) {
    return '<h3 class="text-[.7rem] font-bold uppercase tracking-wider mb-2" style="color:var(--c-muted)">' + title + '</h3>' +
        '<ul class="space-y-2">' + items.map((it) =>
            '<li class="flex gap-2.5 text-[.8rem] leading-relaxed" style="color:var(--c-ink-2)">' +
                '<i data-lucide="' + icon + '" class="w-4 h-4 mt-0.5 shrink-0" style="color:var(--c-accent)" aria-hidden="true"></i>' +
                '<span>' + it + '</span>' +
            '</li>'
        ).join('') + '</ul>';
}

function renderModalPanels(c) {
    const cat = CATEGORIES[c.cat];
    const lead = facultyById(c.faculty);
    const done = progress[c.id] === 'done';
    const active = progress[c.id] === 'active';
    const inPath = isInPathway(c.id);

    $('p-ov').innerHTML =
        '<p class="text-[.86rem] leading-relaxed" style="color:var(--c-ink-2)">' + c.summary + '</p>' +
        '<dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">' +
            [
                ['Awarding body', c.awardingBody],
                ['Level', c.level],
                ['Live schedule', c.schedule],
                ['Delivery', c.format],
                ['Next intake', c.nextCohort],
                ['Cohort format', c.cohortFormat]
            ].map((pair) =>
                '<div class="rounded-lg p-3" style="background:var(--c-surface-2); border:1px solid var(--c-line)">' +
                    '<dt class="text-[.62rem] uppercase tracking-wider muted">' + pair[0] + '</dt>' +
                    '<dd class="text-[.78rem] font-semibold mt-0.5">' + pair[1] + '</dd>' +
                '</div>'
            ).join('') +
        '</dl>' +
        '<div class="mt-5 flex flex-wrap gap-2">' +
            '<span class="badge ' + cat.badge + '">' + cat.label + '</span>' +
            '<span class="chip">' + c.badge + '</span>' +
            '<span class="chip">' + c.cpd + ' CPD credits</span>' +
            (done ? '<span class="badge b-accent">Completed</span>' : (active ? '<span class="badge b-gold">In progress</span>' : (inPath ? '<span class="badge b-info">In your pathway</span>' : ''))) +
        '</div>';

    $('p-cur').innerHTML = moduleList(c);

    $('p-out').innerHTML =
        '<h3 class="text-[.7rem] font-bold uppercase tracking-wider mb-2" style="color:var(--c-muted)">Learning outcomes</h3>' +
        '<ul class="space-y-2 mb-6">' + c.outcomes.map((o) =>
            '<li class="flex gap-2.5 text-[.8rem] leading-relaxed" style="color:var(--c-ink-2)">' +
                '<i data-lucide="check-circle" class="w-4 h-4 mt-0.5 shrink-0" style="color:var(--c-accent)" aria-hidden="true"></i><span>' + o + '</span></li>'
        ).join('') + '</ul>' +
        bulletList('How you are assessed', c.assessment, 'clipboard-check');

    $('p-fac').innerHTML = lead
        ? '<div class="flex flex-col sm:flex-row gap-4">' +
            '<span class="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-display font-extrabold text-xl shrink-0" style="background:' + lead.tint + '">' + lead.initials + '</span>' +
            '<div>' +
                '<p class="font-display font-bold">' + lead.name + '</p>' +
                '<p class="text-[.74rem] font-semibold" style="color:var(--c-accent)">' + lead.creds + '</p>' +
                '<p class="text-[.74rem] muted">' + lead.role + '</p>' +
                '<p class="text-[.8rem] mt-2.5 leading-relaxed" style="color:var(--c-ink-2)">' + lead.bio + '</p>' +
                '<div class="flex flex-wrap gap-1.5 mt-3">' + lead.tags.map((t) => '<span class="chip !text-[.64rem]">' + t + '</span>').join('') + '</div>' +
            '</div>' +
          '</div>'
        : '<p class="muted">Tutor details for this programme are available on request.</p>';

    const lump = Math.round(c.discountedFee * 0.15);
    $('p-fee').innerHTML =
        '<table class="w-full text-[.8rem]">' +
            '<caption class="sr-only">Fee breakdown for ' + c.title + '</caption>' +
            '<tbody>' +
                '<tr><th scope="row" class="text-left font-normal muted py-1.5">Published list price</th><td class="text-right mono muted line-through py-1.5">' + usd(c.regularFee) + '</td></tr>' +
                '<tr><th scope="row" class="text-left font-normal muted py-1.5">Programme tuition</th><td class="text-right mono py-1.5">' + usd(c.discountedFee) + '</td></tr>' +
                '<tr><th scope="row" class="text-left font-normal muted py-1.5">Lump-sum early-enrolment concession</th><td class="text-right mono py-1.5" style="color:var(--c-accent)">&minus;' + usd(lump) + '</td></tr>' +
                '<tr><th scope="row" class="text-left font-bold py-2">Total if paid in full</th><td class="text-right num text-lg py-2">' + usd(c.discountedFee - lump) + '</td></tr>' +
                '<tr><th scope="row" class="text-left font-normal muted py-1.5">3 monthly instalments at 0%</th><td class="text-right mono py-1.5">' + usd(c.discountedFee / 3) + ' &times; 3</td></tr>' +
                '<tr><th scope="row" class="text-left font-normal muted py-1.5">6 monthly instalments at 0%</th><td class="text-right mono py-1.5">' + usd(c.discountedFee / 6) + ' &times; 6</td></tr>' +
            '</tbody>' +
        '</table>' +
        '<p class="hint mt-3 flex items-start gap-2"><i data-lucide="info" class="w-3.5 h-3.5 mt-px shrink-0" aria-hidden="true"></i><span>Examination entry, membership and subscription fees charged by ' + c.awardingBody + ' are separate and are not included in programme tuition. Add-ons are itemised in the Fee Planner.</span></p>';
}

function openCourseDetails(id) {
    const c = courseById(id);
    if (!c) return;
    modalCourseId = id;
    lastFocused = document.activeElement;

    $('modalCategory').textContent = CATEGORIES[c.cat].label;
    $('modalCategory').className = 'badge ' + CATEGORIES[c.cat].badge;
    $('modalTitle').textContent = plain(c.title);
    $('modalDuration').textContent = c.duration;
    $('modalLoad').textContent = c.load;
    $('modalCpd').textContent = c.cpd + ' hrs';
    $('modalFee').textContent = usd(c.discountedFee);

    const pbtn = $('modalPathwayBtn');
    const inPath = isInPathway(id);
    pbtn.innerHTML = '<i data-lucide="' + (inPath ? 'minus' : 'plus') + '" class="w-4 h-4" aria-hidden="true"></i> ' + (inPath ? 'Remove from pathway' : 'Add to pathway');

    renderModalPanels(c);

    $('courseModal').hidden = false;
    document.body.style.overflow = 'hidden';
    if (tabRegistry.course) tabRegistry.course('p-ov', false);
    wireTablist('course');
    icons();
    const close = $('courseModal').querySelector('[aria-label="Close programme details"]');
    if (close) close.focus();
}

function closeCourseModal() {
    $('courseModal').hidden = true;
    document.body.style.overflow = '';
    modalCourseId = null;
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
}

function trapModalFocus(e) {
    if (e.key !== 'Tab' || $('courseModal').hidden) return;
    const dialog = $('modalDialog');
    const focusables = Array.from(dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
        .filter((el) => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

function togglePathwayFromModal() {
    if (!modalCourseId) return;
    const c = courseById(modalCourseId);
    if (isInPathway(modalCourseId)) {
        if (pathway) {
            pathway.steps = pathway.steps.filter((s) => s !== modalCourseId);
            persist('pathway', pathway);
        }
        showToast('Removed from pathway', c.title + ' is no longer in your route.');
    } else {
        addToPathway(modalCourseId, true);
    }
    renderModalPanels(c);
    const pbtn = $('modalPathwayBtn');
    const inPath = isInPathway(modalCourseId);
    pbtn.innerHTML = '<i data-lucide="' + (inPath ? 'minus' : 'plus') + '" class="w-4 h-4" aria-hidden="true"></i> ' + (inPath ? 'Remove from pathway' : 'Add to pathway');
    renderPathway();
    renderCourses();
    icons();
}

function enrollFromModal() {
    if (!modalCourseId) return;
    const c = courseById(modalCourseId);
    closeCourseModal();
    quickEnroll(modalCourseId || c.id);
}

function quickEnroll(id) {
    const c = courseById(id);
    if (c) $('programme').value = id;
    scrollToEnroll();
    showToast('Programme selected', c ? c.title : 'Please complete the form to finish registering.');
}
