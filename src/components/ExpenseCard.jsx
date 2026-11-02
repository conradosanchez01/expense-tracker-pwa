/**
 * Componente reutilizable de tarjeta de gasto (ExpenseCard.jsx)
 * Equivalente a src/components/ExpenseItem.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #6 (#main-s2-us6)
 * Asignado a: Manuel
 */
export default function ExpenseCard({ expense, onClick }) {
  return (
    <article className="expense-card" onClick={onClick}>
      <span>{expense?.description || 'Gasto'}</span>
      <strong>${expense?.amount || 0}</strong>
    </article>
  );
}
