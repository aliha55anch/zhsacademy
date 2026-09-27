/* ============================================================
   TOAST NOTIFICATIONS
   Transient status messages, auto-dismiss after 6s.
   ============================================================ */
"use strict";

/* ============================================================
   TOAST
   ============================================================ */
let toastTimer = null;
function showToast(title, message, type) {
    const toast = $('toast');
    const box = $('toastIcon');
    const isError = type === 'error';
    $('toastTitle').textContent = title;
    $('toastMessage').textContent = message;
    box.style.background = isError ? 'var(--c-warn)' : 'var(--c-accent)';
    box.style.color = isError ? '#2c1214' : 'var(--c-accent-fg)';
    box.innerHTML = '<i data-lucide="' + (isError ? 'alert-triangle' : 'check') + '" class="w-4 h-4" aria-hidden="true"></i>';
    toast.hidden = false;
    icons();
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 6000);
}
function hideToast() {
    const toast = $('toast');
    if (toast) toast.hidden = true;
    if (toastTimer) { clearTimeout(toastTimer); toastTimer = null; }
}
