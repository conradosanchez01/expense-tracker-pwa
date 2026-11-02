import { useState } from 'react';
import MOCK_EXPENSES from '../data/mockExpenses';
import ExpenseCard from '../components/ExpenseCard';
import NewExpenseModal from '../components/NewExpenseModal';
import '../styles/Expenses.css';


export default function ExpensesScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      {MOCK_EXPENSES.length === 0 ? (
        <p className="expenses-empty">Todavía no registraste ningún gasto.</p>
      ) : (
        <ul className="expenses-list">
          {MOCK_EXPENSES.map((expense) => (
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
