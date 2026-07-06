#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# ORealFunk Deploy — Push nach GitHub + Cloudflare-Purge.
# Die Secrets stehen NICHT in dieser Datei. Einmalig einrichten:
#
#   1) GitHub-PAT im macOS-Schlüsselbund ablegen (nur einmal):
#        git config --global credential.helper osxkeychain
#      Beim ersten Push fragt git nach Username + Passwort:
#        Username: dein GitHub-Name
#        Passwort: der Fine-grained PAT (github_pat_...)
#      Danach merkt der Schlüsselbund den Token dauerhaft.
#
#   2) Cloudflare-Token in eine geschützte Datei legen:
#        printf '%s' 'DEIN_CF_TOKEN' > ~/.rf_cf_token
#        chmod 600 ~/.rf_cf_token
#
# Danach jederzeit:  bash ~/Documents/Claude/Projects/orf.ac/deploy.sh
# ============================================================

SRC="/Users/PP/Documents/Claude/Projects/orf.ac"
REPO="https://github.com/realfunkat/realfunk.git"
ZONE="5933a11f179be1e141741cc40c4529b6"
WORK="$(mktemp -d)/rf_push"

echo "→ Klone Repo…"
git clone --depth 1 "$REPO" "$WORK"

echo "→ Synchronisiere Projektstand…"
rsync -a --delete \
  --exclude='.git' --exclude='CLAUDE.md' --exclude='.DS_Store' \
  --exclude='__pycache__' --exclude='deploy.sh' \
  "$SRC/" "$WORK/"

cd "$WORK"
git -c user.email=editorial@realfunk.at -c user.name=ORealFunk add -A

if git -c user.email=editorial@realfunk.at -c user.name=ORealFunk \
     commit -m "Redaktion $(date '+%d.%m.%Y %H:%M')"; then
  echo "→ Push nach main…"
  git push origin HEAD:main
else
  echo "Nichts zu committen — Stand ist schon aktuell."
  exit 0
fi

# Cloudflare 2x purgen (einmal sofort, einmal ~70 s nach dem Pages-Build).
if [ -f "$HOME/.rf_cf_token" ]; then
  CF="$(cat "$HOME/.rf_cf_token")"
  purge() {
    curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE/purge_cache" \
      -H "Authorization: Bearer $CF" -H "Content-Type: application/json" \
      --data '{"purge_everything":true}' >/dev/null
  }
  echo "→ Cloudflare purge (1/2)…"; purge
  echo "→ warte 70 s auf Pages-Build…"; sleep 70
  echo "→ Cloudflare purge (2/2)…"; purge
  echo "✓ Cloudflare zweimal gepurgt."
else
  echo "Hinweis: ~/.rf_cf_token fehlt — Purge übersprungen."
fi

echo "✓ Deploy fertig."
