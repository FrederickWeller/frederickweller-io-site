// Loads the shared nav/footer partials into any page that has
// <div id="site-nav"></div> and <div id="site-footer"></div>.
//
// Active nav link is determined by <body data-page="..."> if present,
// otherwise by matching the current file name against the nav's hrefs.
//
// Note: this uses fetch(), so pages must be viewed over http(s) --
// a local "file://" double-click preview will not load the partials.
// Use a local server (e.g. VS Code "Live Server", or `python3 -m http.server`)
// to preview, since that's how it will behave once deployed anyway.

(function () {
  function markActive(container) {
    const current =
      document.body.getAttribute("data-page") ||
      location.pathname.split("/").pop().replace(".html", "") ||
      "index";
    container.querySelectorAll("a[data-page]").forEach(function (a) {
      if (a.getAttribute("data-page") === current) {
        a.classList.add("active");
      }
    });
  }

  function include(id, url, after) {
    const el = document.getElementById(id);
    if (!el) return;
    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error("Failed to load " + url);
        return r.text();
      })
      .then(function (html) {
        el.innerHTML = html;
        if (after) after(el);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    include("site-nav", "/partials/nav.html", markActive);
    include("site-footer", "/partials/footer.html");
  });
})();
