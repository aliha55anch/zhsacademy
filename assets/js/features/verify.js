/* ============================================================
   CREDENTIAL VERIFICATION
   Lookup, result rendering and the print-only slip.
   ============================================================ */
"use strict";

/* ============================================================
   CREDENTIAL VERIFICATION
   ============================================================ */
function certFields(rec) {
    return [
        ['Programme', rec.course],
        ['Awarding body', rec.awarding],
        ['Roll number', rec.rollNo],
        ['Completion date', rec.completionDate],
        ['Result', rec.grade],
        ['Supervising tutor', rec.instructor],
        ['CPD credits', rec.cpd],
        ['Guided hours', rec.hours]
    ];
}

function verifyCredential() {
    const input = $('certInput');
    const raw = (input.value || '').trim().toUpperCase();
    const box = $('certResult');

    if (!raw) {
        input.setAttribute('aria-invalid', 'true');
        showToast('Enter a credential ID', 'For example ZHS-GLB-2026-0412.', 'error');
        input.focus();
        return;
    }
    input.removeAttribute('aria-invalid');

    const rec = CERTS[raw];
    if (rec) {
        box.innerHTML =
            '<div class="fade-in rounded-2xl" style="background:var(--c-accent-soft); border:1px solid var(--c-accent-line)">' +
                '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5" style="border-bottom:1px solid var(--c-accent-line)">' +
                    '<div class="flex items-center gap-3 min-w-0">' +
                        '<span class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background:var(--c-accent); color:var(--c-accent-fg)"><i data-lucide="check-check" class="w-5 h-5" aria-hidden="true"></i></span>' +
                        '<div class="min-w-0">' +
                            '<p class="text-[.62rem] font-bold uppercase tracking-widest" style="color:var(--c-accent)">Official ZHS record &middot; authenticated</p>' +
                            '<p class="hd-3 font-display font-extrabold mt-0.5">' + plain(rec.name) + '</p>' +
                        '</div>' +
                    '</div>' +
                    '<span class="badge b-accent self-start sm:self-auto"><span class="w-1.5 h-1.5 rounded-full pulse-dot" style="background:var(--c-accent)"></span>' + plain(rec.status) + '</span>' +
                '</div>' +
                '<dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-5">' +
                    certFields(rec).map((f) =>
                        '<div class="rounded-lg p-3" style="background:var(--c-surface); border:1px solid var(--c-line)">' +
                            '<dt class="text-[.6rem] uppercase tracking-wider muted">' + f[0] + '</dt>' +
                            '<dd class="text-[.8rem] font-bold mt-0.5">' + f[1] + '</dd>' +
                        '</div>'
                    ).join('') +
                '</dl>' +
                '<div class="px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[.68rem] muted" style="border-top:1px solid var(--c-accent-line)">' +
                    '<span>Record reference <code class="mono">' + rec.ref + '</code> &middot; ' + esc(raw) + '</span>' +
                    '<button type="button" onclick="printCert()" class="btn btn-outline btn-sm"><i data-lucide="printer" class="w-3.5 h-3.5" aria-hidden="true"></i> Print verification slip</button>' +
                '</div>' +
            '</div>';
        buildPrintSheet(rec, raw);
        showToast('Credential verified', plain(rec.name) + ' matched an active ZHS Academy record.');
    } else {
        box.innerHTML =
            '<div class="fade-in rounded-2xl p-6 text-center" style="background:var(--c-warn-soft); border:1px solid var(--c-warn-line)">' +
                '<span class="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style="background:var(--c-surface); color:var(--c-warn)"><i data-lucide="alert-triangle" class="w-6 h-6" aria-hidden="true"></i></span>' +
                '<h3 class="hd-3 font-display font-bold">Credential ID not found</h3>' +
                '<p class="text-[.78rem] muted mt-1.5 max-w-md mx-auto">No active record matches &ldquo;<span class="mono font-semibold">' + esc(raw) + '</span>&rdquo;. Check the number printed on your document, or contact the examinations cell at <span class="font-semibold">verify@zhsacademy.example</span>.</p>' +
            '</div>';
        showToast('Verification failed', 'No active record matches that credential ID.', 'error');
    }
    icons();
}

function fillDemo(id) { $('certInput').value = id; verifyCredential(); }

function buildPrintSheet(rec, raw) {
    $('certPrintSheet').innerHTML =
        '<div style="font-family:Inter,Arial,sans-serif;color:#000">' +
            '<p style="font-size:20pt;font-weight:700;margin:0 0 2pt">ZHS Academy &mdash; Credential Verification Slip</p>' +
            '<p style="font-size:9pt;color:#475569;margin:0 0 14pt;border-bottom:1pt solid #cbd5e1;padding-bottom:6pt">' +
                'Generated ' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + ' &middot; Credential ' + esc(raw) + ' &middot; Record ' + rec.ref +
            '</p>' +
            '<table style="width:100%;border-collapse:collapse;font-size:10pt">' +
                '<tbody>' +
                    certFields(rec).map((f) =>
                        '<tr><th scope="row" style="text-align:left;padding:5pt 0;width:32%;color:#475569;font-weight:600;border-bottom:.5pt solid #e2e8f0">' + f[0] + '</th>' +
                        '<td style="padding:5pt 0;font-weight:700;border-bottom:.5pt solid #e2e8f0">' + f[1] + '</td></tr>'
                    ).join('') +
                '</tbody>' +
            '</table>' +
            '<p style="font-size:9pt;color:#475569;margin-top:14pt">Status: ' + plain(rec.status) + '. ZHS Academy is a training provider and does not award the professional licence described above; that credential is awarded by ' + plain(rec.awarding) + '.</p>' +
        '</div>';
}

function printCert() {
    document.documentElement.classList.add('print-cert');
    const done = () => document.documentElement.classList.remove('print-cert');
    window.addEventListener('afterprint', done, { once: true });
    window.print();
    setTimeout(done, 800);
}
