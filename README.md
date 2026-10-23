# bo2jodas

**Versión actual: 1.7.0** · Black Ops II Zombies · Plutonium T6 · Pueblo (funciona en el resto de mapas)

---

## Instalar

1. Ve a [Releases](../../releases) y descarga el zip de la última versión.
2. Descomprímelo y copia la carpeta `zm_bo2jodas` dentro de `%localappdata%\Plutonium\storage\t6\mods\` (crea `mods` si no existe). Si ya tenías una versión anterior, **sustitúyela entera**.
3. En el juego: **Zombies → Mods → bo2jodas**. El juego se reinicia con el mod cargado.
4. **Una sola vez**, en la consola, asigna la tecla de la lista de cartas: `bind h +actionslot 2` (la H o la que quieras).

Todos los jugadores de la partida necesitan **la misma versión**.

---

## Novedades de la 1.7.0

### Nuevo

| | |
|---|---|
| **10 huecos de carta** | Cada jugador puede tener 10 cartas distintas, más la mítica. Con los 10 llenos solo te salen las que ya tienes (para subirlas) y las de efecto inmediato. |
| **Rerolls** | 3 por partida. En el menú de cartas, **Granada** cambia las 3 cartas. |
| **Bloquear** | En el menú de cartas, **Táctica** bloquea la carta marcada para que no te vuelva a salir. Gasta esa subida de nivel. |
| **Penalización al caer** | Si te tumban, antes de que puedan reanimarte eliges una carta que pierdes (entre 3 al azar de las tuyas). Pierdes ese tipo entero. |
| **Lista de cartas con tecla** | Ya no está siempre en pantalla: la H (o tu tecla) la muestra y la oculta. Arriba pone tus huecos y rerolls. |

### Balance

**Clases**

| Clase | Antes | Ahora |
|---|---|---|
| **Escopetas** | 15 % de matar de un tiro por bala · −15 % de velocidad | 15 % por perdigón con escopeta y **35 % por bala con francotirador** · **−10 %** de velocidad |
| **Automáticas** | +1 % de daño por tiro seguido, **sin tope** · 10 % de gastar 2 balas | **+0.5 %** por tiro seguido, **tope +20 %** · **15 %** de gastar 2 balas |
| **Pistolas** | ×1.3 velocidad · −50 % daño explosivo | Lo mismo **+40 % de daño** con balas |
| **Rifles** | Sin cambios | |

**Cartas**

| Carta | Antes | Ahora |
|---|---|---|
| **Mochila** | 1 / 2 / 3 / 4 / 6 balas por baja | **3 / 5 / 8 / 12 / 20 balas por minuto** (tope 40 = una cada 1.5 s) |
| **Manos rápidas** | 2 / 4 / 6 / 10 / 14 % · tope 60 % | **0.05 / 0.3 / 1 / 2.5 / 4.5 %** · tope 4.5 % |

**Jefe**

| | Antes | Ahora |
|---|---|---|
| Vida | 20 zombies de la ronda | **70** zombies de la ronda (×3.5) |
| Movimiento | Andaba → corría a media vida → esprintaba a un cuarto | **Corre desde que sale** → esprinta a media vida → **super sprint** a un cuarto |
| Furia | Esprintaba 10 s | **Super sprint** 10 s |
| Daño por golpe | Sin límite | **Máximo 15 %** de su vida por golpe (Sliquifier y Paralizador con Instakill lo mataban de una) |

### Arreglos

- **Bastón de fuego + Gatillo infinito**: el bastón no gastaba balas nunca. Ahora ninguna carta le da ni le devuelve balas.
- **Postura con el bastón**: el jugador se veía con las manos a la espalda. Ya sujeta el bastón normal.
- **Fogonazo del bastón**: el efecto al disparar no aparecía.
- **Partida rota a las ~488 cartas**: el juego no libera los textos que se escriben en pantalla y se llenaba. Ahora el mod apenas crea textos nuevos.
- **La caja te cambiaba la mítica** sin preguntar. Ahora te da una carta normal en su lugar. Si no hay ninguna carta que puedas recibir, te devuelve los puntos.
- **Pieza del bastón inalcanzable** (en la lava o fuera del mapa): a los 60 s aparece sobre la mesa.
- No se pueden lanzar granadas con un menú de cartas abierto.

<details>
<summary><b>Versiones anteriores</b></summary>

#### 1.6.1
- Los menús de clase y de cartas ya no tienen tiempo límite.

#### 1.6.0
- **La caja da cartas en vez de armas**, con precio por jugador (2500 y ×1.17 por tirada).
- **Super sprinters**: hasta 6 zombies más rápidos que tú.
- **Nivel en el marcador**: la columna Headshots del Tab muestra tu nivel.

#### 1.5.0
- **Bastón de fuego** construible con las piezas que suelta Brutus.
- Brutus un 25 % más rápido. Experiencia más fuerte.

#### 1.4.0
- **Jefe Brutus** cada 10 minutos. Mítica **Leaper amaestrado**.
- Bomberman recibe ×2 también de explosiones.

#### 1.3.0
- Una mítica por jugador, con dueño. Nerfeo ~20 % de las cartas normales.
- Pack-a-Punch solo con cartas y nueva carta épica Pack-a-Punch.
- Gatillo loco y Manos rápidas dejan comprar Double Tap y Speed Cola.

#### 1.2.0
- Ventaja y desventaja por clase. Cartas de equipo y de power-up. Trébol y 8 cartas nuevas.

#### 1.1.0
- Menús con mando. Lista de cartas.

#### 1.0.0
- Clases, arma de ronda, tanques, caos y cartas con 5 rarezas.

</details>

---

## Clases

Al empezar eliges clase (los zombies no salen hasta que todos eligen). Al **empezar cada ronda**, el arma que llevas **en la mano** se cambia por otra al azar de tu clase; la del otro hueco no se toca. Cada ronda hay un **8 %** de que salga el arma especial (sube con la carta Afortunado).

| Clase | Armas | Especial | Ventaja | Desventaja |
|---|---|---|---|---|
| **Escopetas** | Remington 870, Olympia, S12, M1216, KSG, DSR 50, Barrett M82A1, SVU-AS, Ballista | Blundergat | 15 % de que un perdigón mate de golpe; 35 % por bala con francotirador | −10 % de velocidad |
| **Automáticas** | Galil, AK74u (y cargador ampliado), MP5K, PDW-57, MTAR, AN-94, SCAR-H, M27, AK-47, STG-44, Thompson, MP40 (y Stalker), Uzi, Skorpion EVO, HAMR, RPD, LSAT, MG08/15 | Sliquifier | +0.5 % de daño por tiro seguido acertado, hasta +20 % (se pierde al fallar) | 15 % de que un tiro gaste 2 balas |
| **Rifles** | M14, FAL, SMR, M16, Type 25, M8A1, Chicom CQB | Paralizador | **Ejecutor**: +30 % a zombies con menos de media vida | −10 % a zombies con la vida entera |
| **Pistolas** | M1911, Five-seven (y dual), B23R (y cargador ampliado), KAP-45, Python, Executioner, Remington New Model Army, Mauser C96, Cuchillo balístico | Ray Gun o Ray Gun Mark II | +40 % de daño, ×1.3 de velocidad, −50 % de daño explosivo recibido | Ninguna |

- Las paredes funcionan normal. **La caja da cartas, no armas**. **El Pack-a-Punch no se puede usar pagando**: las armas solo se mejoran con cartas.
- El Bastón de fuego nunca se cambia por el arma de ronda.

---

## Cartas

Subes de nivel matando: el primer nivel a las **15 bajas** y cada nivel cuesta 5 más (15, 35, 60, 90, 125...). Al subir eliges **1 de 3 cartas**. Desde que subes de nivel hasta que eliges, los zombies te ignoran; con el menú abierto eres invulnerable, sin límite de tiempo.

| Común | Poco común | Rara | Épica | Legendaria |
|---|---|---|---|---|
| 50 % | 28 % | 14 % | 6 % | 2 % |

- Cada carta del menú tira su rareza por separado. Las cartas se **acumulan** hasta su tope.
- Cada vez que coges una carta, su probabilidad de volver a salir sube un 8 %. **Trébol** sube la rareza de las que te salen.
- **10 huecos**: puedes tener 10 cartas distintas (Calibre ×3 ocupa uno). Con los 10 llenos solo salen las que ya tienes y las de efecto inmediato.
- **3 rerolls** por partida (**Granada** en el menú) y **bloqueo** ilimitado (**Táctica**: la carta no vuelve a salirte, pero gastas esa subida).

### Cartas normales

Valores por rareza: común / poco común / rara / épica / legendaria.

| Carta | Efecto | Valores | Tope |
|---|---|---|---|
| Piernas ligeras | +% velocidad | 3 / 5 / 7 / 10 / 16 % | 80 % |
| Muelles | Saltas más alto y sin daño por caída | 50 / 70 / 105 / 145 / 210 | 700 |
| Calibre | +% daño con todo | 5 / 7 / 10 / 14 / 22 % | 300 % |
| Gatillo loco | Double Tap gratis + % daño (×2 si además compras Double Tap) | 2 / 4 / 6 / 10 / 14 % | 150 % |
| Cargador mágico | % de no gastar bala | 4 / 6 / 10 / 14 / 20 % | 60 % |
| Manos rápidas | Speed Cola gratis + % de rellenar el cargador al matar (×2 con Speed Cola) | 0.05 / 0.3 / 1 / 2.5 / 4.5 % | 4.5 % |
| Mochila | Balas de reserva por minuto para el arma de la mano | 3 / 5 / 8 / 12 / 20 | 40 |
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
| Monos, Claymores, Semtex, Granadas EMP | Rara | Te da el equipo lleno y cada ronda recuperas 1 por nivel de la carta (máx. 3). Ocupan hueco. |
| Munición máxima, Instakill, Doble puntos, Carpintero, Nuke | Común | Power-up inmediato para todo el equipo. No ocupan hueco. |
| Pack-a-Punch | Épica | Mejora el arma de la mano (si ya lo está, la otra; si las dos, munición máxima). Única forma de mejorar un arma de caja o de pared. No ocupa hueco. |

### Míticas

**5 %** de que una de las 3 cartas sea mítica. Llevas **una sola** y no ocupa hueco: si coges otra, sustituye a la tuya. La primera persona que coge una mítica es su dueña y a los demás ya no les sale.

| Mítica | Efecto |
|---|---|
| **Bomberman** | Arma de ronda siempre un explosivo mejorado (RPG, War Machine, Mustang & Sally, Ray Gun). 45 % de no gastar munición, explosivos ×1.5. **Contra**: recibes ×2 de zombies y de explosiones (sin Jugg, un pepinazo cerca te tumba). |
| **Fénix** | Una vez por ronda, un golpe mortal no te tumba: renaces con la vida llena y explotas. |
| **Cuerpo de cristal** | Tu daño ×3. **Contra**: recibes ×1.75. |
| **Ira de Zeus** | Cada baja tiene un 30 % de lanzar un rayo que mata a 3 zombies cercanos. |
| **Rey Midas** | +100 puntos por baja y un power-up cada 20 bajas. |
| **Gatillo infinito** | Nunca gastas balas (salvo con el Bastón de fuego). **Contra**: el arma de la mano cambia también cada 45 s. |
| **Leaper amaestrado** | Un leaper te sigue y muerde a los zombies que se acercan (1000 de daño o un tercio de la vida del zombie, lo que sea más). Es la única que se repite: cada vez suma un leaper, hasta 3 (a los lados y en triángulo). Nadie lo puede matar. |

### Caja misteriosa

Gira como siempre, pero da **una carta** al azar (misma tabla de rarezas y 5 % de mítica), aplicada directamente. Respeta tus huecos y bloqueos, y nunca te cambia la mítica que tienes.

| Tirada | 1.ª | 2.ª | 3.ª | 4.ª | 5.ª | 6.ª |
|---|---|---|---|---|---|---|
| Precio | 2500 | 2925 | 3422 | 4004 | 4684 | 5480 |

El precio es **de cada jugador** (×1.17 por cada tirada tuya). Si no te llega, se cierra sin cobrar. No se mueve.

### Penalización al caer

Si te tumban, antes de que puedan reanimarte eliges **una carta que pierdes** entre 3 al azar de las tuyas (normales y de equipo). Pierdes ese tipo **entero**: si tenías Calibre ×3, pierdes las tres y se libera el hueco. Mientras eliges nadie puede reanimarte y no te desangras; en solitario, el Quick Revive espera a que elijas. Las míticas no se pierden.

---

## Jefe: Brutus

Cada **10 minutos** (el primero en el minuto 10) el siguiente zombie que sale es el jefe, con el cuerpo de Brutus. Solo uno a la vez, con barra de vida arriba.

| | |
|---|---|
| Vida | 70 veces la de un zombie de la ronda |
| Golpe | 150 (sin Juggernog te tumba de un toque) |
| Velocidad | Corre desde que sale, un 25 % más rápido que un zombie normal |
| Daño máximo | Ningún golpe le quita más del 15 % de su vida |
| Inmune a | Instakill (le quita 5 % por impacto), Nuke, Ira de Zeus y Fénix (15 %), el tiro de suerte de Escopetas (hace ×3) |
| Escolta | Los 4 zombies siguientes salen como tanques |

**Habilidades**
1. **Rugido** (cada 15 s): los zombies cercanos esprintan 8 s.
2. **Pisotón**: al golpear a alguien, los jugadores cerca salen despedidos y pierden 20 de vida.
3. **Fases**: a media vida esprinta; a un cuarto pasa a super sprint y arde.
4. **Furia**: si pasa 20 s sin recibir daño, super sprint durante 10 s.

**Al morir**: dos power-ups, una **carta gratis** para cada jugador en pie y una **pieza del Bastón de fuego**.

---

## Bastón de fuego

- Cada jefe suelta una pieza (punta, caña o base) donde muere. Se recoge pasando por encima; las piezas son del equipo. Si nadie la coge en 60 s, aparece sobre la mesa.
- Con **3 piezas**, ve a la **mesa de taller junto al Juggernog** y pulsa USAR (F / X).
- Cada disparo lanza 3 bolas de fuego en abanico. El zombie alcanzado recibe 2050 de daño y arde 8 s (75 por segundo), sin poder golpear y andando despacio.
- 90 disparos. Solo lo rellenan la Munición máxima y volver a construirlo: **ninguna carta le da ni le devuelve balas**.

---

## Otras reglas

| | |
|---|---|
| **Caos** | Hasta 31 zombies vivos a la vez (24 de serie), salen cada 0.5 s como mucho, rondas ×1.5. |
| **Tanques** | Desde la ronda 3, los zombies que salen andando tienen ×4 de vida y golpe ×2 (120). Un 10 % de los rápidos se convierte en tanque. |
| **Super sprinters** | Desde la ronda 3, un 20 % de los rápidos van en super sprint acelerado (más rápidos que tú corriendo), máximo 6 a la vez. |
| **Vida de zombies** | +115 por ronda hasta la 9 y ×1.11 desde la 10 (algo más que de serie). |
| **Marcador (Tab)** | La columna Headshots muestra el nivel de cartas de cada jugador. |

---

## Controles

| | Teclado | Mando |
|---|---|---|
| Mover la selección | Apuntar / Disparar (o A / D) | LT / RT |
| Elegir | F o cuchillo | X (Cuadrado) o cuchillo |
| Cambiar las cartas (reroll) | Granada (G) | RB |
| Bloquear la carta marcada | Táctica (Q) | LB |
| Lista de cartas (mostrar / ocultar) | La tecla que asignes con `bind h +actionslot 2` | Cruceta abajo o Select |
| Construir el bastón | USAR (F) en la mesa | X (Cuadrado) en la mesa |

---

## Consola (para probar)

Se escriben en la consola antes de entrar o antes de `map_restart`.

| Comando | Qué hace |
|---|---|
| `set jodas_cartas_base 5` | Primera carta a las 5 bajas (`jodas_cartas_paso 0`: todas a la misma distancia). |
| `set jodas_mitica_pct 100` | Siempre sale una mítica. |
| `set jodas_mitica_forzar leaper` | La mítica que sale es esa (`bomberman`, `fenix`, `cristal`, `zeus`, `midas`, `infinito`, `leaper`). |
| `set jodas_max_cartas 3` | Número de huecos de carta (10 por defecto). |
| `set jodas_rerolls 10` | Rerolls por partida (3 por defecto). |
| `set jodas_caida_penal 0` | Sin penalización al caer. |
| `set jodas_jefe_minutos 1` | Jefe cada minuto. |
| `set jodas_baston_piezas 1` | Bastón con una sola pieza. |
| `set jodas_lista_tecla siempre` | Lista de cartas siempre visible. |
| `set jodas_sprint 1` | Todos los zombies corren (2 = super sprint). |
| `set jodas_caja_cartas 0` | Caja original (armas). |
| `set jodas_super_pct 0` | Sin super sprinters. |
| `set jodas_off 1` | Desactiva el mod. |

---

## Problemas conocidos

- El símbolo `%` sale como un punto en pantalla (la fuente del juego no lo tiene). Se puede cambiar con `set jodas_pct pct`.
- Las armas de otros mapas usan el camuflaje de Pack-a-Punch de su mapa de origen.
- El zombie que arde con el bastón anda en vez de tambalearse (Pueblo no tiene esas animaciones).
- Tab no se puede usar para la lista de cartas: el juego no deja leer esa tecla desde un mod. Por eso va con `bind h +actionslot 2`.
- Si tienes otros scripts en `%localappdata%\Plutonium\storage\t6\raw\scripts\` (por ejemplo B2OP), se cargan junto con el mod y pueden interferir.
