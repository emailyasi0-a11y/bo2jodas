#!/usr/bin/env bash
# Instala la web de bo2jodas en un servidor Ubuntu recien creado (probado para
# una VM "Always Free" de Oracle Cloud; vale para cualquier VPS con IP publica).
#
#   curl -fsSL https://raw.githubusercontent.com/emailyasi0-a11y/bo2jodas/main/web/instalar_servidor.sh | bash
#
# Hace: instala Docker, abre los puertos 80 y 443 (Oracle los bloquea con
# iptables ademas de en su consola), clona el repo, prepara .env con la IP
# publica (sslip.io) y arranca todo con docker compose. Luego hay que copiar
# los tokens a /opt/bo2jodas/web/data/tokens.json.
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
  exec sudo -E bash "$0" "$@"
fi

echo "== Docker"
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi
systemctl enable --now docker

echo "== Puertos 80 y 443"
if command -v iptables >/dev/null 2>&1; then
  iptables -I INPUT 5 -p tcp --dport 80 -j ACCEPT || true
  iptables -I INPUT 5 -p tcp --dport 443 -j ACCEPT || true
  if command -v netfilter-persistent >/dev/null 2>&1; then netfilter-persistent save || true; fi
fi
if command -v ufw >/dev/null 2>&1; then
  ufw allow 80/tcp || true
  ufw allow 443/tcp || true
fi

echo "== Codigo"
mkdir -p /opt
if [ -d /opt/bo2jodas/.git ]; then
  git -C /opt/bo2jodas pull --ff-only
else
  apt-get install -y git >/dev/null 2>&1 || true
  git clone https://github.com/emailyasi0-a11y/bo2jodas /opt/bo2jodas
fi
cd /opt/bo2jodas/web

IP=$(curl -fsS -4 https://api.ipify.org || curl -fsS -4 https://ifconfig.me)
DOMINIO="${DOMINIO:-${IP}.sslip.io}"
if [ ! -f .env ]; then
  printf 'DOMINIO=%s\nUPLOAD_TOKENS=\n' "$DOMINIO" > .env
fi
mkdir -p data
if [ ! -f data/tokens.json ]; then
  echo '{}' > data/tokens.json
  echo "AVISO: data/tokens.json esta vacio: copia ahi los tokens (nadie podra subir hasta entonces)."
fi

echo "== Arrancando"
docker compose up -d --build
echo
echo "Listo: https://${DOMINIO}  (el certificado tarda un minuto la primera vez)"
echo "Tokens: /opt/bo2jodas/web/data/tokens.json y luego: cd /opt/bo2jodas/web && docker compose restart app"
