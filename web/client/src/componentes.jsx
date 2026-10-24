import { Link } from "react-router-dom";
import { colorArquetipo, colorClase, nombreArquetipo, nombreClase, nombreMitica, fmt } from "./nombres.js";

export function Cargando({ error }) {
  if (error) return <p className="error">Error: {error}</p>;
  return <p className="cargando">Cargando…</p>;
}

export function Etiqueta({ texto, color, titulo }) {
  return (
    <span className="etiqueta" style={{ "--c": color }} title={titulo}>
      {texto}
    </span>
  );
}

export function Clase({ id }) {
  return <Etiqueta texto={nombreClase(id)} color={colorClase(id)} titulo="Clase" />;
}

export function Arquetipo({ id }) {
  if (!id) return <Etiqueta texto="Sin arquetipo" color="#5a5a66" />;
  return <Etiqueta texto={nombreArquetipo(id)} color={colorArquetipo(id)} titulo="Arquetipo" />;
}

export function Mitica({ id }) {
  if (!id) return null;
  return <Etiqueta texto={nombreMitica(id)} color="#ff2626" titulo="Mítica" />;
}

export function Ronda({ n, grande }) {
  return <span className={grande ? "ronda ronda-grande" : "ronda"}>R{n}</span>;
}

export function Barra({ valor, max, color, texto }) {
  const pct = max > 0 ? Math.max(2, (100 * valor) / max) : 0;
  return (
    <div className="barra" title={texto}>
      <div className="barra-relleno" style={{ width: `${pct}%`, background: color }} />
      <span className="barra-texto">{texto}</span>
    </div>
  );
}

export function EnlacePartida({ id, children }) {
  return <Link to={`/partida/${id}`}>{children}</Link>;
}

export function Numero({ n }) {
  return <span className="num">{fmt(n)}</span>;
}
