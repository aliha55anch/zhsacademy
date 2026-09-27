/* ============================================================
   LEARNING PATHWAY BUILDER
   Route assembly, budget check and progress tracking.
   ============================================================ */
"use strict";

/* ============================================================
   PATHWAY BUILDER
   ============================================================ */
function renderPathwayOptions() {
    $('goalOptions').innerHTML = PATHWAY_GOALS.map((g, i) =>
        '<label class="opt">' +
            '<input type="radio" name="goal" value="' + g.id + '"' + (i === 3 ? ' checked' : '') + '>' +
            '<span class="opt-body">' +
                '<span class="block text-[.8rem] font-bold leading-snug">' + g.title + '</span>' +
                '<span class="block text-[.68rem] muted mt-1 leading-snug">' + g.blurb + '</span>' +
                '<span class="block text-[.64rem] mt-1.5 font-semibold" style="color:var(--c-accent)">~' + g.months + ' months &middot; ' + g.steps.length + ' programmes</span>' +
            '</span>' +
        '</label>'
    ).join('');

    $('levelOptions').innerHTML = LEVELS.map((l) =>
        '<label class="opt">' +
            '<input type="radio" name="level" value="' + l.id + '"' + (l.id === 'intermediate' ? ' checked' : '') + '>' +
            '<span class="opt-body !p-2.5">' +
                '<span class="block text-[.75rem] font-bold leading-snug">' + l.label + '</span>' +
                '<span class="block text-[.64rem] muted mt-0.5 leading-snug">' + l.sub + '</span>' +
            '</span>' +
        '</label>'
    ).join('');
}

function restorePathwayInputs() {
    if (!pathway) return;
    const g = document.querySelector('input[name="goal"][value="' + pathway.goal + '"]');
    if (g) g.checked = true;
    const l = document.querySelector('input[name="level"][value="' + pathway.level + '"]');
    if (l) l.checked = true;
    if (pathway.hours) $('hoursSelect').value = pathway.hours;
    if (pathway.budget) $('budgetSelect').value = String(pathway.budget);
}

function addToPathway(id, quiet) {
    if (!pathway) pathway = { goal: 'switch', level: 'intermediate', hours: '10', budget: 5000, steps: [], months: 0, total: 0 };
    if (pathway.steps.indexOf(id) < 0) pathway.steps.push(id);
    persist('pathway', pathway);
    if (!quiet) showToast('Added to pathway', courseById(id).title);
}

function buildPathway() {
    const form = $('pathwayForm');
    const goalId = form.querySelector('input[name="goal"]:checked').value;
    const levelId = form.querySelector('input[name="level"]:checked').value;
    const hours = $('hoursSelect').value;
    const budget = Number($('budgetSelect').value);
    const goal = PATHWAY_GOALS.find((g) => g.id === goalId);
    const level = LEVELS.find((l) => l.id === levelId);

    const steps = goal.steps.slice();
    if (goal.boost && levelId === 'foundation' && steps[0] !== 'acca-foundation') steps.unshift('acca-foundation');
    if (levelId === 'advanced') {
        const first = courseById(steps[0]);
        if (first && first.level === 'Foundation') steps.shift();
    }

    const months = Math.max(2, Math.round(goal.months * (HOURS_FACTOR[hours] || 1) * level.monthsFactor));
    const total = steps.reduce((sum, id) => { const c = courseById(id); return sum + (c ? c.discountedFee : 0); }, 0);

    pathway = { goal: goalId, level: levelId, hours: hours, budget: budget, steps: steps, months: months, total: total };
    persist('pathway', pathway);
    renderPathway();
    renderCourses();
    icons();
    showToast('Pathway built', steps.length + ' programmes over about ' + months + ' months at ' + hours + ' hours a week.');
}

function cycleProgress(id) {
    const cur = progress[id];
    if (cur === 'done') { delete progress[id]; }
    else if (cur === 'active') { progress[id] = 'done'; }
    else { progress[id] = 'active'; }
    persist('progress', progress);
    renderPathway();
    renderCourses();
    icons();
}

function resetPathway() {
    pathway = null;
    progress = {};
    persist('pathway', null);
    persist('progress', {});
    renderPathway();
    renderCourses();
    icons();
    showToast('Pathway cleared', 'Your route and progress have been removed from this browser.');
}

