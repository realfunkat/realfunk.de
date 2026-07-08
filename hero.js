/* ORealFunk – zentrale Hero-Section.
   Erscheint oben auf der Startseite UND auf jeder Artikel-Unterseite.
   TÄGLICH NUR DIESE DATEI ÄNDERN: die Einträge in HERO_ITEMS unten.
   Reihenfolge: erster Eintrag = großes Tile (Leitartikel), danach die kleinen.
   img: Dateiname im images/-Ordner (z. B. "klima.jpeg"). Leer "" = Platzhalter "Bild folgt".
   Bilder gibt es NUR hier im Hero – Artikelseiten selbst bekommen keine neuen Bilder. */

(function () {
  var HERO_ITEMS = [
    { file: "ein-drittel-das-nicht-sein-darf.html", kick: "Gleichgeschaltet", ttl: "Ein Drittel, das nicht sein darf", img: "20260708AFD.jpg", alt: "Satirische Studio-Grafik: Friedensdemonstranten mit der Einblendung Alles böse Nazis" },
    { file: "habeck-berater-heizungsgesetz.html",         kick: "ÖRR-zensiert", ttl: "Vom Gesetz zum Honorar", img: "20260707_habeck.jpeg", alt: "Satirisches Bild: ein Mann im Nadelstreifenanzug im Designer-Chefsessel eines gläsernen Hochhausbüros, daneben eine Wärmepumpe mit Preisschild" },
    { file: "nato-gipfel-gleichklang.html",            kick: "Gleichgeschaltet", ttl: "Ein Gipfel, ein Ton, ein Feindbild", img: "20260708_natogipfel.png", alt: "NATO-Gipfel-Banner in Ankara, Summit 7. bis 8. Juli 2026" },
    { file: "dpa-ton-groenland.html",                  kick: "Gleichgeschaltet", ttl: "Der Ton kommt von der Agentur", img: "20260707_greenland.png", alt: "Satirisches Bild: ein Stapel deutscher Zeitungen, alle mit derselben Schlagzeile ueber Trump und Groenland" }
  ];

  // Sport ist eine eigene Seite (kein Ressort auf der Startseite). Fuer Top Stories
  // hier den aktuellen Sport-Lead-Titel eintragen (bei jedem Sport-Lead-Update mitpflegen).
  var SPORT_TOP = "";

  var inArtikel = /\/artikel\//.test(location.pathname);
  var pagePrefix = inArtikel ? "" : "artikel/";
  var imgPrefix  = inArtikel ? "../images/" : "images/";
  var homePrefix = inArtikel ? "../" : "";

  // Horizontale Menüleiste (ORF-Optik) – erscheint auf jeder Seite.
  var NAV = [
    ["ÖRR zensiert", "index.html#orf-zensiert"], ["Gleichgeschaltet", "index.html#gleichgeschaltet"],
    ["Österreich", "index.html#oesterreich"], ["Deutschland", "index.html#deutschland"],
    ["EU", "index.html#eu"], ["Ausland", "index.html#ausland"], ["Ukraine-Krieg", "index.html#ukraine-krieg"],
    ["Durchschaut", "index.html#durchschaut"], ["Medien", "index.html#medien"], ["Klima", "index.html#klima"],
    ["Archiv", "archiv.html"]
  ];
  var navHtml = '<nav class="ornav"><div class="wrap">' +
    '<a class="home" href="' + homePrefix + 'index.html">News</a>' +
    NAV.map(function (n) { return '<a href="' + homePrefix + n[1] + '">' + n[0] + '</a>'; }).join("") +
    '</div></nav>';

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;"); }


  function tile(it, big) {
    var media = it.img
      ? '<img src="' + imgPrefix + esc(it.img) + '" alt="' + esc(it.alt || "") + '" onerror="this.style.display=\'none\'">'
      : '';
    return '<a class="tile' + (big ? " big" : "") + '" href="' + pagePrefix + esc(it.file) + '#story">' +
      media +
      '<span class="cap"><span class="kick">' + it.kick + '</span><span class="ttl">' + it.ttl + '</span></span></a>';
  }

  var restTiles = HERO_ITEMS.slice(1).map(function (it) { return tile(it, false); }).join("");
  var html =
    '<div class="hero"><div class="wrap">' +
      '<div class="lead">' + tile(HERO_ITEMS[0], true) + '</div>' +
      '<div class="row">' + restTiles + '</div>' +
    '</div></div>';

  var css =
    ".ornav{background:#fff;border-bottom:1px solid var(--line,#e2e2e2);position:sticky;top:0;z-index:50;}" +
    ".ornav .wrap{display:flex;gap:0;max-width:1000px;margin:0 auto;overflow-x:auto;white-space:nowrap;padding:0 18px;-webkit-overflow-scrolling:touch;scrollbar-width:none;}" +
    ".ornav .wrap::-webkit-scrollbar{display:none;}" +
    ".ornav a{display:inline-block;padding:9px 11px;font-size:13px;font-weight:700;color:#20284A;border-bottom:3px solid transparent;}" +
    ".ornav a:hover{color:var(--accent-dark,#05112A);border-bottom-color:var(--accent,#20284A);}" +
    ".ornav a.home{color:var(--accent-dark,#05112A);}" +
    ".hero{padding:14px 0 4px;}" +
    ".hero .wrap{max-width:1000px;margin:0 auto;padding:0 18px;}" +
    ".hero .lead{display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:10px;}" +
    ".hero .row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}" +
    ".hero .tile{position:relative;border-radius:4px;overflow:hidden;background:linear-gradient(135deg,#05112A,#20284A);display:flex;align-items:flex-end;}" +
    ".hero .row .tile{aspect-ratio:16/10;}" +
    ".hero .tile.big{width:100%;aspect-ratio:16/10;}" +
    ".hero .lead .tile.big{aspect-ratio:3158/1328;}" +
    ".hero .tile .ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.55);font-size:11px;letter-spacing:1px;text-transform:uppercase;}" +
    ".hero .tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}" +
    ".hero .tile .cap{position:relative;z-index:2;width:100%;background:linear-gradient(transparent,rgba(0,0,0,.78));padding:30px 14px 12px;}" +
    ".hero .tile .kick{display:inline-block;background:var(--accent,#20284A);color:#fff;font-size:10px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;padding:2px 6px;border-radius:2px;margin-bottom:6px;}" +
    ".hero .tile .ttl{color:#fff;font-weight:800;line-height:1.18;font-size:16px;}" +
    ".hero .tile.big .ttl{font-size:21px;}" +
    ".sharebar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:14px 0 2px;}" +
    ".sharebar .sb-label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#7a7a7a;}" +
    ".sharebar .sb-btn{display:inline-block;cursor:pointer;border:1px solid var(--line,#e2e2e2);background:#fff;color:var(--accent-dark,#05112A);font:inherit;font-size:13px;font-weight:700;padding:6px 11px;border-radius:4px;line-height:1;}" +
    ".sharebar .sb-btn:hover{background:var(--accent-tint,#eaecf3);border-color:var(--accent,#20284A);}" +
    ".sharebar .sb-native{background:var(--accent,#20284A);color:#fff;border-color:var(--accent,#20284A);}" +
    "#topstories .ts-kick{display:inline-block;min-width:150px;color:var(--accent-dark,#05112A);font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.6px;}" +
    "@media(max-width:680px){#topstories .ts-kick{display:block;min-width:0;margin-bottom:1px;}}" +
    "@media(max-width:680px){.hero .row{grid-template-columns:1fr;}.hero .lead{grid-template-columns:1fr;}" +
    ".topbar .wrap{flex-wrap:wrap;height:auto;padding-top:8px;padding-bottom:8px;}" +
    "";

  function mount() {
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    var noHero = document.body && document.body.classList.contains("no-hero");
    var sub = document.querySelector(".subbar");
    if (sub) sub.insertAdjacentHTML("afterend", navHtml + ((noHero || inArtikel) ? "" : html));

    // Top Stories (nur Startseite): erster Artikel je Ressort, direkt über dem Leitartikel.
    if (!inArtikel) {
      var lead = document.querySelector("main section.ressort");
      if (lead && !document.getElementById("topstories")) {
        var secs = document.querySelectorAll("main section.ressort");
        var rows = "";
        for (var s = 0; s < secs.length; s++) {
          var sec = secs[s];
          if (sec.id === "leitartikel" || sec.id === "topstories") continue;
          var lab = sec.querySelector(".label");
          var link = sec.querySelector(".headline-list a");
          if (!lab || !link) continue;
          var clone = link.cloneNode(true);
          var tz = clone.querySelector(".teaser"); if (tz) tz.parentNode.removeChild(tz);
          var title = (clone.textContent || "").trim();
          rows += '<a href="' + link.getAttribute("href") + '"><span class="ts-kick">' + esc(lab.textContent) + '</span>' + title + '</a>';
        }
        if (SPORT_TOP) {
          rows += '<a href="sport.html"><span class="ts-kick">Sport</span>' + esc(SPORT_TOP) + '</a>';
        }
        if (rows) {
          var ts = document.createElement("section");
          ts.className = "ressort";
          ts.id = "topstories";
          ts.innerHTML = '<div class="label">Top Stories</div><div class="headline-list">' + rows + '</div>';
          lead.parentNode.insertBefore(ts, lead);
        }
      }
    }


    // Auf einer Hero-Artikelseite das zugehörige Bild oben im Artikel voll anzeigen
    // (unter den Hero-Tiles, direkt unter der Überschrift). Nur wenn die Seite ein
    // Hero-Artikel ist UND noch kein eigenes Bild im Artikel steht.
    if (inArtikel) {
      var current = location.pathname.split("/").pop().replace(/\.html?$/i, "").toLowerCase();
      var item = null;
      for (var k = 0; k < HERO_ITEMS.length; k++) {
        if (HERO_ITEMS[k].file.replace(/\.html?$/i, "").toLowerCase() === current) { item = HERO_ITEMS[k]; break; }
      }
      if (item && item.img && !document.querySelector(".article .figure")) {
        var h1 = document.querySelector(".article h1");
        if (h1) {
          var fig = '<figure class="figure full" style="margin:14px 0 6px;">' +
            '<img loading="lazy" decoding="async" src="' + imgPrefix + esc(item.img) + '" alt="' + esc(item.alt || "") +
            '" style="display:block;width:100%;height:auto;border-radius:4px;"' +
            ' onerror="this.parentNode.style.display=\'none\'">' +
            '</figure>';
          h1.insertAdjacentHTML("afterend", fig);
        }
      }

      // Teilen-Leiste (wie orf.at) – auf jeder Artikelseite, unter der Überschrift/Bild.
      var shH1 = document.querySelector(".article h1");
      if (shH1 && !document.querySelector(".sharebar")) {
        var shareUrl = location.href.split("#")[0];
        var shareTitle = (shH1.textContent || document.title || "ORealFunk").trim();
        var e = encodeURIComponent;
        var bar = document.createElement("div");
        bar.className = "sharebar";
        bar.innerHTML =
          '<span class="sb-label">Teilen:</span>' +
          '<button type="button" class="sb-btn sb-native">Teilen</button>' +
          '<a class="sb-btn" target="_blank" rel="noopener" href="https://api.whatsapp.com/send?text=' + e(shareTitle + " — " + shareUrl) + '">WhatsApp</a>' +
          '<a class="sb-btn" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=' + e(shareTitle) + '&url=' + e(shareUrl) + '">X</a>' +
          '<a class="sb-btn" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + e(shareUrl) + '">Facebook</a>' +
          '<a class="sb-btn" href="mailto:?subject=' + e(shareTitle) + '&body=' + e(shareUrl) + '">E-Mail</a>' +
          '<button type="button" class="sb-btn sb-copy">Link kopieren</button>';
        var figNode = document.querySelector(".article .figure");
        (figNode || shH1).insertAdjacentElement("afterend", bar);
        var nativeBtn = bar.querySelector(".sb-native");
        if (navigator.share) {
          nativeBtn.addEventListener("click", function () { navigator.share({ title: shareTitle, url: shareUrl }).catch(function () {}); });
        } else { nativeBtn.style.display = "none"; }
        var copyBtn = bar.querySelector(".sb-copy");
        copyBtn.addEventListener("click", function () {
          var done = function () { copyBtn.textContent = "Kopiert!"; setTimeout(function () { copyBtn.textContent = "Link kopieren"; }, 1500); };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(shareUrl).then(done, function () {});
          } else {
            var ta = document.createElement("textarea"); ta.value = shareUrl; document.body.appendChild(ta); ta.select();
            try { document.execCommand("copy"); done(); } catch (er) {} document.body.removeChild(ta);
          }
        });
      }
    }

    // Kam der Klick aus dem Hero (#story)? Dann nach dem Einfügen des Heros
    // direkt zum Artikel scrollen – sonst landet man wieder oben beim Hero.
    if (location.hash === "#story") {
      var target = document.getElementById("story");
      if (target) {
        var jump = function () { target.scrollIntoView({ block: "start" }); };
        jump();                                  // sofort
        window.addEventListener("load", jump);   // nochmal, wenn Bilder geladen sind (Höhe ändert sich)
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
