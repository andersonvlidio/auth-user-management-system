import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';

import backIcon from '../assets/box-arrow-left.svg';

export default function EditUser() {
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const [form, setForm] = useState({
        name: '',
        email: '',
        cpf: '',
        birthDate: '',
        oldPassword: '',
        newPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const getUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const { name, email, cpf, birthDate } = response.data;
                setForm({ name, email, cpf, birthDate: birthDate.split('T')[0] });
            } catch (error) {
                console.error('Erro ao buscar usuário:', error.response.data.error);
                setError('Erro ao carregar dados do usuário');
            }
        };

        getUser();
    }, [id, token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        // eslint-disable-next-line no-debugger
        debugger
        e.preventDefault();
        setError('');
        setSuccess('');

        console.log('Form data:', form);

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${id}`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccess('Usuário atualizado com sucesso!');
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (error) {
            const message = error.response.data.error || 'Erro ao atualizar usuário';
            setError(message);
        }
    };

    const handleOpenConfirmModal = (id) => {
        setUserIdToDelete(id);
        setShowConfirmModal(true);
    };


    const handleDeleteUser = async (id) => {
        setUserIdToDelete(id);
        setShowConfirmModal(true);
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (currentUser.id === id) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
            setSuccess('Usuário excluído com sucesso!');
            navigate('/');

        } catch (error) {
            const message = error.response.data.error || 'Erro ao excluir usuário';
            setError(message);
        } finally {
            setShowConfirmModal(false);
        }

    }

    return (
        <div className="d-flex flex-column justify-content-center h-100">
            <DeleteModal
                show={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={() => handleDeleteUser(userIdToDelete)}
            />
            <div className="container mt-5 shadow-sm p-3 mb-5 bg-body rounded" style={{ maxWidth: 600 }}>

                <button
                    className='btn'
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Voltar"
                >
                    <img
                        src={backIcon}
                        alt="Voltar"
                        className="img-fluid"
                        width={24}
                        onClick={() => navigate('/dashboard')}
                    />
                </button>

                <h3 className="mb-5 d-flex justify-content-center">Editar Usuário</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            className="form-control rounded-pill"
                            name="name"
                            placeholder="Nome"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <label>Nome</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            className="form-control rounded-pill"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <label>Email</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            className="form-control rounded-pill"
                            name="cpf"
                            placeholder="CPF"
                            value={form.cpf}
                            maxLength={11}
                            onChange={handleChange}
                            required
                        />
                        <label>CPF</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="date"
                            className="form-control rounded-pill"
                            name="birthDate"
                            placeholder="Data de Nascimento"
                            value={form.birthDate}
                            onChange={handleChange}
                            required
                        />
                        <label>Data de Nascimento</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control rounded-pill"
                            name="oldPassword"
                            placeholder="Senha"
                            value={form.oldPassword}
                            onChange={handleChange}
                        />
                        <label>Nova Senha</label>
                        <div className="form-check mt-1">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                id="showPassword"
                            />
                            <label className="form-check-label" htmlFor="showPassword">
                                Exibir senha
                            </label>
                        </div>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            className="form-control rounded-pill"
                            name="newPassword"
                            placeholder="Confirmar Senha"
                            value={form.newPassword}
                            onChange={handleChange}
                        />
                        <label>Confirmar Senha</label>
                        <div className="form-check mt-1">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={showNewPassword}
                                onChange={() => setShowNewPassword(!showNewPassword)}
                                id="showPassword"
                            />
                            <label className="form-check-label" htmlFor="showPassword">
                                Exibir senha
                            </label>
                        </div>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <button
                                type="submit"
                                className="btn btn-outline-success rounded-pill fw-bolder"
                            >
                                Salvar
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-outline-danger ms-2 rounded-pill fw-bolder"
                                onClick={() => handleOpenConfirmModal(id)}
                            >
                                Excluir Usuário
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
