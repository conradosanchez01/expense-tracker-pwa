import { useSettings } from '../context/SettingsContext';
import '../styles/Settings.css';

/**
 * Pantalla de Configuración (SettingsScreen.jsx)
 * Equivalente a src/screens/SettingsScreen.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2), User Story #7 (#pwa-s2-us7) y User Story #4 Sprint 3 (#pwa-s3-us4)
 * Asignado a: Jerónimo / Manuel
 *
 * Dos interruptores (<input type="checkbox" role="switch">): Notificaciones y
 * Modo oscuro. Ambos viven en SettingsContext, que los persiste en
 * localStorage (@expensetracker/settings) y aplica [data-theme="dark"] en :root.
 */
export default function SettingsScreen() {
  const { notifications, darkMode, setNotifications, setDarkMode } = useSettings();

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
            checked={notifications}
            onChange={(event) => setNotifications(event.target.checked)}
          />
        </div>

        <div className="settings-row">
          <label className="settings-row__label" htmlFor="dark-mode-switch">
            Modo oscuro
          </label>
          <input
            id="dark-mode-switch"
            className="switch"
            type="checkbox"
            role="switch"
            checked={darkMode}
            onChange={(event) => setDarkMode(event.target.checked)}
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
