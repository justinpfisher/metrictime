# Metric Calendar website

Static GitHub Pages site for MetricCalendar.org.

## Files

- `index.html` — home/concept page
- `converter.html` — single toggle Gregorian ↔ Metric converter
- `rationale.html` — literature and rationale
- `faq.html` — FAQ
- `styles.css` — site styling
- `script.js` — converter logic and today's Metric date
- `assets/logo.svg` — icon + wordmark
- `assets/logo-mark.svg` — standalone mark
- `assets/favicon.svg` — favicon
- `assets/calendar-model-table.svg` — formal model visual
- `assets/annual-strip.svg` — annual rhythm visual
- `CNAME` — custom domain for GitHub Pages

## Key display rules

- Metric dates are shown without a prefix, e.g. `2026-05-36`.
- Gregorian dates use a `g` prefix, e.g. `g2026-07-01`.
- Public copy uses "metric month", "metric week", and "metric day".

Attribution: J. Fisher / MetricCalendar.org.

## Development location

Use the GMKtec Windows checkout by default for site edits, static preview and any local validation. Do not commission GitHub cloud development/agent jobs for work the workstation can do. Keep GitHub Pages deployment on GitHub; this public repository must not be attached to a personal self-hosted Actions runner. This repo has no dedicated application CI workflow.
