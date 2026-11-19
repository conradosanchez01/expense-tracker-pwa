import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomeScreen from '../pages/HomeScreen';
import ExpensesScreen from '../pages/ExpensesScreen';
import ExpenseDetailScreen from '../pages/ExpenseDetailScreen';
import SettingsScreen from '../pages/SettingsScreen';

/**
 * Enrutador Raíz de la Aplicación (AppRouter.jsx)
 * Equivalente a src/navigation/StackNavigator.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #7 (#pwa-s2-us7)
 * Asignado a: Jerónimo
 *
 * Rutas mínimas: /, /expenses, /expenses/:id y /settings.
 * Todas cuelgan de MainLayout (layout persistente con la Bottom Navigation Bar),
 * que renderiza la pantalla activa mediante <Outlet />.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/expenses" element={<ExpensesScreen />} />
        <Route path="/expenses/:id" element={<ExpenseDetailScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}