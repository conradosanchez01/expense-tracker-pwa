import MOCK_EXPENSES, { formatAmount } from '../data/mockExpenses';

/**
 * Pantalla de Listado de Gastos (ExpensesScreen.jsx)
 * Equivalente a src/screens/ExpensesScreen.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #6 (#main-s2-us6)
 * Asignado a: Manuel
 */
export default function ExpensesScreen() {
  return (
    <main>
      <header>
        <h1>Mis Gastos</h1>
      </header>
      <ul>
        {MOCK_EXPENSES.map((item) => (
          <li key={item.id}>
            {item.description} — {formatAmount(item.amount)} ({item.category})
          </li>
        ))}
      </ul>
    </main>
  );
}
