import InstallBanner from './components/InstallBanner'
import AppRouter from './router/AppRouter'

/**
 * Componente Raíz (App.jsx)
 * Corresponde a: User Story #1 (#pwa-s2-us1) y User Story #7 (#pwa-s2-us7)
 */
function App() {
  return (
    <>
      <InstallBanner />
      <AppRouter />
    </>
  )
}

export default App
