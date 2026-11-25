import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useExpenses } from '../context/ExpensesContext';
import { CATEGORIES } from '../data/categories';
import '../styles/NewExpenseModal.css';

/**
 * Componente Modal de Formulario de Carga de Gastos (NewExpenseModal.jsx)
 * Equivalente a src/screens/NewExpenseModal.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2), User Story #5 (#main-s2-us5) y User Story #2 Sprint 3 (#main-s3-us2)
 * Asignado a: Benjamín
 */
export default function NewExpenseModal({ isOpen, onClose, onSave }) {
  const dialogRef = useRef(null);
  const nameInputRef = useRef(null);
  const amountInputRef = useRef(null);
  const pressedOutsideRef = useRef(false);
  const { addExpense } = useExpenses();

  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIES[0].name);
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const resetForm = () => {
    setNombre('');
    setMonto('');
    setCategoria(CATEGORIES[0].name);
    setDescripcion('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    if (onClose) {
      onClose();
    }
  };

  const isOutsideDialog = (e, dialog) => {
    const rect = dialog.getBoundingClientRect();
    return (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    );
  };

  const handlePointerDown = (e) => {
    if (
      typeof HTMLDialogElement !== 'undefined' &&
      'closedBy' in HTMLDialogElement.prototype
    ) {
      return;
    }
    if (dialogRef.current) {
      pressedOutsideRef.current = isOutsideDialog(e, dialogRef.current);
    }
  };

  const handlePointerUp = (e) => {
    if (
      typeof HTMLDialogElement !== 'undefined' &&
      'closedBy' in HTMLDialogElement.prototype
    ) {
      return;
    }
    if (dialogRef.current && pressedOutsideRef.current && isOutsideDialog(e, dialogRef.current)) {
      handleClose();
    }
    pressedOutsideRef.current = false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanNombre = nombre.trim();
    const numericMonto = Number(String(monto).trim().replace(',', '.'));

    if (!cleanNombre) {
      setError('Por favor, ingresá un nombre para el gasto.');
      nameInputRef.current?.focus();
      return;
    }

    if (!String(monto).trim() || !Number.isFinite(numericMonto) || numericMonto <= 0) {
      setError('Por favor, ingresá un monto numérico mayor a 0.');
      amountInputRef.current?.focus();
      return;
    }

    if (!categoria) {
      setError('Por favor, seleccioná una categoría.');
      return;
    }

    setError('');

    const newExpense = addExpense({
      title: cleanNombre,
      amount: numericMonto,
      category: categoria,
      notes: descripcion.trim(),
    });

    if (onSave) {
      onSave(newExpense);
    }

    handleClose();
  };

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="new-expense-modal"
      aria-labelledby="new-expense-modal-title"
      {...{ closedby: 'any' }}
      onClose={handleClose}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="new-expense-modal__content">
        <span className="new-expense-modal__handle" aria-hidden="true" />

        <header className="new-expense-modal__header">
          <h1 id="new-expense-modal-title" className="new-expense-modal__title">
            Nuevo Gasto
          </h1>
          <button
            type="button"
            className="new-expense-modal__close-btn"
            onClick={handleClose}
            aria-label="Cerrar formulario de nuevo gasto"
          >
            ✕
          </button>
        </header>

        <form className="new-expense-modal__form" onSubmit={handleSubmit} noValidate>
          <div className="new-expense-modal__field">
            <label htmlFor="expense-name" className="new-expense-modal__label">
              Nombre del gasto <span aria-hidden="true">*</span>
            </label>
            <input
              ref={nameInputRef}
              id="expense-name"
              name="title"
              type="text"
              className="new-expense-modal__input"
              placeholder="Ej. Supermercado"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                if (error) setError('');
              }}
              aria-invalid={Boolean(error && !nombre.trim())}
              aria-describedby={error ? 'new-expense-modal-error' : undefined}
              enterKeyHint="next"
              autoFocus
              required
            />
          </div>

          <div className="new-expense-modal__field">
            <label htmlFor="expense-amount" className="new-expense-modal__label">
              Monto <span aria-hidden="true">*</span>
            </label>
            <input
              ref={amountInputRef}
              id="expense-amount"
              name="amount"
              type="text"
              inputMode="decimal"
              className="new-expense-modal__input"
              placeholder="Ej. 1500"
              value={monto}
              onChange={(e) => {
                setMonto(e.target.value);
                if (error) setError('');
              }}
              aria-invalid={Boolean(
                error &&
                  (!String(monto).trim() ||
                    !Number.isFinite(Number(String(monto).trim().replace(',', '.'))) ||
                    Number(String(monto).trim().replace(',', '.')) <= 0)
              )}
              aria-describedby={error ? 'new-expense-modal-error' : undefined}
              enterKeyHint="next"
              required
            />
          </div>

          <fieldset className="new-expense-modal__field">
            <legend className="new-expense-modal__label">
              Categoría <span aria-hidden="true">*</span>
            </legend>
            <div className="new-expense-modal__chips">
              {CATEGORIES.map((cat) => {
                const isSelected = categoria === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    className={`new-expense-modal__chip ${
                      isSelected ? 'new-expense-modal__chip--selected' : ''
                    }`}
                    aria-pressed={isSelected}
                    onClick={() => {
                      setCategoria(cat.name);
                      if (error) setError('');
                    }}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="new-expense-modal__field">
            <label htmlFor="expense-notes" className="new-expense-modal__label">
              Notas (Opcional)
            </label>
            <textarea
              id="expense-notes"
              name="notes"
              className="new-expense-modal__input new-expense-modal__textarea"
              placeholder="Notas adicionales sobre el gasto"
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          {error && (
            <p
              id="new-expense-modal-error"
              className="new-expense-modal__feedback new-expense-modal__feedback--error"
              role="alert"
            >
              {error}
            </p>
          )}

          <div className="new-expense-modal__actions">
            <button
              type="button"
              className="new-expense-modal__btn new-expense-modal__btn--cancel"
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="new-expense-modal__btn new-expense-modal__btn--submit"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </dialog>,
    document.body
  );
}
