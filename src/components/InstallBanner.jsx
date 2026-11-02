import usePWAInstall from '../hooks/usePWAInstall';
import '../styles/InstallBanner.css';

/**
 * Componente de Banner de Instalación de la PWA (InstallBanner.jsx)
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #3 (#pwa-s2-us3)
 * Asignado a: Conrado
 */
export default function InstallBanner() {
  const { isInstallable, showIOSInstructions, isStandalone, promptInstall, dismissBanner } =
    usePWAInstall();

  if (isStandalone) {
    return null;
  }

  if (isInstallable) {
    return (
      <aside className="install-banner" role="region" aria-label="Instalar aplicación">
        <div className="install-banner__content">
          <p className="install-banner__title">Instalá ExpenseTracker</p>
          <p className="install-banner__text">
            Accedé más rápido desde tu pantalla de inicio y usala sin conexión.
          </p>
        </div>
        <div className="install-banner__actions">
          <button type="button" className="install-banner__button" onClick={promptInstall}>
            Instalar App
          </button>
          <button
            type="button"
            className="install-banner__close"
            onClick={dismissBanner}
            aria-label="Cerrar aviso de instalación"
          >
            ✕
          </button>
        </div>
      </aside>
    );
  }

  if (showIOSInstructions) {
    return (
      <aside
        className="install-banner install-banner--ios"
        role="region"
        aria-label="Instrucciones de instalación en iOS"
      >
        <div className="install-banner__content">
          <p className="install-banner__title">Instalá ExpenseTracker en tu iPhone</p>
          <p className="install-banner__text">
            Tocá el botón <strong>Compartir</strong> en Safari y seleccioná{' '}
            <strong>&quot;Agregar a inicio&quot;</strong>.
          </p>
        </div>
        <button
          type="button"
          className="install-banner__close"
          onClick={dismissBanner}
          aria-label="Cerrar instrucciones de instalación"
        >
          ✕
        </button>
      </aside>
    );
  }

  return null;
}
