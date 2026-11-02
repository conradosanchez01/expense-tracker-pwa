import { useState } from 'react';
import '../styles/Settings.css';

/**
 * Pantalla de Configuración (SettingsScreen.jsx)
 * Equivalente a src/screens/SettingsScreen.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #7 (#pwa-s2-us7)
 * Asignado a: Jerónimo
 *
 * Switch de notificaciones (<input type="checkbox" role="switch">),
 * Moneda (ARS) y Versión (1.0.0).
 */
export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <main className="settings-screen">
      <header>
        <h1 className="settings-screen__title">Configuración</h1>
      </header>

      <section className="settings-list" aria-label="Preferencias">
        <div className="settings-row">
          <label className="settings-row__label" htmlFor="notifications-switch">
            Notificaciones
          </label>
          <input
            id="notifications-switch"
            className="switch"
            type="checkbox"
            role="switch"
            checked={notificationsEnabled}
            onChange={(event) => setNotificationsEnabled(event.target.checked)}
          />
        </div>

        <div className="settings-row">
          <span className="settings-row__label">Moneda</span>
          <span className="settings-row__value">ARS</span>
        </div>

        <div className="settings-row">
          <span className="settings-row__label">Versión</span>
          <span className="settings-row__value">1.0.0</span>
        </div>
      </section>
    </main>
  );
}