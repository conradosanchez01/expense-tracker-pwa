/**
 * Utilidades de localStorage tolerantes a errores (storage.js)
 * Corresponde a: User Story #4 (#pwa-s3-us4) — Sprint 3
 * Asignado a: Manuel / Jerónimo
 *
 * localStorage puede fallar (modo privado, cuota llena, JSON corrupto editado
 * a mano). Todas las lecturas/escrituras pasan por acá con try/catch para que
 * la app nunca se rompa: si algo sale mal se devuelve el valor por defecto.
 */
export function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[storage] No se pudo leer "${key}" (se usa el valor por defecto):`, error);
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`[storage] No se pudo guardar "${key}":`, error);
    return false;
  }
}
