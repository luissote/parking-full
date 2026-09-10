import React, { useEffect, useState } from 'react'
import api from '../api/api.js'

export default function Vehiculos() {
  const [activos, setActivos] = useState([])
  const [espacios, setEspacios] = useState([])
  const [modal, setModal] = useState(false)
  const [msg, setMsg] = useState({ tipo:'', texto:'' })
  const [form, setForm] = useState({ placa:'', tipo:'CARRO', propietario:'', modelo:'', espacioId:'' })

  useEffect(() => { cargar() }, [])
  async function cargar() {
    try { const {data} = await api.get('/parqueos/activos'); setActivos(data) }
    catch { setMsg({ tipo:'error', texto:'No se pudo cargar los vehiculos activos.' }) }
  }
  async function abrirModal() {
    setMsg({ tipo:'', texto:'' })
    try { const {data} = await api.get('/espacios/disponibles'); setEspacios(data); setModal(true) }
    catch { setMsg({ tipo:'error', texto:'No se pudo cargar los espacios disponibles.' }) }
  }
  async function entrada(e) {
    e.preventDefault()
    try {
      await api.post('/parqueos/entrada', {...form, espacioId: Number(form.espacioId)})
      setModal(false); setForm({ placa:'', tipo:'CARRO', propietario:'', modelo:'', espacioId:'' })
      setMsg({ tipo:'success', texto:'Entrada registrada correctamente.' }); cargar()
    } catch(err) { setMsg({ tipo:'error', texto: err.response?.data?.mensaje || 'Error al registrar.' }) }
  }
  async function salida(id) {
    if (!window.confirm('Registrar salida?')) return
    try {
      const {data} = await api.put(`/parqueos/${id}/salida`)
      setMsg({ tipo:'success', texto:`Salida registrada. Valor: $${Number(data.valorPagado).toLocaleString('es-CO')}` }); cargar()
    } catch(err) { setMsg({ tipo:'error', texto: err.response?.data?.mensaje || 'Error al registrar salida.' }) }
  }
  function tiempo(h) {
    const m = Math.floor((new Date()-new Date(h))/60000)
    return `${Math.floor(m/60)}h ${m%60}m`
  }
  return (
    <div>
      <div className="page-header"><h1>Vehiculos</h1><p>Registro de entrada y salida</p></div>
      {msg.texto && <div className={`alert ${msg.tipo==='error'?'alert-error':'alert-success'}`}>{msg.texto}</div>}
      <div className="toolbar"><div /><button className="btn btn-primary" onClick={abrirModal}>+ Registrar entrada</button></div>
      <div className="card">
        <div className="card-title">Vehiculos activos ({activos.length})</div>
        <table>
          <thead><tr><th>Placa</th><th>Tipo</th><th>Propietario</th><th>Espacio</th><th>Entrada</th><th>Tiempo</th><th>Accion</th></tr></thead>
          <tbody>
            {activos.length===0 && <tr><td colSpan="7" style={{color:'var(--text-secondary)'}}>No hay vehiculos activos.</td></tr>}
            {activos.map(p => (
              <tr key={p.id}>
                <td>{p.vehiculo.placa}</td>
                <td><span className={`badge ${p.vehiculo.tipo==='CARRO'?'badge-blue':'badge-purple'}`}>{p.vehiculo.tipo}</span></td>
                <td>{p.vehiculo.propietario||'-'}</td>
                <td>{p.espacio.codigo}</td>
                <td>{new Date(p.horaEntrada).toLocaleTimeString('es-CO')}</td>
                <td>{tiempo(p.horaEntrada)}</td>
                <td><button className="btn btn-danger" onClick={()=>salida(p.id)}>Registrar salida</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="modal-overlay" onClick={()=>setModal(false)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <h2 style={{marginBottom:16}}>Registrar entrada</h2>
            <form onSubmit={entrada}>
              <div className="form-group"><label>Placa</label><input value={form.placa} onChange={e=>setForm({...form,placa:e.target.value.toUpperCase()})} required /></div>
              <div className="form-group"><label>Tipo</label><select value={form.tipo} onChange={e=>setForm({...form,tipo:e.target.value,espacioId:''})}><option value="CARRO">Carro</option><option value="MOTO">Moto</option></select></div>
              <div className="form-group"><label>Propietario</label><input value={form.propietario} onChange={e=>setForm({...form,propietario:e.target.value})} /></div>
              <div className="form-group"><label>Modelo</label><input value={form.modelo} onChange={e=>setForm({...form,modelo:e.target.value})} /></div>
              <div className="form-group"><label>Espacio</label>
                <select value={form.espacioId} onChange={e=>setForm({...form,espacioId:e.target.value})} required>
                  <option value="">Selecciona un espacio</option>
                  {espacios.filter(esp=>esp.tipo===form.tipo).map(esp=><option key={esp.id} value={esp.id}>{esp.codigo}</option>)}
                </select>
              </div>
              <div style={{display:'flex',gap:10}}>
                <button type="button" className="btn btn-secondary" style={{flex:1}} onClick={()=>setModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary" style={{flex:1}}>Registrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
