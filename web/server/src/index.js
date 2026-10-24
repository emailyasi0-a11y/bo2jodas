// Servidor de partidas de bo2jodas.
//
//   POST /api/runs            sube el JSON de una partida (cabecera x-token si hay UPLOAD_TOKEN)
//   GET  /api/runs            lista de partidas (resumen), las mas recientes primero
//   GET  /api/runs/:id        una partida entera
//   GET  /api/leaderboards    mejores rondas por jugador, clase y arquetipo, records y su historia
//   GET  /api/stats           totales del grupo
//   /                         la web (client/dist)
//
// Las partidas se guardan como archivos JSON en DATA_DIR/runs (un archivo por
// partida) y se mantienen en memoria: para un grupo de amigos sobra.

import express from "express";
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { resumen, leaderboards, totales, validar } from "./partidas.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = process.env.DATA_DIR || join(__dirname, "..", "data");
const RUNS_DIR = join(DATA_DIR, "runs");
const UPLOAD_TOKEN = process.env.UPLOAD_TOKEN || "";
const CLIENT_DIR = process.env.CLIENT_DIR || join(__dirname, "..", "..", "client", "dist");

mkdirSync(RUNS_DIR, { recursive: true });

// ---------------------------------------------------------------- almacen
const partidas = new Map();

function cargar() {
  for (const nombre of readdirSync(RUNS_DIR)) {
    if (!nombre.endsWith(".json")) continue;
    try {
      const p = JSON.parse(readFileSync(join(RUNS_DIR, nombre), "utf8"));
      if (p && p.id) partidas.set(p.id, p);
    } catch (e) {
      console.warn(`partida ilegible: ${nombre}: ${e.message}`);
    }
  }
  console.log(`${partidas.size} partidas cargadas de ${RUNS_DIR}`);
}

function idDe(p) {
  // El mod manda un id aleatorio; por si acaso, se deriva uno estable del contenido.
  const base = p.id ? String(p.id) : createHash("sha1").update(JSON.stringify(p)).digest("hex").slice(0, 12);
  return base.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 40) || createHash("sha1").update(JSON.stringify(p)).digest("hex").slice(0, 12);
}

function guardar(p) {
  writeFileSync(join(RUNS_DIR, `${p.id}.json`), JSON.stringify(p, null, 1));
  partidas.set(p.id, p);
}

// ---------------------------------------------------------------- API
const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "4mb" }));

app.post("/api/runs", (req, res) => {
  if (UPLOAD_TOKEN && req.get("x-token") !== UPLOAD_TOKEN) {
    return res.status(401).json({ error: "token incorrecto" });
  }
  const p = req.body;
  const error = validar(p);
  if (error) return res.status(400).json({ error });
  p.id = idDe(p);
  if (partidas.has(p.id)) return res.json({ ok: true, id: p.id, repetida: true });
  p.recibido = new Date().toISOString();
  if (!p.fecha) p.fecha = p.recibido;
  // El anfitrion puede mandar el nombre del que subio (uploader) para saber quien hospedo.
  if (typeof p.subido_por !== "string") delete p.subido_por;
  guardar(p);
  console.log(`partida ${p.id}: ronda ${p.ronda}, ${p.jugadores.length} jugadores, ${p.mapa}`);
  res.status(201).json({ ok: true, id: p.id });
});

app.get("/api/runs", (req, res) => {
  const limite = Math.min(Number(req.query.limit) || 100, 1000);
  const lista = [...partidas.values()]
    .map(resumen)
    .sort((a, b) => (b.fecha > a.fecha ? 1 : b.fecha < a.fecha ? -1 : 0))
    .slice(0, limite);
  res.json(lista);
});

app.get("/api/runs/:id", (req, res) => {
  const p = partidas.get(req.params.id);
  if (!p) return res.status(404).json({ error: "no existe" });
  res.json(p);
});

app.get("/api/leaderboards", (_req, res) => {
  res.json(leaderboards([...partidas.values()]));
});

app.get("/api/stats", (_req, res) => {
  res.json(totales([...partidas.values()]));
});

// ---------------------------------------------------------------- web
if (existsSync(CLIENT_DIR)) {
  app.use(express.static(CLIENT_DIR, { maxAge: "1h" }));
  app.get(/^(?!\/api\/).*/, (_req, res) => res.sendFile(join(CLIENT_DIR, "index.html")));
} else {
  app.get("/", (_req, res) => res.type("text").send("bo2jodas: falta la web compilada (client/dist). La API funciona en /api."));
}

cargar();
app.listen(PORT, () => console.log(`bo2jodas web en http://localhost:${PORT} (token de subida: ${UPLOAD_TOKEN ? "si" : "no"})`));
