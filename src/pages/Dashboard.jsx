import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegisterModal from '../componens/RegisterModal';
import userProfileIcon from '../assets/userProfileIcon.svg';

import deleteIcon from '../assets/deleteIcon.svg';
import editIcon from '../assets/editIcon.svg';

export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3333/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
      }
    };

    fetchUsers();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleEditUser = (id) => {
    navigate(`/userprofile/${id}`);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await axios.delete(`http://localhost:3333/api/users/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        console.error('Erro ao excluir usuário:', err);
      }
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Bem-vindo, {user?.name}</h3>

        <div className="position-relative">
          <img
            src={userProfileIcon}
            className="rounded-circle"
            width={32}
            style={{ cursor: 'pointer' }}
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="position-absolute end-0 mt-2 p-3 rounded bg-white shadow" style={{ zIndex: 10 }}>
              <p className="mb-1"><strong>{user.name}</strong></p>
              <p className="mb-2 text-muted">{user.role}</p>
              {isAdmin && (
              <button className="btn btn-sm btn-outline-primary w-100 mb-2 rounded-pill fw-bolder" onClick={() => handleEditUser(user.id)}>UserProfile</button>
              )}
              <button className="btn btn-sm btn-outline-danger w-100 rounded-pill fw-bolder" onClick={handleLogout}>Sair</button>
            </div>
          )}
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <h4>Lista de Usuários</h4>
        {isAdmin && (
          <>
            <button className="btn btn-outline-success mb-3 rounded-pill fw-bolder" onClick={() => setShowRegisterModal(true)}>
              Adicionar Usuário
            </button>
            <RegisterModal show={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
          </>
        )}

      </div>
      <table className="table table-hover mt-3 shadow rounded-3">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Data de Registro</th>
            <th>Níveis de Acesso</th>

            {isAdmin && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((userprofile) => (
            <tr key={userprofile.id}>
              <td>{userprofile.name}</td>
              <td>{userprofile.email}</td>
              <td>{userprofile.cpf}</td>
              <td>{new Date(userprofile.birthDate).toLocaleDateString()}</td>
              <td>{new Date(userprofile.createdAt).toLocaleDateString()}</td>
              <td>{userprofile.role}</td>
              {isAdmin && (
                <td>
                  <button 
                    className="btn btn-outline-primary me-2"
                    data-bs-toggle="tooltip" 
                    data-bs-placement="top" 
                    title="Editar Usuário"
                    onClick={() => handleEditUser(userprofile.id)}
                  > 
                    <img src={editIcon} alt="" />
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    data-bs-toggle="tooltip" 
                    data-bs-placement="top" 
                    title="Excluir Usuário"
                    onClick={() => handleDeleteUser(userprofile.id)}
                  > 
                    <img src={deleteIcon} alt="" srcset="" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
