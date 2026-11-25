import { useState } from 'react';
import { useExpenses } from '../context/ExpensesContext';
import ExpenseCard from '../components/ExpenseCard';
import NewExpenseModal from '../components/NewExpenseModal';
import '../styles/expenses.css';

/**
 * Pantalla de Listado de Gastos (ExpensesScreen.jsx)
 * Equivalente a src/screens/ExpensesScreen.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2), User Story #5 (#main-s2-us5) y User Story #6 (#main-s2-us6)
 * Asignado a: Manuel / Benjamín (apertura de NewExpenseModal)
 */
export default function ExpensesScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { expenses } = useExpenses();

  return (
    <main className="expenses-screen">
      <header className="expenses-screen__header">
        <h1 className="expenses-screen__title">Mis Gastos</h1>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => setIsModalOpen(true)}
        >
          + Nuevo
        </button>
      </header>

      {expenses.length === 0 ? (
        <p className="expenses-empty">Todavía no registraste ningún gasto.</p>
      ) : (
        <ul className="expenses-list">
          {expenses.map((expense) => (
            <li key={expense.id}>
              <ExpenseCard expense={expense} />
            </li>
          ))}
        </ul>
      )}

      <NewExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}