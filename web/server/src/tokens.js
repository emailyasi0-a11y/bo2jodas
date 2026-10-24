// Tokens de subida. Solo se acepta una partida si viene con uno de estos tokens
// en la cabecera x-token. Se leen de:
//   1. DATA_DIR/tokens.json  -> { "token": "nombre de quien lo usa", ... }
//   2. la variable UPLOAD_TOKENS -> "token1:nombre1,token2:nombre2"
//   3. la variable UPLOAD_TOKEN  -> un token suelto (pruebas)
// Sin ninguno configurado no se puede subir nada (salvo UPLOAD_OPEN=1, para desarrollo).
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export function cargarTokens(dataDir) {
  const tokens = new Map();
  const ruta = join(dataDir, "tokens.json");
  if (existsSync(ruta)) {
    try {
      const obj = JSON.parse(readFileSync(ruta, "utf8"));
      for (const [t, nombre] of Object.entries(obj)) if (t.trim()) tokens.set(t.trim(), String(nombre || ""));
    } catch (e) {
      console.warn(`tokens.json ilegible: ${e.message}`);
    }
  }
  for (const par of (process.env.UPLOAD_TOKENS || "").split(",")) {
    const [t, nombre] = par.split(":");
    if (t && t.trim()) tokens.set(t.trim(), (nombre || "").trim());
  }
  if (process.env.UPLOAD_TOKEN) tokens.set(process.env.UPLOAD_TOKEN, "");
  return tokens;
}

export function comprobarToken(tokens, cabecera) {
  if (process.env.UPLOAD_OPEN === "1") return { ok: true, nombre: "" };
  if (!cabecera || !tokens.has(cabecera)) return { ok: false };
  return { ok: true, nombre: tokens.get(cabecera) };
}
