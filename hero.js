/* ORealFunk – zentrale Hero-Section.
   Erscheint oben auf der Startseite UND auf jeder Artikel-Unterseite.
   TÄGLICH NUR DIESE DATEI ÄNDERN: die Einträge in HERO_ITEMS unten.
   Reihenfolge: erster Eintrag = großes Tile (Leitartikel), danach die kleinen.
   img: Dateiname im images/-Ordner (z. B. "klima.jpeg"). Leer "" = Platzhalter "Bild folgt".
   Bilder gibt es NUR hier im Hero – Artikelseiten selbst bekommen keine neuen Bilder. */

(function () {
  /* ------------------------------------------------------------------ *
   * HERO_POOL — der Vorrat, aus dem der Hero taeglich 5 Kacheln zieht.
   * Neue Artikel kommen NACH VORNE. 6 bis 10 Eintraege sind gesund.
   * Jeder Eintrag braucht file, kick, ttl, img, alt.
   * Die Rotation unten waehlt daraus jeden Tag ein anderes 5er-Fenster,
   * damit der Leser morgens nicht dasselbe sieht wie am Vorabend.
   * KEIN taeglicher Push noetig — der Kalender macht das.
   * ------------------------------------------------------------------ */
  var HERO_POOL = [
    { file: "wer-verliert-sortiert-aus.html", kick: "Deutschland", ttl: "Wer verliert, sortiert aus", img: "20260722abgelehnt.webp", alt: "Ein grosser roter Stempel mit der Aufschrift ABGELEHNT senkt sich auf ein Blatt Papier, auf dem bereits der rote Abdruck ABGELEHNT steht, auf einem Tisch in einem abgedunkelten Sitzungssaal" },
    { file: "gewaehlt-aber-nicht-waehlbar.html", kick: "Deutschland", ttl: "Gewählt, aber nicht wählbar", img: "20260721AFD.jpg", alt: "Eine Litfasssaeule an einer sonnigen deutschen Strasse mit einem AfD-Wahlplakat, ueber das Gesicht des Kandidaten ein roter Balken mit der Aufschrift Nicht zugelassen" },
    { file: "sogar-die-un-sagt-es.html", kick: "Deutschland", ttl: "Sogar die UN sagt es", img: "20260721UN.webp", alt: "Eine graue Behoerdenakte mit rotem Stempel EXTREMISMUS und Fragezeichen liegt auf einem Schreibtisch neben einem blauen Heft mit der Aufschrift United Nations Report" },
    { file: "wie-die-eu-uns-schuetzen-will.html", kick: "EU", ttl: "Wie die EU uns schützen will", img: "20260722grenze.webp", alt: "Ein Bundespolizist steht an einer rot-weissen Schranke an einem sonnigen Autobahn-Grenzuebergang, auf der Gegenspur eine lange Schlange von Urlauberautos mit Dachboxen Richtung Sueden" },
    { file: "wem-gehoert-der-buerger.html", kick: "EU", ttl: "Wem gehört der Bürger?", img: "20260721kinderschutz-clean.jpg", alt: "Ursula von der Leyen und Emmanuel Macron greifen nebeneinander nach einer Wand voller Bildschirme mit den Gesichtern vieler Buerger, in einem dunklen Ueberwachungsraum" },
    { file: "der-kranz-war-schuld.html", kick: "Durchschaut", ttl: "Der Kranz war schuld", img: "2026072kranz.webp", alt: "Ein umgestuerzter Trauerkranz mit einer zerrissenen schwarz-rot-goldenen Schleife liegt auf den Steinstufen eines Gedenkorts, ringsum verstreute Bluetenblaetter" },
    { file: "neid-als-staatskunst.html", kick: "Deutschland", ttl: "Neid als Staatskunst", img: "20260721klingbeilporsche.jpg", alt: "Ein Mann im dunklen Anzug mit roter Krawatte steht mit dem Autoschluessel neben einem grauen Porsche in der Abenddaemmerung" },
    { file: "deutschland-schaltet-sich-ab.html", kick: "Deutschland", ttl: "Deutschland schaltet sich ab", img: "20260721sprit.webp", alt: "Eine Preistafel an einer Autobahn-Tankstelle zeigt Super E10 2,08 und Diesel 2,13 Euro, im Hintergrund ein Kombi an der Zapfsaeule und ein Mann, der zu den Preisen aufblickt" },
    { file: "der-fall-endet-in-der-zelle.html", kick: "Deutschland", ttl: "Der Fall endet in der Zelle", img: "20260721stade.webp", alt: "Ein Stapel abgehefteter Akten in einer Kiste in einem hellen leeren Büro, dahinter ein leerer Schreibtischstuhl" },
    { file: "wer-bleibt-draussen.html", kick: "Deutschland", ttl: "Wer bleibt draußen?", img: "20260721toilets.webp", alt: "Ein heller gefliester Waschraum mit einer Reihe Männer am Smartphone und einer Frau an der Kabinentür" },
    { file: "der-taegliche-einzelfall.html", kick: "Deutschland", ttl: "Der tägliche Einzelfall", img: "20260720messer.webp", alt: "Rot-weisses Absperrband der Polizei quer ueber eine sonnige Einkaufsstrasse, im unscharfen Hintergrund einzelne Passanten" },
    { file: "stromnetz-anschlag-verdaechtige.html", kick: "Deutschland", ttl: "Namen bekannt, Zugriff vertagt", img: "20260720linksterror.webp", alt: "Eine Ermittlungstafel mit Berlin-Stadtplan, Verdaechtigenfotos und roten Verbindungsfaeden, im Vordergrund auf dem Tisch eine geschlossene Akte und ungenutzte Handschellen" },
    { file: "alle-boese-zu-fritz.html", kick: "Deutschland", ttl: "Alle böse zu Fritz", img: "20260720fritz02.jpeg", alt: "Bundeskanzler Friedrich Merz sitzt im sommerlichen ZDF-Interview am Tisch und spielt eine winzige Geige, ihm gegenueber eine Interviewerin von hinten" },
    { file: "datenkauf-in-der-grauzone.html", kick: "Deutschland", ttl: "Der Staat kauft dich", img: "20260720ueberwachung.webp", alt: "Ein Mitarbeiter sitzt mit einer Rechnung in der Hand vor einer Wand aus Bildschirmen, die zahlreiche Menschen an Schreibtischen sowie Stadtkarten mit Standort-Markierungen und der Aufschrift AD-ID zeigen" },
    { file: "qualitaet-auf-staatskosten.html", kick: "Österreich", ttl: "Qualität auf Staatskosten", img: "20260720babler-w.jpg", alt: "Ein Mann im dunklen Anzug reicht einer Nachrichtensprecherin am Studiopult ein dickes Buendel Euro-Geldscheine, im Vordergrund eine Fernsehkamera, im Hintergrund ein rotes ON-AIR-Schild" },
    { file: "zweimal-um-die-welt.html", kick: "Klima", ttl: "Nachhaltig, im Privatjet", img: "20260720infantinobb.jpg", alt: "Ein Mann und eine Frau in T-Shirts mit der Aufschrift Save the Planet zeigen den Daumen hoch vor einem Privatjet mit FIFA-Schriftzug, davor ein Fußball" },
    { file: "ein-schelm-wer-boeses-denkt.html", kick: "Deutschland", ttl: "Ein Schelm, wer Böses denkt", img: "20260719merz02.jpg", alt: "Bundeskanzler Merz gestikulierend bei einem sommerlichen Fernsehinterview auf einer Dachterrasse ueber Berlin" },
    { file: "nur-manche-sind-gleicher.html", kick: "Deutschland", ttl: "Nur manche sind gleicher", img: "20260719spahn2.jpg", alt: "Jens Spahn und sein Ehemann mit Kinderwagen vor einer herrschaftlichen Villa, davor Kartons mit der Aufschrift FFP2 Masken" },
    { file: "so-hart-wie-totschlag.html", kick: "Deutschland", ttl: "So hart wie Totschlag", img: "20260718klingbeil.jpg", alt: "Finanzminister Klingbeil prueft mit einer Lupe eine Kassenbon-Rolle am Tresen eines kleinen Imbisses, dahinter ein hoher Aktenstapel" },
    { file: "auf-freiem-fuss.html", kick: "Deutschland", ttl: "Auf freiem Fuß", img: "20260719bahn.webp", alt: "Beschaedigte Zugtuer und eine DB-Sicherheit-Warnweste auf dem Boden eines leeren Regionalzugs" },
    { file: "die-kohle-fliesst-weiter.html", kick: "Deutschland", ttl: "Die Kohle fließt weiter", img: "20260719spahn.jpg", alt: "Jens Spahn am Rednerpult des Bundestags mit der Aufschrift Fraktionsvorsitzender, dahinter der Bundesadler" },
    { file: "verlust-ausgeschlossen-angeblich.html", kick: "Deutschland", ttl: "Verlust ausgeschlossen. Angeblich.", img: "20260718fonds.webp", alt: "Ein Mann im dunklen Anzug zuckt am Konferenztisch mit den Schultern, vor ihm eine Fondsbroschuere aus der Papierfetzen aufsteigen, im Hintergrund ein leerer Wartebereich" },
    { file: "geladen-aber-wozu.html", kick: "Deutschland", ttl: "Geladen, aber wozu?", img: "260716schlaemmer.jpeg", alt: "Zwei Sachverstaendige an einem Tisch in einem Ausschusssaal, links ein Mann im Anzug am Mikrofon, rechts ein Mann mit Schnauzbart und verschraenkten Armen" },
    { file: "herzlichen-glueckwunsch-zum-16.html", kick: "Deutschland", ttl: "Herzlichen Glückwunsch zum 16.", img: "20260716AMT.webp", alt: "Eine Frau sitzt allein am Kuechentisch vor einem Geburtstagskuchen mit einer 16er-Kerze und liest einen Brief vom Amt" },
    { file: "totalueberwachung-frei-haus.html", kick: "EU", ttl: "Totalüberwachung, frei Haus", img: "20260715kinderschutz4.jpg", alt: "Ein Vater sitzt am Schreibtisch und haelt seinen Ausweis an ein EU-Formular mit der Aufschrift Kinderschutz Gesetz, waehrend hinter ihm zwei kleine Kinder vor dem Fernseher sitzen" },
    { file: "zwei-ueberschriften-ein-artikel.html", kick: "Durchschaut", ttl: "Zwei Überschriften, ein Artikel", img: "20260714grenzen.webp", alt: "Ein Zeitungskiosk in der Daemmerung mit zwei widerspruechlichen Schlagzeilen zum selben Thema" }
  ];

  /* ------------------------------------------------------------------ *
   * ROTATION
   * HERO_PIN   : die ersten N Pool-Eintraege (= die NEUESTEN) stehen IMMER
   *              in den zwei grossen Kacheln. Kein Karussell im Leitartikel.
   * HERO_MAX   : nur die ersten N Pool-Eintraege zaehlen. Neuen Artikel
   *              VORNE einfuegen -> der aelteste faellt automatisch raus.
   * HERO_HOURS : alle wieviel Stunden die drei kleinen Kacheln wechseln.
   * HERO_EPOCH : Nullpunkt. Bei jedem Push mit neuem Artikel neu setzen:
   *              node -e 'console.log(Math.floor(Date.now()/(6*3600000)))'
   * Kein Push noetig — die Uhr macht das.
   * ------------------------------------------------------------------ */
  var HERO_PIN   = 2;
  var HERO_MAX   = 8;
  var HERO_HOURS = 6;
  var HERO_EPOCH = 82629;

  var HERO_ITEMS = (function () {
    var pool = HERO_POOL
      .filter(function (x) { return x && x.file && x.kick && x.ttl; })
      .slice(0, HERO_MAX);
    if (pool.length <= 5) return pool;
    var pinned = pool.slice(0, HERO_PIN);          // die zwei neuesten, immer gross
    var rest   = pool.slice(HERO_PIN);             // die uebrigen sechs
    var slots  = 5 - HERO_PIN;                     // drei kleine Kacheln
    var step   = Math.floor(Date.now() / (HERO_HOURS * 3600000)) - HERO_EPOCH;

    // Die gepinnten Kacheln bleiben oben, tauschen aber bei jedem Wechsel
    // die Seite (links <-> rechts). Bewegung oben, ohne die Hierarchie zu verlieren.
    var swap = ((step % pinned.length) + pinned.length) % pinned.length;
    var out = [];
    for (var p = 0; p < pinned.length; p++) { out.push(pinned[(p + swap) % pinned.length]); }

    var start = ((step % rest.length) + rest.length) % rest.length;
    for (var i = 0; i < slots; i++) { out.push(rest[(start + i) % rest.length]); }
    return out;
  })();


  var inArtikel = /\/artikel\//.test(location.pathname);
  var pagePrefix = inArtikel ? "" : "artikel/";
  var imgPrefix  = inArtikel ? "../images/" : "images/";
  var homePrefix = inArtikel ? "../" : "";

  // Horizontale Menüleiste (ORF-Optik) – erscheint auf jeder Seite.
  var NAV = [
    ["Durchschaut", "index.html#durchschaut"],
    ["Deutschland", "index.html#deutschland"],
    ["EU", "index.html#eu"],
    ["ÖRR", "index.html#oerr"],
    ["Österreich", "index.html#oesterreich"],
    ["Ausland", "index.html#ausland"],
    ["Klima", "index.html#klima"],
    ["Ukraine", "index.html#ukraine-krieg"],
    ["Sport", "index.html#sport"],
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

  var restTiles = HERO_ITEMS.slice(2).map(function (it) { return tile(it, false); }).join("");
  var html =
    '<div class="hero"><div class="wrap">' +
      '<div class="lead">' + tile(HERO_ITEMS[0], true) + tile(HERO_ITEMS[1], true) + '</div>' +
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
    ".hero .lead{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;}" +
    ".hero .row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}" +
    ".hero .tile{position:relative;border-radius:4px;overflow:hidden;background:linear-gradient(135deg,#05112A,#20284A);display:flex;align-items:flex-end;}" +
    ".hero .row .tile{aspect-ratio:16/10;}" +
    ".hero .tile.big{width:100%;aspect-ratio:16/10;}" +
    ".hero .lead .tile.big{aspect-ratio:16/10;}" +
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

    // Was im Hero steht, erscheint nicht noch einmal in den Ressort-Listen
    // (und damit auch nicht in den Top Stories, die darunter gebaut werden).
    if (!inArtikel) {
      var heroFiles = {};
      for (var hf = 0; hf < HERO_ITEMS.length; hf++) {
        heroFiles[HERO_ITEMS[hf].file.replace(/\.html?$/i, "").toLowerCase()] = 1;
      }
      var cards = document.querySelectorAll("main section.ressort .headline-list a");
      for (var ci = 0; ci < cards.length; ci++) {
        var cf = (cards[ci].getAttribute("href") || "").split("/").pop().split("#")[0].replace(/\.html?$/i, "").toLowerCase();
        if (heroFiles[cf] && cards[ci].parentNode) { cards[ci].parentNode.removeChild(cards[ci]); }
      }
    }

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
      if (item && item.img && !document.querySelector(".article .figure") && !document.querySelector(".article img.lead")) {
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
