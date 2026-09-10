import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Vehiculos from './pages/Vehiculos.jsx'
import Espacios from './pages/Espacios.jsx'
import Tarifas from './pages/Tarifas.jsx'
import Parqueaderos from './pages/Parqueaderos.jsx'
import Reservaciones from './pages/Reservaciones.jsx'
import Reportes from './pages/Reportes.jsx'
import Usuarios from './pages/Usuarios.jsx'
import Configuracion from './pages/Configuracion.jsx'

export default function App() {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const guardado = sessionStorage.getItem('parking_usuario')
    if (guardado) setUsuario(JSON.parse(guardado))
    setCargando(false)
  }, [])

  function handleLogin(data) {
    sessionStorage.setItem('parking_usuario', JSON.stringify(data))
    setUsuario(data)
  }

  function handleLogout() {
    sessionStorage.removeItem('parking_usuario')
    setUsuario(null)
  }

  if (cargando) return null

  if (!usuario) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/registro" element={<Registro onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )
  }

  return (
    <Layout usuario={usuario} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Dashboard usuario={usuario} />} />
        <Route path="/parqueaderos" element={<Parqueaderos />} />
        <Route path="/espacios" element={<Espacios />} />
        <Route path="/reservaciones" element={<Reservaciones />} />
        <Route path="/vehiculos" element={<Vehiculos />} />
        <Route path="/tarifas" element={<Tarifas />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  )
}
