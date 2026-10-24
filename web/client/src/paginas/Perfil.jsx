import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cambiarContrasena, tokenNuevo } from "../api.js";
import { useSesion } from "../sesion.jsx";

// Perfil: cuenta, como subir partidas, y el token de subida de la cuenta
// (32 caracteres) para quien prefiera el script automatico.
export default function Perfil() {
  const { yo, poner, salir } = useSesion();
  const navegar = useNavigate();
  const { state } = useLocation();
  const [verToken, setVerToken] = useState(false);
  const [aviso, setAviso] = useState("");
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");

  useEffect(() => {
    if (yo === null) navegar("/entrar", { replace: true });
  }, [yo, navegar]);

  if (!yo) return <p className="cargando">Cargando…</p>;

  const origen = window.location.origin;
  const cfg = `# subir_partidas.cfg de ${yo.usuario}\nurl=${origen}\ntoken=${yo.token}\nnombre=${yo.usuario}\n`;
  const urlCfg = `data:text/plain;charset=utf-8,${encodeURIComponent(cfg)}`;

  async function copiar() {
    try {
      await navigator.clipboard.writeText(yo.token);
      setAviso("Token copiado.");
    } catch {
      setVerToken(true);
      setAviso("No se pudo copiar solo: selecciónalo y copia.");
    }
  }

  async function regenerar() {
    if (!window.confirm("El token actual dejará de valer y tendrás que cambiarlo en subir_partidas.cfg. ¿Seguir?")) return;
    try {
      poner(await tokenNuevo());
      setVerToken(true);
      setAviso("Token nuevo generado.");
    } catch (e) {
      setAviso(e.message);
    }
  }

  async function cambiar(e) {
    e.preventDefault();
    try {
      await cambiarContrasena(actual, nueva);
      setActual("");
      setNueva("");
      setAviso("Contraseña cambiada.");
    } catch (err) {
      setAviso(err.message);
    }
  }

  return (
    <section className="perfil">
      <div className="detalle-cabecera">
        <h1>{yo.usuario}</h1>
        <span className="nivel">
          cuenta creada el {new Date(yo.creado).toLocaleDateString("es-ES")} · {yo.subidas} partida{yo.subidas === 1 ? "" : "s"} subida{yo.subidas === 1 ? "" : "s"}
        </span>
        <button type="button" className="boton secundario" onClick={async () => { await salir(); navegar("/"); }}>
          Salir
        </button>
      </div>

      {state?.nuevo && <p className="estado">Cuenta creada. Ya puedes subir partidas.</p>}

      <div className="tarjeta">
        <h2 style={{ marginTop: 0 }}>Subir una partida</h2>
        <p>
          Ve a <Link className="boton" to="/subir">Subir JSON</Link> y arrastra el archivo que deja el mod al acabar la partida (en el PC del anfitrión). Ahí
          está la ruta de la carpeta. Cada uno sube las runs que quiera; las repetidas no se duplican.
        </p>
      </div>

      <details className="tarjeta">
        <summary>Opcional: subida automática con script</summary>
        <p className="nota">
          Si eres anfitrión a menudo, el script <code>subir_partidas.bat</code> de la carpeta <code>web/subidor/</code> del{" "}
          <a href="https://github.com/emailyasi0-a11y/bo2jodas/tree/main/web/subidor" target="_blank" rel="noreferrer">
            repositorio
          </a>{" "}
          vigila esa carpeta y sube cada partida nueva solo. Necesita este token de tu cuenta en <code>subir_partidas.cfg</code>.
        </p>
        <div className="token-fila">
          <code className="token">{verToken ? yo.token : "•".repeat(32)}</code>
          <button type="button" className="boton secundario" onClick={() => setVerToken((v) => !v)}>
            {verToken ? "Ocultar" : "Mostrar"}
          </button>
          <button type="button" className="boton" onClick={copiar}>
            Copiar
          </button>
          <a className="boton secundario" href={urlCfg} download="subir_partidas.cfg">
            Descargar subir_partidas.cfg relleno
          </a>
        </div>
        <p className="nota">
          Es personal: lo que se suba con él aparece como subido por <b>{yo.usuario}</b>. Si se te escapa, genera otro y el viejo deja de valer.
        </p>
        <button type="button" className="boton secundario" onClick={regenerar}>
          Generar un token nuevo
        </button>
      </details>

      <details className="tarjeta">
        <summary>Cambiar la contraseña</summary>
        <form className="formulario" onSubmit={cambiar}>
          <label className="campo">
            Contraseña actual
            <input type="password" value={actual} onChange={(e) => setActual(e.target.value)} autoComplete="current-password" required />
          </label>
          <label className="campo">
            Nueva contraseña
            <input type="password" value={nueva} onChange={(e) => setNueva(e.target.value)} autoComplete="new-password" minLength={6} required />
          </label>
          <button type="submit" className="boton">
            Cambiar
          </button>
        </form>
      </details>
      {aviso && <p className="estado">{aviso}</p>}
    </section>
  );
}
