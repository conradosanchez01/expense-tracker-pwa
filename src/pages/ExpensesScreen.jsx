import { useState } from 'react';
import NewExpenseModal from '../components/NewExpenseModal';
import MOCK_EXPENSES, { formatAmount } from '../data/mockExpenses';

/**
 * Pantalla de Listado de Gastos (ExpensesScreen.jsx)
 * Equivalente a src/screens/ExpensesScreen.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2), User Story #5 (#main-s2-us5) y User Story #6 (#main-s2-us6)
 * Asignado a: Manuel / Benjamín (apertura de NewExpenseModal)
 */
export default function ExpensesScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'calc(16px + env(safe-area-inset-top, 0px)) 16px 12px 16px',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '24px' }}>Mis Gastos</h1>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          style={{
            minHeight: '44px',
            padding: '8px 16px',
            backgroundColor: 'var(--color-primary, #10B981)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          + Nuevo
        </button>
      </header>
      <ul>
        {MOCK_EXPENSES.map((item) => (
          <li key={item.id}>
            {item.description} — {formatAmount(item.amount)} ({item.category})
          </li>
        ))}
      </ul>

      <NewExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
