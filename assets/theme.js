// Loaded synchronously in <head> so saved choices apply before first paint.
// Dark is the default. Only explicit choices are stored: "light"/"dark" and a colour hue.
(function () {
  var root = document.documentElement;
  var theme = "dark";
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") theme = saved;
    var hue = parseInt(localStorage.getItem("hue"), 10);
    if (hue >= 0 && hue < 360) root.style.setProperty("--h", hue);
  } catch (e) {}
  root.setAttribute("data-theme", theme);
})();
