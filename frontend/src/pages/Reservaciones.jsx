import React, { useEffect, useState } from 'react'
import api from '../api/api.js'

export default function Reservaciones() {
  const [reservaciones, setReservaciones] = useState([])
  const [espacios, setEspacios] = useState([])
  const [modal, setModal] = useState(false)
  const [msg, setMsg] = useState({ tipo:'', texto:'' })
  const [form, setForm] = useState({ placa:'', propietario:'', tipoVehiculo:'CARRO', espacioId:'', fechaInicio:'' })

  useEffect(() => { cargar() }, [])
  async function cargar() { try { const {data}=await api.get('/reservaciones'); setReservaciones(data) } catch { setMsg({tipo:'error',texto:'No se pudo cargar.'}) } }
  async function abrirModal() {
    try { const {data}=await api.get('/espacios/disponibles'); setEspacios(data); setModal(true); setMsg({tipo:'',texto:''}) }
    catch { setMsg({tipo:'error',texto:'No se pudo cargar espacios.'}) }
  }
  async function crear(e) {
    e.preventDefault()
    try { await api.post('/reservaciones',{...form,espacioId:Number(form.espacioId)}); setModal(false); setForm({placa:'',propietario:'',tipoVehiculo:'CARRO',espacioId:'',fechaInicio:''}); setMsg({tipo:'success',texto:'Reservacion creada.'}); cargar() }
    catch(err) { setMsg({tipo:'error',texto:err.response?.data?.mensaje||'Error.'}) }
  }
  async function cancelar(id) {
    if (!window.confirm('Cancelar esta reservacion?')) return
    try { await api.put(`/reservaciones/${id}/cancelar`); setMsg({tipo:'success',texto:'Reservacion cancelada.'}); cargar() }
    catch { setMsg({tipo:'error',texto:'Error al cancelar.'}) }
  }
  return (
    <div>
      <div className="page-header"><h1>Reservaciones</h1><p>Gestion de reservaciones de espacios</p></div>
      {msg.texto && <div className={`alert ${msg.tipo==='error'?'alert-error':'alert-success'}`}>{msg.texto}</div>}
      <div className="toolbar"><div style={{color:'var(--text-secondary)',fontSize:13}}>{reservaciones.length} reservaciones</div><button className="btn btn-primary" onClick={abrirModal}>+ Nueva reservacion</button></div>
      <div className="card">
        <table>
          <thead><tr><th>#</th><th>Placa</th><th>Propietario</th><th>Tipo</th><th>Espacio</th><th>Fecha inicio</th><th>Estado</th><th>Accion</th></tr></thead>
          <tbody>
            {reservaciones.length===0 && <tr><td colSpan="8" style={{color:'var(--text-secondary)'}}>No hay reservaciones.</td></tr>}
            {reservaciones.map(r=>(
              <tr key={r.id}>
                <td>{r.id}</td><td>{r.placa}</td><td>{r.propietario}</td>
                <td><span className={`badge ${r.tipoVehiculo==='CARRO'?'badge-blue':'badge-purple'}`}>{r.tipoVehiculo}</span></td>
                <td>{r.espacio?.codigo}</td>
                <td>{new Date(r.fechaInicio).toLocaleString('es-CO')}</td>
                <td><span className={`badge ${r.estado==='ACTIVA'?'badge-green':'badge-red'}`}>{r.estado}</span></td>
                <td>{r.estado==='ACTIVA'&&<button className="btn btn-danger" style={{fontSize:12,padding:'5px 10px'}} onClick={()=>cancelar(r.id)}>Cancelar</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="modal-overlay" onClick={()=>setModal(false)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <h2 style={{marginBottom:16}}>Nueva reservacion</h2>
            <form onSubmit={crear}>
              <div className="form-group"><label>Placa</label><input value={form.placa} onChange={e=>setForm({...form,placa:e.target.value.toUpperCase()})} required /></div>
              <div className="form-group"><label>Propietario</label><input value={form.propietario} onChange={e=>setForm({...form,propietario:e.target.value})} required /></div>
              <div className="form-group"><label>Tipo</label><select value={form.tipoVehiculo} onChange={e=>setForm({...form,tipoVehiculo:e.target.value,espacioId:''})}><option value="CARRO">Carro</option><option value="MOTO">Moto</option></select></div>
              <div className="form-group"><label>Espacio</label>
                <select value={form.espacioId} onChange={e=>setForm({...form,espacioId:e.target.value})} required>
                  <option value="">Selecciona un espacio</option>
                  {espacios.filter(e=>e.tipo===form.tipoVehiculo).map(e=><option key={e.id} value={e.id}>{e.codigo}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Fecha y hora de inicio</label><input type="datetime-local" value={form.fechaInicio} onChange={e=>setForm({...form,fechaInicio:e.target.value})} required /></div>
              <div style={{display:'flex',gap:10}}><button type="button" className="btn btn-secondary" style={{flex:1}} onClick={()=>setModal(false)}>Cancelar</button><button type="submit" className="btn btn-primary" style={{flex:1}}>Crear</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
