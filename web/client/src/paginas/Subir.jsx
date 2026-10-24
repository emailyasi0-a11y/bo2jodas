import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { subirPartida } from "../api.js";
import { useSesion } from "../sesion.jsx";

const CARPETA = "%localappdata%\\Plutonium\\storage\\t6\\mods\\zm_bo2jodas\\scriptdata\\bo2jodas_partidas";

// Subida de partidas: cada uno entra con su cuenta y arrastra el JSON que deja
// el mod en el PC del anfitrion al acabar la partida.
export default function Subir() {
  const [estados, setEstados] = useState([]);
  const [copiado, setCopiado] = useState(false);
  const { yo } = useSesion();
  const navegar = useNavigate();

  function anotar(texto) {
    setEstados((e) => [...e, texto]);
  }

  async function procesar(archivos) {
    setEstados([]);
    let ultimo = null;
    for (const f of archivos) {
      try {
        const json = JSON.parse(await f.text());
        const r = await subirPartida(json);
        anotar(r.repetida ? `${f.name}: ya estaba subida.` : `${f.name}: subida.`);
        ultimo = r.id;
      } catch (e) {
        anotar(`${f.name}: ${e.message}`);
      }
    }
    if (archivos.length === 1 && ultimo) navegar(`/partida/${ultimo}`);
  }

  async function copiarRuta() {
    try {
      await navigator.clipboard.writeText(CARPETA);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {}
  }

  if (yo === undefined) return <p className="cargando">Cargando…</p>;

  return (
    <section className="subir">
      <h1>Subir una partida</h1>
      <ol className="pasos">
        <li>
          Al acabar cada partida, el mod deja un JSON en el PC del <b>anfitrión</b> (quien creó la sala), en esta carpeta. Pégala en la barra de direcciones del
          Explorador de Windows:
          <div className="token-fila">
            <code className="token ruta">{CARPETA}</code>
            <button type="button" className="boton secundario" onClick={copiarRuta}>
              {copiado ? "Copiada" : "Copiar ruta"}
            </button>
          </div>
        </li>
        <li>Arrastra aquí el archivo de la partida que quieras subir (o varios). Si ya estaba subida, no se duplica.</li>
      </ol>

      {yo ? (
        <>
          <p className="nota">
            Subes como <b>{yo.usuario}</b>.
          </p>
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
        </>
      ) : (
        <div className="tarjeta aviso-entrar">
          Para subir hace falta una cuenta (solo usuario y contraseña).{" "}
          <Link className="boton" to="/entrar">
            Entrar
          </Link>{" "}
          <Link className="boton secundario" to="/registro">
            Registrarse
          </Link>
        </div>
      )}
      {estados.length > 0 && (
        <ul className="estados">
          {estados.map((t, i) => (
            <li key={i} className="estado">
              {t}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
