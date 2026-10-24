import { NavLink, Route, Routes } from "react-router-dom";
import Partidas from "./paginas/Partidas.jsx";
import Partida from "./paginas/Partida.jsx";
import Leaderboards from "./paginas/Leaderboards.jsx";
import Subir from "./paginas/Subir.jsx";
import Jugadores from "./paginas/Jugadores.jsx";
import Entrar from "./paginas/Entrar.jsx";
import Perfil from "./paginas/Perfil.jsx";
import Calculadora from "./paginas/Calculadora.jsx";
import { ProveedorSesion, useSesion } from "./sesion.jsx";

function Cabecera() {
  const { yo } = useSesion();
  return (
    <header className="cabecera">
      <div className="marca">
        <span className="marca-titulo">bo2jodas</span>
        <span className="marca-sub">partidas y leaderboards</span>
      </div>
      <nav>
        <NavLink to="/" end>Partidas</NavLink>
        <NavLink to="/leaderboards">Leaderboards</NavLink>
        <NavLink to="/jugadores">Jugadores</NavLink>
        <NavLink to="/calculadora">Calculadora</NavLink>
        <NavLink to="/subir">Subir JSON</NavLink>
        {yo ? (
          <NavLink to="/perfil" className="nav-usuario">
            {yo.usuario}
          </NavLink>
        ) : (
          <NavLink to="/entrar" className="nav-usuario">
            Entrar
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <ProveedorSesion>
      <div className="app">
        <Cabecera />
        <main>
          <Routes>
            <Route path="/" element={<Partidas />} />
            <Route path="/partida/:id" element={<Partida />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/jugadores" element={<Jugadores />} />
            <Route path="/subir" element={<Subir />} />
            <Route path="/entrar" element={<Entrar />} />
            <Route path="/registro" element={<Entrar registro />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/calculadora" element={<Calculadora />} />
          </Routes>
        </main>
        <footer>Los datos los escribe el mod al acabar cada partida (bo2jodas_stats.gsc) y los sube el anfitrión.</footer>
      </div>
    </ProveedorSesion>
  );
}
