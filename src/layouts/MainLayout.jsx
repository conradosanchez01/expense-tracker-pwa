import { NavLink, Outlet } from 'react-router-dom';
import '../styles/MainLayout.css';

/**
 * Layout Principal con Barra de Navegación Inferior (MainLayout.jsx)
 * Equivalente a src/navigation/TabNavigator.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #7 (#pwa-s2-us7)
 * Asignado a: Jerónimo
 *
 * Layout persistente: el contenido cambia con <Outlet /> y la Bottom Navigation
 * Bar queda fija abajo. La pestaña activa se resalta con <NavLink>.
 */
const TABS = [
  { to: '/', label: 'Inicio', icon: '🏠', end: true },
  { to: '/expenses', label: 'Gastos', icon: '💸', end: false },
  { to: '/settings', label: 'Ajustes', icon: '⚙️', end: false },
];

export default function MainLayout() {
  return (
    <div className="main-layout">
      <div className="main-layout__content">
        <Outlet />
      </div>

      <nav className="bottom-nav" aria-label="Navegación principal">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              isActive ? 'bottom-nav__link bottom-nav__link--active' : 'bottom-nav__link'
            }
          >
            <span className="bottom-nav__icon" aria-hidden="true">
              {tab.icon}
            </span>
            <span className="bottom-nav__label">{tab.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
