import React from 'react';

export default function ConfirmDeleteModal({ show, onClose, onConfirm, name }) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Excluir Usuário</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Tem certeza que deseja excluir o usuário {name}?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
