import { useEffect, useState } from "react";
import { api } from "../api.js";
import { Arquetipo, Cargando, Clase, EnlacePartida, Mitica, Numero, Ronda } from "../componentes.jsx";
import { ARQUETIPOS, CLASES, fecha, nombreArquetipo, nombreClase } from "../nombres.js";

export default function Leaderboards() {
  const [lb, setLb] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api("/leaderboards").then(setLb).catch((e) => setError(e.message));
  }, []);

  if (!lb) return <Cargando error={error} />;
  if (lb.mejorRonda.length === 0) return <p className="vacio">Sin partidas todavía.</p>;

  const porClase = agrupar(lb.porClase, (e) => e.clase, Object.keys(CLASES));
  const porArq = agrupar(lb.porArquetipo, (e) => e.arquetipo, Object.keys(ARQUETIPOS));

  return (
    <section>
      <h1>Leaderboards</h1>

      <h2>Mejor ronda de cada uno</h2>
      <Tabla entradas={lb.mejorRonda} />

      <h2>Historia del récord del grupo</h2>
      <ol className="historia">
        {lb.historia.map((h, i) => (
          <li key={i}>
            <Ronda n={h.ronda} />
            <span className="hist-texto">
              <b>{h.nuevos.join(", ")}</b>
              {h.anterior ? ` supera la ronda ${h.anterior} de ${h.anteriores.join(", ")}` : " pone la primera marca"}
            </span>
            <EnlacePartida id={h.partida}>{fecha(h.fecha)}</EnlacePartida>
          </li>
        ))}
      </ol>

      <h2>Por clase</h2>
      {Object.keys(CLASES).map((c) => (
        <div key={c}>
          <h3 style={{ color: CLASES[c].color }}>{nombreClase(c)}</h3>
          {porClase[c] && porClase[c].length ? <Tabla entradas={porClase[c]} sinClase /> : <p className="vacio">Nadie ha jugado con esta clase.</p>}
        </div>
      ))}

      <h2>Por arquetipo</h2>
      {Object.keys(ARQUETIPOS).map((a) => (
        <div key={a}>
          <h3 style={{ color: ARQUETIPOS[a].color }}>{nombreArquetipo(a)}</h3>
          {porArq[a] && porArq[a].length ? <Tabla entradas={porArq[a]} sinArq /> : <p className="vacio">Nadie ha llegado al nivel 8 con este arquetipo.</p>}
        </div>
      ))}

      <h2>Récords</h2>
      <div className="records">
        <Record titulo="Más daño en una partida" lista={lb.records.danio} clave="danio_total" />
        <Record titulo="Más bajas" lista={lb.records.bajas} clave="bajas" />
        <Record titulo="Más a la cabeza" lista={lb.records.cabezas} clave="cabezas" />
        <Record titulo="Más nivel" lista={lb.records.nivel} clave="nivel" />
        <Record titulo="Mejor combo" lista={lb.records.combo} clave="max_combo" />
        <Record titulo="Más puntos ganados" lista={lb.records.puntos} clave="puntos_total" />
        <Record titulo="Más reanimaciones" lista={lb.records.reanimaciones} clave="reanimaciones" />
      </div>
    </section>
  );
}

function agrupar(lista, clave, claves) {
  const out = Object.fromEntries(claves.map((k) => [k, []]));
  for (const e of lista) {
    const k = clave(e);
    if (!out[k]) out[k] = [];
    out[k].push(e);
  }
  return out;
}

function Tabla({ entradas, sinClase, sinArq }) {
  return (
    <table className="tabla ranking">
      <thead>
        <tr>
          <th>#</th><th>Jugador</th><th>Ronda</th>{!sinClase && <th>Clase</th>}{!sinArq && <th>Arquetipo</th>}<th>Mítica</th><th>Nivel</th><th>Bajas</th><th>Daño</th><th>Caídas</th><th>Partida</th>
        </tr>
      </thead>
      <tbody>
        {entradas.map((e, i) => (
          <tr key={`${e.partida}-${e.nombre}`} className={i === 0 ? "primero" : ""}>
            <td>{i + 1}</td>
            <td className="nombre">{e.nombre}</td>
            <td><Ronda n={e.ronda} /></td>
            {!sinClase && <td><Clase id={e.clase} /></td>}
            {!sinArq && <td><Arquetipo id={e.arquetipo} /></td>}
            <td><Mitica id={e.mitica} /></td>
            <td>{e.nivel}</td>
            <td><Numero n={e.bajas} /></td>
            <td><Numero n={e.danio_total} /></td>
            <td>{e.caidas}</td>
            <td><EnlacePartida id={e.partida}>{fecha(e.fecha)} ({e.jugadores_n}j)</EnlacePartida></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Record({ titulo, lista, clave }) {
  return (
    <div className="record">
      <h3>{titulo}</h3>
      <ol>
        {lista.map((e) => (
          <li key={`${e.partida}-${e.nombre}`}>
            <b>{e.nombre}</b> <Numero n={e[clave]} /> <span className="mini-dato">R{e.ronda}</span> <EnlacePartida id={e.partida}>ver</EnlacePartida>
          </li>
        ))}
      </ol>
    </div>
  );
}
