# bo2jodas web: partidas y leaderboards

Al acabar cada partida, el mod escribe un JSON con todo lo que ha pasado (jugadores, build, nivel, ronda, daño de cada carta, bajas, caídas, jefes…) en el PC del **anfitrión**:

```
%localappdata%\Plutonium\storage\t6\mods\zm_bo2jodas\scriptdata\bo2jodas_partidas\zm_transit_<id>.json
```

Esta web lo recibe, lo guarda y lo enseña: lista de partidas, detalle de cada una (build, daño por carta, armas, cartas por orden, cartas perdidas), leaderboards (mejor ronda de cada uno, por clase, por arquetipo, récords, y la historia de quién le quitó el récord a quién) y totales por jugador.

- `server/`: Node + Express. API en `/api`, guarda cada partida como un JSON en `data/runs/`.
- `client/`: React + Vite.
- `subidor/`: script para el PC del anfitrión que sube los JSON solos.
- `Dockerfile`, `docker-compose.yml`, `Caddyfile`: despliegue con HTTPS automático.

## Desplegar en un servidor (VPS con IP pública)

Hace falta Docker. Sin comprar dominio: **sslip.io** convierte la IP en nombre (`203.0.113.7.sslip.io` apunta a `203.0.113.7`) y Caddy pide el certificado solo.

```bash
git clone https://github.com/emailyasi0-a11y/bo2jodas
cd bo2jodas/web
cp .env.example .env        # DOMINIO=<tu ip>.sslip.io  UPLOAD_TOKEN=<lo que quieras>
docker compose up -d --build
```

Abre `https://<tu ip>.sslip.io`. Los puertos 80 y 443 tienen que estar abiertos en el firewall del servidor. Las partidas quedan en `web/data/runs/` (haz copia de esa carpeta y no pierdes nada).

Sin Docker: `cd client && npm install && npm run build`, luego `cd ../server && npm install && UPLOAD_TOKEN=... node src/index.js` (puerto 3000) y pon Caddy delante con el `Caddyfile`.

## Subir las partidas solas (PC del anfitrión)

1. Copia la carpeta `subidor/` a cualquier sitio del PC del anfitrión.
2. Copia `subir_partidas.cfg.ejemplo` como `subir_partidas.cfg` y pon la `url` de la web, el `token` de `.env` y tu nombre.
3. Doble clic en `subir_partidas.bat`: se queda abierto vigilando la carpeta y sube cada partida nueva al acabar (y las que hubiera pendientes). Déjalo abierto mientras juegas o ejecútalo después.

Si no quieres el script, en la web hay una pestaña **Subir JSON** para arrastrar los archivos a mano.

## Probar en local

```bash
cd web/client && npm install && npm run build
cd ../server && npm install && node src/index.js
```

Abre `http://localhost:3000`. Para desarrollo del cliente con recarga: `npm run dev` en `client/` (proxy a `localhost:3000`).

Hay una partida de ejemplo en `ejemplos/`: `curl -X POST localhost:3000/api/runs -H "content-type: application/json" --data @ejemplos/partida_ejemplo.json`.

## API

| Método y ruta | Qué hace |
|---|---|
| `POST /api/runs` | Sube una partida (JSON del mod). Cabecera `x-token` si hay `UPLOAD_TOKEN`. Devuelve `{ok, id, repetida}`. |
| `GET /api/runs?limit=100` | Resúmenes, las más recientes primero. |
| `GET /api/runs/:id` | La partida completa. |
| `GET /api/leaderboards` | Mejor ronda por jugador, por clase y por arquetipo; récords; historia del récord. |
| `GET /api/stats` | Totales por jugador y cartas más usadas. |

El formato del JSON lo escribe `mod/scripts/zm/bo2jodas_stats.gsc`; los nombres de las cartas para la web salen de `tools/generar_cartas_json.py` (hay que ejecutarlo cuando cambien las cartas del mod).
