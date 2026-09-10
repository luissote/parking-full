import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api.js'

export default function Registro({ onLogin }) {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmar: '' })
  const [verPassword, setVerPassword] = useState(false)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmar) {
      setError('Las contrasenas no coinciden')
      return
    }
    if (form.password.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres')
      return
    }
    setCargando(true)
    try {
      const { data } = await api.post('/auth/registro', {
        nombre: form.nombre,
        email: form.email,
        password: form.password,
      })
      onLogin(data)
    } catch (err) {
      setError(err.response?.data?.mensaje || 'No se pudo crear la cuenta.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1>Park<span>ing</span></h1>
        <p>Crea tu cuenta y empieza a gestionar tu parqueadero de manera eficiente.</p>
      </div>
      <div className="auth-right">
        <div className="auth-form-box">
          <h2>Crear cuenta</h2>
          <p>Completa los datos para registrarte</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="form-group">
              <label>Correo electronico</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Contrasena</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={verPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimo 6 caracteres"
                  required
                />
                <span onClick={() => setVerPassword(!verPassword)} style={{ position: 'absolute', right: 12, top: 10, cursor: 'pointer', fontSize: 12, color: 'var(--text-secondary)' }}>
                  {verPassword ? 'Ocultar' : 'Ver'}
                </span>
              </div>
            </div>
            <div className="form-group">
              <label>Confirmar contrasena</label>
              <input
                type={verPassword ? 'text' : 'password'}
                value={form.confirmar}
                onChange={e => setForm({ ...form, confirmar: e.target.value })}
                placeholder="Repite la contrasena"
                required
              />
            </div>

            <div style={{ padding: '10px 12px', background: 'rgba(77,142,247,0.08)', border: '1px solid rgba(77,142,247,0.2)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
              La cuenta nueva se crea con rol de Operador. Un administrador puede cambiarlo desde el modulo de Usuarios.
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }} disabled={cargando}>
              {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <div className="auth-link">
            Ya tienes cuenta? <a onClick={() => navigate('/login')}>Inicia sesion aqui</a>
          </div>
        </div>
      </div>
    </div>
  )
}
