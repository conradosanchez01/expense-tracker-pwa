/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../services/firebase';

/**
 * Contexto global de gastos (ExpensesContext.jsx)
 * Corresponde a: User Story #1 (#per-s3-us1) y User Story #5 (#per-s3-us5-pwa) — Sprint 3
 * Asignado a: Conrado / Manuel / Jerónimo
 *
 * Fuente de verdad: colección "expenses" de Cloud Firestore (la misma que usa
 * la app React Native, por eso se sincronizan en tiempo real).
 * - onSnapshot (orderBy createdAt desc): lista en vivo, también desde la caché
 *   local cuando no hay red.
 * - addDoc / deleteDoc NO se esperan (await): Firestore actualiza la lista local
 *   al instante (Optimistic UI) y sincroniza con el servidor cuando hay conexión.
 * La API pública (expenses, isLoaded, addExpense, removeExpense,
 * getExpenseById) no cambió: las pantallas no se modifican.
 */
export const EXPENSES_COLLECTION = 'expenses';

const ExpensesContext = createContext(null);

const toISOString = (value) => {
  if (!value) return new Date().toISOString();
  if (typeof value.toDate === 'function') return value.toDate().toISOString();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
};

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const expensesQuery = query(
      collection(db, EXPENSES_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      expensesQuery,
      { includeMetadataChanges: true },
      (snapshot) => {
        const items = snapshot.docs.map((document) => {
          // 'estimate': mientras el servidor no confirma serverTimestamp(), se usa la hora local.
          const data = document.data({ serverTimestamps: 'estimate' });
          return {
            id: document.id,
            title: String(data.title ?? ''),
            amount: Number(data.amount) || 0,
            category: data.category || 'Otros',
            notes: String(data.notes ?? ''),
            createdAt: toISOString(data.createdAt),
          };
        });
        setExpenses(items);
        setIsLoaded(true);
        if (import.meta.env.DEV) {
          console.log('[Firestore]', {
            gastos: items.length,
            desdeCache: snapshot.metadata.fromCache,
            escriturasPendientes: snapshot.metadata.hasPendingWrites,
          });
        }
      },
      (error) => {
        console.error('[Firestore] Error al escuchar los gastos:', error);
        setIsLoaded(true);
      }
    );

    return unsubscribe;
  }, []);

  const addExpense = useCallback((data = {}) => {
    const payload = {
      title: String(data.title || '').trim(),
      amount: Number(data.amount),
      category: data.category || 'Otros',
      notes: String(data.notes || '').trim(),
      createdAt: serverTimestamp(),
    };

    // Sin await: offline la promesa recién se resuelve al reconectar.
    addDoc(collection(db, EXPENSES_COLLECTION), payload).catch((error) => {
      console.error('[Firestore] No se pudo guardar el gasto:', error);
    });

    return { ...payload, createdAt: new Date().toISOString() };
  }, []);

  const removeExpense = useCallback((id) => {
    deleteDoc(doc(db, EXPENSES_COLLECTION, id)).catch((error) => {
      console.error('[Firestore] No se pudo eliminar el gasto:', error);
    });
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
