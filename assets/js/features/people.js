/* ============================================================
   FACULTY & ALUMNI VIEWS
   Card rendering for both trust sections.
   ============================================================ */
"use strict";

/* ============================================================
   FACULTY & ALUMNI
   ============================================================ */
function facultyCard(f) {
    return '' +
    '<article class="card card-hover rounded-2xl p-5 flex flex-col items-center text-center">' +
        '<span class="w-20 h-20 rounded-full flex items-center justify-center text-white font-display font-extrabold text-xl shadow-card mb-3" style="background:' + f.tint + '; border:2px solid var(--c-accent-line)">' + f.initials + '</span>' +
        '<h3 class="hd-3 font-display font-bold">' + f.name + '</h3>' +
        '<p class="text-[.7rem] font-semibold mt-0.5" style="color:var(--c-accent)">' + f.creds + '</p>' +
        '<p class="text-[.72rem] muted">' + f.role + '</p>' +
        '<p class="text-[.76rem] mt-2.5 leading-relaxed" style="color:var(--c-ink-2)">' + f.bio + '</p>' +
        '<div class="flex flex-wrap justify-center gap-1.5 mt-4 pt-3 w-full" style="border-top:1px solid var(--c-line)">' +
            f.tags.map((t) => '<span class="chip !text-[.62rem]">' + t + '</span>').join('') +
        '</div>' +
    '</article>';
}
function renderFaculty() { $('facultyGrid').innerHTML = FACULTY.map(facultyCard).join(''); }

function alumniCard(a) {
    return '' +
    '<article class="card card-hover rounded-2xl p-5 flex flex-col">' +
        '<div class="flex text-amber-400 gap-0.5 mb-3" role="img" aria-label="Rated 5 out of 5">' +
            Array.from({ length: 5 }).map(() => '<i data-lucide="star" class="w-3.5 h-3.5 fill-current" aria-hidden="true"></i>').join('') +
        '</div>' +
        '<blockquote class="text-[.8rem] italic leading-relaxed" style="color:var(--c-ink-2)">&ldquo;' + a.quote + '&rdquo;</blockquote>' +
        '<div class="flex items-center gap-3 mt-5 pt-4" style="border-top:1px solid var(--c-line)">' +
            '<span class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0" style="background:var(--c-surface-3); color:var(--c-ink-2)">' + a.initials + '</span>' +
            '<div class="min-w-0">' +
                '<p class="text-xs font-bold">' + a.name + '</p>' +
                '<p class="text-[.68rem] muted leading-snug">' + a.role + ', ' + a.org + '</p>' +
                '<p class="text-[.66rem] muted">' + a.place + ' &middot; ' + a.region + '</p>' +
            '</div>' +
        '</div>' +
    '</article>';
}
function renderAlumni() { $('alumniGrid').innerHTML = ALUMNI.map(alumniCard).join(''); }
