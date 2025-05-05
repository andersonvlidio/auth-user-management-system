import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const [form, setForm] = useState({
        name: '',
        email: '',
        cpf: '',
        birthDate: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://auth-user-management-system-api.onrender.com/api/auth/profile/${id}` , {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const { name, email, cpf, birthDate } = response.data;
                setForm({ name, email, cpf, birthDate: birthDate.split('T')[0] });
            } catch (err) {
                console.error('Erro ao buscar usuário:', err);
                setError('Erro ao carregar dados do usuário');
            }
        };

        fetchUser();
    }, [id, token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await axios.put(`https://auth-user-management-system-api.onrender.com/api/users/${id}`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccess('Usuário atualizado com sucesso!');
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (err) {
            const msg = err.response?.data?.error || 'Erro ao atualizar usuário';
            setError(msg);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await axios.delete(`https://auth-user-management-system-api.onrender.com/api/users/delete/${id}`, {
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

            } catch (err) {
                console.error('Erro ao excluir usuário:', err);
            }
        }
    }

    return (
        <div className="container mt-5 shadow-sm p-3 mb-5 bg-body rounded" style={{ maxWidth: 600 }}>
            <h3 className="mb-4">Editar Usuário</h3>
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
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary ms-2 rounded-pill fw-bolder" 
                            onClick={() => navigate('/dashboard')}
                        >
                            Voltar
                        </button>
                    </div>
                    <div>
                        <button 
                            type="button" 
                            className="btn btn-outline-danger ms-2 rounded-pill fw-bolder" 
                            onClick={() => handleDeleteUser(id)}
                        >
                            Excluir Usuário
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
