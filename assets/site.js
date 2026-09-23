// Theme toggle, wallpaper colour picker and the widget demo. No network requests.
(function () {
  var root = document.documentElement;

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  // ---- light/dark ----
  var toggle = document.querySelector("[data-theme-toggle]");
  function labelToggle() {
    var dark = root.getAttribute("data-theme") !== "light";
    toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }
  if (toggle) {
    labelToggle();
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      store("theme", next);
      labelToggle();
    });
  }

  // ---- wallpaper colour (Material You seed hue) ----
  var swatches = Array.prototype.slice.call(document.querySelectorAll(".swatch"));
  if (swatches.length) {
    var current = parseInt(getComputedStyle(root).getPropertyValue("--h"), 10);
    var select = function (sw, save) {
      var hue = sw.getAttribute("data-hue");
      swatches.forEach(function (s) {
        var on = s === sw;
        s.setAttribute("aria-checked", on ? "true" : "false");
        s.tabIndex = on ? 0 : -1;
      });
      root.style.setProperty("--h", hue);
      if (save) store("hue", hue);
    };
    var initial = swatches[0];
    swatches.forEach(function (sw) {
      sw.style.setProperty("--sh", sw.getAttribute("data-hue"));
      if (parseInt(sw.getAttribute("data-hue"), 10) === current) initial = sw;
      sw.addEventListener("click", function () { select(sw, true); });
      // radio-group arrow keys
      sw.addEventListener("keydown", function (e) {
        var i = swatches.indexOf(sw), next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = swatches[(i + 1) % swatches.length];
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = swatches[(i - 1 + swatches.length) % swatches.length];
        if (next) { e.preventDefault(); select(next, true); next.focus(); }
      });
    });
    select(initial, false);
  }

  // ---- widget demo ----
  var widget = document.querySelector("[data-widget-demo]");
  if (!widget) return;

  // style: transparent vs tinted background
  var styleButtons = Array.prototype.slice.call(document.querySelectorAll("[data-widget-style]"));
  styleButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      widget.setAttribute("data-style", btn.getAttribute("data-widget-style"));
      styleButtons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
    });
  });

  // Invented headlines for illustration only.
  var items = [
    { source: "/r/space", headline: "Amateur astronomers catch a comet's tail splitting in two" },
    { source: "Field Notes", headline: "Why the quietest tools are the ones we keep" },
    { source: "The Weekly", headline: "City plans car-free Sundays along the riverfront this autumn" },
    { source: "/r/cooking", headline: "The one-pan dinner that finally converted me to cast iron" },
    { source: "Design Log", headline: "Monochrome icons are back, and nobody is surprised" }
  ];

  var itemEl = widget.querySelector(".item");
  var sourceEl = widget.querySelector(".source");
  var headlineEl = widget.querySelector(".headline");
  var countEl = widget.querySelector(".count");
  var liveEl = widget.querySelector("[aria-live]");
  var refreshBtn = widget.querySelector("[data-refresh]");
  var pauseBtn = document.querySelector("[data-demo-pause]");
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var index = 0;
  var timer = null;
  var paused = reduced;
  var hovering = false;

  function fill() {
    var it = items[index];
    sourceEl.textContent = it.source;
    headlineEl.textContent = it.headline;
    countEl.textContent = (index + 1) + " / " + items.length;
  }

  // step: +1 = next (slides up), -1 = previous (slides down)
  function go(step, announce) {
    index = (index + step + items.length) % items.length;
    liveEl.setAttribute("aria-live", announce ? "polite" : "off");
    if (reduced) { fill(); return; }
    var out = step > 0 ? "out-up" : "out-down";
    var inn = step > 0 ? "in-up" : "in-down";
    itemEl.classList.add(out);
    setTimeout(function () {
      fill();
      itemEl.classList.remove(out);
      itemEl.classList.add(inn);
      void itemEl.offsetWidth; // restart the transition from the "in" position
      itemEl.classList.remove(inn);
    }, 200);
  }

  function schedule() {
    clearInterval(timer);
    if (!paused && !hovering) timer = setInterval(function () { go(1, false); }, 5000);
  }

  function setPaused(p) {
    paused = p;
    if (pauseBtn) {
      pauseBtn.textContent = p ? "Play demo" : "Pause demo";
      pauseBtn.setAttribute("aria-pressed", p ? "true" : "false");
    }
    schedule();
  }

  widget.querySelector("[data-prev]").addEventListener("click", function () { go(-1, true); schedule(); });
  widget.querySelector("[data-next]").addEventListener("click", function () { go(1, true); schedule(); });
  refreshBtn.addEventListener("click", function () {
    refreshBtn.classList.remove("spin");
    void refreshBtn.offsetWidth;
    refreshBtn.classList.add("spin");
  });
  widget.addEventListener("mouseenter", function () { hovering = true; schedule(); });
  widget.addEventListener("mouseleave", function () { hovering = false; schedule(); });
  widget.addEventListener("focusin", function () { hovering = true; schedule(); });
  widget.addEventListener("focusout", function () { hovering = false; schedule(); });
  if (pauseBtn) {
    pauseBtn.hidden = false;
    pauseBtn.addEventListener("click", function () { setPaused(!paused); });
  }

  fill();
  setPaused(paused);
})();
