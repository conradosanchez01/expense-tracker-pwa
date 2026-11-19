import { Link } from 'react-router-dom';
import { formatAmount } from '../data/mockExpenses';
import CategoryBadge from './CategoryBadge';
import '../styles/Expenses.css';


export default function ExpenseCard({ expense }) {
  if (!expense) return null;

  return (
    <article className="expense-card">
      <Link to={`/expenses/${expense.id}`} className="expense-card__link">
        <div className="expense-card__info">
          <span className="expense-card__description">{expense.description}</span>
          <CategoryBadge category={expense.category} />
        </div>
        <strong className="expense-card__amount">
          {formatAmount(expense.amount)}
        </strong>
      </Link>
    </article>
  );
}
