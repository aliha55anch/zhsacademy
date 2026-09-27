/* ============================================================
   TAILWIND THEME CONFIGURATION
   Must execute immediately after the Tailwind Play CDN script tag,
   otherwise the CDN compiles against the default palette.
   ============================================================ */
"use strict";

tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                surface: 'var(--c-surface)', surface2: 'var(--c-surface-2)', surface3: 'var(--c-surface-3)',
                glass: 'var(--c-glass)', glassline: 'var(--c-glass-line)',
                ink: 'var(--c-ink)', ink2: 'var(--c-ink-2)', muted: 'var(--c-muted)', line: 'var(--c-line)',
                accent: 'var(--c-accent)', accentfg: 'var(--c-accent-fg)',
                accentsoft: 'var(--c-accent-soft)', accentline: 'var(--c-accent-line)',
                navy: 'var(--c-navy)',
                gold: 'var(--c-gold)', goldsoft: 'var(--c-gold-soft)', goldline: 'var(--c-gold-line)',
                info: 'var(--c-info)', infosoft: 'var(--c-info-soft)', infoline: 'var(--c-info-line)',
                violet: 'var(--c-violet)', violetsoft: 'var(--c-violet-soft)', violetline: 'var(--c-violet-line)',
                warn: 'var(--c-warn)', warnsoft: 'var(--c-warn-soft)', warnline: 'var(--c-warn-line)'
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
            },
            boxShadow: { card: 'var(--shadow-1)', lift: 'var(--shadow-2)' }
        }
    }
};
