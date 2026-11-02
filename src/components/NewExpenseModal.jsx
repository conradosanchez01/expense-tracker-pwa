import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../styles/NewExpenseModal.css';

const CATEGORIES = ['Alimentos', 'Transporte', 'Servicios', 'Salud', 'Ocio', 'Otros'];

/**
 * Componente Modal de Formulario de Carga de Gastos (NewExpenseModal.jsx)
 * Equivalente a src/screens/NewExpenseModal.js del Sprint 1.
 * Corresponde a: User Story #2 (#pwa-s2-us2) y User Story #5 (#main-s2-us5)
 * Asignado a: Benjamín
 *
 * Requerimientos cumplidos US #5:
 * - Etiqueta nativa <dialog> abierta mediante showModal() y renderizada con createPortal.
 * - Animación bottom-sheet desde la parte inferior y fondo oscurecido con ::backdrop.
 * - <input type="text"> para el nombre con su <label> asociado.
 * - <input inputMode="decimal"> para el monto que despliega el teclado numérico móvil.
 * - Selección de categoría mediante botones tipo chip.
 * - Botón "Guardar" (type="submit") y botón "Cancelar" (type="button") con tamaño táctil >= 44px.
 * - Respuesta al evento onSubmit con console.log y mensaje temporal en la interfaz.
 */
export default function NewExpenseModal({ isOpen, onClose, onSave }) {
  const dialogRef = useRef(null);
  const pressedOutsideRef = useRef(false);

  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
    setCategoria('');
    setDescripcion('');
    setError('');
    setSuccessMsg('');
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
    if (dialogRef.current) {
      pressedOutsideRef.current = isOutsideDialog(e, dialogRef.current);
    }
  };

  const handlePointerUp = (e) => {
    if (dialogRef.current && pressedOutsideRef.current && isOutsideDialog(e, dialogRef.current)) {
      handleClose();
    }
    pressedOutsideRef.current = false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanNombre = nombre.trim();
    const numericMonto = parseFloat(String(monto).replace(',', '.'));

    if (!cleanNombre || !monto || Number.isNaN(numericMonto) || numericMonto <= 0 || !categoria) {
      setError('Por favor, completá el nombre, un monto válido y seleccioná una categoría.');
      setSuccessMsg('');
      return;
    }

    setError('');

    const nuevoGasto = {
      id: String(Date.now()),
      description: cleanNombre,
      amount: numericMonto,
      category: categoria,
      date: new Date().toISOString().slice(0, 10),
      notes: descripcion.trim(),
    };

    console.log('Nuevo gasto guardado:', nuevoGasto);

    if (onSave) {
      onSave(nuevoGasto);
    }

    setSuccessMsg(`Gasto guardado: ${cleanNombre} - $${numericMonto}`);

    setTimeout(() => {
      handleClose();
    }, 900);
  };

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="new-expense-modal"
      aria-labelledby="new-expense-modal-title"
      onClose={handleClose}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="new-expense-modal__content">
        <span className="new-expense-modal__handle" aria-hidden="true" />

        <header className="new-expense-modal__header">
          <h2 id="new-expense-modal-title" className="new-expense-modal__title">
            Nuevo Gasto
          </h2>
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
              Nombre del gasto *
            </label>
            <input
              id="expense-name"
              name="description"
              type="text"
              className="new-expense-modal__input"
              placeholder="Ej. Supermercado"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              enterKeyHint="next"
              autoFocus
              required
            />
          </div>

          <div className="new-expense-modal__field">
            <label htmlFor="expense-amount" className="new-expense-modal__label">
              Monto *
            </label>
            <input
              id="expense-amount"
              name="amount"
              type="text"
              inputMode="decimal"
              className="new-expense-modal__input"
              placeholder="Ej. 1500"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              enterKeyHint="next"
              required
            />
          </div>

          <fieldset className="new-expense-modal__field">
            <legend className="new-expense-modal__label">Categoría *</legend>
            <div className="new-expense-modal__chips">
              {CATEGORIES.map((cat) => {
                const isSelected = categoria === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`new-expense-modal__chip ${
                      isSelected ? 'new-expense-modal__chip--selected' : ''
                    }`}
                    aria-pressed={isSelected}
                    onClick={() => setCategoria(cat)}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="new-expense-modal__field">
            <label htmlFor="expense-notes" className="new-expense-modal__label">
              Descripción (Opcional)
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
            <p className="new-expense-modal__feedback new-expense-modal__feedback--error" role="alert">
              {error}
            </p>
          )}

          {successMsg && (
            <p
              className="new-expense-modal__feedback new-expense-modal__feedback--success"
              role="status"
            >
              {successMsg}
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
