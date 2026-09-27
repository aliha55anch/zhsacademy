/* ============================================================
   PROGRAMME CATALOGUE
   Category + keyword filtering and the programme card grid.
   ============================================================ */
"use strict";

/* ============================================================
   CATALOGUE
   ============================================================ */
let catalog = { cat: 'all', query: '' };
let pathway = store('pathway', null);
let progress = store('progress', {});
const STATUS = { done: 'Completed', active: 'In progress' };

function isInPathway(id) { return !!(pathway && pathway.steps.indexOf(id) > -1); }

function courseCard(c) {
    const cat = CATEGORIES[c.cat];
    const save = Math.round((1 - c.discountedFee / c.regularFee) * 100);
    const done = progress[c.id] === 'done';
    const active = progress[c.id] === 'active';
    let statusChip = '';
    if (done) statusChip = '<span class="badge b-accent">Completed</span>';
    else if (active) statusChip = '<span class="badge b-gold">In progress</span>';
    else if (isInPathway(c.id)) statusChip = '<span class="badge b-info">In your pathway</span>';

    return '' +
    '<article class="card card-hover rounded-2xl overflow-hidden flex flex-col">' +
        '<div class="p-5 flex-1">' +
            '<div class="flex items-start justify-between gap-2 mb-3 flex-wrap">' +
                '<span class="badge ' + cat.badge + '">' + cat.label + '</span>' +
                '<span class="chip">' + c.badge + '</span>' +
            '</div>' +
            '<h3 class="hd-3 font-display font-bold leading-snug">' + c.title + '</h3>' +
            '<p class="text-[.78rem] muted mt-2 clamp-3 leading-relaxed">' + c.summary + '</p>' +
            '<p class="text-[.68rem] muted mt-2.5">' + c.awardingBody + '</p>' +
            '<div class="mt-4 pt-4 grid grid-cols-2 gap-y-2.5 gap-x-3 text-[.7rem] muted" style="border-top:1px solid var(--c-line)">' +
                '<span class="flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5 shrink-0" style="color:var(--c-accent)" aria-hidden="true"></i>' + c.duration + '</span>' +
                '<span class="flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5 shrink-0" style="color:var(--c-gold)" aria-hidden="true"></i>' + c.schedule.split('&middot;')[0] + '</span>' +
                '<span class="flex items-center gap-1.5"><i data-lucide="star" class="w-3.5 h-3.5 shrink-0" style="color:var(--c-gold)" aria-hidden="true"></i>' + c.rating + ' <span class="muted">(' + c.reviews + ')</span></span>' +
                '<span class="flex items-center gap-1.5"><i data-lucide="users" class="w-3.5 h-3.5 shrink-0" style="color:var(--c-info)" aria-hidden="true"></i>' + c.learners.toLocaleString('en-US') + ' learners</span>' +
            '</div>' +
            (statusChip ? '<div class="mt-3">' + statusChip + '</div>' : '') +
        '</div>' +
        '<div class="px-5 pb-5">' +
            '<div class="pt-3 flex items-baseline justify-between gap-2 mb-4" style="border-top:1px solid var(--c-line)">' +
                '<p class="mono"><span class="text-[.7rem] muted line-through">' + usd(c.regularFee) + '</span> <span class="text-base font-bold">' + usd(c.discountedFee) + '</span></p>' +
                '<span class="badge b-accent">Save ' + save + '%</span>' +
            '</div>' +
            '<div class="grid grid-cols-2 gap-2">' +
                '<button type="button" class="btn btn-outline btn-sm" onclick="openCourseDetails(\'' + c.id + '\')"><i data-lucide="eye" class="w-3.5 h-3.5" aria-hidden="true"></i> Details</button>' +
                '<button type="button" class="btn btn-accent btn-sm" onclick="quickEnroll(\'' + c.id + '\')">Enrol</button>' +
            '</div>' +
        '</div>' +
    '</article>';
}

function renderCourses() {
    const q = catalog.query.trim().toLowerCase();
    const filtered = COURSES.filter((c) => {
        if (catalog.cat !== 'all' && c.cat !== catalog.cat) return false;
        if (!q) return true;
        const haystack = [c.title, c.summary, c.awardingBody, c.badge, c.level].join(' ').toLowerCase();
        return haystack.indexOf(q) > -1 || c.modules.some((m) => (m.t + ' ' + m.d).toLowerCase().indexOf(q) > -1);
    });

    $('totalCourseCount').textContent = COURSES.length;
    $('resultCount').textContent = filtered.length + ' of ' + COURSES.length + ' programmes shown';
    $('noCoursesState').hidden = filtered.length > 0;
    $('coursesGrid').innerHTML = filtered.map(courseCard).join('');
    icons();
}

function setCategory(cat) {
    catalog.cat = cat;
    document.querySelectorAll('[data-cat]').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn.dataset.cat === cat));
    });
    renderCourses();
}
/* `catalog.query` is mirrored into two inputs: the hero search box and the
   catalogue filter box. Writing only one of them left the other showing stale
   text, so a chip click could reset the grid while the hero still read "CFA".
   Every mutation of the query goes through here. */
function syncSearchInputs(query) {
    catalog.query = query || '';
    $('courseFilterSearch').value = catalog.query;
    $('heroSearchInput').value = catalog.query;
}
function resetCatalogFilters() {
    syncSearchInputs('');
    setCategory('all');
}
function setCatalogFilter(cat, keyword) {
    syncSearchInputs(keyword);
    setCategory(cat);
    scrollToId('courses');
}
function triggerSearch() {
    syncSearchInputs($('heroSearchInput').value);
    setCategory('all');
    scrollToId('courses');
}
