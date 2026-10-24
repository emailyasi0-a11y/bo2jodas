import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api.js";
import { Arquetipo, Barra, Cargando, Clase, Mitica, Numero, Ronda } from "../componentes.jsx";
import { RAREZAS, carta, colorArquetipo, duracion, fecha, fmt, nombreArma, nombreBebida, nombreCarta, nombreMapa, nombreArquetipo } from "../nombres.js";

const JEFES = { brutus: "Brutus", bruja: "Bruja", leroy: "Leroy" };

export default function Partida() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api(`/runs/${id}`).then(setP).catch((e) => setError(e.message));
  }, [id]);

  if (!p) return <Cargando error={error} />;

  const aparecidos = Object.entries(p.jefes_aparecidos || {});
  const muertos = p.jefes_muertos || {};

  return (
    <section className="detalle">
      <header className="detalle-cabecera">
        <Ronda n={p.ronda} grande />
        <div>
          <h1>{nombreMapa(p.mapa, p.sitio)}</h1>
          <p className="partida-fecha">
            {fecha(p.fecha)} · {duracion(p.duracion_s)} · {p.jugadores.length} {p.jugadores.length === 1 ? "jugador" : "jugadores"} · mod {p.version}
            {p.subido_por ? ` · subida por ${p.subido_por}` : ""}
          </p>
          <p className="partida-extra">
            {aparecidos.length === 0
              ? "Sin jefes."
              : "Jefes: " + aparecidos.map(([t, n]) => `${JEFES[t] || t} ${muertos[t] || 0}/${n}`).join(" · ")}
            {p.baston_construidos ? ` · Bastón construido ×${p.baston_construidos}` : ""}
            {p.baston_forjados ? ` · forjado ×${p.baston_forjados}` : ""}
          </p>
        </div>
      </header>
      {p.jugadores.map((j) => (
        <Jugador key={j.nombre} j={j} />
      ))}
    </section>
  );
}

