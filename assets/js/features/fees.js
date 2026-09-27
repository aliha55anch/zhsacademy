/* ============================================================
   FEE PLANNER
   Payment plans, add-ons and the itemised total.
   ============================================================ */
"use strict";

/* ============================================================
   FEE PLANNER
   ============================================================ */
let feeState = { plan: 'lump', addons: {} };
function fmtDate(iso) {
    const p = String(iso).split('-');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const mi = Number(p[1]);
    return Number(p[2]) + ' ' + (months[mi - 1] || p[1]) + ' ' + p[0];
}
function cents(n) { return Math.round(n * 100) / 100; }

function populateFeeSelects() {
    const groups = Object.keys(CATEGORIES).map((key) =>
        '<optgroup label="' + CATEGORIES[key].label + '">' +
            COURSES.filter((c) => c.cat === key)
                .map((c) => '<option value="' + c.id + '">' + plain(c.title) + '</option>').join('') +
        '</optgroup>'
    ).join('');

    $('feeCourseSelect').innerHTML = groups;
    $('programme').innerHTML = '<option value="">Select a programme</option>' + groups;

    $('addonOptions').innerHTML = ADDONS.map((a) =>
        '<label class="opt">' +
            '<input type="checkbox" data-addon="' + a.id + '" data-price="' + a.price + '">' +
            '<span class="opt-body !p-2.5 flex items-center gap-2.5">' +
                '<span class="text-[.72rem] font-semibold flex-1 leading-snug">' + a.label + '</span>' +
                '<span class="mono text-[.72rem] shrink-0">+' + usd(a.price) + '</span>' +
            '</span>' +
        '</label>'
    ).join('');
}

function refreshIntakes() {
    const c = courseById($('feeCourseSelect').value);
    if (!c) return;
    const dates = Array.from(new Set([c.nextCohort].concat(INTAKES.map((i) => i.date)))).sort();
    $('cohortSelect').innerHTML = dates.map((d) =>
        '<option value="' + d + '"' + (d === c.nextCohort ? ' selected' : '') + '>' + fmtDate(d) + (d === c.nextCohort ? ' (next intake)' : '') + '</option>'
    ).join('');
}

function onFeeCourseChange() { refreshIntakes(); calculateFee(); }

function setFeePlan(plan) {
    feeState.plan = plan;
    document.querySelectorAll('[data-plan]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.plan === plan)));
    calculateFee();
}

function calculateFee() {
    const c = courseById($('feeCourseSelect').value);
    if (!c) return;

    const list = c.regularFee;
    const base = c.discountedFee;
    const concession = feeState.plan === 'lump' ? cents(base * 0.15) : 0;
    const addons = ADDONS.reduce((sum, a) => sum + (feeState.addons[a.id] ? a.price : 0), 0);
    const total = base - concession + addons;

    $('feeList').textContent = usd(list);
    $('feeBase').textContent = usd(base);
    $('feeConcessionRow').hidden = !concession;
    $('feeConcession').textContent = '- ' + usd(concession);
    $('feeAddonsRow').hidden = !addons;
    $('feeAddons').textContent = usd(addons);
    $('feeTotal').textContent = usd(total);
    $('cohortFormatDisplay').textContent = c.cohortFormat;

    if (feeState.plan === 'lump') {
        $('feeScheduleNote').textContent = 'Payable in full at enrolment, including the 15% early-enrolment concession.';
    } else {
        const n = Number(feeState.plan);
        const per = cents(total / n);
        const first = cents(total - per * (n - 1));
        $('feeScheduleNote').textContent = n + ' monthly instalments at 0% interest. ' + usd(first) + ' at enrolment, then ' + usd(per) + ' a month for ' + n + ' months. Total ' + usd(total) + '.';
    }

    const saving = list - (base - concession);
    $('feeSavingNote').textContent = saving > 0 ? 'You save ' + usd(saving) + ' against the published list price of ' + usd(list) + '.' : '';
}

function enrollFromPlanner() {
    const c = courseById($('feeCourseSelect').value);
    if (!c) return;
    $('programme').value = c.id;
    scrollToEnroll();
    const planText = feeState.plan === 'lump' ? 'lump-sum payment' : feeState.plan + '-month instalment plan';
    showToast('Plan attached', c.title + ' \u00b7 ' + usd($('feeTotal').textContent.replace(/[^0-9.]/g, '')) + ' \u00b7 ' + planText);
}
