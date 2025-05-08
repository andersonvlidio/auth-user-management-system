import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = `${import.meta.env.VITE_API_URL}/api/auth/login`;

      const response = await axios.post(
        url,
        { email, password }
      );

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/dashboard');
    } catch (error) {
      const message = error.response.data.error || 'Erro ao fazer login';
      setError(message);
    }
  };

  return (
    <div className="container mt-5 shadow-sm p-3 mb-5 bg-body rounded" style={{ maxWidth: 400 }}>
      <h3 className="mb-5 d-flex justify-content-center">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3" >
          <input 
            type="text" 
            className="form-control rounded-pill" 
            id="floatingInput" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <label for="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control rounded-pill"
            id="floatingInput"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label className="form-label">Senha</label>
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
        
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-outline-primary w-100 rounded-pill fw-bolder mb-4">Entrar</button>
      </form>
    </div>
  );
}
