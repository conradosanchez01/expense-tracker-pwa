import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/**
 * Componente Raíz Inicial (App.jsx)
 * Corresponde a: User Story #1 (#pwa-s2-us1)
 * Asignado a: Conrado
 */
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>ExpenseTracker PWA (Vite + React)</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Proyecto inicializado con React, Vite y React Router DOM (US #1).
        </p>
      </div>
    </>
  )
}

export default App
