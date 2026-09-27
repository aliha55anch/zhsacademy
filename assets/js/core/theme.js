/* ============================================================
   THEME
   Light/dark switching, persisted, respects prefers-color-scheme.
   ============================================================ */
"use strict";

/* ============================================================
   THEME
   ============================================================ */
function applyTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    const btn = $('themeToggle');
    if (btn) {
        btn.setAttribute('aria-pressed', String(dark));
        btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
        btn.innerHTML = '<i data-lucide="' + (dark ? 'moon' : 'sun') + '" class="w-4 h-4" aria-hidden="true"></i>';
    }
    const meta = $('themeColorMeta');
    if (meta) meta.setAttribute('content', dark ? '#0a1120' : '#ffffff');
    persist('theme', dark ? 'dark' : 'light');
    icons();
}
function initTheme() {
    const saved = store('theme', null);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved ? saved === 'dark' : prefersDark);
}
function toggleTheme() {
    applyTheme(!document.documentElement.classList.contains('dark'));
}
