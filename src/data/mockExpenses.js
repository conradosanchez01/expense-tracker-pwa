/**
 * Datos de prueba de gastos (mockExpenses.js)
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #6 (#main-s2-us6)
 * Asignado a: Conrado (estructura y datos base equivalentes al Sprint 1)
 */
export const MOCK_EXPENSES = [
  {
    id: '1',
    description: 'Supermercado',
    amount: 25000,
    category: 'Alimentos',
    date: '2026-10-25',
    notes: 'Compra mensual de víveres y artículos de limpieza.',
  },
  {
    id: '2',
    description: 'Combustible',
    amount: 18000,
    category: 'Transporte',
    date: '2026-10-26',
    notes: 'Carga de combustible en estación de servicio.',
  },
  {
    id: '3',
    description: 'Internet',
    amount: 32000,
    category: 'Servicios',
    date: '2026-10-27',
    notes: 'Factura mensual del servicio de fibra óptica.',
  },
  {
    id: '4',
    description: 'Gimnasio',
    amount: 15000,
    category: 'Salud',
    date: '2026-10-28',
    notes: 'Cuota mensual de entrenamiento físico.',
  },
  {
    id: '5',
    description: 'Farmacia',
    amount: 8500,
    category: 'Salud',
    date: '2026-10-29',
    notes: 'Compra de medicamentos y cuidado personal.',
  },
  {
    id: '6',
    description: 'Cena con amigos',
    amount: 22000,
    category: 'Ocio',
    date: '2026-10-30',
    notes: 'Salida grupal de fin de semana.',
  },
  {
    id: '7',
    description: 'Electricidad',
    amount: 19500,
    category: 'Servicios',
    date: '2026-10-31',
    notes: 'Factura mensual de consumo eléctrico residencial.',
  },
];

export const formatAmount = (value) =>
  '$' + String(value || 0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default MOCK_EXPENSES;
