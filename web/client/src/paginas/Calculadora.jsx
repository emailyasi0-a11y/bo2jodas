import { useMemo, useState } from "react";
import {
  DATOS, CARTAS, RAREZAS, vidaPorRonda, vidaDeSerie, zombiesPorRonda, enemigos, simularArma, probEscopeta,
  efectos, baston, BASTON, explosivo, goo, modDeArma, firmaActiva, esFranco,
} from "../calc/motor.js";
import { ARQUETIPOS, fmt } from "../nombres.js";

const CFG = DATOS.cfg;
const ZONAS = [
  ["cabeza", "Cabeza"], ["cuello", "Cuello"], ["pecho", "Pecho"], ["tripa", "Tripa"], ["brazo", "Brazo"], ["pierna", "Pierna"],
];
const CLASES = DATOS.clases;
const ARQ = Object.fromEntries(DATOS.arquetipos.map((a) => [a.id, a]));
// Cartas que se pueden tener en la build (las de equipo, power-up e instantaneas no se guardan).
const CARTAS_BUILD = DATOS.cartas.filter((c) => c.tipo === "normal");
const GRUPOS_CARTAS = [
  { id: "", nombre: "Generales" },
  ...DATOS.arquetipos.map((a) => ({ id: a.id, nombre: a.nombre })),
].map((g) => ({ ...g, cartas: CARTAS_BUILD.filter((c) => c.arquetipo === g.id) }));
// Cartas que cambian algo de lo que calcula esta pagina.
const DE_DANIO = new Set([
  "danio", "cadencia", "explosivo", "melee", "cabeza", "adrenalina", "punteria", "ultimas", "cazatanques", "combo", "critico",
  "furia", "ultimo", "pulso", "tambor", "plomo", "sangrefria", "madrugador", "interes", "plutocrata", "mecha", "unabala", "elites",
  "coloso", "fosforo", "napalm", "pirotecnico", "pararrayos", "cadena", "sobrecarga", "condensador", "tormenta", "tesla", "espinas",
  "ciclon", "silbato", "manada", "collar", "alfa",
]);
const ARMAS = DATOS.armas.flatMap((g) => g.armas.map((a) => ({ ...a, grupo: g.nombre })));
const ARMA = Object.fromEntries(ARMAS.flatMap((a) => [[a.id, a], ...(a.mejorada ? [[a.mejorada.id, { ...a.mejorada, grupo: a.grupo }]] : [])]));
const NOMBRE_SUMANDO = { clase: "Clase", ultimo: "Último aliento" };

function valorTxt(c, v) {
  let s = String(v);
  if (c.decimal === 2) s = `${Math.trunc(v / 100)}.${String(v % 100).padStart(2, "0")}`;
  else if (c.decimal === 1) s = `${Math.trunc(v / 10)}.${v % 10}`;
  return `${c.prefijo}${s}${c.sufijo}`;
}
const pct = (a, b) => (b > 0 ? `${((100 * a) / b).toFixed(a / b >= 0.1 ? 0 : 1)} %` : "");
const n = (x) => (Number.isFinite(x) ? fmt(x) : "nunca");
const colorArq = (id) => (id ? ARQUETIPOS[id]?.color : "#9a9aa6");

function Campo({ etiqueta, children, ayuda }) {
  return (
    <label className="calc-campo" title={ayuda}>
      <span>{etiqueta}</span>
      {children}
    </label>
  );
}

function Numero({ valor, set, min = 0, max = 999999, paso = 1 }) {
  return (
    <input type="number" value={valor} min={min} max={max} step={paso}
      onChange={(e) => set(Math.max(min, Math.min(max, Number(e.target.value) || 0)))} />
  );
}

function Check({ etiqueta, valor, set, ayuda }) {
  return (
    <label className="calc-check" title={ayuda}>
      <input type="checkbox" checked={valor} onChange={(e) => set(e.target.checked)} /> {etiqueta}
    </label>
  );
}

