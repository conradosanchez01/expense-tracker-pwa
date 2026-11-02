/**
 * Custom Hook para gestionar la instalación de la PWA (usePWAInstall)
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #3 (#pwa-s2-us3)
 * Asignado a: Conrado
 */
export function usePWAInstall() {
  return {
    isInstallable: false,
    isIOS: false,
    isStandalone: false,
    promptInstall: async () => {},
  };
}

export default usePWAInstall;
