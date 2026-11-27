import { useState } from 'react';
import { useExpenses } from '../context/ExpensesContext';
import { formatAmount } from '../data/categories';
import ExpenseCard from '../components/ExpenseCard';
import NewExpenseModal from '../components/NewExpenseModal';
import '../styles/expenses.css';

/**
 * Pantalla de Listado de Gastos (ExpensesScreen.jsx)
 * Equivalente a src/screens/ExpensesScreen.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2), User Story #5 (#main-s2-us5), User Story #6 (#main-s2-us6) y User Story #2 Sprint 3 (#main-s3-us2)
 * Asignado a: Manuel / Benjamín
 */
export default function ExpensesScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { expenses, isLoaded } = useExpenses();

  const totalAmount = expenses.reduce((acc, item) => acc + Number(item.amount || 0), 0);
  const totalMovements = expenses.length;

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

      <section className="expenses-summary" aria-label="Resumen de gastos">
        <div className="expenses-summary__item">
          <span className="expenses-summary__label">Total registrado</span>
          <strong className="expenses-summary__value expenses-summary__value--highlight">
            {formatAmount(totalAmount)}
          </strong>
        </div>
        <div className="expenses-summary__item">
          <span className="expenses-summary__label">Movimientos</span>
          <strong className="expenses-summary__value">{totalMovements}</strong>
        </div>
      </section>

      {!isLoaded ? (
        <p className="expenses-empty" role="status">Cargando gastos…</p>
      ) : expenses.length === 0 ? (
        <div className="expenses-empty-card" role="status">
          <p className="expenses-empty">Todavía no registraste gastos</p>
          <p className="expenses-empty__hint">
            Tocá "+ Nuevo" para registrar tu primer movimiento.
          </p>
        </div>
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