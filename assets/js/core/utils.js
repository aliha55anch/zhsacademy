/* ============================================================
   CORE UTILITIES
   DOM helpers, formatting, storage and lookups.
   ============================================================ */
"use strict";

/* ============================================================
   UTILITIES
   ============================================================ */
const $ = (id) => document.getElementById(id);
const NS = 'zhs.v1.';

function esc(value) {
    return String(value).replace(/[&<>"']/g, (c) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}
function usd(n) {
    const v = Number(n);
    return '$' + (Number.isInteger(v)
        ? v.toLocaleString('en-US')
        : v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
}
function icons() { if (window.lucide) { try { window.lucide.createIcons(); } catch (e) { /* icon lib not ready */ } } }
function store(key, fallback) {
    try { const raw = localStorage.getItem(NS + key); return raw ? JSON.parse(raw) : fallback; }
    catch (e) { return fallback; }
}
function persist(key, value) {
    try { localStorage.setItem(NS + key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
}
function courseById(id) { return COURSES.find((c) => c.id === id) || null; }
function facultyById(id) { return FACULTY.find((f) => f.id === id) || null; }

function plain(html) { const d = document.createElement('div'); d.innerHTML = html; return d.textContent; }
