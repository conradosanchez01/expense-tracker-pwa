import { useState, useEffect, useCallback } from 'react';

/**
 * Custom Hook para gestionar la instalación de la PWA (usePWAInstall)
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #3 (#pwa-s2-us3)
 * Asignado a: Conrado
 */
export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkStandalone = () => {
      const iosStandalone = window.navigator.standalone === true;
      const displayModeStandalone = window.matchMedia('(display-mode: standalone)').matches;
      setIsStandalone(iosStandalone || displayModeStandalone);
    };

    const userAgent = window.navigator.userAgent || '';
    const isAppleMobile =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
    setIsIOS(isAppleMobile && !window.MSStream);

    checkStandalone();

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      return true;
    }
    return false;
  }, [deferredPrompt]);

  const dismissBanner = useCallback(() => {
    setIsDismissed(true);
  }, []);
  return {
    isInstallable: Boolean(deferredPrompt) && !isStandalone && !isDismissed,
    isIOS,
    isStandalone,
    showIOSInstructions: isIOS && !isStandalone && !isDismissed,
    promptInstall,
    dismissBanner,
  };
}

export default usePWAInstall;
