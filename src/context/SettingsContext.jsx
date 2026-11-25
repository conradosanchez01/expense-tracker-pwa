/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Contexto global de preferencias de la aplicación (SettingsContext.jsx)
 * Corresponde a: User Story #1 (#per-s3-us1) — Sprint 3
 * Asignado a: Conrado
 *
 * Equivalente a ExpenseTracker/src/context/SettingsContext.js. Centraliza los
 * ajustes locales (Notificaciones y Modo oscuro) y sincroniza el atributo
 * data-theme en :root para aplicar los tokens CSS de modo claro/oscuro.
 */
export const SETTINGS_STORAGE_KEY = '@expensetracker/settings';

export const DEFAULT_SETTINGS = {
  notifications: true,
  darkMode: false,
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isSettingsLoaded] = useState(true);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = settings.darkMode ? 'dark' : 'light';
    }
  }, [settings.darkMode]);

  const setNotifications = useCallback((value) => {
    setSettings((prev) => ({
      ...prev,
      notifications: Boolean(value),
    }));
  }, []);

  const setDarkMode = useCallback((value) => {
    setSettings((prev) => ({
      ...prev,
      darkMode: Boolean(value),
    }));
  }, []);

  const toggleNotifications = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      notifications: !prev.notifications,
    }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  }, []);

  const value = useMemo(
    () => ({
      settings,
      notifications: settings.notifications,
      darkMode: settings.darkMode,
      isSettingsLoaded,
      setNotifications,
      setDarkMode,
      toggleNotifications,
      toggleDarkMode,
    }),
    [
      settings,
      isSettingsLoaded,
      setNotifications,
      setDarkMode,
      toggleNotifications,
      toggleDarkMode,
    ]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings debe usarse dentro de un SettingsProvider');
  }
  return context;
}

export default SettingsContext;
