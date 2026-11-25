import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useExpenses } from '../context/ExpensesContext';
import { formatAmount, formatDate } from '../data/categories';
import CategoryBadge from '../components/CategoryBadge';
import '../styles/expenses.css';

/**
 * Pantalla de Detalle de Gasto (ExpenseDetailScreen.jsx)
 * Equivalente a src/screens/ExpenseDetailScreen.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #6 (#main-s2-us6)
 * Asignado a: Manuell
 *
 * La URL es la fuente de verdad: el gasto se obtiene a partir del :id de la
 * ruta (/expenses/:id), así que al recargar o compartir el enlace sigue
 * funcionando (deep linking).
 */
export default function ExpenseDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getExpenseById } = useExpenses();

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

  return (
    <main className="expense-detail">
      <header>
        <button type="button" className="btn btn--secondary" onClick={handleBack}>
          ← Volver
        </button>
      </header>

      <h1 className="expense-detail__title">
        {expense.title || expense.description || 'Sin título'}
      </h1>

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
    </main>
  );
}