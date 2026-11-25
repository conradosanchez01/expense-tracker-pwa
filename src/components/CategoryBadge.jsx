import { getCategoryMeta } from '../data/categories';
import '../styles/expenses.css';

export default function CategoryBadge({ category }) {
  const modifier = category ? getCategoryMeta(category).className : '';

  return (
    <span className={`category-badge ${modifier}`.trim()}>
      {category || 'Sin categoría'}
    </span>
  );
}