// ------------------------------------------------------------------ ronda
function SeccionRonda({ ronda, setRonda, jugadores, setJugadores }) {
  const en = enemigos(ronda);
  const zs = zombiesPorRonda(ronda, jugadores);
  const zh = en[0].vida;
  const serie = vidaDeSerie(ronda);
  const cercanas = [ronda - 2, ronda - 1, ronda, ronda + 1, ronda + 2].filter((r) => r >= 1);
  return (
    <section className="tarjeta">
      <h2 style={{ marginTop: 0 }}>Ronda</h2>
      <div className="calc-fila">
        <Campo etiqueta="Ronda"><Numero valor={ronda} set={setRonda} min={1} max={255} /></Campo>
        <Campo etiqueta="Jugadores"><Numero valor={jugadores} set={setJugadores} min={1} max={8} /></Campo>
      </div>
      <div className="datos">
        {en.map((e) => (
          <div className="dato" key={e.id} title={e.nota}>
            <div className="dato-n">{fmt(e.vida)}</div>
            <div className="dato-t">Vida {e.nombre}{e.jefe ? ` · tope por golpe ${fmt(Math.trunc(e.vida * 0.15))}` : ""}</div>
          </div>
        ))}
        <div className="dato"><div className="dato-n">{fmt(zs.total)}</div><div className="dato-t">Zombies en la ronda ({fmt(zs.sinMod)} sin el mod)</div></div>
        <div className="dato"><div className="dato-n">{Math.round(CFG.max_zombies)}</div><div className="dato-t">Vivos a la vez como mucho</div></div>
      </div>
      <p className="nota">
        Vida del zombie: {fmt(zh)} con el mod y {fmt(serie)} en el juego normal ({(zh / serie).toFixed(2)} veces más). Ronda 1 = {CFG.vida_base}; hasta la 9 suma{" "}
        {CFG.vida_ronda} por ronda; desde la 10 se multiplica por {(1 + CFG.vida_mult).toFixed(2)} y se trunca. Con más de 4 jugadores, cada uno extra suma un{" "}
        {Math.round(CFG.zombies_extra_jugador * 100)} % de zombies (y el mod ya multiplica por {CFG.zombies_mult}).
      </p>
      <ul className="calc-lista">
        <li>
          <b>Tanques</b> desde la ronda {CFG.tanque_ronda}: todos los zombies que salen andando y un {CFG.tanque_pct} % de los demás. Vida ×{CFG.tanque_vida}, golpe ×{CFG.tanque_danio}.
        </li>
        <li>
          <b>Super sprinters</b> desde la ronda {CFG.super_ronda}: un {CFG.super_pct} % de los rápidos, como mucho {CFG.super_max} vivos. Misma vida que un zombie.
        </li>
        <li>
          <b>Jefe</b> cada {CFG.jefe_minutos} minutos desde la ronda {CFG.jefe_ronda} (Brutus, Bruja o Leroy), con {CFG.jefe_escoltas} tanques de escolta. Ningún golpe le quita más del 15 % de su vida.
        </li>
        <li>
          <b>Sliquifier</b>: el goo hace {fmt(goo())} (la vida de la ronda 100): mata a cualquier zombie o tanque; al jefe, el 15 % por golpe.
        </li>
      </ul>
      <table className="tabla calc-tabla">
        <thead><tr><th>Ronda</th><th>Zombie</th><th>Tanque</th><th>Brutus</th><th>Bruja</th><th>Leroy</th><th>Zombies ({jugadores} j.)</th></tr></thead>
        <tbody>
          {cercanas.map((r) => {
            const e = enemigos(r);
            return (
              <tr key={r} className={r === ronda ? "primero" : ""}>
                <td>{r}</td>
                {e.map((x) => <td key={x.id} className="num">{fmt(x.vida)}</td>)}
                <td className="num">{fmt(zombiesPorRonda(r, jugadores).total)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

// ------------------------------------------------------------------ build
function FilaCarta({ c, valor, setValor, quitar, build }) {
  const firma = c.firma;
  const activa = !firma || firmaActiva(build, c.id);
  return (
    <li className="calc-carta" style={{ "--c": colorArq(c.arquetipo) }}>
      <div className="calc-carta-cab">
        <span className="carta-nombre">{c.nombre}</span>
        <span className="carta-arq">{c.arquetipo ? ARQ[c.arquetipo]?.nombre : "General"}{firma ? " · firma" : ""}</span>
        <button type="button" className="calc-x" onClick={quitar} title="Quitar">×</button>
      </div>
      <div className="nota">{c.desc}</div>
      {firma ? (
        <div className={activa ? "estado" : "error"}>
          {activa ? "Activa" : `Inactiva: necesita ${c.requiere.map((r) => CARTAS[r]?.nombre || r).join(" y ")}`}
        </div>
      ) : (
        <div className="calc-carta-valor">
          <Numero valor={valor} set={setValor} min={0} max={c.tope} />
          <span className="nota">{valorTxt(c, valor)} · tope {valorTxt(c, c.tope)}</span>
          <div className="calc-rarezas">
            {c.valores.map((x, i) => (
              <button type="button" key={i} title={`Sumar una ${RAREZAS[i]} (${valorTxt(c, x)})`} onClick={() => setValor(Math.min(c.tope, valor + x))}>
                +{RAREZAS[i][0]}{i === 1 ? "C" : ""}
              </button>
            ))}
            <button type="button" onClick={() => setValor(c.tope)}>Tope</button>
          </div>
        </div>
      )}
      {!DE_DANIO.has(c.id) && <div className="nota">No cambia nada de lo que calcula esta página.</div>}
    </li>
  );
}

const SIT_INICIAL = {
  apuntando: false, media_vida: false, cargador_bajo: false, pulso: false, rafaga: false, solo: false, madrugador: false,
  ultimo_aliento: false, quieto: false, lejos: true, alfa: false, junto_dt: false, dt_comprado: false,
  racha: 40, plomo: 0, combo: 0, furia: 0, puntos: 0, bebidas: 4,
};

function SeccionBuild({ ronda }) {
  const [clase, setClase] = useState("");
  const [mitica, setMitica] = useState("");
  const [cartas, setCartas] = useState([]); // [{id, valor}]
  const [armaId, setArmaId] = useState("galil_zm");
  const [pap, setPap] = useState(false);
  const [zona, setZona] = useState("cabeza");
  const [distancia, setDistancia] = useState(400);
  const [critico, setCritico] = useState("media");
  const [carga, setCarga] = useState("staff_fire_upgraded_zm");
  const [sit, setSitTodo] = useState(SIT_INICIAL);
  const setSit = (k) => (x) => setSitTodo((s) => ({ ...s, [k]: x }));

  const huecos = Math.round(CFG.max_cartas + (clase === "pistolas" ? CFG.pistolas_huecos : 0));
  const v = Object.fromEntries(cartas.map((c) => [c.id, CARTAS[c.id].firma ? 1 : c.valor]));
  // "Lejos" (mas de 600 u) lo decide la distancia; Una bala basta lo mira.
  const build = { clase, mitica, v, sit: { ...sit, lejos: distancia > 600 } };
  const arquetiposUsados = [...new Set(cartas.map((c) => CARTAS[c.id].arquetipo).filter(Boolean))];

  const base = ARMA[armaId];
  const arma = pap && base.mejorada ? { ...base.mejorada, grupo: base.grupo } : base;
  const esBaston = arma.id.startsWith("staff_fire");
  const idBaston = esBaston ? (arma.id === "staff_fire_zm" ? "staff_fire_zm" : carga) : null;
  const claseArma = arma.grupo === "Pistolas" ? "pistola" : "";
  const op = { zona, distancia, critico, mod: modDeArma(arma, claseArma) };
  const en = enemigos(ronda);

  const resultados = useMemo(() => en.map((e) => {
    if (esBaston) return { e, tipo: "baston", r: baston(idBaston, e, build, op) };
    if (arma.id.startsWith("slipgun")) return { e, tipo: "goo" };
    if (arma.id.startsWith("slowgun")) return { e, tipo: "paralizador" };
    if (arma.tipo === "projectile" || arma.tipo === "grenade") return { e, tipo: "explosivo", r: explosivo(arma, ronda, e, build, op) };
    return { e, tipo: "arma", r: simularArma(arma, e, build, op) };
  }), [JSON.stringify(build), arma.id, idBaston, ronda, zona, distancia, critico]);

  const primero = resultados[0].r?.primero;
  const tablaEfectos = en.map((e) => efectos(ronda, e, build, op));
  const filasEfectos = tablaEfectos[0].map((f, i) => ({ ...f, porEnemigo: tablaEfectos.map((t) => t[i]) }));

  function anadir(id) {
    if (!id || cartas.some((c) => c.id === id)) return;
    const c = CARTAS[id];
    setCartas([...cartas, { id, valor: c.firma ? 1 : c.valores[0] }]);
  }

  return (
    <section className="tarjeta">
      <h2 style={{ marginTop: 0 }}>Simular build</h2>
      <p className="nota">
        Monta la build que quieras y mira cuánto hace cada cosa en la ronda {ronda}. Las fórmulas son las del mod (jodas_danio_saliente y compañía) y el daño de
        las armas sale de sus archivos del juego. Las cosas que dependen del azar (crítico, tiro de suerte de Escopetas) se indican aparte.
      </p>

      <div className="calc-fila">
        <Campo etiqueta="Clase">
          <select value={clase} onChange={(e) => setClase(e.target.value)}>
            <option value="">Ninguna</option>
            {CLASES.map((c) => <option key={c.id} value={c.id}>{c.nombre}: {c.desc}</option>)}
          </select>
        </Campo>
        <Campo etiqueta="Mítica">
          <select value={mitica} onChange={(e) => setMitica(e.target.value)}>
            <option value="">Ninguna</option>
            {DATOS.miticas.map((m) => <option key={m.id} value={m.id}>{m.nombre}: {m.desc}</option>)}
          </select>
        </Campo>
      </div>

      <h3>Arma</h3>
      <div className="calc-fila">
        <Campo etiqueta="Arma">
          <select value={armaId} onChange={(e) => setArmaId(e.target.value)}>
            {DATOS.armas.map((g) => (
              <optgroup key={g.nombre} label={g.nombre}>
                {g.armas.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
              </optgroup>
            ))}
          </select>
        </Campo>
        {base.mejorada && <Check etiqueta={`Pack-a-Punch (${base.mejorada.nombre})`} valor={pap} set={setPap} />}
        {esBaston && arma.id !== "staff_fire_zm" && (
          <Campo etiqueta="Disparo">
            <select value={carga} onChange={(e) => setCarga(e.target.value)}>
              {["staff_fire_upgraded_zm", "staff_fire_upgraded2_zm", "staff_fire_upgraded3_zm"].map((id) => <option key={id} value={id}>{BASTON[id].nombre}</option>)}
            </select>
          </Campo>
        )}
        {(arma.tipo === "bullet" || arma.tipo === "projectile") && (
          <Campo etiqueta="Zona"><select value={zona} onChange={(e) => setZona(e.target.value)}>{ZONAS.map(([id, t]) => <option key={id} value={id}>{t} (×{arma.zonas[id]})</option>)}</select></Campo>
        )}
        {arma.tipo === "bullet" && (
          <Campo etiqueta="Distancia (unidades; 40 ≈ 1 m)" ayuda={`Daño ${arma.danio} hasta ${arma.alcance_max} u, ${arma.danio_min} desde ${arma.alcance_min} u`}>
            <Numero valor={distancia} set={setDistancia} min={0} max={10000} paso={50} />
          </Campo>
        )}
        <Campo etiqueta="Golpe crítico" ayuda="Golpe crítico: ×2.5 con su probabilidad">
          <select value={critico} onChange={(e) => setCritico(e.target.value)}>
            <option value="nunca">No sale</option><option value="media">Media</option><option value="siempre">Sale siempre</option>
          </select>
        </Campo>
      </div>
      {arma.tipo === "bullet" && (
        <p className="nota">
          {arma.nombre}: {arma.danio} de daño hasta {fmt(arma.alcance_max)} u y {arma.danio_min} desde {fmt(arma.alcance_min)} u
          {arma.perdigones > 1 ? `, ${arma.perdigones} perdigones por disparo` : ""}, cargador de {arma.cargador}, un disparo cada {arma.cadencia} s. Cabeza ×{arma.zonas.cabeza}, cuello ×{arma.zonas.cuello}.
        </p>
      )}

      <h3>Situación</h3>
      <div className="calc-situaciones">
        <Check etiqueta="Apuntando con la mira" valor={sit.apuntando} set={setSit("apuntando")} />
        <Check etiqueta="Tu vida por debajo de la mitad" valor={sit.media_vida} set={setSit("media_vida")} />
        <Check etiqueta="Cargador por debajo del 30 %" valor={sit.cargador_bajo} set={setSit("cargador_bajo")} />
        <Check etiqueta="2 s sin disparar antes de cada tiro" valor={sit.pulso} set={setSit("pulso")} />
        <Check etiqueta="Más de 1 s disparando seguido" valor={sit.rafaga} set={setSit("rafaga")} />
        <Check etiqueta="Ningún zombie a menos de 240 u" valor={sit.solo} set={setSit("solo")} />
        <Check etiqueta="Primeros 30 s de la ronda" valor={sit.madrugador} set={setSit("madrugador")} />
        <Check etiqueta="Último aliento activo" valor={sit.ultimo_aliento} set={setSit("ultimo_aliento")} />
        <Check etiqueta="Quieto" valor={sit.quieto} set={setSit("quieto")} />
        <Check etiqueta="Alfa activo (3 s tras una baja)" valor={sit.alfa} set={setSit("alfa")} />
        <Check etiqueta="Junto a la máquina de Double Tap" valor={sit.junto_dt} set={setSit("junto_dt")} ayuda="Ahí la carta quita el Double Tap regalado para que puedas comprarlo" />
        {sit.junto_dt && <Check etiqueta="Double Tap comprado" valor={sit.dt_comprado} set={setSit("dt_comprado")} />}
        {clase === "automaticas" && <Campo etiqueta="Aciertos seguidos antes"><Numero valor={sit.racha} set={setSit("racha")} max={1000} /></Campo>}
        <Campo etiqueta="Balas seguidas sin recargar"><Numero valor={sit.plomo} set={setSit("plomo")} max={1000} /></Campo>
        <Campo etiqueta="Bajas seguidas (combo, máx. 10)"><Numero valor={sit.combo} set={setSit("combo")} max={10} /></Campo>
        <Campo etiqueta="Golpes recibidos en 5 s (máx. 3)"><Numero valor={sit.furia} set={setSit("furia")} max={3} /></Campo>
        <Campo etiqueta="Tus puntos"><Numero valor={sit.puntos} set={setSit("puntos")} paso={1000} /></Campo>
        <Campo etiqueta="Bebidas que llevas"><Numero valor={sit.bebidas} set={setSit("bebidas")} max={12} /></Campo>
      </div>

      <h3>
        Cartas {cartas.filter((c) => CARTAS[c.id].tipo === "normal").length}/{huecos}
      </h3>
      {arquetiposUsados.length > 1 && (
        <p className="error">En partida solo tienes las cartas de un arquetipo (más las generales). Aquí puedes mezclarlas igualmente.</p>
      )}
      <ul className="calc-cartas">
        {cartas.map((x, i) => (
          <FilaCarta key={x.id} c={CARTAS[x.id]} valor={x.valor} build={build}
            setValor={(val) => setCartas(cartas.map((y, j) => (j === i ? { ...y, valor: val } : y)))}
            quitar={() => setCartas(cartas.filter((_, j) => j !== i))} />
        ))}
      </ul>
      {cartas.length < huecos && (
        <select className="calc-anadir" value="" onChange={(e) => anadir(e.target.value)}>
          <option value="">+ Añadir carta…</option>
          {GRUPOS_CARTAS.map((g) => (
            <optgroup key={g.id || "gen"} label={g.nombre}>
              {g.cartas.filter((c) => !cartas.some((x) => x.id === c.id)).map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}{DE_DANIO.has(c.id) ? "" : " (no afecta al daño)"}</option>
              ))}
            </optgroup>
          ))}
        </select>
      )}

      <h2>Resultado en la ronda {ronda}</h2>
      {primero && (
        <div className="tarjeta calc-desglose">
          <b>Primer impacto a un zombie:</b> {fmt(primero.base)} del arma × {primero.mult?.toFixed(3) ?? "1"} = <b>{fmt(primero.recibido)}</b>
          {resultados[0].r.aprox && <span className="nota"> (distancia entre los dos alcances: daño del arma aproximado)</span>}
          <ul className="calc-lista">
            {Object.entries(primero.sumandos).map(([id, p]) => (
              <li key={id}>{NOMBRE_SUMANDO[id] || CARTAS[id]?.nombre || id}: {p > 0 ? "+" : ""}{p} %</li>
            ))}
            {Object.entries(primero.factores).map(([id, f]) => (
              <li key={id}>×{typeof f === "number" ? f.toFixed(2) : f} {id === "critico_media" ? "Golpe crítico (media)" : CARTAS[id]?.nombre || DATOS.miticas.find((m) => m.id === id)?.nombre || id}</li>
            ))}
            {Object.keys(primero.sumandos).length === 0 && Object.keys(primero.factores).length === 0 && <li>Sin cartas que sumen a este golpe.</li>}
          </ul>
          <span className="nota">Todos los % se suman en un único multiplicador; los × se aplican después.</span>
        </div>
      )}

      <div className="calc-enemigos">
        {resultados.map(({ e, tipo, r }) => (
          <div className="calc-enemigo" key={e.id}>
            <div className="calc-enemigo-cab"><b>{e.nombre}</b><span className="nota">{fmt(e.vida)} de vida</span></div>
            {tipo === "arma" && (
              <>
                <div className="dato-n">{n(r.disparos)} <span className="nota">disparos</span></div>
                <div className="nota">
                  {r.perdigones > 1 ? `${n(r.golpes)} perdigones · ` : ""}{r.tiempo.toFixed(2)} s sin recargar
                  {r.cargadores ? ` · ${r.cargadores.toFixed(2)} cargadores` : ""}
                  {r.letalPor === "unabala" ? " · remata Una bala basta" : ""}
                </div>
                <div className="nota">Primer impacto: {fmt(r.primero.recibido)} ({pct(r.primero.recibido, e.vida)})</div>
              </>
            )}
            {tipo === "explosivo" && (
              <>
                <div className="dato-n">{n(r.golpes)} <span className="nota">disparos</span></div>
                {r.partes.map((p) => <div className="nota" key={p.que}>{p.que}: {fmt(p.final)}</div>)}
                {r.extra && <div className="nota">Extra del juego por golpe: {fmt(r.extra.final)} ({r.extraTexto})</div>}
              </>
            )}
            {tipo === "baston" && (
              <>
                <div className="dato-n">{n(r.golpes)} <span className="nota">disparos</span></div>
                <div className="nota">Impacto {fmt(r.imp.final)} + 8 s ardiendo a {fmt(r.seg.final)}/s = {fmt(r.total)}</div>
                {r.remate && <div className="nota">Con el mejorado, un impacto que mataría remata al momento la mitad de las veces.</div>}
              </>
            )}
            {tipo === "goo" && <div className="nota">{e.jefe ? `El goo le quita el 15 % por golpe: ${fmt(Math.trunc(e.vida * 0.15))}.` : "El goo lo mata."}</div>}
            {tipo === "paralizador" && (
              <div className="nota">
                No hace daño hasta que el zombie va a menos del 10 % de velocidad; entonces 40 (60 con PaP) × 0.667 a 1.5 por tic, y cada tic multiplica el
                siguiente por 1.15 (hasta ×50). Los demás golpes a un zombie frenado hacen daño extra.
              </div>
            )}
            {e.jefe && <div className="nota">Tope por golpe: {fmt(Math.trunc(e.vida * 0.15))}</div>}
          </div>
        ))}
      </div>

      {clase === "escopetas" && (arma.tipo === "bullet") && (() => {
        const p = probEscopeta(arma);
        return (
          <p className="nota">
            Tiro de suerte de Escopetas: {Math.round(p.p * 100)} % por {esFranco(arma.id) ? "bala (francotirador)" : "perdigón"}; con {p.n} {p.n === 1 ? "impacto" : "perdigones"} es un{" "}
            {(p.porDisparo * 100).toFixed(1)} % por disparo de matar al momento (al jefe, ese impacto hace ×3). No está contado en los disparos de arriba.
          </p>
        );
      })()}

      {filasEfectos.length > 0 && (
        <>
          <h3>Otras fuentes de daño de tu build</h3>
          <table className="tabla calc-tabla">
            <thead>
              <tr><th>Efecto</th><th>Cuándo</th>{en.map((e) => <th key={e.id}>{e.nombre}</th>)}</tr>
            </thead>
            <tbody>
              {filasEfectos.map((f) => (
                <tr key={f.id}>
                  <td><b>{f.nombre}</b><div className="nota">{f.nota}</div></td>
                  <td className="nota">{f.cuando}</td>
                  {f.porEnemigo.map((x, i) => (
                    <td key={i} className="num">{fmt(x.final)}<div className="nota">{pct(x.final, en[i].vida)}</div></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <details className="tarjeta">
        <summary>Qué no cuenta esta calculadora</summary>
        <ul className="calc-lista">
          <li>Double Tap: aquí solo cuenta el % de Gatillo loco. Lo que haga la bebida dentro del motor del juego (cadencia, balas extra) no está en los scripts y no se cuenta.</li>
          <li>Entre el alcance máximo y el mínimo de un arma, el motor reduce el daño poco a poco; aquí se interpola en línea recta y se marca como aproximado.</li>
          <li>Instakill, Fuego del Bastón con Instakill, el goo encadenado de la Sliquifier y el Paralizador dependen del momento y no se simulan golpe a golpe.</li>
          <li>Las mejoras persistentes del juego (pers_upgrades, como el ×2 a la cabeza de la racha de bajas múltiples) no se cuentan.</li>
        </ul>
      </details>
    </section>
  );
}

export default function Calculadora() {
  const [ronda, setRonda] = useState(20);
  const [jugadores, setJugadores] = useState(4);
  return (
    <section className="calculadora">
      <h1>Calculadora</h1>
      <SeccionRonda ronda={ronda} setRonda={setRonda} jugadores={jugadores} setJugadores={setJugadores} />
      <SeccionBuild ronda={ronda} />
      <p className="nota">{DATOS.fuente}. Vida en la ronda 1: {fmt(vidaPorRonda(1))}.</p>
    </section>
  );
}
