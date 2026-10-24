import { useEffect, useState } from "react";
import { api } from "../api.js";
import { Cargando, Numero } from "../componentes.jsx";
import { colorArquetipo, nombreArquetipo, nombreClase } from "../nombres.js";

export default function Jugadores() {
  const [t, setT] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api("/stats").then(setT).catch((e) => setError(e.message));
  }, []);

  if (!t) return <Cargando error={error} />;

  return (
    <section>
      <h1>Jugadores</h1>
      <p className="nota">{t.partidas} partidas registradas.</p>
      <table className="tabla">
        <thead>
          <tr><th>Jugador</th><th>Partidas</th><th>Mejor ronda</th><th>Bajas</th><th>Daño</th><th>Caídas</th><th>Reanimaciones</th><th>Clases</th><th>Arquetipos</th></tr>
        </thead>
        <tbody>
          {t.jugadores.map((j) => (
            <tr key={j.nombre}>
              <td className="nombre">{j.nombre}</td>
              <td>{j.partidas}</td>
              <td>R{j.mejorRonda}</td>
              <td><Numero n={j.bajas} /></td>
              <td><Numero n={j.danio_total} /></td>
              <td>{j.caidas}</td>
              <td>{j.reanimaciones}</td>
              <td>{Object.entries(j.clases).map(([c, n]) => `${nombreClase(c)} ×${n}`).join(", ")}</td>
              <td>{Object.entries(j.arquetipos).map(([a, n]) => `${nombreArquetipo(a)} ×${n}`).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Cartas más usadas</h2>
      <table className="tabla">
        <thead>
          <tr><th>Carta</th><th>Arquetipo</th><th>Partidas en las que aparece</th><th>Veces cogida</th><th>Daño acumulado</th></tr>
        </thead>
        <tbody>
          {t.cartas.map((c) => (
            <tr key={c.id}>
              <td style={{ color: colorArquetipo(c.arquetipo) }}>{c.nombre}</td>
              <td>{c.arquetipo ? nombreArquetipo(c.arquetipo) : "general"}</td>
              <td>{c.partidas}</td>
              <td>{c.veces}</td>
              <td><Numero n={c.danio} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
