import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = 'https://auth-user-management-system-api.onrender.com/api/auth/login';

      const response = await axios.post(
        url,
        { email, password }
      );

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao fazer login';
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
            type="password"
            className="form-control rounded-pill"
            id="floatingInput"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label className="form-label">Senha</label>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-outline-primary w-100 rounded-pill fw-bolder mb-4">Entrar</button>
      </form>
    </div>
  );
}
