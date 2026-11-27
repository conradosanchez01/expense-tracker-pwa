/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { readJSON, writeJSON } from '../utils/storage';

/**
 * Contexto global de gastos (ExpensesContext.jsx)
 * Corresponde a: User Story #1 (#per-s3-us1) — Sprint 3
 * Asignado a: Conrado
 *
 * Equivalente a ExpenseTracker/src/context/ExpensesContext.js. Centraliza el
 * estado y las operaciones sobre los gastos para que todas las pantallas lean
 * y escriban únicamente a través de useExpenses().
 *
 * US #4 (#pwa-s3-us4) — Manuel / Jerónimo: los gastos se persisten en
 * localStorage (clave @expensetracker/expenses). La lectura inicial es
 * síncrona (inicializador perezoso de useState), por eso no hay "parpadeo" de
 * lista vacía y los deep links /expenses/:id funcionan al recargar.
 */
export const EXPENSES_STORAGE_KEY = '@expensetracker/expenses';

const ExpensesContext = createContext(null);

const createExpenseId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// Valida cada gasto leído: un JSON corrupto o editado a mano no debe romper la UI.
const isValidExpense = (item) =>
  item !== null &&
  typeof item === 'object' &&
  typeof item.id === 'string' &&
  item.id.length > 0 &&
  Number.isFinite(Number(item.amount));

const loadStoredExpenses = () => {
  const stored = readJSON(EXPENSES_STORAGE_KEY, []);
  if (!Array.isArray(stored)) return [];
  return stored.filter(isValidExpense).map((item) => ({
    id: item.id,
    title: String(item.title ?? item.description ?? '').trim(),
    amount: Number(item.amount),
    category: item.category || 'Otros',
    notes: String(item.notes ?? '').trim(),
    createdAt: item.createdAt || item.date || new Date().toISOString(),
  }));
};

export function ExpensesProvider({ children }) {
  // Lectura síncrona: el primer render ya tiene los datos guardados.
  const [expenses, setExpenses] = useState(loadStoredExpenses);
  const [isLoaded] = useState(true);

  // Cada cambio en la lista se guarda en localStorage.
  useEffect(() => {
    writeJSON(EXPENSES_STORAGE_KEY, expenses);
  }, [expenses]);

  const addExpense = useCallback((data = {}) => {
    const newExpense = {
      id: data.id || createExpenseId(),
      title: String(data.title || '').trim(),
      amount: Number(data.amount),
      category: data.category || 'Otros',
      notes: String(data.notes || '').trim(),
      createdAt: data.createdAt || new Date().toISOString(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
    return newExpense;
  }, []);

  const removeExpense = useCallback((id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const getExpenseById = useCallback(
    (id) => expenses.find((item) => item.id === id),
    [expenses]
  );

  const value = useMemo(
    () => ({
      expenses,
      isLoaded,
      addExpense,
      removeExpense,
      getExpenseById,
    }),
    [expenses, isLoaded, addExpense, removeExpense, getExpenseById]
  );

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses debe usarse dentro de un ExpensesProvider');
  }
  return context;
}

export default ExpensesContext;
