import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/global.css'
import App from './App.jsx'
import { ExpensesProvider } from './context/ExpensesContext.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <ExpensesProvider>
        <App />
      </ExpensesProvider>
    </SettingsProvider>
  </StrictMode>,
)
