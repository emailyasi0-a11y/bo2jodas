import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { quienSoy, salir as salirApi } from "./api.js";

// Sesion del usuario (null = no ha entrado, undefined = aun no se sabe).
const Ctx = createContext({ yo: undefined, poner: () => {}, salir: () => {}, recargar: () => {} });

export function ProveedorSesion({ children }) {
  const [yo, setYo] = useState(undefined);

  const recargar = useCallback(async () => {
    try {
      setYo(await quienSoy());
    } catch {
      setYo(null);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  async function salir() {
    await salirApi().catch(() => {});
    setYo(null);
  }

  return <Ctx.Provider value={{ yo, poner: setYo, salir, recargar }}>{children}</Ctx.Provider>;
}

export function useSesion() {
  return useContext(Ctx);
}
