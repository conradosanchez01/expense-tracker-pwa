# PERSISTENCIA — ExpenseTracker PWA (Sprint 3)

App web (React + Vite + vite-plugin-pwa) desplegada en Vercel. Persistencia en dos capas:

| Dato | Dónde se guarda | Clave / colección |
| :--- | :--- | :--- |
| Ajustes (Notificaciones, Modo oscuro) | `localStorage` (US #4) | `@expensetracker/settings` |
| Gastos | Cloud Firestore con caché persistente en IndexedDB (US #5) | colección `expenses` |

La US #4 dejó los gastos también en `localStorage`; en la US #5 la fuente de verdad pasó a Firestore
(`onSnapshot` + `addDoc` + `deleteDoc`) y los ajustes siguen en `localStorage`.

## Decisiones técnicas

- **localStorage con `try/catch`** (`src/utils/storage.js`): si el JSON está corrupto, la clave no existe o
  el almacenamiento está bloqueado, se usa el valor por defecto y la app no se rompe. Además cada gasto
  leído se valida antes de usarse.
- **Lectura síncrona al iniciar** (inicializador perezoso de `useState`): los ajustes están disponibles en el
  primer render y el tema oscuro se aplica con `useLayoutEffect` antes del primer pintado (sin destello claro).
- **Modo oscuro visual**: `SettingsContext` pone `data-theme="dark"` en `:root` y `global.css` redefine las
  variables CSS (`--color-bg`, `--color-surface`, etc.). Los colores fijos que quedaban en `NewExpenseModal.css`,
  `MainLayout.css` y `expenses.css` pasaron a variables.
- **Firestore con `persistentLocalCache({})`** (`src/services/firebase.js`): caché en IndexedDB.
- **Optimistic UI**: `addDoc` y `deleteDoc` no se esperan con `await`; Firestore actualiza el listener local al
  instante (compensación de latencia) y `serverTimestamp()` se estima localmente hasta que el servidor confirma.
- **Deep links `/expenses/:id`**: hasta el primer `onSnapshot` se muestra "Cargando gasto…" (`isLoaded`) en vez de
  "Gasto no encontrado". `vercel.json` (rewrites) y `navigateFallback` del Service Worker resuelven la ruta al recargar.

## Pruebas offline (Chrome DevTools → Network → Offline, y PWA instalada)

> Completar la columna "Resultado observado" y adjuntar las capturas en `docs/persistencia/`.

| # | Prueba | Pasos | Resultado esperado en la PWA | Captura |
| :-: | :--- | :--- | :--- | :--- |
| 1 | Persistencia con red | Cargar un gasto online, recargar la página (F5) | El gasto sigue ahí (viene de Firestore/caché) | `docs/persistencia/prueba-1.png` |
| 2 | Alta sin conexión | Activar Offline, cargar un gasto | Aparece al instante en la lista (Optimistic UI); el modal cierra sin esperar | `docs/persistencia/prueba-2.png` |
| 3 | Cierre/recarga sin conexión | Con el gasto pendiente, seguir Offline y recargar la página o cerrar y reabrir la PWA instalada | **El gasto sigue visible** (caché persistente en IndexedDB) | `docs/persistencia/prueba-3.png` |
| 4 | Reconexión | Desactivar Offline | El gasto se sincroniza con Firestore y aparece en la app React Native | `docs/persistencia/prueba-4.png` |

Además: abrir `/expenses/<id>` directamente y recargar — debe mostrar el detalle (o "Cargando gasto…" un instante).

## Comparativa React Native vs PWA

| Aspecto | React Native (Expo Go) | PWA (React + Vite) |
| :--- | :--- | :--- |
| Almacenamiento local de ajustes | `AsyncStorage` (asíncrono, requiere bandera `isLoaded`) | `localStorage` (síncrono) |
| Hidratación al iniciar | Asíncrona: `ActivityIndicator` hasta tener los datos | Síncrona: sin pantalla de carga para ajustes |
| Inicialización de Firestore | `getFirestore(app)` — caché solo en memoria | `initializeFirestore(app, { localCache: persistentLocalCache({}) })` — IndexedDB |
| Gasto creado offline y app cerrada (Prueba 3) | **Se pierde** | **Se conserva** y se sube al reconectar |
| Modo oscuro | Paleta `LIGHT_THEME`/`DARK_THEME` aplicada con `useSettings()` | Variables CSS con `[data-theme="dark"]` |
| Estados de carga | Gate global en `App.js` | `isLoaded` en cada pantalla |

## Por qué la Prueba 3 da distinto en cada plataforma

Cuando se crea un gasto sin conexión, Firestore lo guarda como **escritura pendiente** y lo sube al reconectar. En la
PWA esa escritura vive en la caché persistente de IndexedDB (`persistentLocalCache`), que sobrevive a recargas y al
cierre de la app: al volver a abrirla sigue ahí y se sincroniza apenas hay red. En React Native el SDK web de Firebase
no dispone de IndexedDB, así que usa caché en memoria: si la app se cierra mientras el gasto está pendiente, la
escritura se pierde junto con el proceso.

## Variables de entorno

`.env` (no se sube) a partir de `.env.example`, con las claves `VITE_FIREBASE_*`. En Vercel se cargan en
Settings → Environment Variables y hay que **volver a desplegar** para que tomen efecto.