function renderPathway() {
    const host = $('pathwayResult');
    if (!pathway || !pathway.steps || !pathway.steps.length) {
        host.innerHTML =
            '<div class="card rounded-2xl p-8 text-center">' +
                '<span class="icon-box mx-auto mb-3"><i data-lucide="route" class="w-6 h-6" aria-hidden="true"></i></span>' +
                '<h3 class="hd-3 font-display font-bold">No pathway built yet</h3>' +
                '<p class="text-sm muted mt-2 max-w-sm mx-auto">Choose a goal on the left and select <strong>Build my pathway</strong> to see your sequenced route, timeline and total investment.</p>' +
            '</div>';
        return;
    }

    const goal = PATHWAY_GOALS.find((g) => g.id === pathway.goal);
    const level = LEVELS.find((l) => l.id === pathway.level);
    const doneCount = pathway.steps.filter((id) => progress[id] === 'done').length;
    const pct = Math.round((doneCount / pathway.steps.length) * 100);
    const overBudget = pathway.total > pathway.budget;
    const removable = pathway.steps
        .filter((id) => progress[id] !== 'done')
        .map((id) => ({ id: id, c: courseById(id) }))
        .filter((o) => o.c)
        .sort((a, b) => b.c.discountedFee - a.c.discountedFee)[0];
    const trimmedTotal = removable ? pathway.total - removable.c.discountedFee : pathway.total;

    const stepRow = (id, index) => {
        const c = courseById(id);
        if (!c) return '';
        const status = progress[id];
        const btnLabel = status === 'done' ? 'Completed' : (status === 'active' ? 'In progress' : 'Not started');
        const btnIcon = status === 'done' ? 'circle-check' : (status === 'active' ? 'circle-dot' : 'circle');
        const btnStyle = status === 'done' ? 'background:var(--c-accent-soft); color:var(--c-accent); border-color:var(--c-accent-line)'
            : (status === 'active' ? 'background:var(--c-gold-soft); color:var(--c-gold); border-color:var(--c-gold-line)' : '');
        return '' +
        '<li class="flex gap-3 sm:gap-4">' +
            '<span class="num text-xs shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style="background:var(--c-accent-soft); color:var(--c-accent); border:1px solid var(--c-accent-line)">' + (index + 1) + '</span>' +
            '<div class="flex-1 min-w-0">' +
                '<p class="text-[.84rem] font-bold leading-snug">' + c.title + '</p>' +
                '<p class="text-[.68rem] muted mt-0.5">' + c.duration + ' &middot; ' + c.awardingBody + '</p>' +
                '<div class="flex flex-wrap items-center gap-2 mt-2.5">' +
                    '<span class="mono text-[.76rem] font-bold">' + usd(c.discountedFee) + '</span>' +
                    '<button type="button" onclick="cycleProgress(\'' + id + '\')" class="chip chip-btn !text-[.62rem]" style="' + btnStyle + '" aria-label="Change completion status for ' + plain(c.title) + '">' +
                        '<i data-lucide="' + btnIcon + '" class="w-3 h-3" aria-hidden="true"></i>' + btnLabel +
                    '</button>' +
                    '<button type="button" onclick="openCourseDetails(\'' + id + '\')" class="text-[.68rem] font-semibold underline underline-offset-2 hover:text-ink">Details</button>' +
                '</div>' +
            '</div>' +
        '</li>';
    };

    host.innerHTML =
    '<div class="card rounded-2xl p-5 sm:p-6">' +
        '<div class="flex flex-wrap items-start justify-between gap-3">' +
            '<div>' +
                '<span class="badge b-accent">' + (goal ? goal.title : 'Pathway') + '</span>' +
                '<p class="text-[.72rem] muted mt-2">Scaled for <strong>' + (level ? level.label : '') + '</strong> at <strong>' + pathway.hours + ' hours a week</strong>.</p>' +
            '</div>' +
            '<button type="button" onclick="printPage()" class="btn btn-outline btn-sm"><i data-lucide="printer" class="w-3.5 h-3.5" aria-hidden="true"></i> Save plan</button>' +
        '</div>' +

        '<dl class="grid grid-cols-3 gap-3 mt-5">' +
            '<div class="rounded-xl p-3 text-center" style="background:var(--c-surface-2); border:1px solid var(--c-line)"><dt class="text-[.62rem] uppercase tracking-wider muted">Timeline</dt><dd class="num text-lg mt-0.5">' + pathway.months + ' <span class="text-[.68rem] font-semibold muted">months</span></dd></div>' +
            '<div class="rounded-xl p-3 text-center" style="background:var(--c-surface-2); border:1px solid var(--c-line)"><dt class="text-[.62rem] uppercase tracking-wider muted">Programmes</dt><dd class="num text-lg mt-0.5">' + pathway.steps.length + '</dd></div>' +
            '<div class="rounded-xl p-3 text-center" style="background:var(--c-surface-2); border:1px solid var(--c-line)"><dt class="text-[.62rem] uppercase tracking-wider muted">Total tuition</dt><dd class="num text-lg mt-0.5">' + usd(pathway.total) + '</dd></div>' +
        '</dl>' +

        (overBudget
            ? '<div class="mt-4 rounded-xl p-3.5 flex items-start gap-2.5" style="background:var(--c-warn-soft); border:1px solid var(--c-warn-line)">' +
                '<i data-lucide="alert-triangle" class="w-4 h-4 mt-0.5 shrink-0" style="color:var(--c-warn)" aria-hidden="true"></i>' +
                '<p class="text-[.76rem] leading-relaxed" style="color:var(--c-ink-2)"><strong>Over your stated budget.</strong> This route costs ' + usd(pathway.total) + ' against a ' + usd(pathway.budget) + ' ceiling. ' +
                (removable ? 'Dropping <em>' + plain(removable.c.title) + '</em> brings it to ' + usd(trimmedTotal) + '.' : 'Consider a shorter goal.') + '</p>' +
              '</div>'
            : '<p class="hint mt-3 flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 shrink-0" style="color:var(--c-accent)" aria-hidden="true"></i><span>Within your stated budget of ' + usd(pathway.budget) + '.</span></p>') +

        '<div class="mt-5">' +
            '<div class="flex items-center justify-between text-[.72rem] mb-1.5">' +
                '<span class="font-semibold">Your progress</span>' +
                '<span class="mono muted">' + doneCount + ' of ' + pathway.steps.length + ' complete</span>' +
            '</div>' +
            '<div class="meter" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100" aria-label="Pathway completion"><span style="width:' + pct + '%"></span></div>' +
        '</div>' +

        '<ol class="mt-5 space-y-4">' + pathway.steps.map(stepRow).join('') + '</ol>' +

        '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6">' +
            '<button type="button" onclick="enrollFromPathway()" class="btn btn-accent"><i data-lucide="arrow-right" class="w-4 h-4" aria-hidden="true"></i> Start with step one</button>' +
            '<button type="button" onclick="resetPathway()" class="btn btn-outline">Clear pathway</button>' +
        '</div>' +
    '</div>';
}

function enrollFromPathway() {
    const first = pathway && pathway.steps[0];
    if (first) quickEnroll(first);
}
