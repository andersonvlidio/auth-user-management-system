import React from 'react';
import Register from './Register';

export default function RegisterModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-g" role="document">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">Cadastrar Novo Usuário</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <Register onSuccess={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
