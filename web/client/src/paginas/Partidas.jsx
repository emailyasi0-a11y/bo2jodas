import { useEffect, useState } from "react";
import { api } from "../api.js";
import { Arquetipo, Cargando, Clase, EnlacePartida, Mitica, Numero, Ronda } from "../componentes.jsx";
import { duracion, fecha, nombreMapa } from "../nombres.js";

export default function Partidas() {
  const [lista, setLista] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api("/runs?limit=200").then(setLista).catch((e) => setError(e.message));
  }, []);

  if (!lista) return <Cargando error={error} />;
  if (lista.length === 0) return <p className="vacio">Todavía no hay partidas. Juega una y súbela (o usa "Subir JSON").</p>;

  return (
    <section>
      <h1>Partidas</h1>
      <div className="tarjetas">
        {lista.map((p) => (
          <article className="tarjeta partida" key={p.id}>
            <EnlacePartida id={p.id}>
              <header>
                <Ronda n={p.ronda} grande />
                <div>
                  <div className="partida-mapa">{nombreMapa(p.mapa, p.sitio)}</div>
                  <div className="partida-fecha">
                    {fecha(p.fecha)} · {duracion(p.duracion_s)} · {p.jugadores.length} {p.jugadores.length === 1 ? "jugador" : "jugadores"}
                    {p.subido_por ? ` · subida por ${p.subido_por}` : ""}
                  </div>
                </div>
              </header>
            </EnlacePartida>
            <ul className="jugadores-mini">
              {p.jugadores.map((j) => (
                <li key={j.nombre}>
                  <span className="nombre">{j.nombre}</span>
                  <Clase id={j.clase} />
                  <Arquetipo id={j.arquetipo} />
                  <Mitica id={j.mitica} />
                  <span className="mini-dato" title="Nivel">nv {j.nivel}</span>
                  <span className="mini-dato" title="Bajas"><Numero n={j.bajas} /> bajas</span>
                  <span className="mini-dato" title="Daño total"><Numero n={j.danio_total} /> daño</span>
                  <span className="mini-dato" title="Caídas">{j.caidas} caídas</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
