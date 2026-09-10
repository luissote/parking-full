import React, { useEffect, useState } from 'react'
import api from '../api/api.js'

export default function Parqueaderos() {
  const [parqueadero, setParqueadero] = useState(null)
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState({})
  const [msg, setMsg] = useState({ tipo:'', texto:'' })

  useEffect(() => { cargar() }, [])
  async function cargar() {
    try { const {data}=await api.get('/parqueaderos'); if(data.length>0){setParqueadero(data[0]);setForm(data[0])} }
    catch { setMsg({tipo:'error',texto:'No se pudo cargar.'}) }
  }
  async function guardar(e) {
    e.preventDefault()
    try { const {data}=await api.put(`/parqueaderos/${parqueadero.id}`,form); setParqueadero(data); setEditando(false); setMsg({tipo:'success',texto:'Informacion actualizada.'}) }
    catch { setMsg({tipo:'error',texto:'No se pudo actualizar.'}) }
  }

  if (!parqueadero) return <p style={{color:'var(--text-secondary)'}}>Cargando...</p>
  return (
    <div>
      <div className="page-header"><h1>Parqueaderos</h1><p>Informacion del parqueadero</p></div>
      {msg.texto && <div className={`alert ${msg.tipo==='error'?'alert-error':'alert-success'}`}>{msg.texto}</div>}
      <div className="card" style={{maxWidth:560}}>
        <div className="card-title">Datos del parqueadero
          {!editando && <button className="btn btn-secondary" style={{fontSize:13}} onClick={()=>setEditando(true)}>Editar</button>}
        </div>
        {editando ? (
          <form onSubmit={guardar}>
            <div className="form-group"><label>Nombre</label><input value={form.nombre||''} onChange={e=>setForm({...form,nombre:e.target.value})} required /></div>
            <div className="form-group"><label>Direccion</label><input value={form.direccion||''} onChange={e=>setForm({...form,direccion:e.target.value})} /></div>
            <div className="form-group"><label>Telefono</label><input value={form.telefono||''} onChange={e=>setForm({...form,telefono:e.target.value})} /></div>
            <div className="form-group"><label>Capacidad</label><input type="number" value={form.capacidad||''} onChange={e=>setForm({...form,capacidad:Number(e.target.value)})} /></div>
            <div style={{display:'flex',gap:10}}><button type="button" className="btn btn-secondary" style={{flex:1}} onClick={()=>setEditando(false)}>Cancelar</button><button type="submit" className="btn btn-primary" style={{flex:1}}>Guardar</button></div>
          </form>
        ) : (
          <table>
            <tbody>
              {[['Nombre',parqueadero.nombre],['Direccion',parqueadero.direccion],['Telefono',parqueadero.telefono],['Capacidad',parqueadero.capacidad+' espacios']].map(([c,v])=>(
                <tr key={c}><td style={{color:'var(--text-secondary)',width:140}}>{c}</td><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
