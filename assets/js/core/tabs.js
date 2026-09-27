/* ============================================================
   ACCESSIBLE TAB LISTS
   Roving tabindex + arrow/Home/End keys for the programme detail
   modal.
   ============================================================ */
"use strict";

/* ============================================================
   ACCESSIBLE TAB LISTS (roving tabindex + arrow keys)
   ============================================================ */
const tabRegistry = {};
function wireTablist(group) {
    const list = document.querySelector('[data-tablist="' + group + '"]');
    if (!list) return;
    const tabs = Array.from(list.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[data-tabpanel-group="' + group + '"]'));

    function activate(id, moveFocus) {
        tabs.forEach((t) => {
            const on = t.dataset.tab === id;
            t.setAttribute('aria-selected', String(on));
            t.tabIndex = on ? 0 : -1;
            if (on && moveFocus) t.focus();
        });
        panels.forEach((p) => { p.hidden = (p.id !== id); });
        icons();
    }

    if (tabRegistry[group]) { tabRegistry[group] = activate; return; }

    list.addEventListener('click', (e) => {
        const tab = e.target.closest('[role="tab"]');
        if (tab) activate(tab.dataset.tab, false);
    });
    list.addEventListener('keydown', (e) => {
        const i = tabs.indexOf(document.activeElement);
        if (i < 0) return;
        let next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') next = tabs[0];
        else if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); activate(next.dataset.tab, true); }
    });

    tabRegistry[group] = activate;
    const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
    if (initial) activate(initial.dataset.tab, false);
}
