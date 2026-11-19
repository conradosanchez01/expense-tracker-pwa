import { useState } from 'react';
import { Link, useInRouterContext } from 'react-router-dom';
import NewExpenseModal from '../components/NewExpenseModal';
import MOCK_EXPENSES, { formatAmount } from '../data/mockExpenses';
import '../styles/HomeScreen.css';

/**
 * Pantalla de Bienvenida (HomeScreen.jsx)
 * Equivalente a src/screens/HomeScreen.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #4 (#main-s2-us4)
 * Asignado a: Benjamín
 *
 * Requerimientos cumplidos US #4:
 * - Nombre de la aplicación visible (ExpenseTracker).
 * - Mensaje de bienvenida destacado y breve descripción del registro de gastos.
 * - Resumen con el total registrado y la cantidad de movimientos.
 * - Accesos rápidos: "Registrar Nuevo Gasto" y "Ver Listado Completo".
 * - Elementos semánticos (main, header, section, article, h1, p, button, Link).
 * - Estilos con Flexbox, min-height: 100dvh (con fallback 100vh) y safe-area-inset-top.
 */
export default function HomeScreen({
  expenses = MOCK_EXPENSES,
  onOpenNewExpense,
  onNavigateExpenses,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inRouter = useInRouterContext();

  const totalAmount = expenses.reduce((acc, item) => acc + Number(item.amount || 0), 0);
  const totalMovements = expenses.length;

  const handleOpenModal = () => {
    if (onOpenNewExpense) {
      onOpenNewExpense();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <main className="home-screen">
      <header className="home-screen__header">
        <h1 className="home-screen__title">ExpenseTracker</h1>
      </header>

      <section className="home-screen__card" aria-label="Mensaje de bienvenida">
        <p className="home-screen__subtitle">¡Bienvenido a ExpenseTracker!</p>
        <p className="home-screen__description">
          ExpenseTracker es una aplicación diseñada para ayudarte a registrar,
          gestionar y controlar tus gastos diarios de una manera rápida y sencilla.
        </p>
      </section>

      <section className="home-screen__summary" aria-label="Resumen de gastos">
        <article className="home-screen__summary-item">
          <p className="home-screen__summary-label">Total registrado</p>
          <p className="home-screen__summary-value home-screen__summary-value--highlight">
            {formatAmount(totalAmount)}
          </p>
        </article>
        <article className="home-screen__summary-item">
          <p className="home-screen__summary-label">Movimientos</p>
          <p className="home-screen__summary-value">{totalMovements}</p>
        </article>
      </section>

      <section className="home-screen__actions" aria-label="Accesos rápidos">
        <button
          type="button"
          className="home-screen__action-btn home-screen__action-btn--primary"
          onClick={handleOpenModal}
        >
          Registrar Nuevo Gasto
        </button>

        {inRouter ? (
          <Link
            to="/expenses"
            className="home-screen__action-btn home-screen__action-btn--secondary"
          >
            Ver Listado Completo
          </Link>
        ) : (
          <button
            type="button"
            className="home-screen__action-btn home-screen__action-btn--secondary"
            onClick={onNavigateExpenses}
          >
            Ver Listado Completo
          </button>
        )}
      </section>

      <NewExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
