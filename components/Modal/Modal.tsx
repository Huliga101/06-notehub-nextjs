"use client";

import css from "./Modal.module.css";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={css.closeButton} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}