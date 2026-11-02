/**
 * Componente reutilizable para la etiqueta de categoría (CategoryBadge.jsx)
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #6 (#main-s2-us6)
 * Asignado a: Manuel
 */
export default function CategoryBadge({ category }) {
  return <span className="category-badge">{category || 'Sin categoría'}</span>;
}
