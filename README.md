# FeedTicker website

The website for [FeedTicker](https://somaij.github.io/feed-ticker-website/), an Android home-screen widget by Calm Kraken Studios that shows headlines from your RSS and Atom feeds one at a time. The widget is designed for minimalist launchers.

The site has three pages:

- **Home** (`index.html`): what the widget does, an interactive mockup, screenshots, features, pricing and FAQ.
- **Privacy policy** (`privacy.html`)
- **Support** (`support.html`)

## How it's built

- Plain HTML, CSS and a little JavaScript. There's no build step or framework, and it's hosted on GitHub Pages.
- No cookies, analytics or third-party requests. The font (Figtree, SIL Open Font License) is self-hosted.
- Colours come from a single seed hue, the way Material You builds a palette from your wallpaper. The wallpaper swatches on the home page change it live.
- Dark theme by default, with a light theme toggle.

## Run locally

    python -m http.server 8000

Then open http://localhost:8000.
