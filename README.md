# FeedTicker site

A static site with no build step, cookies or analytics. It is hosted on GitHub Pages.

```
index.html      FeedTicker landing page     /
privacy.html    privacy policy              /privacy  ← URL for Play Console
support.html    support + contact           /support
assets/         shared CSS/JS/images
```

All links are relative, so the site works at `user.github.io/repo/` or on a custom domain. GitHub Pages serves `privacy.html` at `/privacy` as well.

## Before publishing

- [ ] `index.html`: replace `href="PLACEHOLDER"` with the Play Store URL.
- [ ] Download the official badge from https://play.google.com/intl/en_us/badges/ into `assets/img/` and point the badge `<img>` at it. Don't redraw, recolour or crop it.
- [x] Screenshots: web versions are in `assets/img/shots/`, made from the PNGs in `assets/img/screenshots/` (status bar cropped, WebP at 540 and 1080 px wide).
- [ ] Check the privacy policy dates.

## Preview locally

    python -m http.server 8000

## Design notes

- Colours come from a single seed hue, `--h` in `assets/style.css`, which works like Material You. Every surface, text and accent colour is derived from it in OKLCH. The wallpaper swatches on the home page change it.
- The font is Figtree (SIL Open Font License), self-hosted in `assets/fonts/` with its license, so no requests go to Google Fonts.
