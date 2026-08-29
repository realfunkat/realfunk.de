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
    { file: "verbotsverfahren-vor-der-wahl.html", kick: "Deutschland", ttl: "Verbotsverfahren vor der Wahl", img: "20260829pistoriusoezdemir.jpeg", alt: "Cem Özdemir und Boris Pistorius stehen nebeneinander" },
    { file: "wie-exakt-sind-umfragen.html", kick: "Durchschaut", ttl: "Wie exakt sind Umfragen?", img: "20260828landtag.jpg", alt: "Leeres Rednerpult im Landtag von Sachsen-Anhalt" },
    { file: "unter-kontrolle-nur-nicht-in-ceuta.html", kick: "EU", ttl: "Unter Kontrolle. Nur nicht in Ceuta.", img: "20260828ceuta.webp", alt: "Provisorisches Zeltlager auf einer asphaltierten Fläche in Ceuta; hinter den Zelten spielen junge Männer Fußball" },
    { file: "cdu-besser-als-cdu.html", kick: "Deutschland", ttl: "CDU besser als CDU?", img: "20260827schulze.jpeg", alt: "Sven Schulze und Ulrich Siegmund im MDR-TV-Duell, links die Moderatoren" },
    { file: "klingbeils-zuckersteuer-auch-ohne-zucker.html", kick: "Deutschland", ttl: "Klingbeils Zuckersteuer. Auch ohne Zucker.", img: "20260826klingbeil-zero.png", alt: "KI-Satire: Lars Klingbeil presst Münzen aus einer Zero-Getränkeflasche in eine rote Geldkassette" },
    { file: "operation-360-grad.html", kick: "Kurzartikel", ttl: "Operation 360 Grad*", img: "20260825baerbock.png", alt: "KI-Satire: Annalena Baerbock mit Doktorhut vor einem neoklassizistischen Universitätsgebäude" },
    { file: "die-rechnung-geht-an-die-kinder.html", kick: "Deutschland", ttl: "Die Rechnung geht an die Kinder", img: "20260824AAA.jpg", alt: "KI-Satire: Ein Ratingprüfer zieht eine goldene AAA-Kugel aus einer Trommel voller AAA-Kugeln" },
    { file: "zdf-unterbricht-weidel-gewinnt.html", kick: "Durchschaut", ttl: "ZDF unterbricht. Weidel gewinnt.", img: "20260824weidel-zdf.png", alt: "Alice Weidel spricht im ZDF-Sommerinterview mit Moderator Wulf Schmiese" },
    { file: "anthropic-verdient-kein-vertrauen.html", kick: "Durchschaut", ttl: "Anthropic verdient kein Vertrauen", img: "20260823anthropic-account-banned.png", alt: "Screenshot einer Claude-Kontosperre mit dem gelben Hinweis account_banned" },
    { file: "gewinne-privat-risiko-beim-staat.html", kick: "Deutschland", ttl: "Gewinne privat. Risiko beim Staat.", img: "20260823gasspeicher.png", alt: "KI-Illustration: Beleuchtete Gas-Infrastruktur mit Rohren und Industrieanlagen in der Dämmerung" },
    { file: "doktor-weg-stabil-sagt-merz.html", kick: "Kurzartikel", ttl: "Doktor weg. Stabil, sagt Merz.", img: "20260822voigt.png", alt: "KI-Satire: Mario Voigt blickt erschrocken, während sein Doktorhut davonfliegt" },
    { file: "baerbock-fremdschaemen-ohne-ende.html", kick: "Deutschland", ttl: "Baerbock - Fremdschämen ohne absehbares Ende", img: "20260821baerbock.png", alt: "KI-Satire: Annalena Baerbock vor einem rosa-violetten Sternenhimmel, über ihrem Mund graues Klebeband mit der Aufschrift pls shut up" },
    { file: "gekuendigt-fuer-die-falsche-partei.html", kick: "Kurzartikel", ttl: "Gekündigt für die falsche Partei", img: "20260821hospiz.png", alt: "KI-Satire: Martina Müller geht im Regen mit einer Kiste persönlicher Dinge von einem Hospiz weg, während zwei selbstzufriedene Figuren hinter ihr die Drehtür schließen" },
    { file: "illegal-rein-weiter-aufs-festland.html", kick: "EU", ttl: "Illegal rein. Weiter aufs Festland.", img: "20260820ceuta.png", alt: "KI-Illustration: Eine große Menschenmenge geht im Hafen von Ceuta über eine Fährrampe auf eine Fähre" },
    { file: "zehntausend-gegen-die-brandmauer.html", kick: "Deutschland", ttl: "Zehntausend gegen die Brandmauer", img: "20260820prange.png", alt: "KI-Satire: Bernd Prange mit AfD-Kappe und AfD-Shirt vor einem Dorf in Sachsen-Anhalt" },
    { file: "flugscham-gilt-nur-fuer-buerger.html", kick: "Kurzartikel", ttl: "Flugscham gilt nur für Bürger", img: "20260819leerflug.webp", alt: "KI-Satire: Eine Flugbegleiterin serviert Champagner in der leeren Luxuskabine eines deutschen Regierungsflugzeugs" },
    { file: "der-apparat-waechst-arbeit-geht.html", kick: "Deutschland", ttl: "Der Apparat wächst. Arbeit geht.", img: "20260819soccer.webp", alt: "KI-Illustration: Zwei Spieler stehen beim Anstoß einem großen Kreis von Schiedsrichtern gegenüber" },
    { file: "wer-vertraut-diesem-schalter.html", kick: "EU", ttl: "Wer vertraut diesem Schalter?", img: "20260818digitaler-euro.jpg", alt: "KI-Satire: Ursula von der Leyen steht in einer Überwachungszentrale vor dem erfassten Bild einer Familie" },
    { file: "deutschland-bremst-amerika-kauft.html", kick: "Deutschland", ttl: "Deutschland bremst, Amerika kauft", img: "20260818ebmpapst.jpg", alt: "KI-Illustration: Ein Preisschild mit 5,1 Milliarden Euro hängt vor einem Lastwagen des Ventilatorenherstellers ebm-papst" },
    { file: "ihre-toleranz-endet-am-widerspruch.html", kick: "Durchschaut", ttl: "Ihre Toleranz endet am Widerspruch", img: "20260817Antifa.jpg", alt: "Symbolbild: Demonstration mit roten Fahnen der Antifaschistischen Aktion und Pyrotechnik; die Aufnahme zeigt nicht den Göttinger Einsatz" },
    { file: "176-millionen-hoeren-siegmund.html", kick: "Durchschaut", ttl: "Der zweitgefährlichste Mann Deutschlands?", img: "20260816flegel.jpg", alt: "KI-Satire: Markus Lanz, Boris Pistorius und Saskia Esken blicken auf einen Laptop; das erfundene Magazin DER FLEGEL nennt Ben absichtlich ungeskripptet" },
    { file: "die-spende-ohne-ueberweisung.html", kick: "Durchschaut", ttl: "Die Spende ohne Überweisung", img: "20260817campact.png", alt: "Beweisgrafik: Campacts Aussage, kein Geld an SPD oder Grüne zu überweisen, über den beiden 310.000-Euro-Einträgen im Parteispendenregister des Bundestages" },
    { file: "42300-jobs-spaeter.html", kick: "Deutschland", ttl: "42.300 Jobs später", img: "20260815autojobs.jpg", alt: "BMW-Werk Leipzig: Ein Arbeiter montiert an einem schwarzen BMW, dahinter stehen weitere Fahrzeuge auf der Produktionslinie" },
    { file: "qualitaet-bis-zum-widerruf.html", kick: "Durchschaut", ttl: "Schmierblatt mit Gütesiegel", img: "20260814siegmund.webp", alt: "DER-SPIEGEL-Titel Nr. 34/2026 mit Ulrich Siegmund und der Schlagzeile Der gefährlichste Mann Deutschlands" },
    { file: "ddr-politoffizier-als-wahlwaechter.html", kick: "Deutschland", ttl: "DDR-Politoffizier als Wahlwächter", img: "20260814polizei02.png", alt: "KI-Satire: Ein früherer DDR-Politoffizier blickt einem heutigen Polizisten in einer Wahlkabine über die Schulter" },
    { file: "53000-euro-gegen-783-euro.html", kick: "Deutschland", ttl: "53.000 Euro gegen 783 Euro", img: "20260813klingbeil.png", alt: "KI-Satire: Lars Klingbeil als Clown zieht von einem Sparschwein ein Etikett mit 53.000 Euro ab; darunter erscheint 783 Euro vor Steuern, daneben sitzt ein weinendes Kleinkind" },
    { file: "der-binnenmarkt-mit-tuersteher.html", kick: "EU", ttl: "Der Binnenmarkt mit Türsteher", img: "20260811EU-v5.png", alt: "KI-Satire: Links eine einfache Toilette, rechts eine mit EU-Flagge, Rohren, Messgeräten und Überwachungskamera überladene Toilette" },
    { file: "erst-der-queer-workshop-dann-das-bussgeld.html", kick: "Kurzartikel", ttl: "Erst der Queer-Workshop. Dann das Bußgeld.", img: "20260810lgbtq.png", alt: "Volle Schulklasse bei einem LGBTQ-Workshop; auf einem leeren Tisch liegt ein Bußgeldbescheid" },
    { file: "nicht-protest-kompetenz.html", kick: "Kurzartikel", ttl: "Nicht Protest. Kompetenz.", img: "20260810Siegmund.png", alt: "Ulrich Siegmund vor den Flaggen Deutschlands und Sachsen-Anhalts" },
    { file: "die-antwort-auf-den-ansturm.html", kick: "Kurzartikel", ttl: "Die Antwort auf den Ansturm", img: "20260810ceuta.webp", alt: "Das geöffnete Grenztor von Ceuta, dahinter bewegt sich eine große Menschenmenge auf die spanische Seite" },
    { file: "keine-straftat-trotzdem-weg.html", kick: "Deutschland", ttl: "Keine Straftat. Trotzdem weg.", img: "20260810klingbeil.png", alt: "KI-Satire: Lars Klingbeil fährt mit Goldketten und Luxusuhr in einem Porsche-Cabrio aus einem eingezäunten Zollgelände; zerrissenes Absperrband liegt auf dem Auto" },
    { file: "zehntausend-zuerst-das-etikett.html", kick: "Durchschaut", ttl: "10.000 – zuerst das Etikett", img: "20260809protest.jpg", alt: "KI-Satire: Ein Nachrichtensprecher sitzt vor einer gebogenen Studiowand, auf der eine friedliche Demonstration als rechtsextrem und gewaltsame Ausschreitungen als friedlicher Protest bezeichnet werden" },
    { file: "restle-hat-schuldige-keine-belege.html", kick: "ÖRR", ttl: "Restle hat Schuldige. Keine Belege.", img: "20260808restle.png", alt: "KI-Satire: Georg Restle präsentiert in einem erfundenen Fernsehstudio vor Bildern aus Ceuta die Einblendung Israel und USA sind schuld" },
    { file: "die-zustimmung-als-veto.html", kick: "Kurzartikel", ttl: "Die Zustimmung als Veto", img: "20260809zustimmung-v1.png", alt: "KI-Satire: Im Parlament wird ein sinnvoller Antrag mit Zugestimmt gestempelt, während zwei Politiker ihren eigenen Entwurf in einen Aktenvernichter schieben" },
    { file: "klingbeil-kassiert-das-lebenswerk.html", kick: "Deutschland", ttl: "Klingbeil kassiert das Lebenswerk", img: "20260808klingbeil.png", alt: "KI-Satire: Lars Klingbeil zählt Euro-Geldscheine, während ein alter Handwerker ihm in einer Werkstatt einen offenen leeren Koffer hinhält" },
    { file: "die-brandmauer-gegen-59-prozent.html", kick: "Deutschland", ttl: "Die Brandmauer gegen 59 Prozent", img: "20260807brandmauer.webp", alt: "KI-Satire: Politiker errichten mitten in einem Parlament eine Ziegelmauer, während Bürger von der Zuschauergalerie zusehen" },
    { file: "berlin-waehlt-die-enteignung-mit.html", kick: "Deutschland", ttl: "Berlin wählt die Enteignung mit", img: "20260806linke.png", alt: "KI-Satire: Ines Schwerdtner, Elif Eralp und Heidi Reichinnek marschieren in einer erfundenen militärischen Formation vor dem Brandenburger Tor" },
    { file: "sprengstoff-auf-der-suedpiste.html", kick: "Deutschland", ttl: "Sprengstoff auf der Südpiste", img: "20260806drone.webp", alt: "KI-Illustration: Ein Sprengstoffexperte untersucht eine beschädigte Drohne auf dem Rollfeld vor einer Antonow-Frachtmaschine" },
    { file: "heiss-ist-klima-kalt-ist-wetter.html", kick: "Durchschaut", ttl: "Heiß ist Klima. Kalt ist Wetter.", img: "20260805klima.webp", alt: "Satirische Wetterstudioszene: Eine Nachrichtensprecherin sitzt vor zwei Europakarten, links blau mit der Aufschrift Wetter, rechts rot mit der Aufschrift Klimakrise" },
    { file: "der-linke-verbotsbrief.html", kick: "Durchschaut", ttl: "Der linke Verbotsbrief", img: "20260804spd-satire.jpeg", alt: "KI-Satire: Marius Heetfeld vor einer SPD-Zentrale; das Bild ist deutlich als KI-Satire markiert" },
    { file: "die-eu-regelt-bis-zum-deckel.html", kick: "EU", ttl: "Wie Brüssel die Wirtschaft erstickt", img: "20260803_EU.webp", alt: "Ein mit Ketten und Schloss gesicherter Koffer mit EU-Sternen steht in einer Halle mit hohen Säulen" },
    { file: "ceuta-erst-die-luege-dann-bilder.html", kick: "EU", ttl: "Ceuta: Erst die Lüge, dann Bilder", img: "20260803ceuta.webp", alt: "Eine große Menschenmenge bewegt sich in Ceuta unter Polizeibegleitung entlang einer Straße Richtung Stadtzentrum" },
    { file: "nur-wer-einzahlt-kriegt-nix.html", kick: "Deutschland", ttl: "Nur wer einzahlt kriegt nix", img: "20260802rente.png", alt: "Eine Reihe älterer Männer steht in einer prunkvollen Halle hinter einer Absperrung, während im Vordergrund Männer Geldscheine aus einer geöffneten Truhe nehmen" },
    { file: "zehn-milliarden-gegen-eine-billion.html", kick: "EU", ttl: "Zehn Milliarden gegen eine Billion", img: "20260801datacenter.png", alt: "Satirische Darstellung von Ursula von der Leyen vor einem kleinen EU-Rechenzentrum" },
    { file: "die-maer-von-der-grenze.html", kick: "EU", ttl: "Die Mär von der Grenze", img: "20260801grenzen.png", alt: "Blumen, Kerzen und Gedenkzeichen vor dem Brandenburger Tor in Berlin" },
    { file: "71-prozent-bei-christen-526.html", kick: "Durchschaut", ttl: "Wenn Christen die Opfer sind", img: "20260801kirche.webp", alt: "Zerbrochenes Glas liegt vor dem Eingang einer Kirche, im Hintergrund leuchtet ein Polizeifahrzeug" },
    { file: "acht-jahre-dann-verschwunden.html", kick: "Österreich", ttl: "Acht Jahre. Dann verschwunden.", img: "20260801geflohen.png", alt: "Ein Mann läuft unbeobachtet in Richtung eines bereitstehenden Flugzeugs, während Justizwachebeamte zurückbleiben" },
    { file: "ceuta-rechnung-fuer-europa.html", kick: "EU", ttl: "Ceuta: Die Rechnung für Europa", img: "20260731spain.jpeg", alt: "Menschen versuchen an der spanisch-marokkanischen Grenze bei Ceuta über Felsen und durch das Wasser zu gelangen, während Einsatzkräfte am Ufer stehen" },
    { file: "abschieben-rueckwaertsgang.html", kick: "Deutschland", ttl: "Abschieben? Rückwärtsgang.", img: "20260731merz.png", alt: "Satirische Darstellung von Friedrich Merz im Cockpit eines Flugzeugs auf einer nassen Startbahn bei Nacht" },
    { file: "die-huerde-die-ploetzlich-stoert.html", kick: "Deutschland", ttl: "Die Hürde, die plötzlich stört", img: "20260730fuenfprozent.jpg", alt: "Satirische Darstellung eines Politikers vor einer Präsentation über schlechte Umfragewerte und politische Gegenmaßnahmen" },
    { file: "nicht-nur-bekannt.html", kick: "Deutschland", ttl: "Nicht nur bekannt. Gefolgt.", img: "20270628islamist2.jpeg", alt: "Eine anonymisierte Person mit dunkler Gesichtsverhüllung blickt in die Kamera" },
    { file: "nur-fuer-frauen-aber-bitte-mit-regeln.html", kick: "Deutschland", ttl: "Wenn Badekleidung zur Gesinnungsfrage wird", img: "20260729schwimmbad.webp", alt: "Ein nasses Alltagsgewand schwimmt in einem leeren Schwimmbecken, daneben liegt ein Badeanzug" },
    { file: "die-afd-wars.html", kick: "Deutschland", ttl: "Die AfD war's", img: "20260727diekranke.webp", alt: "Satirische Fotomontage: Politikerin am Rednerpult vor roter Parteiwand, auf der statt des Parteinamens ueberall Die Kranke steht" },
    { file: "der-witze-fritze.html", kick: "Durchschaut", ttl: "Der Witze-Fritze", img: "20260727merz.webp", alt: "Satirische Fotomontage: Friedrich Merz sitzt traurig und verschmutzt in einem grossen Muellcontainer in einer Gasse und haelt ein zerfleddertes Buch mit dem Titel schlechte Witze" },
    { file: "wir-schafften-es-nicht.html", kick: "Deutschland", ttl: "Tolerant bis zum Anschlag", img: "20260727wirschaffendas.webp", alt: "Ein zerrissenes verwittertes Plakat mit der Aufschrift Wir schaffen das an einer Betonwand, davor Grabkerzen, Blumen und eine Regenbogenfahne hinter Polizei-Absperrband im Abendlicht" },
    { file: "deutscher-sagt-der-pass.html", kick: "Deutschland", ttl: "Deutscher, sagt der Pass", img: "20260727ballout.webp", alt: "Eine Menschenmenge beim Berliner CSD mit Regenbogenfahnen, im Kreis das Polizei-Fahndungsfoto des Verdaechtigen" },
    { file: "die-toedlichste-kategorie.html", kick: "Deutschland", ttl: "Die tödlichste Kategorie", img: "20260726terror.webp", alt: "Eine geoeffnete Ermittlungsakte auf einem Tisch mit zwei roten Stempeln BEKANNT und FREIGELASSEN und einem angeklammerten geschwaerzten Passfoto" },
    { file: "wenn-der-taeter-nicht-passt.html", kick: "Durchschaut", ttl: "Wenn der Täter nicht passt", img: "20260726wirschaffendas.png", alt: "Eine Demonstration auf einer sonnigen Strasse hinter einem grossen weissen Transparent mit der Aufschrift wir schaffen das" },
    { file: "uninformiert-ungeprueft-aber-laut.html", kick: "ÖRR", ttl: "Uninformiert, ungeprüft, aber laut", img: "20260725hayali.jpeg", alt: "Dunja Hayali sitzt gelassen im Zug, waehrend auf dem Bahnsteig Menschen mit einem Transparent Deine Meinung unsere Gebuehren protestieren" },
    { file: "die-toleranz-die-niederbruellt.html", kick: "Deutschland", ttl: "Die Toleranz, die niederbrüllt", img: "20260725trans.png", alt: "Eine Gruppe protestierender Menschen mit erhobenen Haenden und aufgerissenen Muendern, gesehen durch das Fenster eines Hoersaals, einige mit gefaerbten Haaren und Protest-Shirts" },
    { file: "neuer-minister-alte-gleise.html", kick: "Deutschland", ttl: "Neuer Minister, alte Gleise", img: "20260725bahn.webp", alt: "Ein menschenleerer nebliger Bahnsteig unter einer grossen Bahnhofsuhr, leere Baenke, ein ICE wartet weit hinten im grauen Dunst" },
    { file: "ein-schnitt-ins-gesicht.html", kick: "Deutschland", ttl: "Ein Schnitt ins Gesicht", img: "20260724messer-clean.webp", alt: "Ein blutverschmiertes Cuttermesser liegt auf einem aufgeschlagenen Gesetzbuch neben einem Richterhammer auf einem dunklen Gerichtstisch" },
    { file: "fast-jeder-zweite-ohne-pass.html", kick: "Deutschland", ttl: "Fast die Hälfte ohne deutschen Pass", img: "20260724knast.webp", alt: "Ein dunkler Gefaengnis-Zellentrakt mit langen Reihen vergitterter Zellentueren, die sich im kalten Licht in die Dunkelheit verlieren" },
    { file: "ein-wort-sieben-razzien.html", kick: "Deutschland", ttl: "Ein Wort, sieben Razzien", img: "20260723holzkirchen.webp", alt: "Eine Hand im blauen Einweghandschuh haelt einen durchsichtigen Asservatenbeutel mit einem beschlagnahmten Smartphone, im unscharfen Hintergrund drei Einsatzkraefte in dunkler Uniform in einem Wohnungsflur" },
    { file: "wer-verliert-sortiert-aus.html", kick: "Deutschland", ttl: "Wer verliert, sortiert aus", img: "20260722abgelehnt.webp", alt: "Ein grosser roter Stempel mit der Aufschrift ABGELEHNT senkt sich auf ein Blatt Papier, auf dem bereits der rote Abdruck ABGELEHNT steht, auf einem Tisch in einem abgedunkelten Sitzungssaal" },
    { file: "afd-in-berlin-platz-1.html", kick: "Deutschland", ttl: "AfD in Berlin Platz 1", img: "20240724insa.png", alt: "Ein Balkendiagramm einer Berliner Sonntagsfrage mit der AfD bei 19 Prozent als hoechstem Balken vor CDU und Linke bei je 18 Prozent, Quelle INSA" },
    { file: "zwei-drittel-sind-der-erfolg.html", kick: "Österreich", ttl: "Zwei Drittel sind der Erfolg", img: "20260723migranten.webp", alt: "Zwei Monitore in einem Buero: der linke zeigt die Schlagzeile Beschaeftigung von Migranten steigt stetig, der rechte Ein Drittel der Migranten nach 10 Jahren immer noch arbeitslos; ein Mann deutet lachend auf die positive Schlagzeile, ein zweiter sitzt am Schreibtisch" },
    { file: "gewaehlt-aber-nicht-waehlbar.html", kick: "Deutschland", ttl: "Gewählt, aber nicht wählbar", img: "20260721AFD.jpg", alt: "Eine Litfasssaeule an einer sonnigen deutschen Strasse mit einem AfD-Wahlplakat, ueber das Gesicht des Kandidaten ein roter Balken mit der Aufschrift Nicht zugelassen" },
    { file: "wer-mit-gazprom-zu-abend-isst.html", kick: "Deutschland", ttl: "Wer mit Gazprom zu Abend isst", img: "20260723russland.webp", alt: "Eine deutsche und eine russische Tischfahne stehen gekreuzt auf einem polierten Konferenztisch in einem noblen Hotel-Sitzungssaal, dahinter zwei leere Ledersessel, Aktenmappen und Wassergläser" },
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
  var HERO_EPOCH   = 82773;

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
    ["Kurz", "index.html#kurzartikel"],
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
  var newsletterCard =
    '<a class="reader-card newsletter-card" href="' + homePrefix + 'newsletter.html">' +
      '<strong>Newsletter <small>· sonntags</small></strong>' +
      '<span class="reader-card-copy">Die Woche ohne Filter.</span>' +
      '<span class="reader-card-cta">Kostenlos anmelden <b>→</b></span>' +
    '</a>';
  var supportCard =
    '<a class="reader-card support-card" href="' + homePrefix + 'unterstuetzen.html">' +
      '<span class="reader-card-eyebrow">RealFunk ermöglichen</span>' +
      '<strong>Unterstützen</strong>' +
      '<span class="reader-card-copy">Hält RealFunk unabhängig.</span>' +
      '<span class="reader-card-cta">Mehr erfahren <b>→</b></span>' +
    '</a>';
  var html =
    '<div class="hero"><div class="wrap">' +
      '<div class="lead">' + tile(HERO_ITEMS[0], true) + tile(HERO_ITEMS[1], true) + '</div>' +
      '<div class="mobile-newsletter">' + newsletterCard + '</div>' +
      '<div class="row">' + restTiles + '</div>' +
    '</div></div>';

  // Die CTA-Kacheln folgen der Nachrichtenauswahl: erst Inhalt, dann Bindung.
  // Auf Mobil erscheint Newsletter früher, damit er nicht hinter der Hero-Reihe verschwindet.
  var readerHub =
    '<aside class="readerhub"><div class="wrap"><div class="readerhub-inner">' +
      newsletterCard + supportCard +
    '</div></div></aside>';

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
    ".mobile-newsletter{display:none;}" +
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
    ".readerhub{margin:18px 0 28px;}" +
    ".readerhub .wrap{max-width:1000px;margin:0 auto;padding:0 18px;}" +
    ".readerhub-inner{display:grid;grid-template-columns:1fr 1fr;gap:10px;}" +
    ".reader-card{position:relative;display:flex;min-height:108px;flex-direction:column;align-items:flex-start;justify-content:center;padding:16px 22px;border-radius:4px;overflow:hidden;transition:transform .18s ease,box-shadow .18s ease;}" +
    ".reader-card:hover{transform:translateY(-2px);box-shadow:0 7px 16px rgba(5,17,42,.18);}" +
    ".reader-card-eyebrow{font-size:10px;font-weight:900;letter-spacing:1px;text-transform:uppercase;margin-bottom:5px;}" +
    ".reader-card strong{font-size:23px;line-height:1.05;letter-spacing:-.5px;}" +
    ".reader-card strong small{font-size:13px;font-weight:800;letter-spacing:0;}" +
    ".reader-card-copy{font-size:14px;line-height:1.35;margin:4px 0 7px;max-width:none;}" +
    ".reader-card-copy em{font-style:normal;font-weight:800;}" +
    ".reader-card-cta{font-size:13px;font-weight:900;}" +
    ".reader-card-cta b{font-size:17px;margin-left:4px;}" +
    ".newsletter-card{background:#b82035;color:#fff;border:1px solid #9c1829;}" +
    ".newsletter-card:hover{background:#a71d30;}" +
    ".newsletter-card .reader-card-cta{color:#fff;}" +
    ".support-card{background:#20284A;color:#fff;border:1px solid #20284A;}" +
    ".support-card:after{content:'';position:absolute;inset:10px;border:1px solid rgba(230,168,58,.72);pointer-events:none;}" +
    ".support-card>*{position:relative;z-index:1;}" +
    ".support-card .reader-card-copy{color:#dde2f2;}" +
    ".support-card .reader-card-eyebrow,.support-card .reader-card-cta{color:#e6a83a;}" +
    ".aboutlink{margin-left:auto;display:inline-flex;align-items:center;gap:7px;color:#fff;font-size:13px;font-weight:800;padding:7px 0;border-bottom:1px solid rgba(230,168,58,.85);}" +
    ".aboutlink span{color:#e6a83a;font-size:17px;line-height:.7;}" +
    ".aboutlink:hover{color:#e6a83a;}" +
    ".sharebar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:14px 0 2px;}" +
    ".sharebar .sb-label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#7a7a7a;}" +
    ".sharebar .sb-btn{display:inline-block;cursor:pointer;border:1px solid var(--line,#e2e2e2);background:#fff;color:var(--accent-dark,#05112A);font:inherit;font-size:13px;font-weight:700;padding:6px 11px;border-radius:4px;line-height:1;}" +
    ".sharebar .sb-btn:hover{background:var(--accent-tint,#eaecf3);border-color:var(--accent,#20284A);}" +
    ".sharebar .sb-native{background:var(--accent,#20284A);color:#fff;border-color:var(--accent,#20284A);}" +
    "#topstories .ts-kick{display:inline-block;min-width:150px;color:var(--accent-dark,#05112A);font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.6px;}" +
    "@media(max-width:680px){#topstories .ts-kick{display:block;min-width:0;margin-bottom:1px;}}" +
    "@media(max-width:680px){.hero .row{grid-template-columns:1fr;}.hero .lead{grid-template-columns:1fr;}.mobile-newsletter{display:block;margin:0 0 10px;}.mobile-newsletter .reader-card{display:grid;grid-template-columns:1fr auto;gap:0 14px;align-items:center;min-height:0;padding:16px 18px;}.mobile-newsletter .reader-card strong{grid-column:1;grid-row:1;}.mobile-newsletter .reader-card-copy{grid-column:1 / 3;grid-row:2;margin:3px 0 0;font-size:13px;}.mobile-newsletter .reader-card-cta{grid-column:2;grid-row:1;white-space:nowrap;}.mobile-newsletter .reader-card-cta b{display:none;}.readerhub{margin-top:14px;}.readerhub-inner{grid-template-columns:1fr;}.readerhub .newsletter-card{display:none;}.reader-card{min-height:0;padding:18px;}.reader-card strong{font-size:22px;}" +
    ".topbar .wrap{flex-wrap:wrap;height:auto;padding-top:8px;padding-bottom:8px;}" +
    "";

  function mount() {
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    var badge = document.querySelector(".topbar .badge");
    if (badge) badge.outerHTML = '<a class="aboutlink" href="' + homePrefix + 'ueber-realfunk.html">Über RealFunk <span>→</span></a>';
    var noHero = document.body && document.body.classList.contains("no-hero");
    var sub = document.querySelector(".subbar");
    if (sub) sub.insertAdjacentHTML("afterend", navHtml + ((noHero || inArtikel) ? "" : html + readerHub));

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

          // Eigenformate erst nach der täglichen Auswahl: sichtbar, aber nie vor den Nachrichten.
          var formats = document.querySelector("main .formats");
          if (formats) ts.insertAdjacentElement("afterend", formats);
        }
      }
    }


  // Auf Artikelseiten bleibt ein einmal gesetztes Bild dauerhaft sichtbar:
  // Solange der Artikel im Hero-Pool steht, wird das dort hinterlegte Original
  // verwendet. Faellt er spaeter aus dem Pool, dient sein og:image als dauerhafte
  // Bildquelle. Eigene statische Artikelbilder werden nie doppelt eingefuegt.
  if (inArtikel) {
      var current = location.pathname.split("/").pop().replace(/\.html?$/i, "").toLowerCase();
      var item = null;
      for (var k = 0; k < HERO_ITEMS.length; k++) {
        if (HERO_ITEMS[k].file.replace(/\.html?$/i, "").toLowerCase() === current) { item = HERO_ITEMS[k]; break; }
      }
      if (!item) {
        var ogImage = document.querySelector('meta[property="og:image"]');
        var ogSrc = ogImage ? ogImage.getAttribute("content") : "";
        // Reine Social- und Vorschaukacheln sind kein Artikelbild.
        // Nur direkt abgelegte Bilddateien stammen aus einer echten Bebilderung.
        if (ogSrc && !/\/images\/(?:og-default|og-cover|og\/|share\/)/i.test(ogSrc)) {
          var ogTitle = document.querySelector('meta[property="og:title"]');
          item = { img: ogSrc, alt: ogTitle ? ogTitle.getAttribute("content") : "" };
        }
      }
      if (item && item.img && !document.querySelector(".article .figure") && !document.querySelector(".article img.lead")) {
        var h1 = document.querySelector(".article h1");
        if (h1) {
          var articleImg = /^(?:https?:)?\/\//i.test(item.img) ? item.img : imgPrefix + item.img;
          var fig = '<figure class="figure full" style="margin:14px 0 6px;">' +
            '<img loading="lazy" decoding="async" src="' + esc(articleImg) + '" alt="' + esc(item.alt || "") +
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
          '<button type="button" class="sb-btn sb-copy">Link kopieren</button>' +
          '<a class="sb-btn" href="mailto:editorial@realfunk.at?subject=' + e('Hinweis zu: ' + shareTitle) + '&body=' + e('Artikel: ' + shareUrl + '\n\nMein Hinweis: ') + '">Hinweis zur Story</a>';
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

    // Externe Quellen sollen RealFunk nicht im selben Tab ersetzen.
    // Interne RealFunk-Navigation sowie Mail-/Telefonlinks bleiben unverändert.
    var currentHost = location.hostname.toLowerCase().replace(/^www\./, "");
    document.querySelectorAll("a[href]").forEach(function (link) {
      var raw = link.getAttribute("href");
      if (!raw) return;
      try {
        var targetUrl = new URL(raw, location.href);
        if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") return;
        var targetHost = targetUrl.hostname.toLowerCase().replace(/^www\./, "");
        var isRealFunk = targetHost === "realfunk.de";
        if (targetHost === currentHost || isRealFunk) return;
        link.setAttribute("target", "_blank");
        var rel = (link.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
        ["noopener", "noreferrer"].forEach(function (token) {
          if (rel.indexOf(token) === -1) rel.push(token);
        });
        link.setAttribute("rel", rel.join(" "));
      } catch (er) {}
    });

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
