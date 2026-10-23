# bo2jodas


**Versión actual: 1.6.0**

---

## Instalar

1. Ve a [Releases](../../releases) y descarga el zip de la última versión.
2. Descomprímelo y copia la carpeta `zm_bo2jodas` dentro de `%localappdata%\Plutonium\storage\t6\mods\` (crea `mods` si no existe). Si ya tenías una versión anterior, sustitúyela entera.
3. En el juego: **Zombies → Mods → bo2jodas**. El juego se reinicia con el mod cargado.

Todos los jugadores de la partida necesitan **la misma versión** instalada. Cuando salga una nueva, repetid la instalación.

---

## Notas de versión

### 1.6.0
- **La caja ya no da armas: da cartas.** Gira igual, pero sale una carta al azar (misma tabla de rarezas, 5 % de mítica) que se aplica directamente. Precio **por jugador**: 2500 la primera tirada y ×1.17 cada tirada tuya (2500, 2925, 3422, 4004...). Cada uno ve su precio en el texto de la caja. Sin osito: la caja no se mueve.
- **Super sprinters**: desde la ronda 3, un 20 % de los zombies rápidos salen en super sprint acelerado, más veloces que un jugador corriendo, con un tope de 6 vivos a la vez.
- **Nivel en el marcador**: al pulsar Tab (Select en mando), la columna Headshots muestra el nivel de cartas de cada jugador.
- El texto de la caja dice "random CARD".

### 1.5.0
- **Bastón de fuego** (Origins): cada jefe suelta una pieza; con 3 se construye en la mesa que hay junto al Juggernog.
- **Brutus corre un 25 % más** que un zombie normal.
- **Experiencia** sube a 10 / 15 / 22 / 30 / 45 % (antes casi no se notaba).
- La lista de cartas ya no pinta el valor en amarillo (se confundía con legendaria).
- El símbolo `%` es configurable (`jodas_pct`), porque la fuente del juego lo dibuja como un punto.

### 1.4.0
- **Jefe**: Brutus cada 10 minutos, con barra de vida, habilidades y recompensa.
- **Leaper amaestrado**: nueva carta mítica, un leaper que te sigue y muerde zombies (hasta 3).
- Bomberman también recibe el doble de daño de las explosiones.
- Comando de pruebas para forzar una mítica concreta.

### 1.3.0
- **Míticas**: una por jugador; si coges otra, sustituye a la tuya. Cada mítica tiene dueño: al primero que la coge, a los demás ya no les sale.
- **Nerfeo ~20 %** de todas las cartas normales.
- Zombies con un poco más de vida por ronda.
- **Pack-a-Punch bloqueado**: solo se mejora con cartas. Nueva carta épica **Pack-a-Punch**.
- Gatillo loco y Manos rápidas ya no impiden comprar Double Tap y Speed Cola.
- Ira de Zeus: el rayo desaparece a los 1.5 s.
- La lista de cartas muestra cuántas veces has cogido cada una (`x3`).

### 1.2.0
- **Ventaja y desventaja** para cada clase.
- Cartas de **equipo** (monos, claymores, semtex, EMP) y de **power-up** para todo el equipo.
- Carta **Trébol** (suerte) y 8 cartas normales nuevas.
- Primera carta a las 15 bajas. Las míticas salen menos y las cartas que coges salen un poco más.
- Con carta pendiente, los zombies te ignoran hasta que elijas.

### 1.1.0
- Menús compatibles con mando. Lista de cartas en pantalla.

### 1.0.0
- Clases, arma de ronda, tanques, caos y cartas con 5 rarezas.

---

## Clases

Al empezar eliges clase (los zombies no salen hasta que todos eligen). Al **empezar cada ronda**, el arma que llevas **en la mano** se cambia por otra al azar de tu clase; la del otro hueco no se toca. Cada ronda hay un **8 %** de que salga el arma especial (sube con la carta Afortunado).

| Clase | Armas | Especial | Ventaja | Desventaja |
|---|---|---|---|---|
| **Escopetas** | Remington 870, Olympia, S12, M1216, KSG, DSR 50, Barrett M82A1, SVU-AS, Ballista | Blundergat | 15 % de que un tiro mate de golpe | −15 % de velocidad |
| **Automáticas** | Galil, AK74u (y cargador ampliado), MP5K, PDW-57, MTAR, AN-94, SCAR-H, M27, AK-47, STG-44, Thompson, MP40 (y Stalker), Uzi, Skorpion EVO, HAMR, RPD, LSAT, MG08/15 | Sliquifier | +1 % de daño por cada tiro seguido que aciertas (se pierde al fallar) | 10 % de que un tiro gaste 2 balas |
| **Rifles** | M14, FAL, SMR, M16, Type 25, M8A1, Chicom CQB | Paralizador | **Ejecutor**: +30 % a zombies con menos de media vida | −10 % a zombies con la vida entera |
| **Pistolas** | M1911, Five-seven (y dual), B23R (y cargador ampliado), KAP-45, Python, Executioner, Remington New Model Army, Mauser C96, Cuchillo balístico | Ray Gun o Ray Gun Mark II | ×1.3 de velocidad y −50 % de daño explosivo recibido | Ninguna |

- Las paredes funcionan normal. **La caja da cartas, no armas** (ver abajo). **El Pack-a-Punch no se puede usar pagando**: las armas solo se mejoran con cartas.
- El Bastón de fuego nunca se cambia por el arma de ronda.

---

## Cartas

Subes de nivel matando: el primer nivel a las **15 bajas** y cada nivel cuesta 5 más (15, 35, 60, 90, 125...). Al subir eliges **1 de 3 cartas**. Desde que subes de nivel hasta que eliges, los zombies te ignoran; con el menú abierto eres invulnerable (15 s para elegir).

**Rarezas**: cada carta del menú tira su rareza por separado.

| Común | Poco común | Rara | Épica | Legendaria |
|---|---|---|---|---|
| 50 % | 28 % | 14 % | 6 % | 2 % |

- Las cartas se **acumulan** hasta su tope.
- Cada vez que coges una carta, su probabilidad de volver a salir sube un 8 %.
- **Trébol** sube la rareza de las cartas que te salen.

### Cartas normales

Valores por rareza: común / poco común / rara / épica / legendaria.

| Carta | Efecto | Valores | Tope |
|---|---|---|---|
| Piernas ligeras | +% velocidad | 3 / 5 / 7 / 10 / 16 % | 80 % |
| Muelles | Saltas más alto y sin daño por caída | 50 / 70 / 105 / 145 / 210 | 700 |
| Calibre | +% daño con todo | 5 / 7 / 10 / 14 / 22 % | 300 % |
| Gatillo loco | Double Tap gratis + % daño (×2 si además compras Double Tap) | 2 / 4 / 6 / 10 / 14 % | 150 % |
| Cargador mágico | % de no gastar bala | 4 / 6 / 10 / 14 / 20 % | 60 % |
| Manos rápidas | Speed Cola gratis + % de rellenar el cargador al matar (×2 con Speed Cola) | 2 / 4 / 6 / 10 / 14 % | 60 % |
| Mochila | Balas a la reserva por baja | 1 / 2 / 3 / 4 / 6 | 40 |
| Corazón de hierro | +vida máxima | 8 / 12 / 20 / 32 / 48 | 400 |
| Regeneración | +vida por segundo | 1 / 1 / 2 / 3 / 5 | 25 |
| Vampiro | +vida por baja | 2 / 3 / 4 / 6 / 10 | 60 |
| Blindaje | −% daño de zombies | 3 / 5 / 7 / 10 / 14 % | 60 % |
| Pólvora | +% daño explosivo | 8 / 12 / 20 / 32 / 48 % | 400 % |
| Ojo de halcón | +% daño a la cabeza | 8 / 12 / 20 / 32 / 48 % | 400 % |
| Golpe crítico | % de golpe ×2.5 | 2 / 4 / 6 / 10 / 14 % | 60 % |
| Nudillos de hierro | +% daño cuerpo a cuerpo | 40 / 65 / 95 / 145 / 240 % | 3000 % |
| Codicia | +puntos por baja | 4 / 8 / 12 / 20 / 32 | 300 |
| Reacción en cadena | % de que el zombie explote al morir | 3 / 5 / 7 / 10 / 16 % | 60 % |
| Imán | Atrae power-ups en este radio | 250 / 360 / 520 / 720 / 1040 | 5000 |
| Buscador de botín | % de power-up por baja | 0.2 / 0.4 / 0.6 / 1.0 / 1.6 % | 10 % |
| Segundo aliento | % de evitar un golpe mortal (quedas a media vida) | 8 / 12 / 18 / 24 / 36 % | 90 % |
| Escurridizo | Segundos que te ignoran tras un golpe | 0.4 / 0.6 / 1.0 / 1.3 / 1.8 s | 6 s |
| Suerte del Pack | % de que el arma de ronda venga mejorada | 4 / 6 / 10 / 14 / 20 % | 100 % |
| Granadero | % de recuperar granada al matar | 2 / 4 / 6 / 10 / 14 % | 60 % |
| Espinas | El zombie que te pega pierde este % de su vida | 12 / 20 / 32 / 48 / 72 % | 500 % |
| Afortunado | +% de arma especial de tu clase | 2 / 4 / 6 / 10 / 14 % | 70 % |
| Trébol | Suerte: sube la rareza de las cartas | 2 / 4 / 6 / 10 / 14 % | 60 % |
| Sed de sangre | +% velocidad 3 s tras cada baja | 4 / 6 / 10 / 13 / 18 % | 60 % |
| Adrenalina | +% daño con menos de media vida | 6 / 10 / 14 / 20 / 32 % | 200 % |
| Puntería | +% daño apuntando con la mira | 4 / 6 / 10 / 14 / 20 % | 100 % |
| Últimas balas | +% daño con el cargador por debajo del 30 % | 8 / 12 / 18 / 24 / 36 % | 200 % |
| Cazatanques | +% daño a tanques | 12 / 20 / 32 / 48 / 72 % | 400 % |
| Experiencia | Cada baja cuenta +% para subir de nivel | 10 / 15 / 22 / 30 / 45 % | 150 % |
| Combo | +% daño por cada baja seguida (2 s entre bajas, máx. 10) | 1 / 2 / 2 / 3 / 5 % | 20 % |
| Cabezas de oro | +puntos por baja a la cabeza | 8 / 12 / 20 / 32 / 48 | 400 |

### Cartas especiales

| Carta | Rareza | Efecto |
|---|---|---|
| Monos, Claymores, Semtex, Granadas EMP | Rara | Te da el equipo lleno y cada ronda recuperas 1 por nivel de la carta (máx. 3). |
| Munición máxima, Instakill, Doble puntos, Carpintero, Nuke | Común | Power-up inmediato para todo el equipo. |
| Pack-a-Punch | Épica | Mejora el arma de la mano (si ya lo está, la otra; si las dos, munición máxima). Única forma de mejorar un arma de caja o de pared. |

### Caja misteriosa

La caja gira como siempre, pero da **una carta** al azar (misma tabla de rarezas y 5 % de mítica, con las mismas reglas de dueño), aplicada directamente. Cada jugador tiene **su precio**: 2500 la primera vez y ×1.17 por cada tirada suya. Si no te llega, se cierra sin cobrar. No se mueve.

### Míticas

**5 %** de que una de las 3 cartas sea mítica. Llevas **una sola**: si coges otra, sustituye a la tuya. La primera persona que coge una mítica es su dueña y a los demás ya no les sale.

| Mítica | Efecto |
|---|---|
| **Bomberman** | Arma de ronda siempre un explosivo mejorado (RPG, War Machine, Mustang & Sally, Ray Gun). 45 % de no gastar munición, explosivos ×1.5. **Contra**: recibes ×2 de zombies y de explosiones (sin Jugg, un pepinazo cerca te tumba). |
| **Fénix** | Una vez por ronda, un golpe mortal no te tumba: renaces con la vida llena y explotas. |
| **Cuerpo de cristal** | Tu daño ×3. **Contra**: recibes ×1.75. |
| **Ira de Zeus** | Cada baja tiene un 30 % de lanzar un rayo que mata a 3 zombies cercanos. |
| **Rey Midas** | +100 puntos por baja y un power-up cada 20 bajas. |
| **Gatillo infinito** | Nunca gastas balas. **Contra**: el arma de la mano cambia también cada 45 s. |
| **Leaper amaestrado** | Un leaper te sigue y muerde a los zombies que se acercan (1000 de daño o un tercio de la vida del zombie, lo que sea más). Es la única que se repite: cada vez suma un leaper, hasta 3 (a los lados y en triángulo). Nadie lo puede matar. |

---

## Jefe: Brutus

Cada **10 minutos** (el primero en el minuto 10) el siguiente zombie que sale es el jefe, con el cuerpo de Brutus. Solo uno a la vez, con barra de vida arriba.

| | |
|---|---|
| Vida | 20 veces la de un zombie de la ronda |
| Golpe | 150 (sin Juggernog te tumba de un toque) |
| Velocidad | 25 % más rápido que un zombie normal |
| Inmune a | Instakill (le quita 5 % por impacto), Nuke, Ira de Zeus y Fénix (15 %), el tiro de suerte de Escopetas (hace ×3) |
| Escolta | Los 4 zombies siguientes salen como tanques |

**Habilidades**
1. **Rugido** (cada 15 s): los zombies cercanos esprintan 8 s.
2. **Pisotón**: al golpear a alguien, los jugadores cerca salen despedidos y pierden 20 de vida.
3. **Fases**: a media vida corre; a un cuarto esprinta y arde.
4. **Furia**: si pasa 20 s sin recibir daño, esprinta 10 s.

**Al morir**: dos power-ups, una **carta gratis** para cada jugador en pie y una **pieza del Bastón de fuego**.

---

## Bastón de fuego

- Cada jefe suelta una pieza (punta, caña o base) donde muere. Se recoge pasando por encima; las piezas son del equipo.
- Con **3 piezas**, ve a la **mesa de taller junto al Juggernog** y pulsa USAR (F / X).
- Cada disparo lanza 3 bolas de fuego en abanico. El zombie alcanzado recibe 2050 de daño y arde 8 s (75 por segundo), sin poder golpear y andando despacio.
- 90 disparos. La Munición máxima lo rellena. Se pueden construir más con más piezas.

---

## Otras reglas

- **Super sprinters**: desde la ronda 3, un 20 % de los zombies rápidos van en super sprint acelerado (más rápidos que tú corriendo), máximo 6 a la vez.
- **Tanques**: desde la ronda 3, los zombies que salen andando tienen ×4 de vida y golpe ×2 (120). Un 10 % de los rápidos se convierte en tanque.
- **Caos**: hasta 31 zombies vivos a la vez (24 de serie), salen cada 0.5 s como mucho, rondas ×1.5.
- **Vida de zombies**: +115 por ronda hasta la 9 y ×1.11 desde la 10 (algo más que de serie).

## Controles de los menús

| | Teclado | Mando |
|---|---|---|
| Mover | Apuntar / Disparar (o A / D) | LT / RT |
| Elegir | F o cuchillo | X (Cuadrado) o cuchillo |

---

## Consola (para probar)

Se escriben en la consola antes de entrar o antes de `map_restart`.

| Comando | Qué hace |
|---|---|
| `set jodas_cartas_base 5` | Primera carta a las 5 bajas. |
| `set jodas_mitica_pct 100` | Siempre sale una mítica. |
| `set jodas_mitica_forzar leaper` | La mítica que sale es esa (`bomberman`, `fenix`, `cristal`, `zeus`, `midas`, `infinito`, `leaper`). |
| `set jodas_jefe_minutos 1` | Jefe cada minuto. |
| `set jodas_baston_piezas 1` | Bastón con una sola pieza. |
| `set jodas_sprint 1` | Todos los zombies corren (2 = super sprint). |
| `set jodas_caja_cartas 0` | Caja original (armas). |
| `set jodas_super_pct 0` | Sin super sprinters. |
| `set jodas_off 1` | Desactiva el mod. |

---

## Problemas conocidos

- El símbolo `%` sale como un punto en pantalla (la fuente del juego no lo tiene). Se puede cambiar con `set jodas_pct pct`.
- Las armas de otros mapas usan el camuflaje de Pack-a-Punch de su mapa de origen.
- El zombie que arde con el bastón anda en vez de tambalearse (Pueblo no tiene esas animaciones).
