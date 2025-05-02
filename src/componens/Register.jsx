import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess('Registro realizado com sucesso!');
      console.log('Registro:', {
        name,
        cpf,
        email,
        birthDate,
        password,
      });
      // Limpa os campos
      setName('');
      setCpf('');
      setEmail('');
      setBirthDate('');
      setPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">CPF</label>
        <input
          type="text"
          className="form-control"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Data de Nascimento</label>
        <input
          type="date"
          className="form-control"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Senha</label>
        <input
          type={showPassword ? 'text' : 'password'}
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="form-check mt-1">
          <input
            type="checkbox"
            className="form-check-input"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            id="showPassword"
          />
          <label className="form-check-label" htmlFor="showPassword">
            Mostrar senha
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Confirmar Senha</label>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="form-check mt-1">
          <input
            type="checkbox"
            className="form-check-input"
            checked={showConfirmPassword}
            onChange={() => setShowConfirmPassword(!showConfirmPassword)}
            id="showConfirmPassword"
          />
          <label className="form-check-label" htmlFor="showConfirmPassword">
            Mostrar confirmação
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrar'}
      </button>
    </form>
  );
};

export default Register;
