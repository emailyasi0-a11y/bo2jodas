import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { subirPartida } from "../api.js";

// Subida manual: arrastra el JSON que deja el mod en
// %localappdata%\Plutonium\storage\t6\mods\zm_bo2jodas\scriptdata\bo2jodas_partidas\
export default function Subir() {
  const [estado, setEstado] = useState("");
  const [token, setToken] = useState(localStorage.getItem("bo2jodas_token") || "");
  const navegar = useNavigate();

  async function procesar(archivos) {
    for (const f of archivos) {
      try {
        const json = JSON.parse(await f.text());
        setEstado(`Subiendo ${f.name}…`);
        const r = await subirPartida(json, token);
        setEstado(r.repetida ? `${f.name}: ya estaba subida.` : `${f.name}: subida.`);
        if (archivos.length === 1) navegar(`/partida/${r.id}`);
      } catch (e) {
        setEstado(`${f.name}: ${e.message}`);
      }
    }
  }

  return (
    <section className="subir">
      <h1>Subir una partida</h1>
      <p>
        El mod escribe un JSON al acabar cada partida en <code>%localappdata%\Plutonium\storage\t6\mods\zm_bo2jodas\scriptdata\bo2jodas_partidas\</code> del PC del
        anfitrión. Normalmente lo sube solo <code>subir_partidas.bat</code>; si no, arrástralo aquí.
      </p>
      <label className="campo">
        Token de subida (si el servidor lo pide)
        <input
          type="password"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            localStorage.setItem("bo2jodas_token", e.target.value);
          }}
        />
      </label>
      <div
        className="zona-soltar"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          procesar([...e.dataTransfer.files]);
        }}
      >
        Arrastra aquí los .json
        <input type="file" accept=".json" multiple onChange={(e) => procesar([...e.target.files])} />
      </div>
      {estado && <p className="estado">{estado}</p>}
    </section>
  );
}