function Jugador({ j }) {
  const danioCartas = Object.entries(j.danio_cartas || {}).sort((a, b) => b[1] - a[1]);
  const maxDanio = danioCartas.length ? danioCartas[0][1] : 0;
  const danioArmas = Object.entries(j.danio_armas || {}).sort((a, b) => b[1] - a[1]);
  const bajasArmas = j.bajas_armas || {};
  const cartas = [...(j.cartas || [])].sort((a, b) => (a.arquetipo || "").localeCompare(b.arquetipo || "") || a.nombre.localeCompare(b.nombre));
  const jefes = Object.entries(j.jefes_matados || {});

  return (
    <article className="tarjeta jugador">
      <header className="jugador-cabecera">
        <h2>{j.nombre}</h2>
        <Clase id={j.clase} />
        <Arquetipo id={j.arquetipo} />
        <Mitica id={j.mitica} />
        <span className="nivel">nivel {j.nivel}</span>
      </header>

      <div className="datos">
        <Dato n={j.bajas} t="bajas" />
        <Dato n={j.cabezas} t="a la cabeza" />
        <Dato n={j.danio_total} t="daño total" />
        <Dato n={j.caidas} t="caídas" />
        <Dato n={j.reanimaciones} t="reanimaciones" />
        <Dato n={j.max_combo} t="combo máx." />
        <Dato n={j.puntos_total} t="puntos ganados" />
        <Dato n={j.rerolls_usados} t="rerolls" />
        <Dato n={j.bloqueos_usados} t="bloqueos" />
        <Dato n={j.saltos} t="cartas saltadas" />
        {j.bebidas_bruja ? <Dato n={j.bebidas_bruja} t="bebidas de la Bruja" /> : null}
        {jefes.map(([t, n]) => (
          <Dato key={t} n={n} t={`${JEFES[t] || t} rematados`} />
        ))}
      </div>

      <h3>Build final ({cartas.length} cartas)</h3>
      <ul className="cartas">
        {cartas.map((c) => (
          <li key={c.id} className="carta" style={{ "--c": colorArquetipo(c.arquetipo) }}>
            <span className="carta-nombre">{c.nombre}</span>
            <span className="carta-valor">
              {c.tipo === "equipo" ? `nivel ${c.valor}` : valorCarta(c)}
              {c.veces > 1 ? ` · ×${c.veces}` : ""}
            </span>
            <span className="carta-arq">{c.arquetipo ? nombreArquetipo(c.arquetipo) : "general"}</span>
          </li>
        ))}
        {cartas.length === 0 && <li className="vacio">Sin cartas.</li>}
      </ul>

      <h3>Daño por carta</h3>
      <p className="nota">
        Cada disparo se reparte entre el arma y las cartas según lo que cada una puso en el multiplicador; el fuego, los rayos, los leapers y demás efectos
        cuentan por su carta. Total: {fmt(j.danio_total)}.
      </p>
      <div className="barras">
        {danioCartas.map(([id, d]) => (
          <div className="fila-barra" key={id}>
            <span className="fila-nombre" style={{ "--c": colorArquetipo(carta(id).arquetipo) }}>{nombreCarta(id)}</span>
            <Barra valor={d} max={maxDanio} color={colorArquetipo(carta(id).arquetipo)} texto={`${fmt(d)} (${pct(d, j.danio_total)})`} />
          </div>
        ))}
        {danioCartas.length === 0 && <p className="vacio">Sin daño registrado.</p>}
      </div>

      <div className="dos-columnas">
        <div>
          <h3>Armas</h3>
          <table className="tabla">
            <thead>
              <tr><th>Arma</th><th>Daño</th><th>Bajas</th></tr>
            </thead>
            <tbody>
              {danioArmas.map(([a, d]) => (
                <tr key={a}><td>{nombreArma(a)}</td><td><Numero n={d} /></td><td>{bajasArmas[a] || 0}</td></tr>
              ))}
              {Object.keys(bajasArmas).filter((a) => !(j.danio_armas || {})[a]).map((a) => (
                <tr key={a}><td>{nombreArma(a)}</td><td>—</td><td>{bajasArmas[a]}</td></tr>
              ))}
            </tbody>
          </table>
          {j.bebidas && j.bebidas.length > 0 && (
            <>
              <h3>Bebidas al acabar</h3>
              <p>{j.bebidas.map(nombreBebida).join(" · ")}</p>
            </>
          )}
        </div>
        <div>
          <h3>Cartas por orden</h3>
          <ol className="historial">
            {(j.historial || []).map((h, i) => (
              <li key={i}>
                <span className="hist-ronda">R{h.ronda}</span>
                <span className="hist-rareza" style={{ color: RAREZAS[h.rareza] || "#ccc" }}>{h.rareza.toLowerCase()}</span>
                <span className="hist-nombre" style={{ "--c": colorArquetipo(carta(h.id).arquetipo) }}>{nombreCarta(h.id)}</span>
                {h.valor ? <span className="hist-valor">+{h.valor}</span> : null}
              </li>
            ))}
          </ol>
          {j.cartas_perdidas && j.cartas_perdidas.length > 0 && (
            <>
              <h3>Cartas perdidas</h3>
              <ul className="perdidas">
                {j.cartas_perdidas.map((c, i) => (
                  <li key={i}>
                    R{c.ronda}: {nombreCarta(c.id)} <span className="motivo">({c.motivo === "leroy" ? "robada por Leroy" : "al caer"})</span>
                  </li>
                ))}
              </ul>
              {j.recuperadas ? <p className="nota">Recuperadas de Leroy: {j.recuperadas}</p> : null}
            </>
          )}
        </div>
      </div>
    </article>
  );
}

function Dato({ n, t }) {
  return (
    <div className="dato">
      <div className="dato-n">{fmt(n)}</div>
      <div className="dato-t">{t}</div>
    </div>
  );
}

function pct(parte, total) {
  if (!total) return "0 %";
  return `${Math.round((100 * parte) / total)} %`;
}

function valorCarta(c) {
  const def = carta(c.id);
  if (def.firma || def.tope === 1) return "";
  const v = def.decimal === 2 ? (c.valor / 100).toFixed(2) : def.decimal === 1 ? (c.valor / 10).toFixed(1) : String(c.valor);
  return `${def.prefijo || ""}${v}${def.sufijo || ""}`;
}
