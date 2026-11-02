/**
 * Componente Modal de Formulario de Carga de Gastos (NewExpenseModal.jsx)
 * Equivalente a src/screens/NewExpenseModal.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #5 (#main-s2-us5)
 * Asignado a: Benjamín
 */
export default function NewExpenseModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <dialog open className="new-expense-modal">
      <p>Modal Nuevo Gasto</p>
      <button type="button" onClick={onClose}>
        Cancelar
      </button>
    </dialog>
  );
}
