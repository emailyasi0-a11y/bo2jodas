import { NavLink, Route, Routes } from "react-router-dom";
import Partidas from "./paginas/Partidas.jsx";
import Partida from "./paginas/Partida.jsx";
import Leaderboards from "./paginas/Leaderboards.jsx";
import Subir from "./paginas/Subir.jsx";
import Jugadores from "./paginas/Jugadores.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="cabecera">
        <div className="marca">
          <span className="marca-titulo">bo2jodas</span>
          <span className="marca-sub">partidas y leaderboards</span>
        </div>
        <nav>
          <NavLink to="/" end>Partidas</NavLink>
          <NavLink to="/leaderboards">Leaderboards</NavLink>
          <NavLink to="/jugadores">Jugadores</NavLink>
          <NavLink to="/subir">Subir JSON</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Partidas />} />
          <Route path="/partida/:id" element={<Partida />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/jugadores" element={<Jugadores />} />
          <Route path="/subir" element={<Subir />} />
        </Routes>
      </main>
      <footer>Los datos los escribe el mod al acabar cada partida (bo2jodas_stats.gsc) y los sube el anfitrión.</footer>
    </div>
  );
}
