import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api.js'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@parking.com')
  const [password, setPassword] = useState('admin123')
  const [verPassword, setVerPassword] = useState(false)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setCargando(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      onLogin(data)
    } catch (err) {
      setError(err.response?.data?.mensaje || 'No se pudo iniciar sesion. Verifica el backend.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1>Park<span>ing</span></h1>
        <p>Sistema de gestion de parqueaderos. Controla y administra tu parqueadero de manera eficiente.</p>
      </div>
      <div className="auth-right">
        <div className="auth-form-box">
          <h2>Bienvenido de nuevo</h2>
          <p>Inicia sesion para continuar</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Correo electronico</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="usuario@ejemplo.com" required />
            </div>
            <div className="form-group">
              <label>Contrasena</label>
              <div style={{ position: 'relative' }}>
                <input type={verPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required />
                <span onClick={() => setVerPassword(!verPassword)} style={{ position: 'absolute', right: 12, top: 10, cursor: 'pointer', fontSize: 12, color: 'var(--text-secondary)' }}>
                  {verPassword ? 'Ocultar' : 'Ver'}
                </span>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} disabled={cargando}>
              {cargando ? 'Ingresando...' : 'Iniciar sesion'}
            </button>
          </form>

          <div className="auth-link">
            No tienes cuenta? <a onClick={() => navigate('/registro')}>Registrate aqui</a>
          </div>

          <p style={{ marginTop: 12, fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center' }}>
            Cuenta de prueba: admin@parking.com / admin123
          </p>
        </div>
      </div>
    </div>
  )
}
