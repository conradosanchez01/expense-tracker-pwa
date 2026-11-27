/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { readJSON, writeJSON } from '../utils/storage';

/**
 * Contexto global de preferencias de la aplicación (SettingsContext.jsx)
 * Corresponde a: User Story #1 (#per-s3-us1) — Sprint 3
 * Asignado a: Conrado
 *
 * Equivalente a ExpenseTracker/src/context/SettingsContext.js. Centraliza los
 * ajustes locales (Notificaciones y Modo oscuro) y sincroniza el atributo
 * data-theme en :root para aplicar los tokens CSS de modo claro/oscuro.
 *
 * US #4 (#pwa-s3-us4) — Manuel / Jerónimo: ambos switches se persisten en
 * localStorage bajo @expensetracker/settings (tolerante a JSON corrupto).
 */
export const SETTINGS_STORAGE_KEY = '@expensetracker/settings';

export const DEFAULT_SETTINGS = {
  notifications: true,
  darkMode: false,
};

const SettingsContext = createContext(null);

// Mezcla lo guardado con los valores por defecto y fuerza booleanos válidos.
const loadStoredSettings = () => {
  const stored = readJSON(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);
  const safe = stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {};
  return {
    notifications:
      typeof safe.notifications === 'boolean' ? safe.notifications : DEFAULT_SETTINGS.notifications,
    darkMode: typeof safe.darkMode === 'boolean' ? safe.darkMode : DEFAULT_SETTINGS.darkMode,
  };
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadStoredSettings);
  const [isSettingsLoaded] = useState(true);

  // useLayoutEffect: el tema se aplica antes del primer pintado (sin destello claro).
  useLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = settings.darkMode ? 'dark' : 'light';
    }
  }, [settings.darkMode]);

  // Cada cambio de ajustes se guarda en localStorage.
  useLayoutEffect(() => {
    writeJSON(SETTINGS_STORAGE_KEY, settings);
  }, [settings]);

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
