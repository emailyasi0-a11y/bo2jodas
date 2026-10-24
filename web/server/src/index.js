// Servidor de partidas de bo2jodas.
//
//   POST /api/runs                sube el JSON de una partida (cabecera x-token con el token de tu cuenta)
//   GET  /api/runs                lista de partidas (resumen), las mas recientes primero
//   GET  /api/runs/:id            una partida entera
//   GET  /api/leaderboards        mejores rondas por jugador, clase y arquetipo, records y su historia
//   GET  /api/stats               totales del grupo
//   POST /api/auth/registro       { usuario, contrasena } -> crea la cuenta y entra
//   POST /api/auth/login          { usuario, contrasena } -> entra (cookie de sesion)
//   POST /api/auth/logout
//   GET  /api/auth/yo             quien soy + mi token de subida (32 caracteres)
//   POST /api/auth/token          genera un token nuevo (el viejo deja de valer)
//   POST /api/auth/contrasena     { actual, nueva }
//   /                             la web (client/dist)
//
// Las partidas se guardan como archivos JSON en DATA_DIR/runs (un archivo por
// partida) y se mantienen en memoria: para un grupo de amigos sobra.

import express from "express";
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { resumen, leaderboards, totales, validar } from "./partidas.js";
import { cargarTokens, comprobarToken } from "./tokens.js";
import { Usuarios } from "./usuarios.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = process.env.DATA_DIR || join(__dirname, "..", "data");
const RUNS_DIR = join(DATA_DIR, "runs");
const CLIENT_DIR = process.env.CLIENT_DIR || join(__dirname, "..", "..", "client", "dist");

mkdirSync(RUNS_DIR, { recursive: true });
const TOKENS = cargarTokens(DATA_DIR); // tokens sueltos del administrador (opcional)
const usuarios = new Usuarios(DATA_DIR);

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

// Quien puede subir: token de una cuenta (x-token), sesion de la web, o un token
// suelto del administrador. Devuelve { ok, nombre } .
function autorizarSubida(req) {
  const token = req.get("x-token");
  const dueno = usuarios.duenoDelToken(token);
  if (dueno) return { ok: true, nombre: dueno };
  const clave = usuarios.deCookie(req);
  if (clave) return { ok: true, nombre: usuarios.publico(clave).usuario };
  return comprobarToken(TOKENS, token);
}

// ---------------------------------------------------------------- API
const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1); // detras de Caddy: req.ip y req.secure reales
app.use(express.json({ limit: "4mb" }));

app.post("/api/runs", (req, res) => {
  const auth = autorizarSubida(req);
  if (!auth.ok) return res.status(401).json({ error: "token incorrecto: registrate en la web y copia el token de tu perfil" });
  const p = req.body;
  const error = validar(p);
  if (error) return res.status(400).json({ error });
  p.id = idDe(p);
  if (partidas.has(p.id)) return res.json({ ok: true, id: p.id, repetida: true });
  p.recibido = new Date().toISOString();
  if (!p.fecha) p.fecha = p.recibido;
  // Quien la subio: la cuenta del token manda sobre lo que diga el subidor.
  p.subido_por = auth.nombre || (typeof p.subido_por === "string" ? p.subido_por.trim() : "");
  if (!p.subido_por) delete p.subido_por;
  guardar(p);
  console.log(`partida ${p.id}: ronda ${p.ronda}, ${p.jugadores.length} jugadores, ${p.mapa}, subida por ${p.subido_por || "?"}`);
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

// ---------------------------------------------------------------- cuentas
function perfil(clave) {
  const u = usuarios.publico(clave);
  u.subidas = [...partidas.values()].filter((p) => p.subido_por === u.usuario).length;
  return u;
}

app.post("/api/auth/registro", (req, res) => {
  if (usuarios.frenado(req.ip)) return res.status(429).json({ error: "demasiados intentos, espera 10 minutos" });
  const { usuario, contrasena } = req.body || {};
  const r = usuarios.registrar(usuario, contrasena);
  if (r.error) {
    usuarios.fallo(req.ip);
    return res.status(400).json({ error: r.error });
  }
  const clave = usuario.toLowerCase();
  usuarios.ponerCookie(req, res, clave);
  console.log(`cuenta nueva: ${usuario}`);
  res.status(201).json(perfil(clave));
});

app.post("/api/auth/login", (req, res) => {
  if (usuarios.frenado(req.ip)) return res.status(429).json({ error: "demasiados intentos, espera 10 minutos" });
  const { usuario, contrasena } = req.body || {};
  const r = usuarios.entrar(usuario, contrasena);
  if (r.error) {
    usuarios.fallo(req.ip);
    return res.status(401).json({ error: r.error });
  }
  const clave = String(usuario).toLowerCase();
  usuarios.ponerCookie(req, res, clave);
  res.json(perfil(clave));
});

app.post("/api/auth/logout", (_req, res) => {
  usuarios.quitarCookie(res);
  res.json({ ok: true });
});

function conSesion(req, res, siguiente) {
  const clave = usuarios.deCookie(req);
  if (!clave) return res.status(401).json({ error: "no has entrado" });
  req.clave = clave;
  siguiente();
}

app.get("/api/auth/yo", conSesion, (req, res) => res.json(perfil(req.clave)));

app.post("/api/auth/token", conSesion, (req, res) => {
  usuarios.regenerarToken(req.clave);
  res.json(perfil(req.clave));
});

app.post("/api/auth/contrasena", conSesion, (req, res) => {
  const { actual, nueva } = req.body || {};
  const r = usuarios.cambiarContrasena(req.clave, actual, nueva);
  if (r.error) return res.status(400).json({ error: r.error });
  res.json({ ok: true });
});

// ---------------------------------------------------------------- web
if (existsSync(CLIENT_DIR)) {
  app.use(express.static(CLIENT_DIR, { maxAge: "1h" }));
  app.get(/^(?!\/api\/).*/, (_req, res) => res.sendFile(join(CLIENT_DIR, "index.html")));
} else {
  app.get("/", (_req, res) => res.type("text").send("bo2jodas: falta la web compilada (client/dist). La API funciona en /api."));
}

cargar();
app.listen(PORT, () =>
  console.log(
    `bo2jodas web en http://localhost:${PORT} (${usuarios.total} cuentas, ${TOKENS.size} tokens sueltos${process.env.UPLOAD_OPEN === "1" ? ", subida abierta" : ""})`
  )
);
