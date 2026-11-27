import { useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useExpenses } from '../context/ExpensesContext';
import { formatAmount, formatDate } from '../data/categories';
import CategoryBadge from '../components/CategoryBadge';
import '../styles/expenses.css';

/**
 * Pantalla de Detalle de Gasto (ExpenseDetailScreen.jsx)
 * Equivalente a src/screens/ExpenseDetailScreen.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2), User Story #6 (#main-s2-us6) y User Story #2 Sprint 3 (#main-s3-us2)
 * Asignado a: Manuel / Benjamín (eliminación con confirmación)
 *
 * La URL es la fuente de verdad: el gasto se obtiene a partir del :id de la
 * ruta (/expenses/:id), así que al recargar o compartir el enlace sigue
 * funcionando (deep linking).
 */
export default function ExpenseDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getExpenseById, removeExpense, isLoaded } = useExpenses();
  const confirmDialogRef = useRef(null);

  const expense = getExpenseById(id);

  // navigate(-1) vuelve a la pantalla anterior. Si el usuario entró directo
  // por el enlace (sin historial previo dentro de la app), va al listado.
  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/expenses');
    }
  };

  const handleRequestDelete = () => {
    if (!expense) return;
    const dialog = confirmDialogRef.current;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.returnValue = '';
      dialog.showModal();
    } else if (window.confirm('¿Estás seguro de que querés eliminar este gasto?')) {
      removeExpense(expense.id);
      navigate('/expenses', { replace: true });
    }
  };

  const handleConfirmDialogClose = () => {
    const dialog = confirmDialogRef.current;
    if (!dialog || !expense) return;
    const choice = dialog.returnValue;
    dialog.returnValue = '';
    if (choice === 'delete') {
      removeExpense(expense.id);
      navigate('/expenses', { replace: true });
    }
  };

  // Deep link / recarga: hasta el primer snapshot de Firestore no se sabe si el gasto existe.
  if (!expense && !isLoaded) {
    return (
      <main className="expense-detail" aria-busy="true">
        <p role="status">Cargando gasto…</p>
      </main>
    );
  }

  if (!expense) {
    return (
      <main className="expense-detail">
        <h1 className="expense-detail__title">Gasto no encontrado</h1>
        <div className="expense-detail__not-found">
          <p>No existe ningún gasto con el identificador "{id}".</p>
          <button type="button" className="btn btn--secondary" onClick={handleBack}>
            ← Volver
          </button>
        </div>
      </main>
    );
  }

  const displayTitle = expense.title || expense.description || 'Sin título';

  return (
    <main className="expense-detail">
      <header className="expense-detail__header">
        <button type="button" className="btn btn--secondary" onClick={handleBack}>
          ← Volver
        </button>
      </header>

      <h1 className="expense-detail__title">{displayTitle}</h1>

      <section className="expense-detail__card">
        <p className="expense-detail__amount">{formatAmount(expense.amount)}</p>

        <div className="expense-detail__row">
          <span className="expense-detail__label">Categoría</span>
          <div>
            <CategoryBadge category={expense.category} />
          </div>
        </div>

        <div className="expense-detail__row">
          <span className="expense-detail__label">Fecha</span>
          <p className="expense-detail__value">
            {formatDate(expense.createdAt || expense.date)}
          </p>
        </div>

        <div className="expense-detail__row">
          <span className="expense-detail__label">Notas</span>
          <p className="expense-detail__value">
            {expense.notes || 'Sin notas'}
          </p>
        </div>
      </section>

      <div className="expense-detail__actions">
        <button
          type="button"
          className="btn btn--danger expense-detail__delete-btn"
          onClick={handleRequestDelete}
        >
          Eliminar gasto
        </button>
      </div>

      <dialog
        ref={confirmDialogRef}
        className="confirm-dialog"
        aria-labelledby="confirm-delete-title"
        {...{ closedby: 'any' }}
        onClose={handleConfirmDialogClose}
      >
        <div className="confirm-dialog__content">
          <h1 id="confirm-delete-title" className="confirm-dialog__title">
            ¿Eliminar gasto?
          </h1>
          <p className="confirm-dialog__text">
            ¿Estás seguro de que querés eliminar{' '}
            <strong>{displayTitle}</strong> ({formatAmount(expense.amount)})? Esta acción no se puede deshacer.
          </p>
          <form method="dialog" className="confirm-dialog__actions">
            <button
              type="submit"
              value="cancel"
              className="btn btn--secondary confirm-dialog__btn"
              autoFocus
            >
              Cancelar
            </button>
            <button
              type="submit"
              value="delete"
              className="btn btn--danger confirm-dialog__btn"
            >
              Eliminar
            </button>
          </form>
        </div>
      </dialog>
    </main>
  );
}