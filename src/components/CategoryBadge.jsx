import '../styles/Expenses.css';


const CATEGORY_CLASSES = {
  Alimentos: 'category-badge--alimentos',
  Transporte: 'category-badge--transporte',
  Servicios: 'category-badge--servicios',
  Salud: 'category-badge--salud',
  Ocio: 'category-badge--ocio',
};

export default function CategoryBadge({ category }) {
  const modifier = CATEGORY_CLASSES[category] || '';

  return (
    <span className={`category-badge ${modifier}`.trim()}>
      {category || 'Sin categoría'}
    </span>
  );
}
