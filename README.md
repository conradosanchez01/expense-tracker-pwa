# 💰 ExpenseTracker PWA — Proyecto Integrador (Sprint 2)

Progressive Web App (PWA) para el registro y control de gastos personales desarrollada con **React**, **Vite** y **React Router** para la materia **Programación III (2026)**, migrando la experiencia de la versión móvil del Sprint 1 ([ExpenseTracker React Native](https://github.com/conradosanchez01/ExpenseTracker)).

---

## 👥 Integrantes del Equipo y Asignación de Ramas (Sprint 2)

| Integrante | User Stories Asignadas | Rama(s) Git (`branch`) | Archivos principales a trabajar |
| :--- | :--- | :--- | :--- |
| **Conrado** | **US #1, US #2 y US #3** — Proyecto Vite, Estructura, Datos Mock, Manifest, Íconos, Hook y Banner de Instalación | `pwa-s2-us1`<br>`pwa-s2-us2`<br>`pwa-s2-us3` | `package.json`, `index.html`, `public/manifest.json`, `public/icons/*`, `src/data/mockExpenses.js`, `src/hooks/usePWAInstall.js`, `src/components/InstallBanner.jsx` |
| **Benjamín** | **US #4 y US #5** — Pantalla de Bienvenida y Formulario Modal de Carga de Gastos | `main-s2-us4`<br>`main-s2-us5` | `src/pages/HomeScreen.jsx`, `src/components/NewExpenseModal.jsx` |
| **Manuel** | **US #6** — Listado de Gastos, Tarjeta, Badge y Detalle con URL Dinámica | `main-s2-us6` | `src/pages/ExpensesScreen.jsx`, `src/pages/ExpenseDetailScreen.jsx`, `src/components/ExpenseCard.jsx`, `src/components/CategoryBadge.jsx` |
| **Jerónimo** | **US #7 y US #8** — Navegación App-Like, Ajustes, Service Worker Offline y Publicación HTTPS | `pwa-s2-us7`<br>`pwa-s2-us8` | `src/router/AppRouter.jsx`, `src/layouts/MainLayout.jsx`, `src/pages/SettingsScreen.jsx`, `vite.config.js` |

---

## 🚀 Cómo levantar el proyecto en cada PC

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/conradosanchez01/expense-tracker-pwa.git
   cd expense-tracker-pwa
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Cambiar a tu rama asignada antes de programar:**
   - **Conrado:** `git checkout pwa-s2-us1` / `pwa-s2-us2` / `pwa-s2-us3`
   - **Benjamín:** `git checkout -b main-s2-us4` / `git checkout -b main-s2-us5`
   - **Manuel:** `git checkout -b main-s2-us6`
   - **Jerónimo:** `git checkout -b pwa-s2-us7` / `git checkout -b pwa-s2-us8`

4. **Iniciar el servidor de desarrollo con Vite:**
   ```bash
   npm run dev
   ```
   *(Para abrirla desde el navegador del teléfono en la misma red Wi-Fi: `npm run dev -- --host`).*
