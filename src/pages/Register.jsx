import axios from 'axios';
import React, { useState } from 'react';
import { isValidCPF, isValidBirthDate } from '../utils/functionsUtils';
import { useNavigate } from 'react-router-dom';

import backIcon from '../assets/box-arrow-left.svg';

const Register = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [role, setRole] = useState('VISUALIZADOR');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);

    if (!isValidCPF(cpf)) {
      setError('CPF inválido');
      setLoading(false);
      return;
    }
    if (!isValidBirthDate(birthDate)) {
      setError('Data de nascimento inválida, você ser precisa ser maior de idade para entrar no sistema!');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
        name: name.trim(),
        cpf: cpf.replace(/\D/g, ''),
        email: email.trim().toLowerCase(),
        birthDate,
        role,
        password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Registro realizado com sucesso!');
      setName('');
      setCpf('');
      setEmail('');
      setBirthDate('');
      setPassword('');
      setConfirmPassword('');
      navigate('/dashboard');

    } catch (error) {
      const message = error.response.data.error || 'Erro ao registrar';
      setError(message);
    } finally {
      setLoading(false);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div className="container mt-5 shadow-sm p-3 mb-5 bg-body rounded" style={{ maxWidth: 400 }}>
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
      <form onSubmit={handleSubmit}>
        <h3 className='mb-5 d-flex justify-content-center'>Registro</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control rounded-pill"
            id="floatingInput"
            value={name}
            placeholder='Nome'
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label for="floatingInput">Nome</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control rounded-pill"
            id="floatingInput"
            value={cpf}
            maxLength={11}
            placeholder='CPF'
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <label for="floatingInput">CPF</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control rounded-pill"
            id="floatingInput"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label for="floatingInput">Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control rounded-pill"
            id="floatingInput"
            value={birthDate}
            placeholder='Data de Nascimento'
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            required
          />
          <label for="floatingInput">Data de Nascimento</label>
        </div>

        <div className="form-floating mb-3 ">
          <select
            className="form-select rounded-pill"
            onChange={(e) => setRole(e.target.value)}
            value={role}
            required
          >
            <option value="VISUALIZADOR" selected>VISUALIZADOR</option>
            <option value="ADMIN">ADMINISTRADOR</option>
          </select>
          <label for="floatingSelect">Níveis de Acesso</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control rounded-pill"
            id="floatingInput"
            value={password}
            placeholder='Senha'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label for="floatingInput">Senha</label>

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
            type={showConfirmPassword ? 'text' : 'password'}
            className="form-control rounded-pill"
            id="floatingInput"
            value={confirmPassword}
            placeholder='Confirmar Senha'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label for="floatingInput">Confirmar Senha</label>

          <div className="form-check mt-1">
            <input
              type="checkbox"
              className="form-check-input"
              checked={showConfirmPassword}
              onChange={() => setShowConfirmPassword(!showConfirmPassword)}
              id="showConfirmPassword"
            />
            <label className="form-check-label" htmlFor="showConfirmPassword">
              Exibir senha
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-outline-success w-100 rounded-pill fw-bolder mb-4" disabled={loading}>
          {loading ? (
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Registrando...</span>
            </div>
          ) : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Register;
