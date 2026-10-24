export async function api(ruta) {
  const r = await fetch(`/api${ruta}`);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

export async function subirPartida(json, token) {
  const r = await fetch("/api/runs", {
    method: "POST",
    headers: { "content-type": "application/json", ...(token ? { "x-token": token } : {}) },
    body: JSON.stringify(json),
  });
  const cuerpo = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(cuerpo.error || `${r.status}`);
  return cuerpo;
}
